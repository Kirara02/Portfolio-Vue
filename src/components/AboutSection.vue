<script setup lang="ts">
import portfolioData from '../data/portfolio.json'
import WorkCard from './cards/WorkCard.vue'
</script>

<template>
  <section id="about" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-secondary text-center">About Me</h2>
      <p class="text-lg mb-12 text-secondary max-w-3xl mx-auto text-center">{{ portfolioData.about.description }}</p>

      <!-- Education Section -->
      <h3 class="text-2xl font-bold mb-6 text-secondary text-center">Education</h3>
      <div class="grid gap-6 max-w-4xl mx-auto mb-12">
        <div
          v-for="edu in portfolioData.education"
          :key="edu.school"
          class="glass-effect rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="text-xl font-semibold text-secondary mb-1">{{ edu.degree }}</h4>
              <p class="text-emerald-500 font-medium">{{ edu.school }}</p>
            </div>
            <span class="bg-emerald-100 dark:bg-gray-700 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
              {{ edu.year }}
            </span>
          </div>
          <p class="text-secondary">{{ edu.description }}</p>
        </div>
      </div>

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