<template>
    <Header />
    <AuroraBackground>
      <Hero />
    </AuroraBackground>
  
    <ImageGallery />
    <Features />
    <Rewards />
  </template>
  
  <script setup>
  import AuroraBackground from "@/components/Inspira/AuroraBackground.vue";
  import Header from "@/components/Landing/Header.vue";
  import Hero from "@/components/Landing/Hero.vue";
  import Features from "@/components/Landing/Features.vue";
  import ImageGallery from "@/components/Landing/ImageGallery.vue";
  import Rewards from "@/components/Landing/Rewards.vue";
  import AOS from "aos";
  import { onMounted } from "vue";
  
  onMounted(() => {
    AOS.init();
  });
  </script>