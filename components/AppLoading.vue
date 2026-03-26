<template>
  <Transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-[80]">
      <BackgroundGlobal variant="portal" />

      <div class="absolute inset-0 flex items-center justify-center">
        <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl px-6 py-5 w-[min(560px,92vw)]">
          <div class="flex items-center gap-4">
            <div class="coin-wrap" aria-hidden="true">
              <img src="/ygo/millennium.png" class="coin" alt="" />
              <div class="coin-glow" />
            </div>
            <div class="flex-1">
              <div class="font-semibold text-lg">Carregando…</div>
              <div class="text-xs text-[color:var(--text-muted)]">processando sua ação</div>
              <div class="mt-3 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <div class="h-full w-[40%] bar" />
              </div>
            </div>
          </div>

          <div class="mt-4 text-xs text-[color:var(--text-muted)]">
            Dica: tudo aqui é mockado — depois só pluga nos endpoints reais.
          </div>
        </div>
      </div>

      <ParticleLayer />
      <SparkLayer />
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.coin-wrap {
  width: 64px;
  height: 64px;
  position: relative;
}

.coin {
  width: 64px;
  height: 64px;
  object-fit: contain;
  animation: spin 1.2s linear infinite;
  filter:
    drop-shadow(0 0 18px var(--glow))
    drop-shadow(0 0 26px color-mix(in srgb, var(--a2) 22%, transparent));
}

.coin-glow {
  position: absolute;
  inset: -12px;
  background: radial-gradient(circle, color-mix(in srgb, var(--a2) 22%, transparent), transparent 65%);
  filter: blur(6px);
  opacity: 0.9;
}

.bar {
  background: linear-gradient(90deg, color-mix(in srgb, var(--a1) 85%, transparent), color-mix(in srgb, var(--a2) 65%, transparent));
  animation: loadbar 1.2s ease-in-out infinite;
}

@keyframes spin {
  from { transform: rotateY(0deg) rotateZ(0deg); }
  to { transform: rotateY(360deg) rotateZ(360deg); }
}

@keyframes loadbar {
  0% { transform: translateX(-80%); }
  50% { transform: translateX(120%); }
  100% { transform: translateX(-80%); }
}
</style>
