import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll() {
  // State untuk posisi scroll
  const scrollY = ref(0)
  const scrollX = ref(0)
  const isScrolled = ref(false)
  const scrollDirection = ref<'up' | 'down' | null>(null)
  const lastScrollY = ref(0)

  // State untuk scroll progress
  const scrollProgress = ref(0)
  const maxScroll = ref(0)

  // State untuk scroll to top
  const showScrollTop = ref(false)

  // Handler untuk scroll event
  const handleScroll = () => {
    // Update posisi scroll
    scrollY.value = window.scrollY
    scrollX.value = window.scrollX

    // Update scroll direction
    if (scrollY.value > lastScrollY.value) {
      scrollDirection.value = 'down'
    } else if (scrollY.value < lastScrollY.value) {
      scrollDirection.value = 'up'
    }
    lastScrollY.value = scrollY.value

    // Update isScrolled state
    isScrolled.value = scrollY.value > 50

    // Update scroll progress
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    maxScroll.value = docHeight
    scrollProgress.value = (scrollY.value / docHeight) * 100

    // Update showScrollTop state
    showScrollTop.value = scrollY.value > 300
  }

  // Method untuk scroll ke posisi tertentu
  const scrollTo = (position: number, behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
      top: position,
      behavior
    })
  }

  // Method untuk scroll ke elemen
  const scrollToElement = (elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Method untuk scroll ke top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Lifecycle hooks
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    // Initial calculation
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    // States
    scrollY,
    scrollX,
    isScrolled,
    scrollDirection,
    scrollProgress,
    showScrollTop,

    // Methods
    scrollTo,
    scrollToElement,
    scrollToTop
  }
} 