<template>
  <div class="py-8 md:py-12">
    <div class="flex gap-6">
      <AppSidebar />
      <section class="flex-1">
        <h1 class="text-2xl md:text-3xl font-semibold">Financeiro (importador)</h1>
        <p class="mt-1 text-sm text-white/70">Repasse por cliente, custos por season e margem (mock).</p>

        <div class="mt-6 grid gap-4 lg:grid-cols-3">
          <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-5">
            <div class="text-xs text-white/60">Recebido (mês)</div>
            <div class="mt-1 text-2xl font-semibold">R$ 8.420,00</div>
          </div>
          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="text-xs text-white/60">Custos (mês)</div>
            <div class="mt-1 text-2xl font-semibold">R$ 6.910,00</div>
          </div>
          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="text-xs text-white/60">Margem estimada</div>
            <div class="mt-1 text-2xl font-semibold">R$ 1.510,00</div>
          </div>
        </div>

        <div class="mt-6 ui-panel ui-chamfer ui-edge rounded-2xl p-5">
          <div class="font-semibold">Ações</div>
          <div class="mt-3 flex flex-wrap gap-2">
            <button class="ui-btn ui-btn-primary" @click="ping('No MVP: gerar cobranças por cliente.')">Gerar cobranças</button>
            <button class="ui-btn ui-btn-ghost" @click="ping('No MVP: exportar extrato e conciliar.')">Exportar extrato</button>
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
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
