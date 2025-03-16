import type { UseFetchOptions } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'

export function useApiClient() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl as string

  const fetchOptions = (): UseFetchOptions<any> => {
    const auth = useAuthStore()
    const options: UseFetchOptions<any> = {
      baseURL,
      credentials: 'include',
    }

    if (auth.accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${auth.accessToken}`
      }
    }

    return options
  }

  return {
    // Composable style API for use in components
    async fetch(endpoint: string, options: UseFetchOptions<any> = {}) {
      return await useFetch(endpoint, {
        ...fetchOptions(),
        ...options,
      })
    },

    // Direct fetch style API for use in stores/utils
    async directFetch<T>(endpoint: string, options: Partial<UseFetchOptions<any>> = {}): Promise<T> {
      return await $fetch<T>(endpoint, {
        ...fetchOptions(),
        ...options,
      } as any)
    }
  }
}