<script setup lang="ts">
import portfolioData from '../data/portfolio.json'
import WorkCard from './cards/WorkCard.vue'
</script>

<template>
  <section id="about" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-secondary text-center">About Me</h2>
      <p class="text-lg mb-12 text-secondary max-w-3xl mx-auto text-center">{{ portfolioData.about.description }}</p>
      
      <h3 class="text-2xl font-bold mb-6 text-secondary text-center">Experience</h3>
      <div class="grid gap-6 max-w-4xl mx-auto">
        <WorkCard
          v-for="work in portfolioData.about.workHistory"
          :key="work.company"
          :position="work.position"
          :company="work.company"
          :period="work.period"
          :location="work.location"
          :description="work.description"
        :image="work.image"
        />
      </div>
    </div>
  </section>
</template> 