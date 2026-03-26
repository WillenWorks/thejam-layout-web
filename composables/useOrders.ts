import type { Order } from '~/server/utils/types'
import { apiGet, apiPost } from '~/services/api'

export function useOrders() {
  const orders = useState<Order[]>('orders', () => [])
  const loading = useState<boolean>('orders.loading', () => false)
  const error = useState<string | null>('orders.error', () => null)

  const refresh = async () => {
    loading.value = true
    error.value = null
    try {
      orders.value = await apiGet<Order[]>('/api/orders')
    } catch (e: any) {
      error.value = e?.message ?? 'Erro ao carregar'
    } finally {
      loading.value = false
    }
  }

  const getById = async (id: string) => {
    return await apiGet<Order>(`/api/orders/${id}`)
  }

  const advanceStatus = async (id: string) => {
    const o = await apiPost<Order>(`/api/orders/${id}/advance-status`)
    orders.value = orders.value.map((x) => (x.id === id ? o : x))
    return o
  }

  const addTracking = async (id: string, label: string) => {
    await apiPost(`/api/orders/${id}/tracking`, { label })
    // easiest: refetch order list after changes
    await refresh()
  }

  return { orders, loading, error, refresh, getById, advanceStatus, addTracking }
}
