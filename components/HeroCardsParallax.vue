<template>
  <div ref="wrap" class="relative">
    <div class="hero ui-card ui-chamfer ui-edge ui-glow overflow-hidden">
      <div class="hero-bg" />

      <div class="hero-float" :style="floatStyle">
        <img src="/hero/dark-magician-cutout.png" class="hero-dm" alt="Dark Magician" draggable="false" />
        <div class="staff-glow" :class="{ on: glowOn }" />
      </div>

      <div class="hero-shade" />

      <div class="hero-label">
        <div class="text-xs text-[color:var(--text-muted)]">Hero (ref Master Duel)</div>
        <div class="mt-0.5 text-sm font-semibold">Dark Magician</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const wrap = ref<HTMLElement | null>(null)
const reduced = ref(false)

const x = ref(0)
const y = ref(0)

const glowOn = ref(false)
let glowTimer: any = null

const setReduced = () => {
  if (!process.client) return
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

onMounted(() => {
  setReduced()
  if (!wrap.value) return

  const onMove = (e: MouseEvent) => {
    if (reduced.value) return
    const rect = wrap.value!.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    x.value = nx
    y.value = ny

    // “energize” the staff tip when user moves mouse
    glowOn.value = true
    if (glowTimer) clearTimeout(glowTimer)
    glowTimer = setTimeout(() => (glowOn.value = false), 420)
  }

  wrap.value.addEventListener('mousemove', onMove)
  window.addEventListener('resize', setReduced)

  return () => {
    wrap.value?.removeEventListener('mousemove', onMove)
    window.removeEventListener('resize', setReduced)
  }
})

const floatStyle = computed(() => {
  if (reduced.value) return {}
  return {
    transform: `translate3d(${x.value * 10}px, ${y.value * 8}px, 0)`
  }
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 460px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(980px 420px at 35% 35%, rgba(124, 58, 237, 0.22), transparent 60%),
    radial-gradient(820px 380px at 70% 40%, rgba(34, 211, 238, 0.16), transparent 58%),
    linear-gradient(180deg, rgba(0,0,0,0.16), rgba(0,0,0,0.42));
  pointer-events: none;
}

.hero-float {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: transform 160ms ease-out;
}

.hero-dm {
  height: 100%;
  width: auto;
  max-width: 92%;
  object-fit: contain;
  filter:
    saturate(1.05)
    contrast(1.06)
    drop-shadow(0 18px 46px rgba(0, 0, 0, 0.55))
    drop-shadow(0 0 34px rgba(124, 58, 237, 0.22));
  opacity: 0.98;
}

/* Approximate staff tip glow (top-right quadrant) */
.staff-glow {
  position: absolute;
  width: 190px;
  height: 190px;
  right: 90px;
  top: 78px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(34,211,238,0.55), rgba(124,58,237,0.22), transparent 62%);
  filter: blur(10px);
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 180ms ease, transform 240ms ease;
  pointer-events: none;
  mix-blend-mode: screen;
}
.staff-glow.on {
  opacity: 0.85;
  transform: scale(1);
}

.hero-shade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(760px 420px at 50% 60%, transparent 35%, rgba(0,0,0,0.52) 78%),
    linear-gradient(90deg, rgba(0,0,0,0.22), transparent 42%, rgba(0,0,0,0.40));
  pointer-events: none;
}

.hero-label {
  position: absolute;
  left: 14px;
  bottom: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(10px);
}
</style>
