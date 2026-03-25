<template>
  <div class="py-8 md:py-12">
    <div class="flex gap-6">
      <AppSidebar />

      <section class="flex-1">
        <h1 class="text-2xl md:text-3xl font-semibold">Cotações por usuário</h1>
        <p class="mt-1 text-sm text-white/70">Visão do importador: agrupado por cliente + cálculo por item (mock).</p>

        <div class="mt-6 ui-panel ui-chamfer ui-edge rounded-2xl p-5">
          <div class="flex items-center justify-between">
            <div class="font-semibold">Fila</div>
            <button class="text-xs text-white/70 hover:text-white transition" @click="refresh">Atualizar</button>
          </div>

          <div v-if="loading" class="mt-4 text-sm text-white/60">Carregando…</div>
          <div v-else class="mt-4 space-y-3">
            <div v-for="q in quotes" :key="q.id" class="ui-panel ui-chamfer ui-edge rounded-2xl p-4">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <div class="font-semibold">Cliente Demo · Cotação #{{ q.id }}</div>
                  <div class="text-xs text-white/60">{{ q.items.length }} itens · Status: {{ q.status }}</div>
                </div>
                <button class="ui-btn ui-btn-primary" @click="ping('No MVP: abrir cálculo item a item e publicar cotação.')">Calcular</button>
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
import type { Quote } from '~/server/utils/types'

const toast = ref<string | null>(null)
const ping = (m: string) => {
  toast.value = m
  setTimeout(() => (toast.value = null), 2200)
}

const loading = ref(true)
const quotes = ref<Quote[]>([])

const refresh = async () => {
  loading.value = true
  try {
    quotes.value = await $fetch('/api/quotes')
  } finally {
    loading.value = false
  }
}

onMounted(refresh)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
