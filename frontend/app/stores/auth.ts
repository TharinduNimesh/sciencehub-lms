import { defineStore } from 'pinia'
import type { AuthState, SignInCredentials, AuthResponse, User } from './types/auth.types'
import { useApiClient } from '@/composables/useApiClient'

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        accessToken: null,
        isAuthenticated: false
    }),

    actions: {
        async signIn(credentials: SignInCredentials) {
            const { directFetch } = useApiClient()
            try {
                const response = await directFetch<AuthResponse>('/api/auth/sign-in', {
                    method: 'POST',
                    body: credentials
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

        async signOut() {
            const { directFetch } = useApiClient()
            try {
                await directFetch<{ success: boolean, message: string }>('/api/auth/sign-out', {
                    method: 'POST',
                    credentials: 'include',
                });
            } catch (error: any) {
                console.error('Sign out API call failed:', error)
            } finally {
                // Always clear auth state and redirect regardless of API response
                this.clearAuth()
                navigateTo('/auth/sign-in')
                return { success: true }
            }
        },

        updateUser(user: User | null) {
            this.user = user
            this.isAuthenticated = !!user
        },

        updateAccessToken(token: string) {
            this.accessToken = token
        },

        updateSession(user: User | null, accessToken: string) {
            this.updateUser(user)
            this.updateAccessToken(accessToken)
        },

        clearAuth() {
            this.user = null
            this.accessToken = null
            this.isAuthenticated = false
        }
    },

    persist: true
})