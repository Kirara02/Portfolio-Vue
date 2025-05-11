<script setup lang="ts">
defineProps<{
  src: string
  alt: string
}>()
</script>

<template>
  <div class="relative w-64 h-64 md:w-80 md:h-80">
    <div class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-20 animate-pulse"></div>
    <div class="absolute inset-0 glass-effect rounded-full overflow-hidden">
      <img 
        :src="src" 
        :alt="alt" 
        class="w-full h-full object-cover"
        onerror="this.src='https://via.placeholder.com/400x400?text=Profile'"
      />
    </div>
  </div>
</template> 