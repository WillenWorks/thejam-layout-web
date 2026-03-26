<template>
  <div class="py-8 md:py-12">
    <div class="flex gap-6">
      <AppSidebar />

      <section class="flex-1">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-semibold">Cotações</h1>
            <p class="mt-1 text-sm text-white/70">Mock API: /api/quotes</p>
          </div>
          <button
            class="rounded-2xl bg-[color:var(--a1)]/80 hover:bg-[color:var(--a1)] transition px-4 py-2 font-semibold"
            @click="scrollToCreate"
          >
            Nova solicitação
          </button>
        </div>

        <div class="mt-6 grid gap-4 lg:grid-cols-2">
          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-center justify-between">
              <div class="font-semibold">Solicitações</div>
              <button class="text-xs text-white/70 hover:text-white transition" @click="refresh">Atualizar</button>
            </div>

            <div v-if="loading" class="mt-4 text-sm text-white/60">Carregando…</div>
            <div v-else-if="error" class="mt-4 text-sm text-red-300">{{ error }}</div>

            <div v-else class="mt-4 space-y-3">
              <div v-for="q in quotes" :key="q.id" class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-semibold">#{{ q.id }}</div>
                    <div class="text-xs text-white/60">{{ q.tcg.toUpperCase() }} · {{ q.items.length }} itens · R$ {{ fmt(q.totalBrl) }}</div>
                  </div>
                  <span class="text-xs rounded-full px-3 py-1 bg-white/10 border border-white/10">
                    {{ statusLabel(q.status) }}
                  </span>
                </div>

                <div class="mt-3 flex flex-wrap gap-2">
                  <NuxtLink
                    :to="`/quotes/${q.id}`"
                    class="rounded-xl bg-white/10 hover:bg-white/15 transition px-3 py-2 text-sm"
                  >
                    Detalhes
                  </NuxtLink>

                  <button
                    v-if="q.status === 'awaiting_accept'"
                    class="rounded-xl bg-[color:var(--a1)]/70 hover:bg-[color:var(--a1)] transition px-3 py-2 text-sm font-semibold"
                    @click="router.push(`/quotes/${q.id}`)"
                  >
                    Aceitar itens
                  </button>

                  <button
                    v-if="q.status === 'triage'"
                    class="rounded-xl bg-white/5 hover:bg-white/10 transition px-3 py-2 text-sm"
                    @click="ping('No fluxo real: admin atribui e cota itens.')"
                  >
                    Em triagem
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div ref="createRef" class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="font-semibold">Criar solicitação</div>
            <p class="mt-2 text-sm text-white/70">Mock API: POST /api/quotes</p>

            <div class="mt-4 space-y-3">
              <label class="block text-sm">
                <span class="text-white/70">TCG</span>
                <select v-model="tcg" class="mt-1 w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2">
                  <option value="ygo">YGO</option>
                  <option value="magic">Magic</option>
                  <option value="digimon">Digimon</option>
                  <option value="gundam">Gundam</option>
                </select>
              </label>

              <label class="block text-sm">
                <span class="text-white/70">Lista (colar texto)</span>
                <textarea
                  v-model="listText"
                  rows="7"
                  class="mt-1 w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2"
                  placeholder="Ex: 3x Insect Knight\n1x Arcane Dragon"
                />
              </label>

              <button
                class="w-full rounded-2xl bg-[color:var(--a1)]/80 hover:bg-[color:var(--a1)] transition px-4 py-3 font-semibold"
                :disabled="creating"
                @click="onCreate"
              >
                {{ creating ? 'Criando…' : 'Criar solicitação' }}
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
import type { TcgId } from '~/server/utils/types'

const router = useRouter()
const { apply } = useTheme()
const { showBrief } = useLoadingOverlay()

const { quotes, loading, error, refresh, create, accept, reject } = useQuotes()

const tcg = ref<TcgId>('ygo')
const listText = ref('3x Insect Knight\n1x Arcane Dragon')
const creating = ref(false)

watch(tcg, (v) => apply(v))

onMounted(() => {
  refresh()
})

const toast = ref<string | null>(null)
const ping = (msg: string) => {
  toast.value = msg
  setTimeout(() => (toast.value = null), 2200)
}

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

const createRef = ref<HTMLElement | null>(null)
const scrollToCreate = () => createRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const onCreate = async () => {
  showBrief(800)
  creating.value = true
  try {
    const q = await create(tcg.value, listText.value)
    ping(`Solicitação criada: ${q.id} (status: triagem)`)
  } catch (e: any) {
    ping(e?.message ?? 'Erro ao criar')
  } finally {
    creating.value = false
  }
}

const onAccept = async (id: string) => {
  showBrief(900)
  try {
    const res = await accept(id)
    ping(`Aceite enviado. Pedido gerado: ${res.order?.id ?? '—'}`)
    if (res.order?.id) router.push(`/orders/${res.order.id}`)
  } catch (e: any) {
    ping(e?.message ?? 'Erro ao aceitar')
  }
}

const onReject = async (id: string) => {
  try {
    await reject(id)
    ping('Recusa enviada')
  } catch (e: any) {
    ping(e?.message ?? 'Erro ao recusar')
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
