# Relatório de alterações

**Marca:** FEL → Marola. Novo logotipo (SVG), símbolo, favicon (SVG + PNG), manifest. Logo antigo e imagens antigas (PNG/WebP pesados, com marca FEL e foto de "equipe FEL" que não era real) removidos.

**Design:** todas as páginas refeitas (home com hero + maquete, "como funciona", funcionalidades em composição assimétrica, sobre, planos, contato, rodapé; login e cadastro em layout dividido).

**Correções**
- Botões "Entrar/Cadastrar" do menu mobile não tinham comportamento (JS só ligava os do desktop) → agora são links.
- Formulários de login/cadastro usavam `action=""` POST e recarregavam a página → validação em JS, mensagens por campo, confirmação de senha, mínimo de 8 caracteres.
- Botões de plano e contato usavam `alert()` → plano leva ao cadastro (`?plano=`); contato valida e abre mailto.
- Links `#` do LinkedIn/Instagram eliminados; Font Awesome (CSS externo inteiro) substituído por SVG inline.
- `overflow-x:hidden` em html/body (podia quebrar header sticky) → `overflow-x: clip`.
- Configuração Tailwind duplicada em 3 arquivos → `tailwind-config.js`.
- Título duplicado/README quebrado (UTF-16) reescritos. Peso das imagens: ~6 MB → 0 (logo/SVG).

**Acessibilidade/SEO:** skip-link, foco visível, aria-expanded/controls no menu, Esc fecha menu, labels visíveis, erros com role=alert, link ativo na navegação, reduced-motion; meta description, Open Graph, JSON-LD (SoftwareApplication com os 3 preços), noindex em login/cadastro, robots.txt.

**Preservado:** stack, seções, textos de funcionalidades, planos e preços, contato.
