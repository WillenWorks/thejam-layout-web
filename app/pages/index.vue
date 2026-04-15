<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Particle = { top: string; left: string; dur: number; delay: number }

const open = ref(false)
const isLogin = ref(true)
const mobileMenu = ref(false)

const particles = Array.from({ length: 6 }).map((_, i): Particle => ({
  top: `${(i * 13) % 80 + 5}%`,
  left: `${(i * 19) % 90 + 5}%`,
  dur: 6 + (i % 4),
  delay: -(i * 0.6)
}))

const closeMobile = () => (mobileMenu.value = false)

const inviewEls: HTMLElement[] = []
const registerInView = (el: HTMLElement | null) => {
  if (!el) return
  inviewEls.push(el)
}

onMounted(() => {
  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          ;(e.target as HTMLElement).classList.add('in')
          obs.unobserve(e.target)
        }
      }
    },
    { threshold: 0.15 }
  )

  inviewEls.forEach((el) => obs.observe(el))
})
</script>

<template>
  <div class="min-h-screen w-full bg-black text-white font-sans overflow-x-hidden">
    <!-- GLOBAL VIDEO BACKGROUND -->
    <video autoplay loop muted playsinline class="fixed top-0 left-0 w-full h-full object-cover z-0">
      <source src="/hero.mp4" type="video/mp4" />
    </video>

    <!-- Navbar -->
    <nav class="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md px-6 py-3 flex justify-between items-center">
      <h1 class="text-lg md:text-xl font-bold tracking-widest">THE JAM IMPORTS</h1>

      <div class="hidden md:flex gap-6 text-sm items-center">
        <a href="#home" class="hover:text-purple-400">Home</a>
        <a href="#sobre" class="hover:text-purple-400">Quem Somos</a>
        <a href="#como" class="hover:text-purple-400">Como Funciona</a>
        <a href="#contato" class="hover:text-purple-400">Contato</a>
        <button @click="open = true" class="px-4 py-2 rounded-lg border border-purple-500 hover:bg-purple-600 transition">
          Login
        </button>
      </div>

      <button
        class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-black/40"
        @click="mobileMenu = !mobileMenu"
        aria-label="Abrir menu"
      >
        <span v-if="!mobileMenu">☰</span>
        <span v-else>✕</span>
      </button>
    </nav>

    <!-- MOBILE MENU (AnimatePresence + motion: opacity/y) -->
    <Transition name="mobile">
      <div v-if="mobileMenu" class="fixed top-14 left-0 w-full bg-black/95 flex flex-col items-center gap-6 py-10 z-40">
        <a href="#home" @click="closeMobile" class="text-lg hover:text-purple-400">Home</a>
        <a href="#sobre" @click="closeMobile" class="text-lg hover:text-purple-400">Quem Somos</a>
        <a href="#como" @click="closeMobile" class="text-lg hover:text-purple-400">Como Funciona</a>
        <a href="#contato" @click="closeMobile" class="text-lg hover:text-purple-400">Contato</a>
      </div>
    </Transition>

    <!-- HERO -->
    <section id="home" class="relative z-20 w-full h-screen flex items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />

      <!-- particles (framer: y [-20,20,-20] + opacity [0.1,0.3,0.1]) -->
      <div
        v-for="(p, i) in particles"
        :key="i"
        class="particle absolute w-20 h-28 bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-purple-500/10 rounded-lg"
        :style="{ top: p.top, left: p.left, animationDuration: p.dur + 's', animationDelay: p.delay + 's' }"
      />

      <div class="relative z-10 text-center px-4 max-w-2xl">
        <h2 class="text-3xl md:text-6xl font-bold mb-4">Importação de Cards Sem Fronteiras</h2>
        <p class="text-gray-300">Você escolhe. A gente busca. Simples assim.</p>
      </div>
    </section>

    <!-- COMO FUNCIONA (whileInView: opacity + x) -->
    <section id="como" class="relative z-10 w-full bg-[#0b0f1a] py-24">
      <div class="max-w-6xl mx-auto px-6 space-y-24">
        <div
          v-for="(text, i) in [
            'Você seleciona uma carta ou uma lista',
            'Nós fazemos a cotação dos cards',
            'Você recebe direto dos EUA'
          ]"
          :key="i"
          :ref="registerInView"
          class="reveal grid md:grid-cols-2 gap-10 items-center"
          :class="i % 2 === 0 ? 'from-left' : 'from-right'"
        >
          <template v-if="i % 2 === 0">
            <div class="h-64 rounded-2xl bg-gradient-to-br from-purple-700/30 to-blue-500/10 flex items-center justify-center">imagem</div>
            <p class="text-lg text-gray-300">{{ text }}</p>
          </template>
          <template v-else>
            <p class="text-lg text-gray-300">{{ text }}</p>
            <div class="h-64 rounded-2xl bg-gradient-to-br from-purple-700/30 to-blue-500/10 flex items-center justify-center">imagem</div>
          </template>
        </div>
      </div>
    </section>

    <!-- SOBRE -->
    <section id="sobre" class="relative z-10 w-full bg-[#0e1628] py-24 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-3xl mb-6">Quem é a The Jam?</h3>
        <p class="text-gray-400 text-justify leading-relaxed">
          A The Jam Imports nasceu da paixão por TCG e da dificuldade de acesso ao mercado internacional. Conectamos jogadores brasileiros aos
          principais marketplaces globais com segurança e transparência.
        </p>
      </div>
    </section>

    <!-- DEPOIMENTOS (whileInView: opacity + y + stagger delay) -->
    <section class="relative z-10 w-full bg-black py-24 px-6">
      <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div
          v-for="(t, i) in ['Muito confiável!', 'Chegou rápido!', 'Melhor forma de importar cards']"
          :key="i"
          :ref="registerInView"
          class="testimonial reveal-y p-6 bg-gray-900 rounded-2xl border border-purple-500/20 text-center"
          :style="{ transitionDelay: (i * 0.2) + 's' }"
        >
          <div class="flex flex-col items-center mb-3">
            <div class="w-12 h-12 rounded-full bg-gray-700 mb-2" />
            <div class="text-yellow-400 text-xs">★★★★★</div>
          </div>
          <div class="text-sm mb-2">Cliente</div>
          <p class="text-gray-300">{{ t }}</p>
        </div>
      </div>
    </section>

    <!-- CONTATO -->
    <section id="contato" class="relative z-10 w-full bg-[#0b0f1a] py-24 px-6">
      <div class="max-w-xl mx-auto bg-gray-900 p-8 rounded-2xl border border-purple-500/20">
        <h3 class="text-2xl mb-6 text-center">Contato</h3>
        <div class="grid gap-4">
          <input placeholder="Nome" class="p-3 bg-black border border-gray-700 rounded-xl" />
          <input placeholder="Email" class="p-3 bg-black border border-gray-700 rounded-xl" />
          <input placeholder="WhatsApp" class="p-3 bg-black border border-gray-700 rounded-xl" />
          <button class="bg-purple-600 py-3 rounded-xl hover:bg-purple-500 transition">Enviar</button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="relative z-10 w-full bg-black border-t border-gray-800 py-10 text-center text-gray-500">
      © The Jam Imports — Todos os direitos reservados
    </footer>

    <!-- MODAL (AnimatePresence + motion: overlay + scale panel + inner slide) -->
    <Transition name="overlay">
      <div v-if="open" @click="open = false" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <Transition name="modal" appear>
          <div
            v-if="open"
            @click.stop
            class="bg-gray-900 p-8 rounded-2xl w-full max-w-md border border-purple-500/20"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl">{{ isLogin ? 'Login' : 'Cadastro' }}</h3>
              <button
                @click="open = false"
                aria-label="Fechar"
                class="w-10 h-10 rounded-lg border border-white/15 bg-black/40"
              >
                ✕
              </button>
            </div>

            <Transition name="swap" mode="out-in">
              <div :key="isLogin ? 'login' : 'cadastro'">
                <input
                  v-if="!isLogin"
                  placeholder="Nome"
                  class="w-full mb-3 p-3 bg-black border border-gray-700 rounded"
                />

                <input placeholder="Email" class="w-full mb-3 p-3 bg-black border border-gray-700 rounded" />
                <input type="password" placeholder="Senha" class="w-full mb-4 p-3 bg-black border border-gray-700 rounded" />

                <button class="w-full bg-purple-600 py-3 rounded mb-3 hover:bg-purple-500 transition">
                  {{ isLogin ? 'Entrar' : 'Cadastrar' }}
                </button>
              </div>
            </Transition>

            <button @click="isLogin = !isLogin" class="text-sm text-purple-400 hover:text-purple-300 transition">
              {{ isLogin ? 'Criar conta' : 'Já tenho conta' }}
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* mobile menu motion (opacity + y) */
.mobile-enter-active,
.mobile-leave-active {
  transition: opacity 200ms ease, transform 220ms ease;
}
.mobile-enter-from,
.mobile-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* particle loop */
.particle {
  animation-name: floatParticle;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
@keyframes floatParticle {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0.1;
  }
  50% {
    transform: translate3d(0, 20px, 0);
    opacity: 0.3;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0.1;
  }
}

/* reveal from sides (whileInView) */
.reveal {
  opacity: 0;
  transform: translate3d(0, 0, 0);
  transition: opacity 0.8s ease, transform 0.8s ease;
  will-change: opacity, transform;
}
.reveal.from-left {
  transform: translate3d(-80px, 0, 0);
}
.reveal.from-right {
  transform: translate3d(80px, 0, 0);
}
.reveal.in {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

/* testimonials: opacity + y 40 */
.reveal-y {
  opacity: 0;
  transform: translate3d(0, 40px, 0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-y.in {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

/* overlay fade */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 180ms ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* modal scale */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 200ms ease, transform 240ms ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* swap login/cadastro (opacity + x) */
.swap-enter-active,
.swap-leave-active {
  transition: opacity 180ms ease, transform 220ms ease;
}
.swap-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.swap-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
