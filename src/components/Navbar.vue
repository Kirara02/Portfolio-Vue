<script setup lang="ts">
import { useActiveSection } from '../composables/useActiveSection';
import { useScroll } from '../composables/useScroll';
import ThemeToggle from './common/ThemeToggle.vue'

const menuItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skill', href: '#skill' },
  { name: 'Project', href: '#project' },
  { name: 'Contact', href: '#contact' }
]

const { activeSection } = useActiveSection(menuItems.map(item => item.href.substring(1)))
const { isScrolled, scrollProgress } = useScroll()

</script>

<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled ? 'glass-effect shadow-md' : 'bg-transparent',
    ]"
  >
    <!-- Progress Bar -->
    <div 
      class="absolute bottom-0 left-0 h-0.5 bg-emerald-500 transition-all duration-300"
      :style="{ width: `${scrollProgress}%` }"
    ></div>

    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="text-xl font-bold gradient-text">Portfolio</div>
        <div class="flex items-center space-x-8">
          <div class="hidden md:flex space-x-8">
            <a
              v-for="item in menuItems"
              :key="item.name"
              :href="item.href"
              :class="[
                'text-secondary hover:opacity-80 transition-colors duration-200 font-medium relative',
                activeSection === item.href.substring(1) ? 'text-emerald-500' : ''
              ]"
            >
              {{ item.name }}
              <span 
                v-if="activeSection === item.href.substring(1)"
                class="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500 rounded-full"
              ></span>
            </a>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  </nav>
</template> 