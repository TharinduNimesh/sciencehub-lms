<template>
  <div class="p-6">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div v-for="stat in stats" :key="stat.name" 
        class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-gray-500">{{ stat.name }}</h3>
          <UIcon :name="stat.icon" class="text-purple-500" />
        </div>
        <p class="text-2xl font-semibold mt-2">{{ stat.value }}</p>
        <p class="text-sm text-green-500 mt-2">
          <span>↑ {{ stat.increase }}</span>
          <span class="text-gray-500 ml-1">vs last month</span>
        </p>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 class="font-semibold mb-4">Engagement Overview</h3>
        <!-- Placeholder for chart -->
        <div class="h-64 bg-gray-50 rounded-lg"></div>
      </div>
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 class="font-semibold mb-4">Visitor Demographics</h3>
        <!-- Placeholder for chart -->
        <div class="h-64 bg-gray-50 rounded-lg"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'console'
})

const stats = [
  { name: 'Facebook Followers', value: '24.5K', increase: '12%', icon: 'i-heroicons-users' },
  { name: 'LinkedIn Connections', value: '12.8K', increase: '8%', icon: 'i-heroicons-user-group' },
  { name: 'Instagram Followers', value: '35.7K', increase: '15%', icon: 'i-heroicons-heart' },
  { name: 'Twitter Followers', value: '18.3K', increase: '10%', icon: 'i-heroicons-chat-bubble-left' },
]
</script>