/* =====================================================================
   Marola — comportamento da interface (JavaScript puro, sem dependências)
   Não há backend: autenticação, cadastro e envio de mensagens ficam em
   modo demonstração até que um endpoint seja configurado (veja README).
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // -------------------------------------------------------------------
  // Menu mobile
  // -------------------------------------------------------------------
  const menuBtn = document.querySelector(".menu-btn");
  const menuLinks = document.querySelector(".menu-links");
  const iconOpen = document.querySelector(".menu-icon-open");
  const iconClose = document.querySelector(".menu-icon-close");

  const setMenu = (open) => {
    if (!menuBtn || !menuLinks) return;
    menuLinks.classList.toggle("hidden", !open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    iconOpen?.classList.toggle("hidden", open);
    iconClose?.classList.toggle("hidden", !open);
  };

  if (menuBtn && menuLinks) {
    menuBtn.addEventListener("click", () => setMenu(menuLinks.classList.contains("hidden")));
    menuLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menuLinks.classList.contains("hidden")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    // Se a janela crescer até o desktop com o menu aberto, fecha o painel
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (m) => m.matches && setMenu(false));
  }

  // -------------------------------------------------------------------
  // Scroll suave com compensação do header fixo (apenas âncoras locais)
  // -------------------------------------------------------------------
  document.querySelectorAll(".scroll-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: href === "#topo" ? 0 : top, behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", href);
    });
  });

  // Sombra no header ao rolar
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("shadow-md", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Link ativo na navegação conforme a seção visível
  const navLinks = [...document.querySelectorAll("nav .nav-link")];
  if (navLinks.length && "IntersectionObserver" in window) {
    const map = new Map(navLinks.map((l) => [l.getAttribute("href").slice(1), l]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && map.has(en.target.id)) {
          navLinks.forEach((l) => l.removeAttribute("aria-current"));
          map.get(en.target.id).setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  // -------------------------------------------------------------------
  // Animações de entrada
  // -------------------------------------------------------------------
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      reveals.forEach((el) => io.observe(el));
    }
  }

  // -------------------------------------------------------------------
  // Utilitários de formulário
  // -------------------------------------------------------------------
  const setError = (input, msg) => {
    const out = document.getElementById(`${input.id}-erro`);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (out) {
      out.textContent = msg || "";
      out.classList.toggle("hidden", !msg);
      if (msg) input.setAttribute("aria-describedby", [input.getAttribute("aria-describedby"), out.id].filter((v, i, a) => v && a.indexOf(v) === i).join(" "));
    }
    return !msg;
  };

  const showStatus = (box, text, isHtml = false) => {
    if (!box) return;
    box.classList.remove("hidden");
    if (isHtml) box.innerHTML = text; else box.textContent = text;
  };

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  // Mostrar/ocultar senha
  document.querySelectorAll(".toggle-pass").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.textContent = show ? "Ocultar" : "Mostrar";
      btn.setAttribute("aria-pressed", String(show));
    });
  });

  // -------------------------------------------------------------------
  // Login e cadastro (modo demonstração: sem backend)
  // Para conectar um servidor, defina data-endpoint="https://..." no <form>.
  // -------------------------------------------------------------------
  const DEMO_MSG = "Ambiente de demonstração: nenhum dado foi enviado nem armazenado, pois ainda não há servidor de autenticação conectado.";

  const planNames = { basico: "Básico", profissional: "Profissional", premium: "Premium" };
  const chip = document.querySelector(".plano-chip");
  if (chip) {
    const plano = new URLSearchParams(location.search).get("plano");
    if (plano && planNames[plano]) {
      chip.textContent = `Plano selecionado: ${planNames[plano]}`;
      chip.classList.remove("hidden");
    }
  }

  document.querySelectorAll(".auth-form").forEach((form) => {
    const kind = form.dataset.auth;
    const status = form.querySelector(".form-status");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status?.classList.add("hidden");
      const f = (id) => form.querySelector(`#${id}`);
      const checks = [];

      const usuario = f("usuario");
      checks.push(setError(usuario, usuario.value.trim().length < 3 ? "Informe um usuário com pelo menos 3 caracteres." : ""));

      if (kind === "cadastro") {
        const email = f("email");
        checks.push(setError(email, emailOk(email.value.trim()) ? "" : "Informe um e-mail válido."));
      }

      const senha = f("senha");
      const minLen = kind === "cadastro" ? 8 : 1;
      checks.push(setError(senha, senha.value.length < minLen ? (kind === "cadastro" ? "A senha precisa ter pelo menos 8 caracteres." : "Informe sua senha.") : ""));

      if (kind === "cadastro") {
        const conf = f("confirmar-senha");
        checks.push(setError(conf, conf.value !== senha.value || !conf.value ? "As senhas não coincidem." : ""));
      }

      if (checks.includes(false)) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }

      const endpoint = form.dataset.endpoint;
      if (!endpoint) { showStatus(status, DEMO_MSG); return; }

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        const body = Object.fromEntries([...new FormData(form).entries()].filter(([k]) => k !== "confirmar-senha"));
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        if (!res.ok) throw new Error(String(res.status));
        showStatus(status, kind === "login" ? "Login realizado." : "Conta criada com sucesso.");
      } catch {
        showStatus(status, "Não foi possível concluir agora. Tente novamente em instantes.");
      } finally {
        btn.disabled = false;
      }
    });
  });

  // -------------------------------------------------------------------
  // Formulário de contato: valida e abre o e-mail do visitante com a
  // mensagem pronta (mailto). Não há servidor de envio.
  // -------------------------------------------------------------------
  const contact = document.querySelector(".form-contato");
  if (contact) {
    const status = contact.querySelector(".form-status");
    contact.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = contact.querySelector("#nome");
      const email = contact.querySelector("#email-contato");
      const msg = contact.querySelector("#mensagem");
      const bad = [];
      [[nome, nome.value.trim() ? "" : "x"], [email, emailOk(email.value.trim()) ? "" : "x"], [msg, msg.value.trim() ? "" : "x"]].forEach(([el, err]) => {
        el.setAttribute("aria-invalid", err ? "true" : "false");
        if (err) bad.push(el);
      });
      if (bad.length) {
        status.textContent = "Preencha nome, um e-mail válido e a mensagem.";
        bad[0].focus();
        return;
      }
      const to = contact.dataset.mailto;
      const subject = encodeURIComponent(`Contato pelo site Marola — ${nome.value.trim()}`);
      const body = encodeURIComponent(`${msg.value.trim()}\n\n— ${nome.value.trim()} (${email.value.trim()})`);
      status.textContent = "Abrimos o seu aplicativo de e-mail com a mensagem pronta. É só enviar por lá.";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
});
