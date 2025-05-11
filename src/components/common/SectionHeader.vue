<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="text-center mb-12">
    <h2 class="text-3xl font-bold mb-4 text-secondary">{{ title }}</h2>
    <p v-if="subtitle" class="text-lg text-secondary max-w-3xl mx-auto">{{ subtitle }}</p>
  </div>
</template> 