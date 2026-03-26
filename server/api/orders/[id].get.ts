import { getOrder } from '~/server/utils/mockDb'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    setResponseStatus(event, 400)
    return { ok: false, error: 'id obrigatório' }
  }

  const order = getOrder(id)
  if (!order) {
    setResponseStatus(event, 404)
    return { ok: false, error: 'order não encontrada' }
  }

  return { ok: true, data: order }
})
