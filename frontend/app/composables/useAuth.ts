import { useAuthStore } from '@/stores/auth'
import type { SignInCredentials } from '@/stores/types/auth.types'

export const useAuth = () => {
    const authStore = useAuthStore()
    const router = useRouter()

    const signIn = async (credentials: SignInCredentials) => {
        return await authStore.signIn(credentials)
    }

    const signOut = async () => {
        authStore.clearAuth()
        await router.push('/auth/sign-in')
    }

    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const user = computed(() => authStore.user)
    const accessToken = computed(() => authStore.accessToken)

    return {
        signIn,
        signOut,
        isAuthenticated,
        user,
        accessToken
    }
}