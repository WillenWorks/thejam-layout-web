<template>
  <footer class="relative z-10 mt-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 pb-10">
      <div class="ui-footer ui-chamfer ui-edge rounded-2xl p-6">
        <div class="grid gap-8 md:grid-cols-12">
          <div class="md:col-span-5">
            <div class="flex items-center gap-2 font-semibold">
              <img src="/ygo/talisman.png" class="h-6 w-6 opacity-90" alt="" />
              <span>The Jam</span>
              <span class="text-xs text-white/60">prototype</span>
            </div>
            <p class="mt-3 text-sm text-white/70 max-w-md">
              Importação TCG com fluxo completo: pasta, cotação por item, compras, seasons, rastreio e financeiro.
            </p>
          </div>

          <div class="md:col-span-3">
            <div class="text-xs tracking-[0.22em] uppercase text-white/60">Acessos rápidos</div>
            <div class="mt-3 grid gap-2 text-sm">
              <NuxtLink to="/como-funciona" class="hover:text-white transition">Como funciona</NuxtLink>
              <NuxtLink to="/faq" class="hover:text-white transition">FAQ</NuxtLink>
              <NuxtLink to="/quem-somos" class="hover:text-white transition">Quem somos</NuxtLink>
              <NuxtLink to="/sobre" class="hover:text-white transition">Sobre</NuxtLink>
              <NuxtLink to="/#contato" class="hover:text-white transition">Contato</NuxtLink>
            </div>
          </div>

          <div class="md:col-span-4">
            <div class="text-xs tracking-[0.22em] uppercase text-white/60">Contato</div>
            <div class="mt-3 grid gap-2 text-sm text-white/80">
              <div class="flex items-center justify-between">
                <span>E-mail</span>
                <a class="text-white hover:text-[color:var(--a2)] transition" href="mailto:willen.uriujapa@gmail.com">willen.uriujapa@gmail.com</a>
              </div>
              <div class="flex items-center justify-between">
                <span>WhatsApp</span>
                <span class="text-white/60">(definir)</span>
              </div>
              <div class="flex items-center justify-between">
                <span>Instagram</span>
                <span class="text-white/60">(definir)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div class="text-xs text-white/60">
            © {{ year }} The Jam. Todos os direitos reservados.
          </div>
          <div class="text-xs text-white/50">
            UI/UX inspirado em interfaces de TCG (protótipo).
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.ui-footer {
  background:
    linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03)),
    radial-gradient(900px 240px at 20% 0%, rgba(124, 58, 237, 0.18), transparent 60%),
    radial-gradient(780px 240px at 90% 20%, rgba(34, 211, 238, 0.12), transparent 55%);
  backdrop-filter: blur(14px);
}
</style>
