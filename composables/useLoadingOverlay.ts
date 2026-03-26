export function useLoadingOverlay() {
  const active = useState<boolean>('loadingOverlay', () => false)
  let timer: any = null

  const show = () => {
    active.value = true
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const showBrief = (ms = 520) => {
    show()
    timer = setTimeout(() => {
      active.value = false
      timer = null
    }, ms)
  }

  const hide = () => {
    active.value = false
    if (timer) clearTimeout(timer)
    timer = null
  }

  return { active, show, showBrief, hide }
}
