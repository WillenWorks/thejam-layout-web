<template>
  <div class="py-8 md:py-12">
    <div class="flex gap-6">
      <AppSidebar />
      <section class="flex-1">
        <h1 class="text-2xl md:text-3xl font-semibold">Importação (seasons)</h1>
        <p class="mt-1 text-sm text-white/70">Lotes por temporada/grupo (mock).</p>

        <div class="mt-6 grid gap-4 lg:grid-cols-2">
          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-center justify-between">
              <div class="font-semibold">Seasons</div>
              <button class="ui-btn ui-btn-primary" @click="ping('No MVP: criar season, custos e datas.')">Nova season</button>
            </div>

            <div class="mt-4 space-y-3">
              <div v-for="s in seasons" :key="s.id" class="ui-panel ui-chamfer ui-edge rounded-2xl p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-semibold">{{ s.name }}</div>
                    <div class="text-xs text-white/60">{{ s.status }} · {{ s.count }} pedidos</div>
                  </div>
                  <button class="ui-btn ui-btn-ghost" @click="ping('No MVP: abrir timeline, lotes e rastreio.')">Abrir</button>
                </div>
              </div>
            </div>
          </div>

          <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-5">
            <div class="font-semibold">Import Batches (já existia)</div>
            <div class="mt-2 text-sm text-white/70">Mantive a tela de batches e deixei ela como fonte de verdade para lotes.</div>
            <NuxtLink to="/admin/imports" class="mt-4 ui-btn ui-btn-primary">Abrir Import Batches</NuxtLink>
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

const seasons = ref([
  { id: 'S-2026-01', name: 'Season Março/2026', status: 'Aberta', count: 8 },
  { id: 'S-2026-00', name: 'Season Fevereiro/2026', status: 'Fechada', count: 21 },
])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
