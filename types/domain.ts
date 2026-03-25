export type ThemeId = 'ygo' | 'magic' | 'digimon' | 'gundam'

export type UserRole = 'customer' | 'admin' | 'superadmin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}
