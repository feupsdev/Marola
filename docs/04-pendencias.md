# Pendências e dependências externas

- **Nome/domínio/registro:** disponibilidade de "Marola" **não verificada** (INPI, domínio, redes). Fazer busca de anterioridade antes de usar comercialmente.
- **Backend:** login, cadastro, contato e cobrança não existem. Necessário API/autenticação (ex.: Supabase/Firebase ou servidor próprio) e `data-endpoint` nos formulários.
- **Pix e WhatsApp:** integrações descritas no site mas não implementadas. Exigem conta com PSP/banco (Pix) e WhatsApp Business API (credenciais da empresa).
- **Planos:** só há nome, descrição e preço originais. Definir lista real de recursos, limites e política de cancelamento ("sem fidelidade", "suporte 24h" são afirmações herdadas do site original, a confirmar).
- **Contato/rodapé:** e-mail, cidade e GitHub herdados do projeto original; confirmar se permanecem.
- **SEO em produção:** definir domínio, `canonical`, imagem Open Graph (URL absoluta), `sitemap.xml` e linha Sitemap no robots.txt.
- **Privacidade:** ao coletar dados reais, incluir Política de Privacidade/Termos (LGPD).
- **Fotografia:** o site não usa fotos; se desejar, use fotos reais de clientes/equipe (as antigas eram genéricas e foram removidas).
- **Produção:** Tailwind CDN é indicado só para protótipo; para produção, compilar o CSS (Tailwind CLI) para reduzir peso.
