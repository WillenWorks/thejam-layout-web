import type { User, UserRole } from '~/types/domain'

const STORAGE_KEY = 'thejam.session'

type SessionState = {
  user: User | null
}

export function useAuth() {
  const state = useState<SessionState>('auth', () => ({ user: null }))

  const isAuthed = computed(() => !!state.value.user)

  const init = () => {
    if (!process.client) return
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as SessionState
      state.value.user = parsed.user
    } catch {
      // ignore
    }
  }

  const loginAs = (role: UserRole) => {
    const user: User = {
      id: role + '-001',
      name: role === 'customer' ? 'Willen' : role === 'admin' ? 'Operacional' : 'Superadmin',
      email: role + '@demo.local',
      role,
    }
    state.value.user = user
    if (process.client) localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }))
  }

  const logout = () => {
    state.value.user = null
    if (process.client) localStorage.removeItem(STORAGE_KEY)
  }

  return { user: computed(() => state.value.user), isAuthed, init, loginAs, logout }
}
