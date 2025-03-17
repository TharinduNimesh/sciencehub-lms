import { useAuth } from '~/composables/useAuth'

export default defineNuxtPlugin(async () => {
    // Only run on client-side
    if (import.meta.client) {
        const auth = useAuth()
        await auth.initializeAuth()
    }
})