<template>
  <div class="feature-card p-6 rounded-xl bg-white shadow-lg motion-safe:whileHover:shadow-xl transition-all duration-300" 
       data-aos="fade-up" 
       :data-aos-delay="delay">
    <div class="mb-6 relative">
      <img :src="image" 
           :alt="title" 
           class="w-full h-48 object-cover rounded-lg mb-6">
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-4 rounded-full motion-safe:whileInView:opacity-100 opacity-0 transition-opacity duration-500">
        <UIcon :name="icon" class="w-5 h-5 text-2xl text-purple-600" />
      </div>
    </div>
    <h3 class="text-xl font-display font-bold my-3">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  delay: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped>
.feature-card {
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
  backdrop-filter: blur(10px);
}
</style>
