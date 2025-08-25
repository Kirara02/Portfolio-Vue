<script setup lang="ts">
defineProps<{
  name: string
  level: number
  category: string
}>()
</script>

<template>
  <div class="glass-effect p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-xl font-semibold text-secondary">{{ name }}</h3>
      <span class="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-emerald-400 font-medium capitalize">
        {{ category }}
      </span>
    </div>
    <div class="w-full bg-indigo-100 dark:bg-gray-700 rounded-full h-2.5">
      <div 
        class="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-emerald-500 dark:to-teal-500 h-2.5 rounded-full" 
        :style="{ width: `${level}%` }"
      ></div>
    </div>
  </div>
</template> 