<template>
  <div class="relative min-h-dvh text-white overflow-x-hidden">
    <BackgroundGlobal :variant="bgVariant" />

    <header class="sticky top-0 z-30">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 py-3">
        <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl px-4 py-3 flex items-center gap-3">
          <NuxtLink to="/" class="font-semibold tracking-wide flex items-center gap-2 min-w-0">
            <img src="/ygo/talisman.png" class="h-5 w-5 opacity-90" alt="" />
            <span class="truncate">The Jam</span>
            <span class="text-xs text-white/60 shrink-0">prototype</span>
          </NuxtLink>

          <div class="ml-auto flex items-center gap-2">
            <div class="hidden sm:flex items-center gap-2 text-xs text-white/60 mr-2">
              <img src="/ygo/talisman.png" class="h-5 w-5 opacity-90" alt="" />
              <span>YGO (MVP)</span>
            </div>

            <!-- Institutional links (desktop) -->
            <nav class="hidden lg:flex items-center gap-2 text-xs text-white/70 mr-2">
              <NuxtLink to="/como-funciona" class="hover:text-white transition">Como funciona</NuxtLink>
              <span class="text-white/30">•</span>
              <NuxtLink to="/faq" class="hover:text-white transition">FAQ</NuxtLink>
              <span class="text-white/30">•</span>
              <NuxtLink to="/quem-somos" class="hover:text-white transition">Quem somos</NuxtLink>
              <span class="text-white/30">•</span>
              <NuxtLink to="/sobre" class="hover:text-white transition">Sobre</NuxtLink>
            </nav>

            <!-- Auth actions (desktop) -->
            <NuxtLink
              v-if="!isAuthed"
              to="/login"
              class="hidden md:inline-flex rounded-xl bg-[color:var(--a1)]/80 px-3 py-2 text-xs font-semibold hover:bg-[color:var(--a1)] transition"
            >
              Entrar
            </NuxtLink>

            <div v-else class="hidden md:flex items-center gap-2">
              <NuxtLink
                to="/dashboard"
                class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10 transition"
              >
                Painel
              </NuxtLink>
              <button
                class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10 transition"
                @click="logout"
              >
                Sair
              </button>
            </div>

            <!-- Mobile menu button -->
            <button
              class="md:hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10 transition"
              @click="mobileMenuOpen = !mobileMenuOpen"
              :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
              aria-label="Abrir menu"
            >
              Menu
            </button>
          </div>
        </div>

        <!-- Mobile dropdown menu -->
        <Transition name="fade">
          <div v-if="mobileMenuOpen" class="mt-2">
            <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-3">
              <div class="grid grid-cols-2 gap-2 text-sm">
                <NuxtLink to="/como-funciona" class="ui-btn ui-btn-ghost" @click="closeMobileMenu">Como funciona</NuxtLink>
                <NuxtLink to="/faq" class="ui-btn ui-btn-ghost" @click="closeMobileMenu">FAQ</NuxtLink>
                <NuxtLink to="/quem-somos" class="ui-btn ui-btn-ghost" @click="closeMobileMenu">Quem somos</NuxtLink>
                <NuxtLink to="/sobre" class="ui-btn ui-btn-ghost" @click="closeMobileMenu">Sobre</NuxtLink>
              </div>

              <div class="mt-3 pt-3 border-t border-white/10 flex gap-2">
                <NuxtLink
                  v-if="!isAuthed"
                  to="/login"
                  class="ui-btn ui-btn-primary flex-1"
                  @click="closeMobileMenu"
                >
                  Entrar
                </NuxtLink>

                <template v-else>
                  <NuxtLink to="/dashboard" class="ui-btn ui-btn-ghost flex-1" @click="closeMobileMenu">Painel</NuxtLink>
                  <button class="ui-btn ui-btn-ghost" @click="onLogout">Sair</button>
                </template>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </header>

    <main class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pb-24">
      <slot />
    </main>

    <FooterGlobal v-if="!isAuthed" />

    <AppLoading :visible="loadingActive" />

    <!-- Bottom nav (mobile, authenticated) -->
    <nav v-if="isAuthed" class="fixed bottom-3 left-0 right-0 z-40 md:hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="ui-panel ui-chamfer ui-edge rounded-2xl px-2 py-2 flex justify-between">
          <NavItem to="/dashboard" label="Home" icon="home" />
          <NavItem to="/buscar" label="Buscar" icon="search" />
          <NavItem to="/quotes" label="Cotações" icon="quotes" />
          <NavItem to="/orders" label="Rastreio" icon="orders" />
          <NavItem to="/financeiro" label="Financeiro" icon="finance" />
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { isAuthed, logout } = useAuth()
const { active: loadingActive } = useLoadingOverlay()

const mobileMenuOpen = ref(false)
const closeMobileMenu = () => (mobileMenuOpen.value = false)

const onLogout = async () => {
  closeMobileMenu()
  await logout()
}

watch(
  () => route.fullPath,
  () => {
    closeMobileMenu()
  }
)

const bgVariant = computed(() => {
  // landing & auth pages use portal, app pages use nebula
  if (route.path === '/' || route.path.startsWith('/login') || route.path.startsWith('/register')) return 'portal'
  return 'nebula'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 160ms ease, transform 180ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
