import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'moderator' | 'student'
}

// Default admin user
const defaultUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@sciencehub.com',
  role: 'admin'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: defaultUser as User | null,
    isAuthenticated: true
  }),
  
  actions: {
    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
    },

    getCurrentUserRole(): 'admin' | 'moderator' | 'student' | null {
      return this.user?.role || null
    }
  }
})