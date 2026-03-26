<template>
  <div class="py-6 md:py-10">
    <div class="flex gap-6">
      <AppSidebar />

      <section class="flex-1">
        <div class="flex items-end justify-between gap-4">
          <div>
            <p class="text-xs tracking-[0.22em] uppercase text-[color:var(--text-muted)]">Admin</p>
            <h1 class="mt-2 text-2xl md:text-3xl font-semibold">Inbox / Triagem</h1>
            <p class="mt-1 text-sm text-[color:var(--text-muted)]">Mock API: /api/admin/inbox</p>
          </div>
          <button class="rounded-2xl bg-white/10 hover:bg-white/15 transition px-4 py-2" @click="load">Atualizar</button>
        </div>

        <div class="mt-6 grid gap-4">
          <div v-if="loading" class="text-sm text-[color:var(--text-muted)]">Carregando…</div>
          <div v-else-if="error" class="text-sm text-red-500">{{ error }}</div>

          <div
            v-for="q in inbox"
            :key="q.id"
            class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-5"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="font-semibold">#{{ q.id }}</div>
                <div class="text-xs text-[color:var(--text-muted)]">{{ q.tcg.toUpperCase() }} · {{ q.items.length }} itens · R$ {{ fmt(q.totalBrl) }}</div>
              </div>
              <span class="text-xs rounded-full px-3 py-1 bg-white/10 border border-white/10">{{ statusLabel(q.status) }}</span>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              <button
                class="rounded-xl bg-[color:var(--a1)]/35 hover:bg-[color:var(--a1)]/55 transition px-3 py-2 text-sm font-semibold"
                @click="markQuoted(q.id)"
              >
                Finalizar cotação → Aguardando aceite
              </button>

              <button
                class="rounded-xl bg-white/10 hover:bg-white/15 transition px-3 py-2 text-sm"
                @click="ping('No MVP real: atribuir cotador, editar preço por item, aplicar margem/câmbio.')"
              >
                Abrir detalhe (futuro)
              </button>
            </div>
          </div>

          <div v-if="!loading && inbox.length === 0" class="ui-panel ui-chamfer ui-edge rounded-2xl p-5 text-sm text-[color:var(--text-muted)]">
            Nada na inbox.
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
import { apiGet, apiPost } from '~/services/api'

const inbox = ref<Quote[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const toast = ref<string | null>(null)
const ping = (m: string) => {
  toast.value = m
  setTimeout(() => (toast.value = null), 2200)
}

const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const statusLabel = (s: string) => {
  switch (s) {
    case 'triage':
      return 'Em triagem'
    case 'quoted':
      return 'Cotando'
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

const load = async () => {
  loading.value = true
  error.value = null
  try {
    inbox.value = await apiGet<Quote[]>('/api/admin/inbox')
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao carregar'
  } finally {
    loading.value = false
  }
}

onMounted(load)

const markQuoted = async (id: string) => {
  try {
    await apiPost(`/api/admin/quotes/${id}/mark-quoted`)
    ping('Cotação finalizada (mock)')
    await load()
  } catch (e: any) {
    ping(e?.message ?? 'Erro')
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
