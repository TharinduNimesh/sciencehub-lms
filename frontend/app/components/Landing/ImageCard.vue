<template>
  <div class="w-full h-full overflow-hidden rounded-2xl">
    <Motion
      :initial="{ scale: 1 }"
      :whileHover="{ scale: 1.05 }"
      class="w-full h-full relative group"
    >
      <img 
        v-if="src" 
        :src="src" 
        :alt="alt"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <svg class="w-10 h-10 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
      
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
    </Motion>
  </div>
</template>

<script setup>
import { Motion } from 'motion-v'

defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'Gallery image'
  }
})
</script>
