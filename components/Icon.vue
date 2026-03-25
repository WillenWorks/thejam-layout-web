<template>
  <span class="inline-flex items-center justify-center" :style="sizeStyle" aria-hidden="true">
    <svg
      :width="px"
      :height="px"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="drop-shadow-[0_0_14px_var(--glow)]"
    >
      <!-- chamfer frame -->
      <path
        d="M16 6 H48 L58 16 V48 L48 58 H16 L6 48 V16 L16 6 Z"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
      />
      <path
        d="M18 10 H46 L54 18 V46 L46 54 H18 L10 46 V18 L18 10 Z"
        stroke="rgba(255,255,255,0.16)"
        stroke-width="1"
      />

      <!-- icon glyph -->
      <g stroke="rgba(255,255,255,0.92)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <!-- TCG: YGO (generic eye/triangle) -->
        <template v-if="name === 'tcg-ygo'">
          <path d="M32 18 L44 40 L20 40 Z" />
          <path d="M22 34 C26 28, 38 28, 42 34" />
          <path d="M28.5 34.5 C30.5 32.5, 33.5 32.5, 35.5 34.5" />
        </template>

        <!-- TCG: Magic (generic flame) -->
        <template v-else-if="name === 'tcg-magic'">
          <path d="M32 16 C38 22, 38 28, 32 36 C26 28, 26 22, 32 16 Z" />
          <path d="M32 36 C36 40, 36 46, 32 50 C28 46, 28 40, 32 36 Z" />
          <path d="M22 30 C24 24, 29 20, 32 18" opacity="0.65" />
          <path d="M42 30 C40 24, 35 20, 32 18" opacity="0.65" />
        </template>

        <!-- TCG: Digimon (generic chip) -->
        <template v-else-if="name === 'tcg-digimon'">
          <rect x="22" y="22" width="20" height="20" rx="3" />
          <path d="M26 18 V22" />
          <path d="M32 18 V22" />
          <path d="M38 18 V22" />
          <path d="M26 42 V46" />
          <path d="M32 42 V46" />
          <path d="M38 42 V46" />
          <path d="M18 26 H22" />
          <path d="M18 32 H22" />
          <path d="M18 38 H22" />
          <path d="M42 26 H46" />
          <path d="M42 32 H46" />
          <path d="M42 38 H46" />
        </template>

        <!-- TCG: Gundam (generic mecha visor) -->
        <template v-else-if="name === 'tcg-gundam'">
          <path d="M20 34 L28 26 H36 L44 34" />
          <path d="M24 34 V42" />
          <path d="M40 34 V42" />
          <path d="M24 42 H40" />
          <path d="M29 30 H35" />
        </template>

        <!-- Nav: home -->
        <template v-else-if="name === 'home'">
          <path d="M18 32 L32 20 L46 32" />
          <path d="M22 30 V44 H42 V30" />
        </template>

        <!-- Nav: search -->
        <template v-else-if="name === 'search'">
          <circle cx="28" cy="28" r="8" />
          <path d="M34 34 L44 44" />
        </template>

        <!-- Nav: quotes -->
        <template v-else-if="name === 'quotes'">
          <path d="M22 22 H42" />
          <path d="M22 30 H40" />
          <path d="M22 38 H36" />
        </template>

        <!-- Nav: orders -->
        <template v-else-if="name === 'orders'">
          <path d="M22 22 H42 V44 H22 Z" />
          <path d="M26 30 H38" />
          <path d="M26 36 H36" />
        </template>

        <!-- Nav: collection -->
        <template v-else-if="name === 'collection'">
          <path d="M22 24 H40 V42 H22 Z" />
          <path d="M26 20 H44 V38" opacity="0.6" />
        </template>

        <!-- Nav: finance -->
        <template v-else-if="name === 'finance'">
          <path d="M22 24 H42 V40 H22 Z" />
          <path d="M22 30 H42" opacity="0.6" />
          <path d="M26 36 H34" opacity="0.8" />
        </template>

        <!-- Nav: settings -->
        <template v-else-if="name === 'settings'">
          <path d="M32 24 A8 8 0 1 0 32 40 A8 8 0 1 0 32 24" />
          <path d="M32 18 V22" />
          <path d="M32 42 V46" />
          <path d="M18 32 H22" />
          <path d="M42 32 H46" />
        </template>
      </g>
    </svg>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: 'tcg-ygo' | 'tcg-magic' | 'tcg-digimon' | 'tcg-gundam' | 'home' | 'search' | 'quotes' | 'orders' | 'finance' | 'collection' | 'settings'
  size?: number
}>()

const name = computed(() => props.name)
const px = computed(() => props.size ?? 20)
const sizeStyle = computed(() => ({ width: `${px.value}px`, height: `${px.value}px` }))
</script>
