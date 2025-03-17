import { useAuthStore } from '~/stores/auth'
import type { SignInCredentials, User } from '~/stores/types/auth.types'

// Time in milliseconds before token expiry when we should refresh
const REFRESH_THRESHOLD = 5 * 60 * 1000 // 5 minutes
const TOKEN_EXPIRY = 15 * 60 * 1000 // 15 minutes

interface RefreshTokenResponse {
    success: boolean
    accessToken?: string
    user?: User
    error?: string
    code?: string
}

// Global state for refresh timer
let refreshTimeout: NodeJS.Timeout | null = null
let isInitialized = false

export const useAuth = () => {
    const authStore = useAuthStore()
    const { directFetch } = useApiClient()
    
    const initializeAuth = async () => {
        // Prevent multiple initializations
        if (isInitialized) {
            return
        }
        
        if (authStore.isAuthenticated && authStore.accessToken) {
            // If we have an existing session, try to refresh the token
            const success = await refreshToken()
            if (!success) {
                // If refresh fails, clear the session
                authStore.updateSession(null, '')
                return navigateTo('/auth/sign-in')
            }
        }
        isInitialized = true
    }
    
    const signIn = async (credentials: SignInCredentials) => {
        const result = await authStore.signIn(credentials)
        if (result.success) {
            scheduleTokenRefresh()
        }
        return result
    }
    
    const signOut = async () => {
        clearRefreshTimeout()
        const result = await authStore.signOut()
        if (result.success) {
            isInitialized = false
            navigateTo('/auth/sign-in')
        }
        return result
    }

    const refreshToken = async (): Promise<boolean> => {
        try {
            const response = await directFetch<RefreshTokenResponse>('/api/auth/refresh-token', {
                method: 'POST',
                credentials: 'include' // Ensure cookies are sent
            })

            if (response.success && response.user && response.accessToken) {
                // Don't schedule refresh here, it will be scheduled by updateSession
                updateSession(response.user, response.accessToken)
                return true
            }
            return false
        } catch (error) {
            console.error('Token refresh failed:', error)
            return false
        }
    }

    const scheduleTokenRefresh = () => {
        clearRefreshTimeout()
        refreshTimeout = setTimeout(async () => {
            const success = await refreshToken()
            if (!success) {
                navigateTo('/auth/sign-in')
            }
        }, TOKEN_EXPIRY - REFRESH_THRESHOLD)
    }

    const clearRefreshTimeout = () => {
        if (refreshTimeout) {
            clearTimeout(refreshTimeout)
            refreshTimeout = null
        }
    }

    const updateUser = (user: User | null) => {
        authStore.updateUser(user)
    }

    const updateAccessToken = (token: string) => {
        authStore.updateAccessToken(token)
        if (token) {
            scheduleTokenRefresh()
        }
    }

    const updateSession = (user: User | null, accessToken: string) => {
        authStore.updateSession(user, accessToken)
        if (user && accessToken) {
            scheduleTokenRefresh()
        }
    }

    return {
        signIn,
        signOut,
        updateUser,
        updateAccessToken,
        updateSession,
        refreshToken,
        initializeAuth,
        isAuthenticated: computed(() => authStore.isAuthenticated),
        user: computed(() => authStore.user),
        accessToken: computed(() => authStore.accessToken)
    }
}