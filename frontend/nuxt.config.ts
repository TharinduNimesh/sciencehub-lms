// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', 'pinia-plugin-persistedstate'],

  // Nuxt 4.0
  future: {
    compatibilityVersion: 4
  },

  colorMode: {
    preference: 'light'
  },

  tailwindcss: {
    cssPath: '~/assets/css/app.css',
    configPath: '~/tailwind.config.js',
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
    }
  }
})