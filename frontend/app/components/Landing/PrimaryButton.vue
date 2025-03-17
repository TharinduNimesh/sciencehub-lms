<template>
  <Motion
    :initial="{ scale: 1 }"
    :whileHover="{ scale: 1.02 }"
    :whileTap="{ scale: 0.98 }"
    class="inline-block"
  >
    <button
      :class="[
        'inline-flex items-center justify-center rounded-full font-medium text-white',
        'bg-gradient-to-r from-violet-500 to-indigo-500',
        'shadow-lg shadow-violet-500/25',
        'transition-all duration-200',
        'hover:from-violet-400 hover:to-indigo-400 hover:shadow-violet-500/40',
        'disabled:cursor-not-allowed',
        loading ? 'relative overflow-hidden animate-shimmer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent' : 'disabled:opacity-70 disabled:hover:shadow-violet-500/25',
        sizeClasses[size],
      ]"
      :disabled="disabled || loading"
      v-bind="$attrs"
    >
      <Motion
        :initial="{ x: 0 }"
        :whileHover="{ x: 3 }"
        class="flex items-center"
      >
        <span v-if="loading" class="mr-2">
          <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
        <slot name="icon-left" />
        <span :class="{ 'mx-2': $slots['icon-left'] || $slots['icon-right'] }">
          <slot />
        </span>
        <slot name="icon-right" />
      </Motion>
    </button>
  </Motion>
</template>

<script setup>
import { Motion } from 'motion-v'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}
</script>
