<template>
  <section class="py-10 md:py-16">
    <!-- HERO -->
    <div class="grid gap-10 md:grid-cols-12 items-start">
      <!-- Left / copy -->
      <div class="md:col-span-7">
        <p class="text-xs tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
          Plataforma de importação TCG
        </p>

        <h1 class="mt-4 text-4xl md:text-6xl font-bold leading-tight">
          Importe cartas com
          <span class="text-[color:var(--a2)]">controle total</span>
        </h1>

        <p class="mt-4 max-w-2xl text-[color:var(--text-muted)]">
          Do “quero essas cartas” até “chegou no meu deck”: cotação por item, aceite, compras, importação e rastreio — tudo no mesmo fluxo.
        </p>

        <div class="mt-8 flex flex-col sm:flex-row gap-3">
          <NuxtLink
            to="/login"
            class="ui-cta ui-chamfer ui-edge ui-glow rounded-2xl px-6 py-3 font-semibold inline-flex items-center justify-center gap-2"
          >
            Começar agora
          </NuxtLink>
          <NuxtLink
            to="/como-funciona"
            class="ui-btn ui-btn-ghost ui-chamfer ui-edge rounded-2xl px-6 py-3 font-semibold inline-flex items-center justify-center"
          >
            Como funciona
          </NuxtLink>
        </div>

        <!-- Feature blocks (more breathing room) -->
        <div class="mt-12 grid gap-4 sm:grid-cols-2">
          <div class="ui-card ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-start gap-3">
              <span class="w-11 h-11 ui-chip ui-chamfer ui-edge rounded-2xl flex items-center justify-center shrink-0">
                <Icon name="search" :size="22" />
              </span>
              <div>
                <div class="text-sm font-semibold">Procurar carta (YGO)</div>
                <div class="mt-0.5 text-xs text-[color:var(--text-muted)]">
                  Encontre a carta e jogue para sua pasta/favoritos.
                </div>
              </div>
            </div>
          </div>

          <div class="ui-card ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-start gap-3">
              <span class="w-11 h-11 ui-chip ui-chamfer ui-edge rounded-2xl flex items-center justify-center shrink-0">
                <Icon name="collection" :size="22" />
              </span>
              <div>
                <div class="text-sm font-semibold">Favoritos / Pasta</div>
                <div class="mt-0.5 text-xs text-[color:var(--text-muted)]">
                  Organize listas por objetivo: deck, coleção, trade, etc.
                </div>
              </div>
            </div>
          </div>

          <div class="ui-card ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-start gap-3">
              <span class="w-11 h-11 ui-chip ui-chamfer ui-edge rounded-2xl flex items-center justify-center shrink-0">
                <Icon name="quotes" :size="22" />
              </span>
              <div>
                <div class="text-sm font-semibold">Cotações com aceite por item</div>
                <div class="mt-0.5 text-xs text-[color:var(--text-muted)]">
                  Você aprova o que faz sentido e o importador compra o restante.
                </div>
              </div>
            </div>
          </div>

          <div class="ui-card ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-start gap-3">
              <span class="w-11 h-11 ui-chip ui-chamfer ui-edge rounded-2xl flex items-center justify-center shrink-0">
                <Icon name="orders" :size="22" />
              </span>
              <div>
                <div class="text-sm font-semibold">Rastreio + financeiro</div>
                <div class="mt-0.5 text-xs text-[color:var(--text-muted)]">
                  Timeline do pedido, tracking e lançamentos de pagamento/saldo.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right / hero visuals -->
      <div class="md:col-span-5 relative md:pt-2">
        <HeroCardsParallax />
      </div>
    </div>

    <!-- HOW IT WORKS -->
    <div id="como-funciona" class="mt-20 scroll-mt-28">
      <div class="flex items-end justify-between gap-4">
        <h2 class="text-2xl md:text-3xl font-semibold">Como funciona</h2>
        <NuxtLink to="/como-funciona" class="hidden md:inline-flex ui-btn ui-btn-ghost">Ver detalhes</NuxtLink>
      </div>

      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <div class="ui-card ui-chamfer ui-edge rounded-2xl p-5">
          <div class="text-xs text-[color:var(--text-muted)]">Passo 1</div>
          <div class="mt-1 font-semibold">Monte sua lista</div>
          <p class="mt-2 text-sm text-[color:var(--text-muted)]">
            Use busca de cartas (YGO) + favoritos/pastas para organizar o que você quer importar.
          </p>
        </div>
        <div class="ui-card ui-chamfer ui-edge rounded-2xl p-5">
          <div class="text-xs text-[color:var(--text-muted)]">Passo 2</div>
          <div class="mt-1 font-semibold">Receba e aprove itens</div>
          <p class="mt-2 text-sm text-[color:var(--text-muted)]">
            A cotação vem item a item: aceite/recuse, veja taxas e siga para o financeiro.
          </p>
        </div>
        <div class="ui-card ui-chamfer ui-edge rounded-2xl p-5">
          <div class="text-xs text-[color:var(--text-muted)]">Passo 3</div>
          <div class="mt-1 font-semibold">Acompanhe a importação</div>
          <p class="mt-2 text-sm text-[color:var(--text-muted)]">
            Compras, importação por season, não recebidos e rastreio em timeline.
          </p>
        </div>
      </div>
    </div>

    <!-- QUEM SOMOS (intentionally lower on desktop) -->
    <div id="quem-somos" class="mt-24 scroll-mt-28">
      <div class="grid gap-6 lg:grid-cols-12 items-start">
        <div class="lg:col-span-5">
          <p class="text-xs tracking-[0.22em] uppercase text-[color:var(--text-muted)]">Institucional</p>
          <h2 class="mt-3 text-2xl md:text-3xl font-semibold">Quem somos</h2>
          <p class="mt-3 text-[color:var(--text-muted)]">
            The Jam é um fluxo de importação pensado pra grupos: organização por pasta, cotação por item, compras e importação por season,
            com rastreio e financeiro no mesmo lugar.
          </p>
          <NuxtLink to="/quem-somos" class="mt-5 inline-flex ui-btn ui-btn-primary">Ler mais</NuxtLink>
        </div>

        <div class="lg:col-span-7">
          <div class="ui-card ui-chamfer ui-edge ui-glow rounded-2xl p-6">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="ui-panel-2 ui-chamfer ui-edge rounded-2xl p-4">
                <div class="text-xs text-[color:var(--text-muted)]">Para clientes</div>
                <div class="mt-1 font-semibold">Controle e previsibilidade</div>
                <p class="mt-2 text-sm text-[color:var(--text-muted)]">
                  Você decide item a item e acompanha do orçamento até a entrega.
                </p>
              </div>
              <div class="ui-panel-2 ui-chamfer ui-edge rounded-2xl p-4">
                <div class="text-xs text-[color:var(--text-muted)]">Para importadores</div>
                <div class="mt-1 font-semibold">Operação escalável</div>
                <p class="mt-2 text-sm text-[color:var(--text-muted)]">
                  Seasons, compras, não recebidos e mensageria centralizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DEPOIMENTOS -->
    <div id="depoimentos" class="mt-24 scroll-mt-28">
      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="text-xs tracking-[0.22em] uppercase text-[color:var(--text-muted)]">Credibilidade</p>
          <h2 class="mt-3 text-2xl md:text-3xl font-semibold">Depoimentos</h2>
          <p class="mt-2 text-sm text-[color:var(--text-muted)] max-w-2xl">
            Feedback de quem já usa fluxo por pasta + cotação por item + rastreio no dia a dia.
          </p>
        </div>
      </div>

      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <div v-for="t in testimonials" :key="t.name" class="ui-card ui-chamfer ui-edge rounded-2xl p-6">
          <div class="flex items-center gap-3">
            <img :src="t.avatar" class="h-12 w-12 rounded-2xl object-cover border border-white/10" alt="" />
            <div>
              <div class="font-semibold">{{ t.name }}</div>
              <div class="text-xs text-white/60">{{ t.meta }}</div>
            </div>
            <div class="ml-auto text-sm text-[color:var(--a2)]">★★★★★</div>
          </div>
          <p class="mt-4 text-sm text-[color:var(--text-muted)] leading-relaxed">
            “{{ t.text }}”
          </p>
        </div>
      </div>

      <div class="mt-6 ui-card ui-chamfer ui-edge rounded-2xl p-6">
        <div class="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <div class="font-semibold">Quer ver o fluxo funcionando no seu grupo?</div>
            <div class="mt-1 text-sm text-[color:var(--text-muted)]">A gente configura as regras e te coloca no piloto do MVP.</div>
          </div>
          <NuxtLink to="/#contato" class="ui-btn ui-btn-primary">Falar agora</NuxtLink>
        </div>
      </div>
    </div>

    <!-- CONTATO -->
    <div id="contato" class="mt-24 scroll-mt-28">
      <div class="grid gap-6 lg:grid-cols-12 items-start">
        <div class="lg:col-span-5">
          <p class="text-xs tracking-[0.22em] uppercase text-[color:var(--text-muted)]">Contato</p>
          <h2 class="mt-3 text-2xl md:text-3xl font-semibold">Fale com a gente</h2>
          <p class="mt-3 text-[color:var(--text-muted)]">
            Quer testar o protótipo no seu grupo ou alinhar regras de cotação? Manda uma mensagem.
          </p>
        </div>

        <div class="lg:col-span-7">
          <form class="ui-card ui-chamfer ui-edge ui-glow rounded-2xl p-6" @submit.prevent="onSend">
            <div class="grid gap-4 md:grid-cols-2">
              <label class="block text-sm">
                <span class="text-white/70">Nome</span>
                <input v-model="name" class="mt-1 w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2" />
              </label>
              <label class="block text-sm">
                <span class="text-white/70">E-mail</span>
                <input v-model="email" type="email" class="mt-1 w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2" />
              </label>
            </div>

            <label class="mt-4 block text-sm">
              <span class="text-white/70">Mensagem</span>
              <textarea v-model="message" rows="4" class="mt-1 w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2" />
            </label>

            <div class="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <button class="ui-btn ui-btn-primary" type="submit">Enviar</button>
              <div class="text-xs text-white/60">No MVP: enviaremos para uma inbox interna + e-mail.</div>
            </div>
          </form>
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
    </div>
  </section>
