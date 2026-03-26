<template>
  <div class="py-8 md:py-12">
    <div class="flex gap-6">
      <AppSidebar />
      <section class="flex-1">
        <h1 class="text-2xl md:text-3xl font-semibold">Compras</h1>
        <p class="mt-1 text-sm text-white/70">Visão do importador: pedidos em lojas/fornecedores (mock).</p>

        <div class="mt-6 ui-panel ui-chamfer ui-edge rounded-2xl p-5">
          <div class="font-semibold">Lista</div>
          <div class="mt-4 grid gap-3">
            <div v-for="p in purchases" :key="p.id" class="ui-panel ui-chamfer ui-edge rounded-2xl p-4">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-semibold">{{ p.store }} · #{{ p.id }}</div>
                  <div class="text-xs text-white/60">{{ p.items }} itens · {{ p.status }}</div>
                </div>
                <button class="ui-btn ui-btn-ghost" @click="ping('No MVP: anexar comprovante, tracking e custos.')">Abrir</button>
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

const purchases = ref([
  { id: 'P-01', store: 'TCGPlayer (demo)', items: 12, status: 'Em compra' },
  { id: 'P-02', store: 'Cardmarket (demo)', items: 7, status: 'Aguardando envio' },
])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
