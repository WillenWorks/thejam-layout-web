<template>
  <div ref="wrap" class="relative">
    <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-4">
      <div class="text-xs text-[color:var(--text-muted)]">Preview (arte original)</div>
      <div class="mt-3 grid grid-cols-2 gap-3">
        <div class="ui-panel-2 ui-chamfer ui-edge rounded-2xl overflow-hidden">
          <img src="/cards/insect-knight.jpg" class="w-full h-[200px] object-cover" alt="Arte demo" />
        </div>
        <div class="ui-panel-2 ui-chamfer ui-edge rounded-2xl overflow-hidden">
          <img src="/cards/arcane-dragon.jpg" class="w-full h-[200px] object-cover" alt="Arte demo" />
        </div>
      </div>
      <p class="mt-3 text-xs text-[color:var(--text-muted)]">
        Parallax leve no desktop (respeita prefers-reduced-motion).
      </p>
    </div>

    <div class="hidden md:block">
      <div class="float-card a" :style="styleA">
        <img src="/cards/arcane-dragon.jpg" class="w-full h-full object-cover" alt="" />
      </div>
      <div class="float-card b" :style="styleB">
        <img src="/cards/insect-knight.jpg" class="w-full h-full object-cover" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const wrap = ref<HTMLElement | null>(null)
const reduced = ref(false)

const x = ref(0)
const y = ref(0)

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
  }

  wrap.value.addEventListener('mousemove', onMove)
  window.addEventListener('resize', setReduced)

  return () => {
    wrap.value?.removeEventListener('mousemove', onMove)
    window.removeEventListener('resize', setReduced)
  }
})

const styleA = computed(() => {
  if (reduced.value) return {}
  return {
    transform: `translate3d(${x.value * 14}px, ${y.value * 10}px, 0) rotate(10deg)`,
  }
})

const styleB = computed(() => {
  if (reduced.value) return {}
  return {
    transform: `translate3d(${x.value * -10}px, ${y.value * 14}px, 0) rotate(-8deg)`,
  }
})
</script>

<style scoped>
.float-card {
  position: absolute;
  width: 180px;
  height: 240px;
  overflow: hidden;
  border-radius: 18px;
  background: var(--panel-2);
  border: 1px solid var(--panel-border);
  clip-path: polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px));
  opacity: 0.7;
  transition: transform 160ms ease-out;
}

.a { top: -48px; right: -30px; }
.b { top: 112px; right: -56px; width: 150px; height: 210px; opacity: 0.55; }
</style>
