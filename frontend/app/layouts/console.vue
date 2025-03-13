<template>
  <div class="flex h-screen bg-gray-50">
    <Console-Sidebar />
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen"
      :class="{ 'blur-sm': sidebarStore.isMobile && sidebarStore.isOpen }">
      <Console-Header />
      
      <!-- Page Content -->
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useSidebarStore } from '~/stores/sidebar'

const sidebarStore = useSidebarStore()
</script>