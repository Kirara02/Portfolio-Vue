<script setup lang="ts">
defineProps<{
  position: string
  company: string
  period: string
  location: string
  description: string
  image: string
}>()
</script>

<template>
  <div class="glass-effect p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <div class="flex items-center gap-4">
        <img :src="image" :alt="company" class="w-16 h-16 object-contain rounded-lg bg-white/5 p-2">
        <div>
          <h4 class="text-xl font-semibold text-secondary">{{ position }}</h4>
          <p class="text-secondary text-left">{{ company }}</p>
        </div>
      </div>
      <div class="text-secondary mt-2 md:mt-0 text-right">
        <p>{{ period }}</p>
        <p>{{ location }}</p>
      </div>
    </div>
    <p class="text-secondary">{{ description }}</p>
  </div>
</template> 