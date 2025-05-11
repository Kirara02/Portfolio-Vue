<script setup lang="ts">
import portfolioData from '../data/portfolio.json'
import SocialIcon from './common/SocialIcon.vue'
</script>

<template>
  <footer class="py-8 border-t border-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <!-- Copyright -->
        <p class="text-secondary text-sm">
          © {{ new Date().getFullYear() }} {{ portfolioData.name }}. All rights reserved.
        </p>

        <!-- Social Links -->
        <div class="flex gap-4">
          <SocialIcon
            v-if="portfolioData.contact.social.linkedin"
            :href="portfolioData.contact.social.linkedin"
            platform="linkedin"
          />
          <SocialIcon
            v-if="portfolioData.contact.social.github"
            :href="portfolioData.contact.social.github"
            platform="github"
          />
        </div>
      </div>
    </div>
  </footer>
</template> 