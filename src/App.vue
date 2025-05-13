<script setup lang="ts">
import { useScroll } from './composables/useScroll'
import Navbar from './components/Navbar.vue'
import HomeSection from './components/HomeSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillSection from './components/SkillSection.vue'
import ProjectSection from './components/ProjectSection.vue'
import ContactSection from './components/ContactSection.vue'

const { showScrollTop, scrollToTop } = useScroll()
</script>

<template>
  <div class="min-h-screen bg-primary text-primary">
    <Navbar />
    <main>
      <HomeSection />
      <AboutSection />
      <SkillSection />
      <ProjectSection />
      <ContactSection />
    </main>
    <Footer />

    <!-- Scroll to Top Button -->
    <button
      v-if="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 p-3 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition-all duration-300 z-50"
      aria-label="Scroll to top"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </div>
</template>

