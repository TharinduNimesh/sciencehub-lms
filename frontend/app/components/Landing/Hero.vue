<template>
  <Motion as="div" :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }" :while-in-view="{
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  }" :transition="{
      delay: 0.3,
      duration: 0.8,
      ease: 'easeInOut',
    }" class="relative flex flex-col items-center justify-center gap-6 px-4 min-h-screen max-w-6xl mx-auto">
    <div class="mt-10 text-center text-3xl font-display font-bold md:text-5xl lg:text-6xl dark:text-white">
      Unlock Your
      <span
        class="inline-block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-400 text-transparent bg-clip-text">
        SCIENCE
      </span>
      Learning
      <br /> Adventure Today!
    </div>
    <div class="max-w-2xl text-center py-4 text-base md:text-lg font-light leading-relaxed dark:text-neutral-200">
      Welcome to our innovative LMS designed specifically for science enthusiasts! Experience engaging lesson
      recordings, interactive quizzes, and earn Science Stars.
    </div>
    <div class="flex items-center gap-4 pt-2">
      <PrimaryButton size="lg">
        <template #icon-right>
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </template>
        Join Now
      </PrimaryButton>
      <NuxtLink to="/auth/sign-in">
        <SecondaryButton size="lg">Sign In</SecondaryButton>
      </NuxtLink>
    </div>
  </Motion>
</template>

<script setup>
import { Motion } from "motion-v";
import PrimaryButton from "@/components/Landing/PrimaryButton.vue";
import SecondaryButton from "@/components/Landing/SecondaryButton.vue";
</script>
