<template>
  <section class="py-10 md:py-16 max-w-md mx-auto">
    <h1 class="text-2xl font-semibold">Entrar (protótipo)</h1>
    <p class="mt-2 text-sm text-white/70">
      Sem backend por enquanto: escolha um perfil para simular os fluxos.
    </p>

    <div class="mt-6 grid gap-3">
      <button
        class="ui-panel ui-glow rounded-2xl p-4 text-left hover:bg-white/10 transition"
        @click="go('customer')"
      >
        <div class="font-semibold">Cliente</div>
        <div class="text-xs text-white/60">Solicita cotação, aceita, paga e acompanha.</div>
      </button>

      <button
        class="ui-panel ui-glow rounded-2xl p-4 text-left hover:bg-white/10 transition"
        @click="go('admin')"
      >
        <div class="font-semibold">Admin do grupo</div>
        <div class="text-xs text-white/60">Triagem, cotação, import batches e tracking.</div>
      </button>

      <button
        class="ui-panel ui-glow rounded-2xl p-4 text-left hover:bg-white/10 transition"
        @click="go('superadmin')"
      >
        <div class="font-semibold">Superadmin</div>
        <div class="text-xs text-white/60">Config global e gestão de permissões (demo).</div>
      </button>

      <NuxtLink
        to="/register"
        class="mt-2 text-sm text-white/70 hover:text-white transition underline underline-offset-4"
      >
        Criar conta (fake)
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { UserRole } from '~/types/domain'

const router = useRouter()
const { loginAs } = useAuth()

const go = (role: UserRole) => {
  loginAs(role)
  router.push('/dashboard')
}
</script>
