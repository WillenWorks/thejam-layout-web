<template>
  <div class="py-8 md:py-12">
    <div class="flex gap-6">
      <AppSidebar />
      <section class="flex-1">
        <h1 class="text-2xl md:text-3xl font-semibold">Mensageria</h1>
        <p class="mt-1 text-sm text-white/70">Chat/threads por cotação/pedido (mock).</p>

        <div class="mt-6 grid gap-4 lg:grid-cols-3">
          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="font-semibold">Threads</div>
            <div class="mt-4 space-y-2">
              <button
                v-for="t in threads"
                :key="t.id"
                class="w-full text-left ui-panel ui-chamfer ui-edge rounded-2xl p-3 hover:bg-white/5 transition"
                @click="active = t"
              >
                <div class="font-semibold text-sm">{{ t.title }}</div>
                <div class="text-xs text-white/60">{{ t.last }}</div>
              </button>
            </div>
          </div>

          <div class="lg:col-span-2 ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-5">
            <div class="flex items-center justify-between">
              <div class="font-semibold">{{ active?.title ?? 'Selecione uma thread' }}</div>
              <span class="text-xs text-white/60">No MVP: anexos, mentions, status</span>
            </div>

            <div v-if="active" class="mt-4 space-y-3">
              <div v-for="m in active.messages" :key="m.id" class="ui-panel ui-chamfer ui-edge rounded-2xl p-3">
                <div class="text-xs text-white/60">{{ m.from }} · {{ m.at }}</div>
                <div class="mt-1 text-sm">{{ m.text }}</div>
              </div>

              <div class="mt-4 flex gap-2">
                <input
                  v-model="draft"
                  class="flex-1 rounded-xl bg-black/30 border border-white/10 px-3 py-2"
                  placeholder="Escreva uma mensagem…"
                />
                <button class="ui-btn ui-btn-primary" @click="send">Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const draft = ref('')
const threads = ref([
  {
    id: 't1',
    title: 'Cotação #Q-101 · Willen (demo)',
    last: '“Consigo trocar 1 item por outra edição?”',
    messages: [
      { id: 'm1', from: 'Willen', at: '10:12', text: 'Consigo trocar 1 item por outra edição?' },
      { id: 'm2', from: 'Importador', at: '10:20', text: 'Sim, manda a edição/código que ajusto o item.' },
    ],
  },
  {
    id: 't2',
    title: 'Pedido #O-44 · Status',
    last: '“Chegou no Brasil, atualizo em breve.”',
    messages: [{ id: 'm1', from: 'Importador', at: 'Ontem', text: 'Chegou no Brasil, atualizo em breve.' }],
  },
])

const active = ref<any>(threads.value[0])

const send = () => {
  if (!active.value) return
  const text = draft.value.trim()
  if (!text) return
  active.value.messages.push({ id: String(Date.now()), from: 'Importador', at: 'agora', text })
  draft.value = ''
}
</script>
