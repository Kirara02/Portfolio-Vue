import { ref, onMounted, onUnmounted } from 'vue'

export function useActiveSection(ids: string[]) {
    const activeSection = ref(ids[0] || '')
    let observer: IntersectionObserver
  
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    }
  
    onMounted(() => {
      observer = new IntersectionObserver(observerCallback, {
        rootMargin: '-50% 0px -50% 0px'
      })
  
      ids.forEach(id => {
        const element = document.getElementById(id)
        if (element) {
          observer.observe(element)
        }
      })
    })
  
    onUnmounted(() => {
      observer?.disconnect()
    })
  
    return { activeSection }
} 