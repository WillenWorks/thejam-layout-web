import { advanceImportStatus } from '~/server/utils/mockDb'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    setResponseStatus(event, 400)
    return { ok: false, error: 'id obrigatório' }
  }

  const imp = advanceImportStatus(id)
  if (!imp) {
    setResponseStatus(event, 404)
    return { ok: false, error: 'import não encontrado' }
  }

  return { ok: true, data: imp }
})
