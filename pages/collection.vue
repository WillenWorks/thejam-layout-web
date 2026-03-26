<template>
  <div class="py-6 md:py-10">
    <div class="flex gap-6">
      <AppSidebar />

      <section class="flex-1">
        <h1 class="text-2xl md:text-3xl font-semibold">Coleção</h1>
        <p class="mt-1 text-sm text-white/70">Favoritos e cartas salvas para próximas listas (mock).</p>

        <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="c in cards" :key="c.id" class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl overflow-hidden">
            <img :src="c.img" class="w-full h-[180px] object-cover" alt="" />
            <div class="p-4">
              <div class="font-semibold">{{ c.name }}</div>
              <div class="text-xs text-white/60">{{ c.game }}</div>
              <button class="mt-3 rounded-xl bg-white/10 hover:bg-white/15 transition px-3 py-2 text-sm" @click="addToList(c)">
                Adicionar na lista
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
const toast = ref<string | null>(null)
const ping = (m: string) => {
  toast.value = m
  setTimeout(() => (toast.value = null), 2000)
}

const cards = ref([
  { id: 'c1', name: 'Insect Knight', game: 'YGO (demo)', img: '/cards/insect-knight.jpg' },
  { id: 'c2', name: 'Arcane Dragon', game: 'YGO (demo)', img: '/cards/arcane-dragon.jpg' },
  { id: 'c3', name: 'Amber Mage', game: 'Magic (demo)', img: '/cards/arcane-dragon.jpg' },
])

const addToList = (c: any) => ping(`Adicionado na lista (mock): ${c.name}`)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
