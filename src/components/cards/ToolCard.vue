<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <div
    class="glass-effect p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
  >
    <div class="text-lg font-medium text-secondary mb-1">{{ name }}</div>
    <div
      class="w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
    ></div>
  </div>
</template>
