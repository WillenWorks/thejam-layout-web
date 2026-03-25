import type { ThemeId } from '~/types/domain'

// NOTE: Temporariamente travado em YGO (pedido do MVP)
export type ColorMode = 'dark' | 'light'

export function useTheme() {
  const theme = useState<ThemeId>('theme', () => 'ygo')
  const mode = useState<ColorMode>('mode', () => 'dark')

  const init = () => {
    if (!process.client) return
    theme.value = 'ygo'
    mode.value = 'dark'

    // force classes
    document.documentElement.classList.remove('mode-light')
    document.documentElement.classList.add('mode-dark', 'theme-ygo')
  }

  // No-ops while MVP is locked
  const cycleTheme = () => {}
  const toggleMode = () => {}

  const label = computed(() => 'YGO')

  return { theme, mode, init, cycleTheme, toggleMode, label }
}
