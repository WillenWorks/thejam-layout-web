<template>
  <div class="py-8 md:py-12">
    <div class="grid gap-8 lg:grid-cols-[260px_1fr] items-start">
      <AppSidebar />

      <section class="flex-1">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-semibold">Dashboard</h1>
            <p class="mt-1 text-sm text-white/70">Visão geral e atalhos do protótipo (sem backend).</p>
          </div>

          <NuxtLink
            to="/quotes"
            class="hidden sm:inline-flex rounded-2xl bg-[color:var(--a1)]/80 hover:bg-[color:var(--a1)] transition px-4 py-2 font-semibold"
          >
            Nova cotação
          </NuxtLink>
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-3">
          <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-5">
            <div class="text-xs text-white/60">Cotações</div>
            <div class="mt-1 text-2xl font-semibold">2</div>
            <div class="mt-3 text-sm text-white/70">1 aguardando aceite · 1 em triagem</div>
          </div>
          <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-5">
            <div class="text-xs text-white/60">Pedidos</div>
            <div class="mt-1 text-2xl font-semibold">1</div>
            <div class="mt-3 text-sm text-white/70">Status atual: <span class="font-semibold">Em import</span></div>
          </div>
          <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-5">
            <div class="text-xs text-white/60">Coleção</div>
            <div class="mt-1 text-2xl font-semibold">18</div>
            <div class="mt-3 text-sm text-white/70">Cartas salvas para futuras listas</div>
          </div>
        </div>

        <div class="mt-8 grid gap-6 lg:grid-cols-2">
          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-center justify-between">
              <div class="font-semibold">Fluxo rápido</div>
              <div class="text-xs text-white/60">cliente</div>
            </div>
            <ol class="mt-4 space-y-2 text-sm text-white/70">
              <li><span class="text-white">1.</span> Criar solicitação de cotação</li>
              <li><span class="text-white">2.</span> Receber cotação e aceitar</li>
              <li><span class="text-white">3.</span> Enviar comprovante</li>
              <li><span class="text-white">4.</span> Acompanhar timeline do pedido</li>
            </ol>

            <div class="mt-5 flex gap-2">
              <NuxtLink to="/quotes" class="rounded-xl bg-white/10 hover:bg-white/15 transition px-3 py-2 text-sm">Ir para cotações</NuxtLink>
              <NuxtLink to="/orders" class="rounded-xl bg-white/10 hover:bg-white/15 transition px-3 py-2 text-sm">Ir para pedidos</NuxtLink>
            </div>
          </div>

          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-center justify-between">
              <div class="font-semibold">Demonstração visual</div>
              <div class="text-xs text-white/60">cards demo</div>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-3">
              <div class="rounded-2xl overflow-hidden border border-white/10">
                <img src="/cards/insect-knight.jpg" class="w-full h-[170px] object-cover" alt="Demo" />
              </div>
              <div class="rounded-2xl overflow-hidden border border-white/10">
                <img src="/cards/arcane-dragon.jpg" class="w-full h-[170px] object-cover" alt="Demo" />
              </div>
            </div>
            <p class="mt-3 text-xs text-white/60">
              Ideia: usar artes *originais* (IA/fanart) como “imagem de dentro da carta”, e deixar molduras/ícones 100% custom.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
