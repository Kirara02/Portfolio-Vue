<script setup lang="ts">
import portfolioData from "../data/portfolio.json";
import SkillCard from "./cards/SkillCard.vue";
import ToolCard from "./cards/ToolCard.vue";

const programmingSkills = portfolioData.skills.filter(
  (skill) => skill.category !== "tools"
);
const tools = portfolioData.skills.filter(
  (skill) => skill.category === "tools"
);
</script>

<template>
  <section id="skill" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-secondary">Skills</h2>

      <!-- Programming Skills -->
      <div class="mb-12">
        <h3 class="text-2xl font-semibold mb-6 text-secondary">
          Programming Skills
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCard
            v-for="skill in programmingSkills"
            :key="skill.name"
            :name="skill.name"
            :level="skill.level"
            :category="skill.category"
          />
        </div>
      </div>

      <!-- Tools & Technologies -->
      <div>
        <h3 class="text-2xl font-semibold mb-6 text-secondary">
          Tools & Technologies
        </h3>
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <ToolCard v-for="tool in tools" :key="tool.name" :name="tool.name" />
        </div>
      </div>
    </div>
  </section>
</template>
