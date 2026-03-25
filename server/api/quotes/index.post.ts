import { createQuote } from '~/server/utils/mockDb'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ tcg: any; listText: string }>(event)

  if (!body?.tcg || !body?.listText) {
    setResponseStatus(event, 400)
    return { ok: false, error: 'tcg e listText são obrigatórios' }
  }

  const quote = createQuote(body.tcg, body.listText)
  return { ok: true, data: quote }
})
