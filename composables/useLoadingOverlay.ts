export function useLoadingOverlay() {
  const active = useState<boolean>('loadingOverlay', () => false)
  let timer: any = null

  const showBrief = (ms = 520) => {
    active.value = true
    if (timer) clearTimeout(timer)
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

  return { active, showBrief, hide }
}
