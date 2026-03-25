<template>
  <section class="py-10 md:py-16">
    <div class="grid gap-8 md:grid-cols-12 items-start">
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
            class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl px-5 py-3 font-semibold inline-flex items-center justify-center gap-2"
            style="background: linear-gradient(135deg, color-mix(in srgb, var(--a1) 78%, transparent), color-mix(in srgb, var(--a2) 22%, transparent));"
          >
            Começar agora
          </NuxtLink>
          <NuxtLink
            to="/como-funciona"
            class="ui-panel-2 ui-chamfer ui-edge rounded-2xl px-5 py-3 font-semibold inline-flex items-center justify-center"
          >
            Como funciona
          </NuxtLink>
        </div>

        <!-- Feature blocks -->
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-start gap-3">
              <span class="w-11 h-11 ui-panel-2 ui-chamfer ui-edge rounded-2xl flex items-center justify-center shrink-0">
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

          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-start gap-3">
              <span class="w-11 h-11 ui-panel-2 ui-chamfer ui-edge rounded-2xl flex items-center justify-center shrink-0">
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

          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-start gap-3">
              <span class="w-11 h-11 ui-panel-2 ui-chamfer ui-edge rounded-2xl flex items-center justify-center shrink-0">
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

          <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
            <div class="flex items-start gap-3">
              <span class="w-11 h-11 ui-panel-2 ui-chamfer ui-edge rounded-2xl flex items-center justify-center shrink-0">
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
      <div class="md:col-span-5 relative">
        <HeroCardsParallax />
      </div>
    </div>

    <div class="mt-16">
      <h2 class="text-2xl md:text-3xl font-semibold">Como funciona</h2>
      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
          <div class="text-xs text-[color:var(--text-muted)]">Passo 1</div>
          <div class="mt-1 font-semibold">Monte sua lista</div>
          <p class="mt-2 text-sm text-[color:var(--text-muted)]">
            Use busca de cartas (YGO) + favoritos/pastas para organizar o que você quer importar.
          </p>
        </div>
        <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
          <div class="text-xs text-[color:var(--text-muted)]">Passo 2</div>
          <div class="mt-1 font-semibold">Receba e aprove itens</div>
          <p class="mt-2 text-sm text-[color:var(--text-muted)]">
            A cotação vem item a item: aceite/recuse, veja taxas e siga para o financeiro.
          </p>
        </div>
        <div class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
          <div class="text-xs text-[color:var(--text-muted)]">Passo 3</div>
          <div class="mt-1 font-semibold">Acompanhe a importação</div>
          <p class="mt-2 text-sm text-[color:var(--text-muted)]">
            Compras, importação por season, não recebidos e rastreio em timeline.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
