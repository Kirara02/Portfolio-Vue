<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  content: string
  isLink?: boolean
  href?: string
}>()
</script>

<template>
  <div class="glass-effect p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
    <div class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="icon"></svg>
    </div>
    <h3 class="text-xl font-semibold mb-2 text-secondary">{{ title }}</h3>
    <component 
      :is="isLink ? 'a' : 'p'"
      :href="isLink ? href : undefined"
      :class="[
        'text-secondary',
        isLink ? 'hover:text-emerald-500 transition-colors duration-200' : ''
      ]"
    >
      {{ content }}
    </component>
  </div>
</template> 