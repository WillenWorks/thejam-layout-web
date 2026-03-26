<template>
  <div class="ui-card ui-chamfer ui-edge rounded-2xl overflow-hidden">
    <button
      class="faq-btn"
      type="button"
      @click="toggle"
      :aria-expanded="isOpen ? 'true' : 'false'"
    >
      <span class="faq-chevron" aria-hidden="true">{{ isOpen ? '▾' : '▸' }}</span>
      <span class="faq-title">{{ title }}</span>
      <span class="ml-auto text-xs text-white/50">{{ isOpen ? 'Fechar' : 'Abrir' }}</span>
    </button>

    <Transition name="acc">
      <div v-if="isOpen" class="faq-body">
        <p class="text-sm text-[color:var(--text-muted)]">{{ body }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  body: string
  open?: boolean
}>()

const isOpen = ref(!!props.open)
const toggle = () => (isOpen.value = !isOpen.value)
</script>

<style scoped>
.faq-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 18px;
  text-align: left;
  background: transparent;
  transition: background 160ms ease;
}
.faq-btn:hover { background: rgba(255,255,255,0.04); }

.faq-chevron {
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.18);
}

.faq-title {
  font-weight: 700;
}

.faq-body {
  padding: 0 18px 18px 50px;
}

.acc-enter-active,
.acc-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}
.acc-enter-from,
.acc-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
