<script setup lang="ts">
defineProps<{
  name: string
  level: number
}>()
</script>

<template>
  <div class="glass-effect p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h3 class="text-xl font-semibold mb-2 text-secondary">{{ name }}</h3>
    <div class="w-full bg-indigo-100 dark:bg-gray-700 rounded-full h-2.5">
      <div 
        class="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-emerald-500 dark:to-teal-500 h-2.5 rounded-full" 
        :style="{ width: `${level}%` }"
      ></div>
    </div>
  </div>
</template> 