export default defineNuxtRouteMiddleware((to) => {
  const publicPaths = ['/', '/login', '/register', '/como-funciona', '/faq', '/quem-somos', '/sobre']
  if (publicPaths.includes(to.path)) return

  const { isAuthed } = useAuth()
  if (!isAuthed.value) {
    return navigateTo('/login')
  }
})
