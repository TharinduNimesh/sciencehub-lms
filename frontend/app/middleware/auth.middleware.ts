import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(() => {
    if (import.meta.server) return

    const auth = useAuth()
    
    // Only check auth status, initialization is handled by plugin
    if (!auth.isAuthenticated.value || !auth.user.value) {
        return navigateTo('/auth/sign-in')
    }
})