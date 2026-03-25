<template>
  <section class="py-10 md:py-16 max-w-md mx-auto">
    <h1 class="text-2xl font-semibold">Criar conta (protótipo)</h1>
    <p class="mt-2 text-sm text-white/70">
      Aqui é só para UX: ao concluir, você entra como Cliente.
    </p>

    <form class="mt-6 ui-panel rounded-2xl p-5 space-y-3" @submit.prevent="submit">
      <label class="block text-sm">
        <span class="text-white/70">Nome</span>
        <input v-model="name" class="mt-1 w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2" />
      </label>
      <label class="block text-sm">
        <span class="text-white/70">Email</span>
        <input v-model="email" type="email" class="mt-1 w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2" />
      </label>

      <button class="w-full rounded-2xl bg-[color:var(--a1)]/80 hover:bg-[color:var(--a1)] transition px-4 py-3 font-semibold">
        Criar e entrar
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
const router = useRouter()
const { loginAs } = useAuth()

const name = ref('Willen')
const email = ref('willen@demo.local')

const submit = () => {
  // keep it simple for prototype
  loginAs('customer')
  router.push('/dashboard')
}
</script>
