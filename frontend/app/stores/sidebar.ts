import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpen: true,
    isMobile: false
  }),
  
  actions: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    
    checkMobile() {
      this.isMobile = window.innerWidth < 1024
      if (this.isMobile) {
        this.isOpen = false
      }
    },

    initializeWindowResize() {
      this.checkMobile()
      window.addEventListener('resize', this.checkMobile)
    },

    cleanup() {
      window.removeEventListener('resize', this.checkMobile)
    }
  }
})