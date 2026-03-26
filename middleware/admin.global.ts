import type { UserRole } from '~/types/domain'

export default defineNuxtRouteMiddleware((to) => {
  const { user, isAuthed } = useAuth()

  if (!isAuthed.value) return

  // Admin area guard
  if (to.path.startsWith('/admin')) {
    const role: UserRole | undefined = user.value?.role
    if (role !== 'admin' && role !== 'superadmin') {
      return navigateTo('/dashboard')
    }
  }
})
