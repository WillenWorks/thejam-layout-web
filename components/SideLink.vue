<template>
  <NuxtLink
    :to="to"
    class="rounded-xl px-3 py-2 text-sm transition"
    :class="isActive ? 'bg-white/10 ui-glow' : 'text-white/70 hover:bg-white/5'"
  >
    {{ label }}
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{ to: string; label: string }>()
const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>
