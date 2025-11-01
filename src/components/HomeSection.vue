<script setup lang="ts">
import { ref, onMounted } from "vue";
import portfolioData from "../data/portfolio.json";
import StatCard from "./cards/StatCard.vue";
import profileImage from "/assets/images/me.jpg";
import ProfileImage from "./common/ProfileImage.vue";
import CTAButton from "./common/CTAButton.vue";
import ScrollIndicator from "./common/ScrollIndicator.vue";
import resumeATS from "/assets/Fathul_Hidayat_CV.pdf";
import resumeDeveloper from "/assets/Fathul_Hidayat_CV_Developer.pdf";
import resumeExecutive from "/assets/Fathul_Hidayat_CV_Executive.pdf";
import resumeCompact from "/assets/Fathul_Hidayat_CV_Compact.pdf";

const opacity = ref(0);
const translateY = ref(20);
const showCVDropdown = ref(false);

onMounted(() => {
  // Reset animation values
  opacity.value = 1;
  translateY.value = 0;
});
</script>

<template>
  <section
    id="home"
    class="min-h-screen flex items-center relative py-20"
    style="scroll-margin-top: 4rem"
  >
    <div class="container mx-auto px-4">
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <!-- Left side: Text content -->
        <div
          class="flex-1 text-left"
          :style="{
            opacity: opacity,
            transform: `translateY(${translateY}px)`,
            transition: 'all 0.8s ease-out',
          }"
        >
          <h1 class="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            {{ portfolioData.name }}
          </h1>
          <p class="text-xl text-secondary mb-6">{{ portfolioData.title }}</p>
          <p class="text-secondary mb-8 max-w-xl">
            {{ portfolioData.about.brief }}
          </p>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <StatCard value="3+" label="Years Experience" />
            <StatCard value="10+" label="Projects Completed" />
            <StatCard value="3" label="Companies" />
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4">
            <CTAButton href="#contact" text="Contact Me" variant="primary" />
            <CTAButton
              href="#project"
              text="View Projects"
              variant="secondary"
            />

            <!-- CV Download Dropdown -->
            <div class="relative">
              <button
                @click="showCVDropdown = !showCVDropdown"
                class="px-6 py-3 rounded-full bg-white/10 text-secondary hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200 font-medium flex items-center gap-2"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download CV
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': showCVDropdown }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="showCVDropdown"
                class="absolute top-full mt-2 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 dark:border-gray-700/50 z-50 md:right-0 right-0 md:left-auto left-1/2 transform md:transform-none -translate-x-1/2 md:-translate-x-0"
                @click.stop
              >
                <div class="py-2">
                  <a
                    :href="resumeATS"
                    download="Fathul_Hidayat_CV.pdf"
                    class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    @click="showCVDropdown = false"
                  >
                    <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <div class="font-medium">ATS Format</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Standard, ATS-friendly</div>
                    </div>
                  </a>

                  <a
                    :href="resumeDeveloper"
                    download="Fathul_Hidayat_CV_Developer.pdf"
                    class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    @click="showCVDropdown = false"
                  >
                    <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div>
                      <div class="font-medium">Developer Format</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Tech-focused, code style</div>
                    </div>
                  </a>

                  <a
                    :href="resumeExecutive"
                    download="Fathul_Hidayat_CV_Executive.pdf"
                    class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    @click="showCVDropdown = false"
                  >
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <div class="font-medium">Executive Format</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Professional, achievement-focused</div>
                    </div>
                  </a>

                  <a
                    :href="resumeCompact"
                    download="Fathul_Hidayat_CV_Compact.pdf"
                    class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    @click="showCVDropdown = false"
                  >
                    <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div>
                      <div class="font-medium">Compact Format</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Brief, scannable</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side: Profile image -->
        <div
          class="flex-1 flex justify-center"
          :style="{
            opacity: opacity,
            transform: `translateY(${translateY}px)`,
            transition: 'all 0.8s ease-out 0.2s',
          }"
        >
          <ProfileImage :src="profileImage" :alt="portfolioData.name" />
        </div>
      </div>

      <ScrollIndicator />
    </div>
  </section>
</template>
