<template>
  <div class="fixed top-0 left-0 right-0 z-50 px-4" :class="[
    { 'py-6': isScrolled },
    { 'py-3': !isScrolled }
  ]">
    <header :class="[
      'mx-auto max-w-7xl rounded-full transition-all duration-300 px-6 py-4',
      {
        'bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:bg-gray-900/95 translate-y-0': isScrolled
      },
      {
        'bg-white/5 backdrop-blur-sm translate-y-1': !isScrolled
      }
    ]">
      <nav class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img src="/logo.png" alt="ScienceLab Logo" class="h-8 w-auto">
          <span class="font-bold text-xl">SCIENCE<span
              class="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-400 text-transparent bg-clip-text">LAB</span></span>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a href="#features" class="hover:text-primary-600">Features</a>
          <a href="#pricing" class="hover:text-primary-600">Pricing</a>
          <a href="#about" class="hover:text-primary-600">About</a>
          <a href="#contact" class="hover:text-primary-600">Contact</a>
        </div>

        <div class="flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <NuxtLink to="/auth/sign-in">
              <SecondaryButton size="sm">Sign In</SecondaryButton>
            </NuxtLink>
            <PrimaryButton size="sm">Join Now</PrimaryButton>
          </template>
          <template v-else>
            <NuxtLink to="/console/dashboard">
              <SecondaryButton size="sm">Dashboard</SecondaryButton>
            </NuxtLink>
          </template>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'
import PrimaryButton from '@/components/Landing/PrimaryButton.vue'
import SecondaryButton from '@/components/Landing/SecondaryButton.vue'
import { useAuth } from '@/composables/useAuth'

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 50)
const { isAuthenticated } = useAuth()
</script>