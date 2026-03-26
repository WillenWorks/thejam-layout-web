<template>
  <section class="py-10 md:py-16">
    <div class="w-full">
      <p class="text-xs tracking-[0.22em] uppercase text-[color:var(--text-muted)]">Institucional</p>
      <h1 class="mt-3 text-3xl md:text-4xl font-semibold">Como funciona</h1>
      <p class="mt-3 text-[color:var(--text-muted)] max-w-3xl">
        A ideia é simples: você monta sua lista, o importador calcula item a item, você aprova o que faz sentido e acompanha a importação
        até a entrega — com histórico e financeiro no mesmo lugar.
      </p>

      <div class="mt-10 grid gap-6">
        <!-- Step 1 -->
        <div class="ui-card ui-chamfer ui-edge ui-glow p-6">
          <div class="grid gap-6 lg:grid-cols-12 items-center">
            <div class="lg:col-span-5">
              <div class="text-xs text-[color:var(--text-muted)]">Passo 1</div>
              <div class="mt-1 text-xl font-semibold">Monte sua lista</div>
              <p class="mt-2 text-sm text-[color:var(--text-muted)]">
                Busque cartas (YGO), use favoritos/pastas, cole texto ou importe um arquivo. Você pode criar listas por objetivo (deck,
                coleção, trade).
              </p>
              <div class="mt-4 flex gap-2">
                <NuxtLink to="/buscar" class="ui-btn ui-btn-primary ui-chamfer ui-edge">Procurar carta</NuxtLink>
                <NuxtLink to="/collection" class="ui-btn ui-btn-ghost ui-chamfer ui-edge">Ver pastas</NuxtLink>
              </div>
            </div>
            <div class="lg:col-span-7">
              <div class="ui-panel-2 ui-chamfer ui-edge overflow-hidden">
                <img src="/steps/1-lista.jpg" class="w-full h-[260px] md:h-[320px] object-cover" alt="Ilustração do passo 1" />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="ui-card ui-chamfer ui-edge ui-glow p-6">
          <div class="grid gap-6 lg:grid-cols-12 items-center">
            <div class="lg:col-span-5">
              <div class="text-xs text-[color:var(--text-muted)]">Passo 2</div>
              <div class="mt-1 text-xl font-semibold">Receba e aprove itens</div>
              <p class="mt-2 text-sm text-[color:var(--text-muted)]">
                A cotação vem item a item: você pode aceitar/recusar, ver taxas, estimativa de prazo e o total apenas do que foi aceito.
              </p>
              <div class="mt-4 flex gap-2">
                <NuxtLink to="/quotes" class="ui-btn ui-btn-primary ui-chamfer ui-edge">Ver cotações</NuxtLink>
                <NuxtLink to="/financeiro" class="ui-btn ui-btn-ghost ui-chamfer ui-edge">Ir pro financeiro</NuxtLink>
              </div>
            </div>
            <div class="lg:col-span-7">
              <div class="ui-panel-2 ui-chamfer ui-edge overflow-hidden">
                <img src="/steps/2-cotacao.jpg" class="w-full h-[260px] md:h-[320px] object-cover" alt="Ilustração do passo 2" />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="ui-card ui-chamfer ui-edge ui-glow p-6">
          <div class="grid gap-6 lg:grid-cols-12 items-center">
            <div class="lg:col-span-5">
              <div class="text-xs text-[color:var(--text-muted)]">Passo 3</div>
              <div class="mt-1 text-xl font-semibold">Acompanhe a importação</div>
              <p class="mt-2 text-sm text-[color:var(--text-muted)]">
                Compras, seasons, não recebidos e rastreio em timeline até a entrega — com mensageria pra resolver divergências sem ruído.
              </p>
              <div class="mt-4 flex gap-2">
                <NuxtLink to="/orders" class="ui-btn ui-btn-primary ui-chamfer ui-edge">Abrir rastreio</NuxtLink>
                <NuxtLink to="/admin/seasons" class="ui-btn ui-btn-ghost ui-chamfer ui-edge">Seasons (admin)</NuxtLink>
              </div>
            </div>
            <div class="lg:col-span-7">
              <div class="ui-panel-2 ui-chamfer ui-edge overflow-hidden">
                <img src="/steps/3-rastreio.jpg" class="w-full h-[260px] md:h-[320px] object-cover" alt="Ilustração do passo 3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 ui-card ui-chamfer ui-edge ui-glow p-6">
        <div class="flex items-center gap-3">
          <img src="/ygo/talisman.png" class="h-10 w-10 opacity-90" alt="" />
          <div>
            <div class="font-semibold">Foco no MVP</div>
            <div class="text-sm text-[color:var(--text-muted)]">Yu-Gi-Oh primeiro. Depois expandimos para outros TCGs.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
