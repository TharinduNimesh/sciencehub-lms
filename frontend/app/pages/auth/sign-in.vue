<template>
    <div class="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
        <!-- Blob Elements -->
        <div class="absolute inset-0 z-0">
            <div
                class="absolute top-[20%] left-[5%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl animate-blob">
            </div>
            <div
                class="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-3xl animate-blob animation-delay-2000">
            </div>
        </div>

        <!-- Login Container -->
        <Motion :initial="{ opacity: 0, y: 20, scale: 0.95 }" :whileInView="{ opacity: 1, y: 0, scale: 1 }"
            :transition="{ type: 'spring', stiffness: 50, damping: 15 }" class="w-full max-w-md z-10">
            <!-- Branding Outside Card -->
            <div class="text-center mb-6 mx-4">
                <div class="flex items-center justify-center space-x-3 mb-4">
                    <img src="/logo.png" alt="ScienceLab Logo" class="h-10 w-auto">
                    <span class="font-bold text-2xl text-gray-600">SCIENCE<span
                            class="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-300 text-transparent bg-clip-text">LAB</span>
                    </span>
                </div>
            </div>

            <div class="mx-4">
                <div class="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl">
                    <!-- Title -->
                    <div class="text-center mb-8">
                        <h1
                            class="text-2xl font-display font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
                            Welcome Back!</h1>
                        <p class="text-gray-600 mt-2 text-sm font-medium">Sign in to continue your learning journey</p>
                    </div>

                    <!-- Login Form -->
                    <UForm :schema="signInSchema" :state="formState" @submit="handleLogin" class="space-y-6">
                        <UFormGroup label="Email" name="email">
                            <UInput v-model="formState.email" type="email" placeholder="Enter your email"
                                icon="i-heroicons-envelope" />
                        </UFormGroup>

                        <UFormGroup label="Password" name="password">
                            <UInput v-model="formState.password" placeholder="Enter your password"
                                icon="i-heroicons-key" :type="showPassword ? 'text' : 'password'" />
                        </UFormGroup>

                        <div class="flex items-center justify-between">
                            <UCheckbox v-model="formState.rememberMe" name="remember" label="Remember me" />
                            <NuxtLink to="/auth/forgot-password"
                                class="text-sm text-violet-600 hover:text-violet-500 font-medium">
                                Forgot password?
                            </NuxtLink>
                        </div>

                        <div class="pt-2">
                            <PrimaryButton type="submit" class="w-full justify-center" size="md" :loading="isLoading">
                                Sign In
                            </PrimaryButton>
                        </div>
                    </UForm>

                    <div class="mt-6 text-center text-sm">
                        <span class="text-gray-500">Don't have an account yet?</span>
                        <NuxtLink to="/auth/sign-up" class="text-violet-600 hover:text-violet-500 font-medium ml-1">
                            Join Now
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </Motion>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Motion } from 'motion-v'
import PrimaryButton from '@/components/Landing/PrimaryButton.vue'
import { signInSchema, type SignInFormData } from '@/schemas'
import { useAuthStore } from '@/stores/auth'
import { useNotification } from '@/composables/useNotification'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const authStore = useAuthStore()
const notification = useNotification()
const { isAuthenticated } = useAuth()

const formState = reactive<SignInFormData>({
    email: '',
    password: '',
    rememberMe: false
})

const showPassword = ref<boolean>(false)
const isLoading = ref<boolean>(false)

onMounted(async () => {
    if (isAuthenticated.value) {
        navigateTo('/console/dashboard')
    }
})

const handleLogin = async (event: { data: SignInFormData }) => {
    isLoading.value = true
    try {
        const validatedData = signInSchema.parse(event.data)
        const result = await authStore.signIn({
            email: validatedData.email,
            password: validatedData.password
        })

        if (result.success) {
            notification.success('Welcome back!', 'Successfully signed in')
            navigateTo('/console/dashboard')
        } else {
            notification.error('Sign In Failed', result.error || 'Please check your credentials and try again.')
        }
    } catch (error) {
        console.error('Validation error:', error)
        notification.error('Invalid Input', 'Please check your input and try again.')
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
@keyframes blob {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    25% {
        transform: translate(20px, -30px) scale(1.1);
    }

    50% {
        transform: translate(-20px, 20px) scale(0.9);
    }

    75% {
        transform: translate(20px, 30px) scale(0.95);
    }
}

.animate-blob {
    animation: blob 25s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}
</style>