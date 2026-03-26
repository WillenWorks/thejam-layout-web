import { listQuotes } from '~/server/utils/mockDb'

export default defineEventHandler(() => {
  const all = listQuotes()
  const inbox = all.filter((q) => q.status === 'triage' || q.status === 'quoted')
  return { ok: true, data: inbox }
})
