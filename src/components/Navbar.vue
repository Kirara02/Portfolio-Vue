<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from './common/ThemeToggle.vue'

const menuItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skill', href: '#skill' },
  { name: 'Project', href: '#project' },
  { name: 'Contact', href: '#contact' }
]

const activeSection = ref('home')

const observerCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activeSection.value = entry.target.id
    }
  })
}

let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver(observerCallback, {
    rootMargin: '-50% 0px -50% 0px'
  })

  menuItems.forEach(item => {
    const element = document.querySelector(item.href)
    if (element) {
      observer.observe(element)
    }
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 glass-effect shadow-md z-50">
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