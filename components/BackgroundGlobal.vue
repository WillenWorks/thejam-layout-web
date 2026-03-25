<template>
  <div class="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
    <!-- Base image (swap on route if needed) -->
    <div
      class="absolute inset-0 bg-cover bg-center opacity-75"
      :style="{ backgroundImage: `url(${bgUrl})` }"
    />

    <!-- Dark overlay + theme tint -->
    <div
      class="absolute inset-0"
      style="background:
        radial-gradient(circle at 50% 45%, rgba(0,0,0,0.20), rgba(0,0,0,0.72) 62%, rgba(0,0,0,0.88)),
        radial-gradient(circle at 18% 20%, color-mix(in srgb, var(--a1) 32%, transparent), transparent 60%),
        radial-gradient(circle at 84% 70%, color-mix(in srgb, var(--a2) 22%, transparent), transparent 55%);
      "
    />

    <!-- Soft tech texture (no checkerboard) -->
    <div
      class="absolute inset-0 opacity-45 mix-blend-screen"
      style="background:
        radial-gradient(circle at 18% 20%, color-mix(in srgb, var(--a2) 18%, transparent), transparent 58%),
        radial-gradient(circle at 82% 70%, color-mix(in srgb, var(--a1) 18%, transparent), transparent 62%),
        linear-gradient(120deg, rgba(255,255,255,0.05), transparent 55%),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 220px);
        filter: blur(0.4px);
      "
    />

    <!-- Diagonal glow lanes -->
    <div class="absolute inset-0 opacity-60">
      <div
        class="absolute -inset-x-1/4 top-[-20%] h-[48%] rotate-[-18deg]"
        style="background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--a1) 28%, transparent), transparent); filter: blur(8px);"
      />
      <div
        class="absolute -inset-x-1/4 bottom-[-22%] h-[48%] rotate-[18deg]"
        style="background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--a2) 24%, transparent), transparent); filter: blur(10px);"
      />
    </div>

    <!-- Scan line -->
    <div class="absolute inset-0 opacity-40 mix-blend-screen">
      <div
        class="absolute top-[18%] h-[1px] w-[60%]"
        style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent); animation: scan 8.5s ease-in-out infinite;"
      />
    </div>

    <!-- Particles -->
    <ParticleLayer />

    <!-- Sparks (subtle) -->
    <SparkLayer />

    <!-- Vignette -->
    <div class="absolute inset-0" style="box-shadow: inset 0 0 120px rgba(0,0,0,0.85)" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ variant?: 'nebula' | 'portal' }>()

const bgUrl = computed(() => {
  if (props.variant === 'portal') return '/bg/portal-cards.jpg'
  return '/bg/nebula-diagonals.jpg'
})
</script>
