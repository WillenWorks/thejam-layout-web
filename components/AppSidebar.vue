<template>
  <aside class="hidden md:block w-[240px] shrink-0">
    <div class="ui-panel ui-chamfer ui-edge ui-glow rounded-2xl p-3 sticky top-[92px]">
      <div class="px-2 py-2">
        <div class="text-xs text-[color:var(--text-muted)]">Navegação</div>
        <div class="mt-1 font-semibold">{{ roleLabel }}</div>
      </div>

      <div class="mt-2 grid gap-1">
        <SideLink to="/dashboard" label="Dashboard" />
        <SideLink to="/buscar" label="Procurar carta" />
        <SideLink to="/collection" label="Favoritos / Pasta" />
        <SideLink to="/quotes" label="Cotações" />
        <SideLink to="/orders" label="Rastreio" />
        <SideLink to="/financeiro" label="Financeiro" />
        <SideLink to="/settings" label="Configurações" />
      </div>

      <div v-if="isAdmin" class="mt-4 pt-3 border-t border-white/10">
        <div class="px-2 text-xs tracking-[0.22em] uppercase text-[color:var(--text-muted)]">Admin</div>
        <div class="mt-2 grid gap-1">
          <SideLink to="/admin/quotes" label="Cotações por usuário" />
          <SideLink to="/admin/purchases" label="Compras" />
          <SideLink to="/admin/seasons" label="Importação (seasons)" />
          <SideLink to="/admin/not-received" label="Não recebidos" />
          <SideLink to="/admin/financeiro" label="Financeiro" />
          <SideLink to="/admin/messages" label="Mensageria" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const { user } = useAuth()

const isAdmin = computed(() => user.value?.role === 'admin' || user.value?.role === 'superadmin')

const roleLabel = computed(() => {
  const r = user.value?.role
  if (r === 'admin') return 'Admin do grupo'
  if (r === 'superadmin') return 'Superadmin'
  return 'Cliente'
})
</script>
