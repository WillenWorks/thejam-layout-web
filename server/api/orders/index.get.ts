import { listOrders } from '~/server/utils/mockDb'

export default defineEventHandler(() => {
  return { ok: true, data: listOrders() }
})
