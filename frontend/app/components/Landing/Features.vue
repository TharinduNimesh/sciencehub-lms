<template>
  <section class="features-section py-16 relative overflow-hidden">
    <!-- Background Blobs -->
    <div class="absolute inset-0 pointer-events-none" style="z-index: 0;">
      <svg class="absolute w-[800px] h-[800px] blur-[80px] opacity-[0.15]" viewBox="0 0 200 200">
        <path fill="#8b5cf6" transform-origin="center" class="motion-safe:animate-blob">
          <animate attributeName="d" dur="15s" repeatCount="indefinite"
            values="M44.2,-60.1C58.7,-53.1,72.6,-41.6,77.9,-26.8C83.2,-12,79.9,6.1,73.4,22.1C66.9,38.2,57.2,52.1,43.6,60.6C30,69.1,12.6,72.2,-3.2,76.2C-19,80.2,-38,85.1,-51.6,77.6C-65.2,70.2,-73.4,50.4,-76.8,31.4C-80.3,12.4,-79,-5.9,-73.6,-22.1C-68.2,-38.3,-58.7,-52.4,-45.5,-59.8C-32.4,-67.3,-15.7,-68,-0.2,-67.7C15.3,-67.4,29.7,-67.1,44.2,-60.1Z;
                   M44.1,-63.2C56.6,-55.5,65.8,-42.5,71.5,-27.8C77.1,-13,79.2,3.5,75.6,18.8C72,34.1,62.7,48.2,49.5,57C36.4,65.8,19.2,69.3,2.6,66.3C-14,63.4,-28,54.1,-42.7,44.6C-57.3,35.1,-72.6,25.4,-77.9,11.1C-83.2,-3.3,-78.5,-22.3,-68.1,-35.9C-57.7,-49.5,-41.7,-57.7,-26.9,-64.4C-12.2,-71,-6.1,-76.1,4.7,-82.4C15.5,-88.7,31.5,-71,44.1,-63.2Z;
                   M44.2,-60.1C58.7,-53.1,72.6,-41.6,77.9,-26.8C83.2,-12,79.9,6.1,73.4,22.1C66.9,38.2,57.2,52.1,43.6,60.6C30,69.1,12.6,72.2,-3.2,76.2C-19,80.2,-38,85.1,-51.6,77.6C-65.2,70.2,-73.4,50.4,-76.8,31.4C-80.3,12.4,-79,-5.9,-73.6,-22.1C-68.2,-38.3,-58.7,-52.4,-45.5,-59.8C-32.4,-67.3,-15.7,-68,-0.2,-67.7C15.3,-67.4,29.7,-67.1,44.2,-60.1Z" />
        </path>
      </svg>
      <svg class="absolute right-0 top-1/2 w-[600px] h-[600px] blur-[80px] opacity-[0.15]" viewBox="0 0 200 200">
        <path fill="#a855f7" transform-origin="center" class="motion-safe:animate-blob motion-safe:animation-delay-2000">
          <animate attributeName="d" dur="20s" repeatCount="indefinite"
            values="M42.8,-67.4C55.9,-56.9,67.4,-45.5,73.5,-31.5C79.6,-17.5,80.2,-0.9,76.9,14.5C73.6,29.8,66.4,43.9,55.3,54.3C44.2,64.7,29.2,71.4,13.5,73.4C-2.2,75.4,-18.6,72.8,-33.4,66.3C-48.1,59.8,-61.1,49.5,-69.7,35.6C-78.3,21.7,-82.5,4.2,-79.1,-11.5C-75.8,-27.2,-65,-41.1,-51.8,-51.8C-38.6,-62.5,-23,-70,-6.6,-71.1C9.8,-72.2,29.7,-77.9,42.8,-67.4Z;
                   M43.3,-69.6C55.4,-63.5,64.3,-50.3,71.7,-35.8C79.2,-21.3,85.2,-5.4,83.7,9.8C82.2,25,73.1,39.5,61.6,49.7C50.1,59.9,36.2,65.8,21.8,69.1C7.5,72.3,-7.3,72.9,-20.6,68.9C-34,64.9,-45.9,56.4,-57.1,45.7C-68.2,35,-78.6,22.2,-81.9,7.4C-85.2,-7.4,-81.3,-24.1,-73.1,-38.2C-64.8,-52.3,-52.1,-63.7,-38.2,-68.8C-24.3,-73.9,-9.2,-72.6,3.8,-68.8C16.8,-65,31.2,-75.6,43.3,-69.6Z;
                   M42.8,-67.4C55.9,-56.9,67.4,-45.5,73.5,-31.5C79.6,-17.5,80.2,-0.9,76.9,14.5C73.6,29.8,66.4,43.9,55.3,54.3C44.2,64.7,29.2,71.4,13.5,73.4C-2.2,75.4,-18.6,72.8,-33.4,66.3C-48.1,59.8,-61.1,49.5,-69.7,35.6C-78.3,21.7,-82.5,4.2,-79.1,-11.5C-75.8,-27.2,-65,-41.1,-51.8,-51.8C-38.6,-62.5,-23,-70,-6.6,-71.1C9.8,-72.2,29.7,-77.9,42.8,-67.4Z" />
        </path>
      </svg>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-12" data-aos="fade-up">
        <span class="inline-block px-4 py-2 font-bold rounded-full bg-purple-100 text-purple-600 text-sm mb-4">
          Innovate
        </span>
        <h2 class="text-4xl font-display font-bold mb-4">Transform Learning with Our <span
            class="inline-block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-400 text-transparent bg-clip-text">
            Unique
          </span> Features</h2>
        <div class="max-w-2xl mx-auto text-center py-4 text-base md:text-lg font-light leading-relaxed">
          Our LMS is designed to enhance the learning experience for students. With tools for managing lessons and
          tracking progress, we make science engaging and rewarding.
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          title="Manage Lesson Recordings"
          description="Access and organize your recorded lessons, ensuring you never miss important content."
          icon="i-heroicons-camera"
          image="/images/features/lesson-recording.jpg"
          :delay="100" />

        <FeatureCard 
          title="Accessing Learning Resources"
          description="Explore a wide range of study materials designed to support your learning journey."
          icon="i-heroicons-book-open"
          image="/images/features/learning-resources.jpg"
          :delay="200" />

        <FeatureCard 
          title="Engaging Quizzes"
          description="Test your knowledge and evaluate your progress with our interactive quiz system."
          icon="i-heroicons-question-mark-circle"
          image="/images/features/learning-progress.jpg"
          :delay="300" />
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureCard from '@/components/Landing/FeatureCard.vue';
</script>

<style>
@keyframes blob {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  25% {
    transform: translate(20px, -30px) scale(1.1);
  }

  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  75% {
    transform: translate(20px, 30px) scale(0.95);
  }
}

.animate-blob {
  animation: blob 25s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.features-section {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
}
</style>