<template>
    <header class="bg-white border-b border-gray-100 px-6 min-h-[4rem] flex items-center">
        <div class="flex items-center justify-between w-full">
            <UButton icon="i-heroicons-bars-3-bottom-right"
                :icon="sidebarStore.isOpen ? 'i-heroicons-bars-3-bottom-right' : 'i-heroicons-bars-3'" color="gray"
                variant="ghost" size="sm" @click="sidebarStore.toggle()" />
            <UDropdown :items="menuItems" :popper="{ placement: 'bottom-end', arrow: true  }">
                <div class="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                    <div class="text-right">
                        <h2 class="font-semibold">Welcome back, {{ authStore.user?.name }}!</h2>
                        <p class="text-sm text-gray-500 capitalize">{{ authStore.user?.role }}</p>
                    </div>
                    <UAvatar
                        :src="authStore.user?.avatar || 'https://placehold.co/40x40'"
                        :alt="authStore.user?.name"
                        size="md"
                    />
                </div>
            </UDropdown>
        </div>
    </header>
</template>

<script setup>
import { useSidebarStore } from '~/stores/sidebar'
import { useAuthStore } from '~/stores/auth'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

const menuItems = [
    [{
        label: authStore.user?.name,
        avatar: {
            src: authStore.user?.avatar || 'https://placehold.co/40x40'
        }
    }],
    [{
        label: 'View Profile',
        icon: 'i-heroicons-user-circle-20-solid',
        to: '/profile',
        shortcuts: ['P']
    },
    {
        label: 'Settings',
        icon: 'i-heroicons-cog-6-tooth-20-solid',
        to: '/settings',
        shortcuts: ['S']
    }],
    [{
        label: 'Help Center',
        icon: 'i-heroicons-question-mark-circle-20-solid',
        to: '/help'
    },
    {
        label: 'Documentation',
        icon: 'i-heroicons-book-open-20-solid',
        to: '/docs'
    }],
    [{
        label: 'Logout',
        icon: 'i-heroicons-arrow-right-on-rectangle-20-solid',
        shortcuts: ['⌘', 'L'],
        click: () => authStore.logout()
    }]
]
</script>