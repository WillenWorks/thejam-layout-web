<template>
  <div class="py-6 md:py-10">
    <div class="flex gap-6">
      <AppSidebar />

      <section class="flex-1">
        <div class="flex items-end justify-between gap-4">
          <div>
            <p class="text-xs tracking-[0.22em] uppercase text-[color:var(--text-muted)]">Admin</p>
            <h1 class="mt-2 text-2xl md:text-3xl font-semibold">Import Batches</h1>
            <p class="mt-1 text-sm text-[color:var(--text-muted)]">Mock API: /api/admin/imports</p>
          </div>
          <button class="rounded-2xl bg-white/10 hover:bg-white/15 transition px-4 py-2" @click="load">Atualizar</button>
        </div>

        <div class="mt-6 grid gap-4">
          <div v-if="loading" class="text-sm text-[color:var(--text-muted)]">Carregando…</div>
          <div v-else-if="error" class="text-sm text-red-500">{{ error }}</div>

          <div v-for="imp in imports" :key="imp.id" class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-5">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-semibold">#{{ imp.id }} · {{ imp.name }}</div>
                <div class="text-xs text-[color:var(--text-muted)]">Criado em {{ fmtDate(imp.createdAt) }}</div>
              </div>
              <span class="text-xs rounded-full px-3 py-1 bg-white/10 border border-white/10">{{ statusLabel(imp.status) }}</span>
            </div>

            <div v-if="imp.note" class="mt-3 text-sm text-[color:var(--text-muted)]">{{ imp.note }}</div>

            <div class="mt-4 flex gap-2">
              <button
                class="rounded-xl bg-[color:var(--a1)]/35 hover:bg-[color:var(--a1)]/55 transition px-3 py-2 text-sm font-semibold"
                @click="advance(imp.id)"
              >
                Avançar status
              </button>
            </div>
          </div>

          <div v-if="!loading && imports.length === 0" class="ui-panel ui-chamfer ui-edge rounded-2xl p-5 text-sm text-[color:var(--text-muted)]">
            Nenhum import batch.
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
import type { ImportBatch } from '~/server/utils/types'
import { apiGet, apiPost } from '~/services/api'

const imports = ref<ImportBatch[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const toast = ref<string | null>(null)
const ping = (m: string) => {
  toast.value = m
  setTimeout(() => (toast.value = null), 2200)
}

const load = async () => {
  loading.value = true
  error.value = null
  try {
    imports.value = await apiGet<ImportBatch[]>('/api/admin/imports')
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao carregar'
  } finally {
    loading.value = false
  }
}

onMounted(load)

const advance = async (id: string) => {
  try {
    await apiPost(`/api/admin/imports/${id}/advance-status`)
    ping('Status avançado (mock)')
    await load()
  } catch (e: any) {
    ping(e?.message ?? 'Erro')
  }
}

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('pt-BR')

const statusLabel = (s: string) => {
  switch (s) {
    case 'open':
      return 'Aberto'
    case 'in_transit':
      return 'Em trânsito'
    case 'arrived':
      return 'Chegou'
    case 'sorting':
      return 'Em separação'
    case 'shipped':
      return 'Enviado'
    case 'closed':
      return 'Fechado'
    default:
      return s
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
