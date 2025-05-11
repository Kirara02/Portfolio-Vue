<script setup lang="ts">
defineProps<{
  href: string
  text: string
  variant?: 'primary' | 'secondary' | 'outline'
}>()
</script>

<template>
  <a 
    :href="href" 
    :class="[
      'px-6 py-3 rounded-full transition-all duration-200 font-medium',
      variant === 'primary' 
        ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20' 
        : variant === 'secondary'
          ? 'bg-white/10 text-secondary hover:bg-white/20 backdrop-blur-sm border border-black/20 dark:border-white/20'
          : 'bg-transparent text-secondary border-2 border-secondary hover:bg-secondary/10'
    ]"
  >
    {{ text }}
  </a>
</template> 