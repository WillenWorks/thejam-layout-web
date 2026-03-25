<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { init: initTheme } = useTheme()
const { init: initAuth } = useAuth()

onMounted(() => {
  initTheme()
  initAuth()
})
</script>
