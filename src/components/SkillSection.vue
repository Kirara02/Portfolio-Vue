<script setup lang="ts">
import portfolioData from '../data/portfolio.json'
import SkillCard from './cards/SkillCard.vue'
</script>

<template>
  <section id="skill" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-secondary">Skills</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkillCard
          v-for="skill in portfolioData.skills"
          :key="skill.name"
          :name="skill.name"
          :level="skill.level"
        />
      </div>
    </div>
  </section>
</template> 