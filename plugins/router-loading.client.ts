export default defineNuxtPlugin((nuxtApp) => {
  if (!process.client) return

  const router = useRouter()
  const overlay = useLoadingOverlay()

  router.beforeEach(() => {
    overlay.show()
  })

  router.afterEach(async () => {
    // wait a tick so the new page paints before hiding
    await nextTick()
    overlay.hide()
  })
})
