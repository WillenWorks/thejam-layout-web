import { setQuoteStatus } from '~/server/utils/mockDb'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    setResponseStatus(event, 400)
    return { ok: false, error: 'id obrigatório' }
  }

  const q = setQuoteStatus(id, 'rejected')
  if (!q) {
    setResponseStatus(event, 404)
    return { ok: false, error: 'quote não encontrada' }
  }

  return { ok: true, data: q }
})
