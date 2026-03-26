<template>
  <section class="py-10 md:py-16">
    <div class="w-full">
      <p class="text-xs tracking-[0.22em] uppercase text-[color:var(--text-muted)]">Institucional</p>
      <h1 class="mt-3 text-3xl md:text-4xl font-semibold">FAQ</h1>

      <div class="mt-8 space-y-3">
        <FaqItem
          :open="true"
          title="Como funciona a cotação?"
          body="Você monta uma lista, envia a solicitação e recebe os preços por item. Depois pode aceitar tudo ou item a item."
        />
        <FaqItem
          title="Quais TCGs são suportados?"
          body="No MVP, estamos focados em Yu-Gi-Oh. A estrutura é pensada para expandir depois."
        />
        <FaqItem
          title="Como acompanho o pedido?"
          body="Você verá uma timeline de status e, quando existir, um código de rastreio com eventos."
        />
      </div>

      <div class="mt-10 ui-card ui-chamfer ui-edge rounded-2xl p-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="font-semibold">Ficou com dúvida específica?</div>
            <div class="mt-1 text-sm text-[color:var(--text-muted)]">Manda uma mensagem rápida na área de contato da home.</div>
          </div>
          <NuxtLink to="/#contato" class="ui-btn ui-btn-primary">Contato</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
