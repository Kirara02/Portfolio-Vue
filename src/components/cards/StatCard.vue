<script setup lang="ts">
defineProps<{
  value: string
  label: string
}>()
</script>

<template>
  <div class="glass-effect p-4 rounded-lg">
    <p class="text-2xl font-bold text-secondary">{{ value }}</p>
    <p class="text-secondary">{{ label }}</p>
  </div>
</template> 