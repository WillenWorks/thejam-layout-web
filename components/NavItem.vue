<template>
  <NuxtLink
    :to="to"
    class="w-full text-center rounded-xl px-2 py-2 text-[11px] transition"
    :class="isActive ? 'bg-white/10 ui-glow' : 'text-[color:var(--text-muted)] hover:bg-white/5'"
  >
    <span class="mx-auto flex items-center justify-center mb-1">
      <Icon v-if="icon" :name="icon" :size="18" />
    </span>
    <span class="block leading-none">{{ label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{ to: string; label: string; icon?: any }>()
const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>
