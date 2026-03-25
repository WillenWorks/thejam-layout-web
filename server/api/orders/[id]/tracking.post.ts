import { addTrackingEvent } from '~/server/utils/mockDb'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    setResponseStatus(event, 400)
    return { ok: false, error: 'id obrigatório' }
  }

  const body = await readBody<{ label: string }>(event)
  const label = body?.label?.trim()
  if (!label) {
    setResponseStatus(event, 400)
    return { ok: false, error: 'label obrigatório' }
  }

  const ev = addTrackingEvent(id, label)
  if (!ev) {
    setResponseStatus(event, 404)
    return { ok: false, error: 'order não encontrada' }
  }

  return { ok: true, data: ev }
})
