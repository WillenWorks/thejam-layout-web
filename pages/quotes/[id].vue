<template>
  <div class="py-8 md:py-12">
    <div class="flex gap-6">
      <AppSidebar />

      <section class="flex-1">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-semibold">Cotação #{{ id }}</h1>
            <p class="mt-1 text-sm text-white/70">Aceite por item (mock local neste protótipo).</p>
          </div>
          <NuxtLink to="/quotes" class="ui-btn ui-btn-ghost">Voltar</NuxtLink>
        </div>

        <div v-if="loading" class="mt-6 text-sm text-white/60">Carregando…</div>
        <div v-else-if="!quote" class="mt-6 text-sm text-red-200">Cotação não encontrada.</div>

        <div v-else class="mt-6 grid gap-4 lg:grid-cols-3">
          <div class="lg:col-span-2 ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-center justify-between">
              <div class="font-semibold">Itens</div>
              <span class="text-xs rounded-full px-3 py-1 bg-white/10 border border-white/10">{{ statusLabel(quote.status) }}</span>
            </div>

            <div class="mt-4 space-y-3">
              <div v-for="it in quote.items" :key="it.id" class="ui-panel ui-chamfer ui-edge rounded-2xl p-4">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <div class="font-semibold">{{ it.qty }}x {{ it.name }}</div>
                    <div class="text-xs text-white/60">Preço (demo): R$ {{ fmt(priceMap[it.id] ?? 0) }}</div>
                  </div>

                  <div class="flex items-center gap-2">
                    <button
                      class="ui-btn ui-btn-ghost"
                      :class="itemDecision[it.id] === 'reject' ? 'ring-1 ring-red-300/60' : ''"
                      @click="setDecision(it.id, 'reject')"
                    >
                      Recusar
                    </button>
                    <button
                      class="ui-btn ui-btn-primary"
                      :class="itemDecision[it.id] === 'accept' ? 'ring-1 ring-emerald-200/60' : ''"
                      @click="setDecision(it.id, 'accept')"
                    >
                      Aceitar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-5">
            <div class="font-semibold">Resumo</div>
            <div class="mt-3 text-sm text-white/70">
              <div class="flex justify-between"><span>Aceitos</span><span class="text-white">{{ acceptedCount }}</span></div>
              <div class="flex justify-between mt-1"><span>Recusados</span><span class="text-white">{{ rejectedCount }}</span></div>
              <div class="flex justify-between mt-1"><span>Pendentes</span><span class="text-white">{{ pendingCount }}</span></div>
              <div class="mt-3 pt-3 border-t border-white/10 flex justify-between font-semibold">
                <span>Total (aceitos)</span>
                <span>R$ {{ fmt(totalAccepted) }}</span>
              </div>
            </div>

            <button class="mt-4 w-full ui-btn ui-btn-primary" @click="ping('No MVP: envia aceite por item + segue pro financeiro.')">
              Confirmar aceite
            </button>
            <button class="mt-2 w-full ui-btn ui-btn-ghost" @click="ping('No MVP: salvar rascunho / negociar itens.')">
              Salvar rascunho
            </button>
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

const route = useRoute()
const id = computed(() => String(route.params.id || ''))

const toast = ref<string | null>(null)
const ping = (m: string) => {
  toast.value = m
  setTimeout(() => (toast.value = null), 2200)
}

const loading = ref(true)
const quote = ref<Quote | null>(null)

const itemDecision = reactive<Record<string, 'accept' | 'reject' | 'pending'>>({})

// preços fake por item
const priceMap = reactive<Record<string, number>>({})

const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const statusLabel = (s: string) => {
  switch (s) {
    case 'triage':
      return 'Em triagem'
    case 'quoted':
      return 'Cotada'
    case 'awaiting_accept':
      return 'Aguardando aceite'
    case 'accepted':
      return 'Aceita'
    case 'rejected':
      return 'Recusada'
    default:
      return s
  }
}

const setDecision = (itemId: string, d: 'accept' | 'reject') => {
  itemDecision[itemId] = itemDecision[itemId] === d ? 'pending' : d
}

const acceptedCount = computed(() => Object.values(itemDecision).filter((v) => v === 'accept').length)
const rejectedCount = computed(() => Object.values(itemDecision).filter((v) => v === 'reject').length)
const pendingCount = computed(() => Object.values(itemDecision).filter((v) => v !== 'accept' && v !== 'reject').length)

const totalAccepted = computed(() => {
  if (!quote.value) return 0
  return quote.value.items.reduce((acc, it) => {
    if (itemDecision[it.id] !== 'accept') return acc
    return acc + (priceMap[it.id] ?? 0)
  }, 0)
})

onMounted(async () => {
  try {
    const list = await $fetch<Quote[]>('/api/quotes')
    const q = list.find((x) => x.id === id.value) ?? null
    quote.value = q

    if (q) {
      for (const it of q.items) {
        itemDecision[it.id] = 'pending'
        // preço demo: qty * (22..55)
        priceMap[it.id] = Math.round((it.qty * (22 + Math.random() * 33)) * 100) / 100
      }
    }
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
