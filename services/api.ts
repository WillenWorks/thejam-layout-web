type ApiOk<T> = { ok: true; data: T }
type ApiErr = { ok: false; error: string }

export async function apiGet<T>(path: string): Promise<T> {
  const res = await $fetch<ApiOk<T> | ApiErr>(path)
  if (!res.ok) throw new Error(res.error)
  return res.data
}

export async function apiPost<T>(path: string, body?: any): Promise<T> {
  const res = await $fetch<ApiOk<T> | ApiErr>(path, { method: 'POST', body })
  if (!res.ok) throw new Error(res.error)
  return res.data
}
