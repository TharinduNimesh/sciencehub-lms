<template>
  <div>
    <!-- Sidebar overlay for mobile -->
    <div v-if="sidebarStore.isMobile && sidebarStore.isOpen" 
      @click="sidebarStore.toggle()"
      class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 transition-all duration-300">
    </div>

    <!-- Sidebar -->
    <aside
      style="min-width: 0;" 
      :style="sidebarStore.isMobile ? '' : (sidebarStore.isOpen ? 'width: 230px; min-width: 230px;' : 'width: 4rem; min-width: 4rem;')"
      :class="[
        'transition-all duration-300 ease-in-out h-full border-r border-gray-100',
        'bg-white flex flex-col',
        sidebarStore.isMobile ? 'fixed z-50' : 'relative flex-shrink-0',
        sidebarStore.isMobile ? (sidebarStore.isOpen ? 'translate-x-0 w-[250px]' : '-translate-x-full w-[250px]') : ''
      ]"
    >
      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center h-16 px-4 border-b border-gray-100 hover:bg-gray-50 transition-all duration-300">
        <div class="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="ScienceHub" 
            class="h-8 w-8 flex-shrink-0 object-contain hover:scale-105 transition-transform duration-200" 
          />
          <div 
            class="flex flex-col transition-all duration-300"
            :class="{ 'opacity-0 scale-0': !sidebarStore.isOpen && !sidebarStore.isMobile }"
          >
            <h1 class="text-xl font-bold text-gray-700 whitespace-nowrap leading-tight">
              SCIENCE<span class="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-300 text-transparent bg-clip-text">HUB</span>
            </h1>
            <span class="text-xs text-gray-500 whitespace-nowrap">Learning Management</span>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300" v-if="filteredNavSections.length">
        <!-- Core Navigation -->
        <div v-for="section in filteredNavSections" :key="section.title" 
          class="last:mb-0"
          :class="[
            !sidebarStore.isOpen && !sidebarStore.isMobile ? 'mb-4' : 'mb-4'
          ]"
        >
          <p class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider transition-all duration-300"
            :class="{ 
              'opacity-0 h-0 overflow-hidden': !sidebarStore.isOpen && !sidebarStore.isMobile,
              'mb-1': sidebarStore.isOpen || sidebarStore.isMobile 
            }">
            {{ section.title }}
          </p>
          <template v-if="section.items.length" v-for="item in section.items" :key="item.title">
            <NuxtLink v-if="hasAccess(item.access)" 
              :to="item.href"
              :class="[
                'flex items-center gap-3 rounded-lg transition-all duration-200',
                'text-gray-500 hover:bg-gray-50',
                'my-1 group hover:text-gray-700',
                isActiveRoute(item.href) ? 'bg-purple-50 text-purple-600' : '',
                !sidebarStore.isOpen && !sidebarStore.isMobile ? 'justify-center w-10 h-10 mx-auto p-2' : 'px-4 py-2.5'
              ]">
              <UIcon :name="item.icon" 
                class="flex-shrink-0 w-5 h-5 transition-all duration-200 group-hover:scale-110" />
              <span :class="[
                'font-medium transition-all duration-300',
                !sidebarStore.isOpen && !sidebarStore.isMobile ? 'opacity-0 w-0 hidden' : 'truncate'
              ]" :title="item.title">{{ item.title }}</span>
            </NuxtLink>
          </template>
        </div>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { useSidebarStore } from '~/stores/sidebar'
import { useAuthStore } from '~/stores/auth'
import { computed, onMounted, onUnmounted } from 'vue'
import { navSections } from '~/config/navigation'

const route = useRoute()
const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

// Computed property to filter sections based on user role
const filteredNavSections = computed(() => {
  const user = authStore.user
  if (!user) return []
  
  return navSections.filter(section => {
    // If no access restrictions specified, show the section
    if (!section.access) return true
    // Check if user has any of the required roles
    return section.access.some(role => {
      const userRoles = user.roles || [user.role]
      return userRoles.some(userRole => 
        userRole?.toUpperCase() === role?.toUpperCase()
      )
    })
  })
})

// Helper function to check access
const hasAccess = (allowedRoles) => {
  if (!allowedRoles || !Array.isArray(allowedRoles)) return true
  const user = authStore.user
  if (!user) return false
  const userRoles = user.roles || [user.role]
  return allowedRoles.some(role => 
    userRoles.some(userRole => 
      userRole?.toUpperCase() === role?.toUpperCase()
    )
  )
}

const isActiveRoute = (path) => {
  return route.path === path
}

onMounted(() => {
  sidebarStore.initializeWindowResize()
})

onUnmounted(() => {
  sidebarStore.cleanup()
})
</script>