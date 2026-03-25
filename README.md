# The Jam — Protótipo UI/UX (Nuxt)

Protótipo **mobile-first** (desktop também) com direção visual inspirada *de forma genérica* em UI de jogos de TCG (vibe Master Duel), mas **sem copy/paste**.

Nesta fase do MVP, o site fica **travado em YGO** (sem alternância de tema e sem modo claro).

## Rodando local

[1mNão[0m enviar `node_modules` no zip.

```bash
pnpm install
pnpm dev
# abre http://localhost:3000
```

## Rotas (protótipo)

**Público**
- `/` home
- `/login` login mock (escolhe perfil)
- `/register` cadastro mock

**Autenticado (usuário)**
- `/dashboard`
- `/quotes`
- `/orders`
- `/orders/:id`
- `/collection`
- `/settings`

**Admin (somente admin/superadmin)**
- `/admin/inbox` (triagem / finalizar cotação)
- `/admin/imports` (import batches)

## Mock API

### Quotes
- `GET /api/quotes`
- `POST /api/quotes` body: `{ tcg, listText }`
- `POST /api/quotes/:id/accept` (no demo, aceitar já gera um pedido)
- `POST /api/quotes/:id/reject`

### Orders
- `GET /api/orders`
- `GET /api/orders/:id`
- `POST /api/orders/:id/advance-status`
- `POST /api/orders/:id/tracking` body: `{ label }`

### Admin
- `GET /api/admin/inbox`
- `POST /api/admin/quotes/:id/mark-quoted`
- `GET /api/admin/imports`
- `POST /api/admin/imports/:id/advance-status`

**Implementação:** `server/utils/mockDb.ts` (seed + store em memória do servidor).

## Ajustes visuais desta versão

- **Mais neon** (glow reforçado + overlay técnico no background)
- **Desktop menos claustrofóbico**: container `max-w-7xl`, paddings e gaps maiores
- **Tema travado em YGO** (sem alternância por enquanto)
- **Loading com moeda girando** (chamado em ações principais, não a cada troca de rota)
- **Assets YGO-safe** em `public/ygo/*` (arte original)

## Próximos passos do MVP (conforme fluxo)

- Home + páginas institucionais: Quem Somos / FAQ / Como Funciona / Sobre
- Usuário: Procurar Carta (YGO), Favoritos/Pasta, Cotações com aceite por item, Rastreio, Financeiro
- Importador: Cotações por usuário + cálculo por item, Compras, Importação por season, Não recebidos, Financeiro, Mensageria
