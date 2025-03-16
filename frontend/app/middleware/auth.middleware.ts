import { useAuth } from '~/composables/useAuth'
import { useApiClient } from '~/composables/useApiClient'
import type { UserRole } from '~/stores/types/auth.types'

interface RefreshTokenResponse {
    success: boolean
    accessToken?: string
    user?: {
        id: string
        email: string
        firstName: string
        lastName: string
        role: UserRole
    }
    error?: string
    code?: string
}

export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) return

    const auth = useAuth()
    const { directFetch } = useApiClient()

    // Check if we have auth data after store sync
    if (!auth.isAuthenticated.value || !auth.user.value) {
        return navigateTo('/auth/sign-in')
    }

    try {
        // Try to refresh the token
        const response = await directFetch<RefreshTokenResponse>('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include' // Important for cookies
        })

        if (response.success && response.user && response.accessToken) {
            // Update the session with new user data and access token
            auth.updateSession(response.user, response.accessToken)
            return
        }

        // If refresh fails, redirect to login
        return navigateTo('/auth/sign-in')

    } catch (error) {
        console.error('Auth middleware error:', error)
        return navigateTo('/auth/sign-in')
    }
})