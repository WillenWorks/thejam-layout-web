import { setQuoteStatus, createOrderFromQuote } from '~/server/utils/mockDb'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    setResponseStatus(event, 400)
    return { ok: false, error: 'id obrigatório' }
  }

  const q = setQuoteStatus(id, 'accepted')
  if (!q) {
    setResponseStatus(event, 404)
    return { ok: false, error: 'quote não encontrada' }
  }

  // For demo: accepting generates an order automatically
  const order = createOrderFromQuote(id)
  return { ok: true, data: { quote: q, order } }
})
