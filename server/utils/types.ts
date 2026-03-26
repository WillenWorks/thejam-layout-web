export type QuoteStatus = 'triage' | 'quoted' | 'awaiting_accept' | 'accepted' | 'rejected'

export type OrderStatus =
  | 'requested'
  | 'quoted'
  | 'paid_confirmed'
  | 'in_import'
  | 'sorting'
  | 'shipped'
  | 'delivered'

export type TcgId = 'ygo' | 'magic' | 'digimon' | 'gundam'

export interface QuoteItem {
  id: string
  name: string
  qty: number
}

export interface Quote {
  id: string
  tcg: TcgId
  status: QuoteStatus
  items: QuoteItem[]
  createdAt: string
  totalBrl: number
}

export interface TrackingEvent {
  id: string
  label: string
  at: string
}

export interface Order {
  id: string
  quoteId: string
  tcg: TcgId
  status: OrderStatus
  createdAt: string
  totalBrl: number
  trackingCode?: string
  trackingEvents: TrackingEvent[]
}

export interface ImportBatch {
  id: string
  name: string
  status: 'open' | 'in_transit' | 'arrived' | 'sorting' | 'shipped' | 'closed'
  createdAt: string
  note?: string
}

export interface MockDb {
  quotes: Quote[]
  orders: Order[]
  imports: ImportBatch[]
}
