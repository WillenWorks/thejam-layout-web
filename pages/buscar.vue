<template>
  <div class="py-6 md:py-10">
    <div class="flex gap-6">
      <AppSidebar />

      <section class="flex-1">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-semibold">Procurar carta (YGO)</h1>
            <p class="mt-1 text-sm text-white/70">Busca simulada (no MVP vamos plugar numa API de cartas YGO).</p>
          </div>
        </div>

        <div class="mt-6 ui-panel ui-chamfer ui-edge rounded-2xl p-5">
          <label class="block text-sm">
            <span class="text-white/70">Nome da carta</span>
            <input
              v-model="q"
              class="mt-1 w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2"
              placeholder="Ex: Blue-Eyes, Dark Magician, Insect Knight"
            />
          </label>

          <div class="mt-4 flex gap-2">
            <button class="ui-btn ui-btn-primary" @click="onSearch">Buscar</button>
            <button class="ui-btn ui-btn-ghost" @click="q = ''">Limpar</button>
          </div>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="c in results" :key="c.id" class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl overflow-hidden">
            <img :src="c.img" class="w-full h-[180px] object-cover" alt="" />
            <div class="p-4">
              <div class="font-semibold">{{ c.name }}</div>
              <div class="text-xs text-white/60">{{ c.rarity }} · {{ c.set }}</div>
              <div class="mt-3 flex gap-2">
                <button class="ui-btn ui-btn-ghost" @click="ping('Adicionado em Favoritos (mock): ' + c.name)">Favoritar</button>
                <button class="ui-btn ui-btn-primary" @click="ping('Adicionado na Pasta (mock): ' + c.name)">Pasta</button>
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
const q = ref('')
const toast = ref<string | null>(null)
const ping = (m: string) => {
  toast.value = m
  setTimeout(() => (toast.value = null), 2000)
}

const all = [
  { id: 'y1', name: 'Insect Knight', rarity: 'Common', set: 'Demo', img: '/cards/insect-knight.jpg' },
  { id: 'y2', name: 'Arcane Dragon', rarity: 'Ultra', set: 'Demo', img: '/cards/arcane-dragon.jpg' },
  { id: 'y3', name: 'Millennium Sentinel', rarity: 'Rare', set: 'Demo', img: '/cards/arcane-dragon.jpg' },
]

const results = ref(all)

const onSearch = () => {
  const needle = q.value.trim().toLowerCase()
  if (!needle) {
    results.value = all
    return
  }
  results.value = all.filter((c) => c.name.toLowerCase().includes(needle))
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
