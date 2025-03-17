export const useNotification = () => {
  const toast = useToast()

  const success = (title: string, description?: string) => {
    toast.add({
      title,
      description,
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 5000
    })
  }

  const error = (title: string, description?: string) => {
    toast.add({
      title,
      description,
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 8000
    })
  }

  const info = (title: string, description?: string) => {
    toast.add({
      title,
      description,
      icon: 'i-heroicons-information-circle',
      color: 'blue',
      timeout: 5000
    })
  }

  const warning = (title: string, description?: string) => {
    toast.add({
      title,
      description,
      icon: 'i-heroicons-exclamation-triangle',
      color: 'yellow',
      timeout: 6000
    })
  }

  return {
    success,
    error,
    info,
    warning,
    // Expose original toast in case it's needed
    toast
  }
}