</template>

<script setup lang="ts">
const name = ref('')
const email = ref('')
const message = ref('')

const testimonials = ref([
  {
    name: 'Rafa S.',
    meta: 'Cliente · Deck builder (YGO)',
    avatar: '/people/user-1.jpg',
    text: 'O aceite por item mudou o jogo. Eu controlo o custo e ainda acompanho tudo sem perder conversa no WhatsApp.',
  },
  {
    name: 'Camila M.',
    meta: 'Cliente · Colecionadora',
    avatar: '/people/user-2.jpg',
    text: 'A pasta/favoritos deixa tudo organizado. Virei a página das planilhas e o rastreio fica bem claro.',
  },
  {
    name: 'Kenji A.',
    meta: 'Importador · Operação em group buy',
    avatar: '/people/user-3.jpg',
    text: 'Seasons + compras + não recebidos no mesmo lugar: fica muito mais fácil escalar sem perder item no caminho.',
  },
])

const toast = ref<string | null>(null)
const ping = (m: string) => {
  toast.value = m
  setTimeout(() => (toast.value = null), 2200)
}

const onSend = () => {
  ping('Mensagem enviada (mock).')
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.ui-cta {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--a1) 84%, rgba(0, 0, 0, 0.22)),
    color-mix(in srgb, var(--a2) 28%, rgba(0, 0, 0, 0.22))
  );
}
</style>
