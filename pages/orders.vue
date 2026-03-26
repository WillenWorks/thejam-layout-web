<template>
  <div class="py-8 md:py-12">
    <div class="flex gap-6">
      <AppSidebar />

      <section class="flex-1">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-semibold">Pedidos</h1>
            <p class="mt-1 text-sm text-white/70">Mock API: /api/orders</p>
          </div>
          <button class="text-sm rounded-2xl bg-white/10 hover:bg-white/15 transition px-4 py-2" @click="refresh">
            Atualizar
          </button>
        </div>

        <div class="mt-6 grid gap-4">
          <div v-if="loading" class="text-sm text-white/60">Carregando…</div>
          <div v-else-if="error" class="text-sm text-red-300">{{ error }}</div>

          <NuxtLink
            v-for="o in orders"
            :key="o.id"
            :to="`/orders/${o.id}`"
            class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-5 hover:bg-white/10 transition"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="font-semibold">#{{ o.id }}</div>
                <div class="text-xs text-white/60">{{ o.tcg.toUpperCase() }} · R$ {{ fmt(o.totalBrl) }}</div>
              </div>
              <span class="text-xs rounded-full px-3 py-1 bg-white/10 border border-white/10">{{ statusLabel(o.status) }}</span>
            </div>
            <div class="mt-3 text-sm text-white/70">
              Tracking: <span class="text-white">{{ o.trackingCode ?? '—' }}</span>
            </div>
          </NuxtLink>

          <div v-if="!loading && orders.length === 0" class="ui-panel ui-chamfer ui-edge rounded-2xl p-5 text-sm text-white/70">
            Nenhum pedido ainda. Aceite uma cotação para gerar um pedido.
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { orders, loading, error, refresh } = useOrders()

onMounted(() => {
  refresh()
})

const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const statusLabel = (s: string) => {
  switch (s) {
    case 'requested':
      return 'Solicitado'
    case 'quoted':
      return 'Cotado'
    case 'paid_confirmed':
      return 'Pago confirmado'
    case 'in_import':
      return 'Em import'
    case 'sorting':
      return 'Separação'
    case 'shipped':
      return 'Enviado'
    case 'delivered':
      return 'Entregue'
    default:
      return s
  }
}
</script>
