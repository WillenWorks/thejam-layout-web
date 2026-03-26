import { randomUUID } from 'node:crypto'
import type { ImportBatch, MockDb, Order, OrderStatus, Quote, QuoteItem, QuoteStatus, TcgId, TrackingEvent } from './types'

declare global {
  // eslint-disable-next-line no-var
  var __THEJAM_MOCK_DB__: MockDb | undefined
}

const nowIso = () => new Date().toISOString()

const parseListText = (text: string): QuoteItem[] => {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)

  return lines.slice(0, 40).map((line) => {
    // supports "3x Name" or "3 Name" or just "Name"
    const m = line.match(/^\s*(\d+)\s*x?\s+(.+)$/i)
    const qty = m ? Number(m[1]) : 1
    const name = m ? m[2].trim() : line
    return { id: randomUUID(), name, qty }
  })
}

const seed = (): MockDb => {
  const q1: Quote = {
    id: 'QR-1021',
    tcg: 'ygo',
    status: 'awaiting_accept',
    items: [
      { id: randomUUID(), name: 'Insect Knight', qty: 3 },
      { id: randomUUID(), name: 'Arcane Dragon', qty: 1 },
    ],
    createdAt: nowIso(),
    totalBrl: 1240,
  }

  const q2: Quote = {
    id: 'QR-1019',
    tcg: 'magic',
    status: 'triage',
    items: [{ id: randomUUID(), name: 'Amber Mage', qty: 2 }],
    createdAt: nowIso(),
    totalBrl: 340,
  }

  const imp1: ImportBatch = {
    id: 'IMP-001',
    name: 'Import Março/26',
    status: 'in_transit',
    createdAt: nowIso(),
    note: 'Demo: lote em trânsito internacional',
  }

  const o1: Order = {
    id: 'ORD-9001',
    quoteId: q1.id,
    tcg: 'ygo',
    status: 'in_import',
    createdAt: nowIso(),
    totalBrl: q1.totalBrl,
    trackingCode: 'BR1234567890',
    trackingEvents: [
      { id: randomUUID(), label: 'Objeto postado', at: nowIso() },
      { id: randomUUID(), label: 'Saiu para entrega', at: nowIso() },
    ],
  }

  return { quotes: [q1, q2], orders: [o1], imports: [imp1] }
}

export const db = (): MockDb => {
  if (!globalThis.__THEJAM_MOCK_DB__) globalThis.__THEJAM_MOCK_DB__ = seed()
  return globalThis.__THEJAM_MOCK_DB__!
}

export const listQuotes = () => db().quotes

export const createQuote = (tcg: TcgId, listText: string): Quote => {
  const items = parseListText(listText)
  const totalBrl = Math.round(items.reduce((acc, it) => acc + it.qty * (70 + Math.random() * 260), 0))
  const quote: Quote = {
    id: `QR-${Math.floor(1000 + Math.random() * 9000)}`,
    tcg,
    status: 'triage',
    items,
    createdAt: nowIso(),
    totalBrl,
  }
  db().quotes.unshift(quote)
  return quote
}

export const setQuoteStatus = (id: string, status: QuoteStatus): Quote | null => {
  const q = db().quotes.find((x) => x.id === id)
  if (!q) return null
  q.status = status
  return q
}

export const getOrder = (id: string) => db().orders.find((o) => o.id === id) ?? null

export const listOrders = () => db().orders

export const listImports = () => db().imports

export const createImport = (name: string, note?: string) => {
  const imp = {
    id: `IMP-${Math.floor(100 + Math.random() * 900)}`,
    name,
    status: 'open' as const,
    createdAt: nowIso(),
    note,
  }
  db().imports.unshift(imp)
  return imp
}

export const advanceImportStatus = (id: string) => {
  const imp = db().imports.find((x) => x.id === id)
  if (!imp) return null
  const flow = ['open', 'in_transit', 'arrived', 'sorting', 'shipped', 'closed'] as const
  const idx = flow.indexOf(imp.status)
  imp.status = flow[Math.min(idx + 1, flow.length - 1)]
  return imp
}

export const createOrderFromQuote = (quoteId: string): Order | null => {
  const q = db().quotes.find((x) => x.id === quoteId)
  if (!q) return null

  q.status = 'accepted'

  const order: Order = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    quoteId,
    tcg: q.tcg,
    status: 'paid_confirmed',
    createdAt: nowIso(),
    totalBrl: q.totalBrl,
    trackingCode: 'BR' + Math.floor(1000000000 + Math.random() * 9000000000),
    trackingEvents: [{ id: randomUUID(), label: 'Pagamento confirmado', at: nowIso() }],
  }

  db().orders.unshift(order)
  return order
}

const ORDER_FLOW: OrderStatus[] = ['requested', 'quoted', 'paid_confirmed', 'in_import', 'sorting', 'shipped', 'delivered']

export const advanceOrderStatus = (id: string): Order | null => {
  const o = getOrder(id)
  if (!o) return null
  const idx = ORDER_FLOW.indexOf(o.status)
  const next = ORDER_FLOW[Math.min(idx + 1, ORDER_FLOW.length - 1)]
  o.status = next
  return o
}

export const addTrackingEvent = (orderId: string, label: string): TrackingEvent | null => {
  const o = getOrder(orderId)
  if (!o) return null
  const ev: TrackingEvent = { id: randomUUID(), label, at: nowIso() }
  o.trackingEvents.unshift(ev)
  return ev
}
