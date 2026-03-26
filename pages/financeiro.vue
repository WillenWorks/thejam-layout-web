<template>
  <div class="py-6 md:py-10">
    <div class="flex gap-6">
      <AppSidebar />

      <section class="flex-1">
        <h1 class="text-2xl md:text-3xl font-semibold">Financeiro</h1>
        <p class="mt-1 text-sm text-white/70">Resumo e lançamentos (mock).</p>

        <div class="mt-6 grid gap-4 md:grid-cols-3">
          <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-5">
            <div class="text-xs text-white/60">Saldo</div>
            <div class="mt-1 text-2xl font-semibold">R$ 120,00</div>
            <div class="mt-2 text-xs text-white/60">Crédito do grupo + ajustes</div>
          </div>
          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="text-xs text-white/60">Em aberto</div>
            <div class="mt-1 text-2xl font-semibold">R$ 340,50</div>
            <div class="mt-2 text-xs text-white/60">Cotações aceitas aguardando pagamento</div>
          </div>
          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="text-xs text-white/60">Último pagamento</div>
            <div class="mt-1 text-2xl font-semibold">R$ 199,90</div>
            <div class="mt-2 text-xs text-white/60">PIX · 22/03</div>
          </div>
        </div>

        <div class="mt-6 ui-panel ui-chamfer ui-edge rounded-2xl p-5">
          <div class="flex items-center justify-between">
            <div class="font-semibold">Lançamentos</div>
            <button class="text-xs text-white/70 hover:text-white transition" @click="ping('No MVP: filtros, export e conciliação.')">
              Ver filtros
            </button>
          </div>

          <div class="mt-4 overflow-auto">
            <table class="w-full text-sm">
              <thead class="text-white/60">
                <tr>
                  <th class="text-left py-2">Data</th>
                  <th class="text-left py-2">Descrição</th>
                  <th class="text-right py-2">Valor</th>
                  <th class="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/10">
                <tr v-for="t in tx" :key="t.id">
                  <td class="py-3">{{ t.date }}</td>
                  <td class="py-3">{{ t.label }}</td>
                  <td class="py-3 text-right" :class="t.amount < 0 ? 'text-red-200' : 'text-emerald-200'">
                    {{ fmt(t.amount) }}
                  </td>
                  <td class="py-3"><span class="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">{{ t.status }}</span></td>
                </tr>
              </tbody>
            </table>
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

const tx = ref([
  { id: 't1', date: '22/03', label: 'Pagamento de cotação #Q-102', amount: -199.9, status: 'Confirmado' },
  { id: 't2', date: '21/03', label: 'Crédito inicial (grupo)', amount: 300, status: 'Lançado' },
  { id: 't3', date: '20/03', label: 'Ajuste (taxa bancária)', amount: -9.6, status: 'Lançado' },
])

const fmt = (n: number) =>
  (n < 0 ? '-' : '') +
  'R$ ' +
  Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
