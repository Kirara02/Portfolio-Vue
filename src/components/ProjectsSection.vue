<script setup lang="ts">
import { ref, computed } from 'vue'
import portfolioData from '../data/portfolio.json'
import ProjectCard from './cards/ProjectCard.vue'

const showAllProjects = ref(false)
const displayedProjects = computed(() => {
  return showAllProjects.value ? portfolioData.projects : portfolioData.projects.slice(0, 6)
})
</script>

<template>
  <section id="project" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-secondary">Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="project in displayedProjects"
          :key="project.id"
          :title="project.title"
          :description="project.description"
          :image="project.image"
          :technologies="project.technologies"
          :link="project.link"
        />
      </div>
      
      <div v-if="portfolioData.projects.length > 6" class="text-center mt-8">
        <button
          @click="showAllProjects = !showAllProjects"
          class="px-6 py-3 rounded-full glass-effect text-secondary hover:opacity-80 transition-opacity duration-200"
        >
          {{ showAllProjects ? 'Show Less' : 'Show More' }}
        </button>
      </div>
    </div>
  </section>
</template> 