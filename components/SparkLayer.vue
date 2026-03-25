<template>
  <div v-if="mounted" class="absolute inset-0 overflow-hidden pointer-events-none">
    <span v-for="s in sparks" :key="s.id" class="spark" :style="s.style" />
  </div>
</template>

<script setup lang="ts">
type Spark = { id: string; style: Record<string, string> }

const mounted = ref(false)
const sparks = ref<Spark[]>([])

onMounted(() => {
  mounted.value = true

  const out: Spark[] = []
  const count = 10
  for (let i = 0; i < count; i++) {
    const left = Math.random() * 100
    const top = 60 + Math.random() * 45
    const width = 24 + Math.random() * 44
    const duration = 1.4 + Math.random() * 1.8
    const delay = -Math.random() * duration

    out.push({
      id: `s-${i}`,
      style: {
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      },
    })
  }
  sparks.value = out
})
</script>

<style scoped>
.spark {
  position: absolute;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--a2) 75%, white), transparent);
  filter: drop-shadow(0 0 12px var(--glow));
  opacity: 0.0;
  animation-name: spark;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>
