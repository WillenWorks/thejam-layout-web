<template>
  <div v-if="mounted" class="absolute inset-0 overflow-hidden">
    <span v-for="p in particles" :key="p.id" class="absolute rounded-full" :style="p.style" />
  </div>
</template>

<script setup lang="ts">
type Particle = {
  id: string
  style: Record<string, string>
}

const mounted = ref(false)
const particles = ref<Particle[]>([])

onMounted(() => {
  mounted.value = true

  const out: Particle[] = []
  const count = 18

  for (let i = 0; i < count; i++) {
    const size = (i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1) + Math.random() * 1.5
    const left = Math.random() * 100
    const top = 70 + Math.random() * 40

    const duration = 6 + Math.random() * 10
    const delay = -Math.random() * duration
    const hue = i % 6 === 0 ? 'var(--a2)' : i % 5 === 0 ? 'var(--a1)' : 'rgba(255,255,255,0.9)'

    out.push({
      id: `p-${i}`,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
        background: `color-mix(in srgb, ${hue} 80%, white)`,
        opacity: `${0.30 + Math.random() * 0.55}`,
        filter: `drop-shadow(0 0 10px color-mix(in srgb, ${hue} 45%, transparent))`,
        animation: `floatUp ${duration}s linear ${delay}s infinite, drift ${4 + Math.random() * 5}s ease-in-out ${delay}s infinite`,
      },
    })
  }

  particles.value = out
})
</script>
