<template>
  <section class="relative overflow-hidden bg-gray-50 dark:bg-gray-900 py-16">
    <div class="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[300px] gap-4 px-4 max-w-7xl mx-auto">
      <!-- Row 1 -->
      <Motion
        v-for="(item, index) in galleryItems"
        :key="index"
        :initial="{ opacity: 0, y: 60 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{
          delay: 0.2 * index,
          duration: 0.8,
          ease: 'easeOut'
        }"
        :class="item.class"
      >
        <ImageCard :src="item.src" :alt="item.alt" />
      </Motion>
    </div>
  </section>
</template>

<script setup>
import { Motion } from 'motion-v'
import ImageCard from '@/components/Landing/ImageCard.vue'

const galleryItems = [
  {
    src: '/images/image01.jpg',
    alt: 'Science experiment 1',
    class: 'col-span-2 relative group'
  },
  {
    src: '/images/image02.jpg',
    alt: 'Science experiment 2',
    class: 'col-span-2 relative group'
  },
  {
    src: '/images/image03.jpg',
    alt: 'Science experiment 3',
    class: 'relative group'
  },
  {
    src: '/images/image04.jpg',
    alt: 'Science experiment 4',
    class: 'relative group'
  },
  {
    src: '/images/image05.jpg',
    alt: 'Science experiment 5',
    class: 'col-span-2 relative group'
  }
]
</script>
