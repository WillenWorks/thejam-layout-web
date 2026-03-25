<template>
  <div class="py-8 md:py-12">
    <div class="flex gap-6">
      <AppSidebar />

      <section class="flex-1">
        <div class="flex items-start justify-between gap-4">
          <div>
            <NuxtLink to="/orders" class="text-sm text-white/70 hover:text-white transition">← Voltar</NuxtLink>
            <h1 class="mt-2 text-2xl md:text-3xl font-semibold">Pedido #{{ id }}</h1>
            <p class="mt-1 text-sm text-white/70">Mock API: /api/orders/{{ id }}</p>
          </div>

          <button
            class="rounded-2xl bg-white/10 hover:bg-white/15 transition px-4 py-2 font-semibold"
            :disabled="busy"
            @click="nextStatus"
          >
            Avançar status
          </button>
        </div>

        <div v-if="loading" class="mt-6 text-sm text-white/60">Carregando…</div>
        <div v-else-if="error" class="mt-6 text-sm text-red-300">{{ error }}</div>

        <div v-else-if="order" class="mt-6 grid gap-4 lg:grid-cols-3">
          <div class="lg:col-span-2 ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-center justify-between">
              <div class="font-semibold">Timeline</div>
              <div class="text-xs text-white/60">{{ statusLabel(order.status) }}</div>
            </div>

            <div class="mt-4 space-y-3">
              <div v-for="s in steps" :key="s.key" class="flex gap-3">
                <div
                  class="mt-1 h-3 w-3 rounded-full"
                  :class="s.done ? 'bg-[color:var(--a2)] shadow-[0_0_18px_var(--glow)]' : 'bg-white/15'"
                />
                <div class="flex-1">
                  <div class="text-sm font-semibold" :class="s.active ? 'text-white' : 'text-white/80'">{{ s.label }}</div>
                  <div class="text-xs text-white/60">{{ s.hint }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="font-semibold">Tracking</div>
            <div class="mt-3 text-sm text-white/70">
              Código: <span class="text-white">{{ order.trackingCode ?? '—' }}</span>
            </div>

            <div class="mt-4 space-y-2 text-sm text-white/70">
              <div v-for="ev in order.trackingEvents" :key="ev.id" class="ui-panel rounded-xl px-3 py-2">
                <div class="text-sm">{{ ev.label }}</div>
                <div class="text-[11px] text-white/50">{{ fmtDate(ev.at) }}</div>
              </div>
              <div v-if="order.trackingEvents.length === 0" class="text-sm text-white/60">Sem eventos ainda.</div>
            </div>

            <div class="mt-4 flex gap-2">
              <input
                v-model="newEvent"
                class="flex-1 rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm"
                placeholder="Ex: Chegou ao BR"
              />
              <button
                class="rounded-xl bg-[color:var(--a1)]/70 hover:bg-[color:var(--a1)] transition px-3 py-2 text-sm font-semibold"
                :disabled="busy || !newEvent.trim()"
                @click="addEvent"
              >
                +
              </button>
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
import type { Order, OrderStatus } from '~/server/utils/types'

const route = useRoute()
const id = computed(() => String(route.params.id))

const { getById, advanceStatus, addTracking } = useOrders()
const { showBrief } = useLoadingOverlay()

const order = ref<Order | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const busy = ref(false)

const toast = ref<string | null>(null)
const ping = (m: string) => {
  toast.value = m
  setTimeout(() => (toast.value = null), 2200)
}

const load = async () => {
  loading.value = true
  error.value = null
  try {
    order.value = await getById(id.value)
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao carregar'
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(id, load)

const ORDER_FLOW: { key: OrderStatus; label: string; hint: string }[] = [
  { key: 'requested', label: 'Solicitado', hint: 'Lista enviada para triagem' },
  { key: 'quoted', label: 'Cotado', hint: 'Valores finalizados' },
  { key: 'paid_confirmed', label: 'Pago confirmado', hint: 'Comprovante validado' },
  { key: 'in_import', label: 'Em import', hint: 'Compra/viagem em andamento' },
  { key: 'sorting', label: 'Separação', hint: 'Conferência e separação' },
  { key: 'shipped', label: 'Enviado', hint: 'Remessa com tracking' },
  { key: 'delivered', label: 'Entregue', hint: 'Finalizado' },
]

const steps = computed(() => {
  const current = order.value?.status
  const idx = current ? ORDER_FLOW.findIndex((s) => s.key === current) : 0
  return ORDER_FLOW.map((s, i) => ({
    ...s,
    done: i < idx,
    active: i === idx,
  }))
})

const statusLabel = (s: string) => {
  const def = ORDER_FLOW.find((x) => x.key === s)
  return def?.label ?? s
}

const fmtDate = (iso: string) => new Date(iso).toLocaleString('pt-BR')

const nextStatus = async () => {
  showBrief(700)
  if (!order.value) return
  busy.value = true
  try {
    order.value = await advanceStatus(order.value.id)
    ping('Status avançado')
  } catch (e: any) {
    ping(e?.message ?? 'Erro')
  } finally {
    busy.value = false
  }
}

const newEvent = ref('Chegou ao BR')
const addEvent = async () => {
  showBrief(700)
  if (!order.value) return
  busy.value = true
  try {
    await addTracking(order.value.id, newEvent.value)
    newEvent.value = ''
    await load()
    ping('Evento adicionado')
  } catch (e: any) {
    ping(e?.message ?? 'Erro')
  } finally {
    busy.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
