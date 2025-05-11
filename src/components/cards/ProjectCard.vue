<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
}>()
</script>

<template>
  <div class="glass-effect rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
    <img :src="image" :alt="title" class="w-full h-48 object-cover">
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2 text-secondary">{{ title }}</h3>
      <p class="text-secondary mb-4">{{ description }}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="tech in technologies" :key="tech"
              class="bg-emerald-100 dark:bg-gray-700 text-emerald-500 px-3 py-1 rounded-full text-sm">
          {{ tech }}
        </span>
      </div>
      <a :href="link" target="_blank"
         class="text-secondary hover:opacity-80 font-medium">View Project →</a>
    </div>
  </div>
</template> 