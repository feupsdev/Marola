# Relatório de testes

Executados com Playwright (Chromium) sobre os arquivos locais, em 375×812, 768×1024 e 1440×900. **26/26 verificações passaram; 0 erros de console.**

Limitação: o ambiente de teste não acessa a internet aberta. Tailwind (CDN) foi substituído por CSS compilado a partir da mesma configuração (`tailwind-config.js`) e as fontes pelos mesmos arquivos Bricolage Grotesque/DM Sans servidos localmente. Em produção, o CDN e o Google Fonts precisam estar acessíveis; **o carregamento real via CDN não foi testado aqui**.

| Verificação | Resultado |
|---|---|
| Sem rolagem horizontal (3 páginas × 3 larguras) | OK |
| Menu mobile: abrir, fechar ao clicar, Esc, aria-expanded | OK |
| Âncoras do menu mobile e desktop rolam à seção correta | OK |
| Botões Entrar / Criar conta navegam | OK |
| Login: erros de campo, mostrar senha, aviso de demonstração | OK |
| Cadastro: e-mail inválido, confirmação divergente, senha curta, chip do plano via `?plano=` | OK |
| Contato: validação e mailto | OK (o app de e-mail não foi aberto no teste) |
| Botões de plano → cadastro com plano | OK |
| Links internos e imagens | OK |
| Skip-link recebe foco | OK |
| Contraste (WCAG): menor par usado em texto = 5,2:1 | OK (AA) |

Não testados: Safari/Firefox, leitor de tela real, Lighthouse, desempenho em rede real.
