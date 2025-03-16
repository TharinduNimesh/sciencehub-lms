import { useAuthStore } from '~/stores/auth'
import type { SignInCredentials, User } from '~/stores/types/auth.types'

export const useAuth = () => {
    const authStore = useAuthStore()
    const router = useRouter()

    const signIn = async (credentials: SignInCredentials) => {
        return await authStore.signIn(credentials)
    }

    const signOut = async () => {
        authStore.clearAuth()
        navigateTo('/auth/sign-in')
    }

    const updateUser = (user: User | null) => {
        authStore.updateUser(user)
    }

    const updateAccessToken = (token: string) => {
        authStore.updateAccessToken(token)
    }

    const updateSession = (user: User | null, accessToken: string) => {
        authStore.updateSession(user, accessToken)
    }

    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const user = computed(() => authStore.user)
    const accessToken = computed(() => authStore.accessToken)

    return {
        signIn,
        signOut,
        updateUser,
        updateAccessToken,
        updateSession,
        isAuthenticated,
        user,
        accessToken
    }
}