import { listQuotes } from '~/server/utils/mockDb'

export default defineEventHandler(() => {
  return { ok: true, data: listQuotes() }
})
