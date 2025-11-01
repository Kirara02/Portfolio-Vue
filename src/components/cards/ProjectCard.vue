<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  technologies: string[]
  link: string | Record<string, string>
}>()

const getLinkClass = (type: string) => {
  const classes = {
    playStore: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800',
    appStore: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800',
    repository: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
    demo: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800',
    private: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
  }
  return classes[type as keyof typeof classes] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
}

const getLinkLabel = (type: string) => {
  const labels = {
    playStore: 'Play Store',
    appStore: 'App Store',
    repository: 'Repository',
    demo: 'Demo',
    private: 'Private App'
  }
  return labels[type as keyof typeof labels] || type.charAt(0).toUpperCase() + type.slice(1)
}

const isClickable = (type: string) => {
  return type !== 'private'
}
</script>

<template>
  <div class="glass-effect rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
    <img :src="image" :alt="title" class="w-full h-48 object-cover">
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2 text-secondary">{{ title }}</h3>
      <p class="text-secondary mb-4">{{ description }}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="tech in technologies" :key="tech"
              class="bg-emerald-100 dark:bg-gray-700 text-emerald-500 px-3 py-1 rounded-full text-sm">
          {{ tech }}
        </span>
      </div>
      <div class="flex flex-wrap gap-2">
        <a v-if="typeof link === 'string'" :href="link" target="_blank"
           class="text-secondary hover:opacity-80 font-medium text-sm">View Project →</a>
        <template v-else>
          <component
            v-for="(url, type) in link" :key="type"
            :is="isClickable(type) ? 'a' : 'span'"
            :href="isClickable(type) ? url : undefined"
            :target="isClickable(type) ? '_blank' : undefined"
            :class="getLinkClass(type)"
            :title="isClickable(type) ? undefined : url"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors">
            {{ getLinkLabel(type) }}
          </component>
        </template>
      </div>
    </div>
  </div>
</template> 