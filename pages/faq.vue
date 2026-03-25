<template>
  <section class="py-10 md:py-16">
    <div class="max-w-4xl">
      <p class="text-xs tracking-[0.22em] uppercase text-[color:var(--text-muted)]">Institucional</p>
      <h1 class="mt-3 text-3xl md:text-4xl font-semibold">FAQ</h1>

      <div class="mt-8 space-y-3">
        <details class="ui-panel ui-chamfer ui-edge rounded-2xl p-5" open>
          <summary class="cursor-pointer font-semibold">Como funciona a cotação?</summary>
          <p class="mt-2 text-sm text-[color:var(--text-muted)]">
            Você monta uma lista, envia a solicitação e recebe os preços por item. Depois pode aceitar tudo ou item a item.
          </p>
        </details>

        <details class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
          <summary class="cursor-pointer font-semibold">Quais TCGs são suportados?</summary>
          <p class="mt-2 text-sm text-[color:var(--text-muted)]">
            No MVP, estamos focados em Yu-Gi-Oh. A estrutura é pensada para expandir depois.
          </p>
        </details>

        <details class="ui-panel ui-chamfer ui-edge rounded-2xl p-5">
          <summary class="cursor-pointer font-semibold">Como acompanho o pedido?</summary>
          <p class="mt-2 text-sm text-[color:var(--text-muted)]">
            Você verá uma timeline de status e, quando existir, um código de rastreio com eventos.
          </p>
        </details>
      </div>
    </div>
  </section>
</template>
