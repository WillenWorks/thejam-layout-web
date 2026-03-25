import type { Order, Quote, TcgId } from '~/server/utils/types'
import { apiGet, apiPost } from '~/services/api'

export function useQuotes() {
  const quotes = useState<Quote[]>('quotes', () => [])
  const loading = useState<boolean>('quotes.loading', () => false)
  const error = useState<string | null>('quotes.error', () => null)

  const refresh = async () => {
    loading.value = true
    error.value = null
    try {
      quotes.value = await apiGet<Quote[]>('/api/quotes')
    } catch (e: any) {
      error.value = e?.message ?? 'Erro ao carregar'
    } finally {
      loading.value = false
    }
  }

  const create = async (tcg: TcgId, listText: string) => {
    const q = await apiPost<Quote>('/api/quotes', { tcg, listText })
    quotes.value = [q, ...quotes.value]
    return q
  }

  const accept = async (id: string) => {
    const res = await apiPost<{ quote: Quote; order: Order | null }>(`/api/quotes/${id}/accept`)
    // update local list
    quotes.value = quotes.value.map((q) => (q.id === id ? res.quote : q))
    return res
  }

  const reject = async (id: string) => {
    const q = await apiPost<Quote>(`/api/quotes/${id}/reject`)
    quotes.value = quotes.value.map((x) => (x.id === id ? q : x))
    return q
  }

  return { quotes, loading, error, refresh, create, accept, reject }
}
