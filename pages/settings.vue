<template>
  <div class="py-6 md:py-10">
    <div class="flex gap-6">
      <AppSidebar />

      <section class="flex-1">
        <h1 class="text-2xl md:text-3xl font-semibold">Configurações</h1>
        <p class="mt-1 text-sm text-white/70">Preferências do usuário e modo demo.</p>

        <div class="mt-6 grid gap-4 lg:grid-cols-2">
          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="font-semibold">Sessão</div>
            <div class="mt-3 text-sm text-white/70">
              Usuário: <span class="text-white">{{ user?.name }}</span>
              <span class="text-white/40">·</span>
              Perfil: <span class="text-white">{{ user?.role }}</span>
            </div>

            <div class="mt-4">
              <div class="text-xs text-white/60">Trocar perfil (mock)</div>
              <div class="mt-2 flex flex-wrap gap-2">
                <button class="rounded-xl bg-white/10 hover:bg-white/15 transition px-3 py-2 text-sm" @click="setRole('customer')">Cliente</button>
                <button class="rounded-xl bg-white/10 hover:bg-white/15 transition px-3 py-2 text-sm" @click="setRole('admin')">Admin</button>
                <button class="rounded-xl bg-white/10 hover:bg-white/15 transition px-3 py-2 text-sm" @click="setRole('superadmin')">Superadmin</button>
              </div>
            </div>
          </div>

          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="font-semibold">Ideias visuais (próximos passos)</div>
            <ul class="mt-3 space-y-2 text-sm text-white/70 list-disc list-inside">
              <li>Gerar 6–12 ícones custom (SVG) com bordas chanfradas e glow leve.</li>
              <li>Criar 2 backgrounds base (um por tema) + overlay controlado via CSS.</li>
              <li>Criar “loading screen” com cards flutuando (CSS) e partículas.</li>
              <li>Adicionar modo claro/escuro mantendo o TCG como “tint” principal.</li>
            </ul>
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
import type { UserRole } from '~/types/domain'

const { user, loginAs } = useAuth()
const toast = ref<string | null>(null)

const ping = (m: string) => {
  toast.value = m
  setTimeout(() => (toast.value = null), 2000)
}

const setRole = (role: UserRole) => {
  loginAs(role)
  ping(`Perfil alterado (mock): ${role}`)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
