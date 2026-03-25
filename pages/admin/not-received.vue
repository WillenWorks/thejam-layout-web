<template>
  <div class="py-8 md:py-12">
    <div class="flex gap-6">
      <AppSidebar />
      <section class="flex-1">
        <h1 class="text-2xl md:text-3xl font-semibold">Não recebidos</h1>
        <p class="mt-1 text-sm text-white/70">Controle de itens faltantes / divergências (mock).</p>

        <div class="mt-6 ui-panel ui-chamfer ui-edge rounded-2xl p-5">
          <div class="font-semibold">Lista</div>
          <div class="mt-4 space-y-3">
            <div v-for="i in items" :key="i.id" class="ui-panel ui-chamfer ui-edge rounded-2xl p-4">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <div class="font-semibold">{{ i.card }}</div>
                  <div class="text-xs text-white/60">Cliente: {{ i.user }} · Compra: {{ i.purchase }} · Qty: {{ i.qty }}</div>
                </div>
                <button class="ui-btn ui-btn-primary" @click="ping('No MVP: abrir caso, anexos e solução (reembolso/recall).')">Abrir caso</button>
              </div>
            </div>
          </div>
        </div>

        <Transition name="fade">
          <div v-if="toast" class="fixed top-24 left-0 right-0 z-50">
            <div class="mx-auto max-w-md px-4">
              <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl px-4 py-3 text-sm">
                {{ toast }}
              </div>
            </div>
          </div>
        </Transition>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const toast = ref<string | null>(null)
const ping = (m: string) => {
  toast.value = m
  setTimeout(() => (toast.value = null), 2200)
}

const items = ref([
  { id: 'NR-01', card: 'Insect Knight', user: 'Willen (demo)', purchase: 'P-01', qty: 2 },
  { id: 'NR-02', card: 'Arcane Dragon', user: 'Willen (demo)', purchase: 'P-02', qty: 1 },
])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
