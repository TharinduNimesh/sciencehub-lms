import { defineStore } from 'pinia'
import type { AuthState, SignInCredentials, AuthResponse } from './types/auth.types'

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        accessToken: null,
        isAuthenticated: false
    }),

    actions: {
        async signIn(credentials: SignInCredentials) {
            const config = useRuntimeConfig()
            try {
                const response = await $fetch<AuthResponse>(`${config.public.apiBaseUrl}/api/auth/sign-in`, {
                    method: 'POST',
                    body: credentials,
                    credentials: 'include'
                })

                if (response.success && response.user && response.accessToken) {
                    this.user = response.user
                    this.accessToken = response.accessToken
                    this.isAuthenticated = true
                    return { success: true }
                }

                return { 
                    success: false, 
                    error: response.error || 'Authentication failed' 
                }
            } catch (error: any) {
                const errorMessage = error.data?.error || 'Authentication failed'
                return { 
                    success: false, 
                    error: errorMessage,
                    code: error.data?.code 
                }
            }
        },

        clearAuth() {
            this.user = null
            this.accessToken = null
            this.isAuthenticated = false
        }
    },

    persist: true
})