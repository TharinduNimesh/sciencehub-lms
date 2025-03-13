export default defineAppConfig({
    ui: {
      primary: 'indigo',
      gray: 'zinc',
      input: {
        default: {
          size: "lg",
          // color: "gray",
        },
      },
      textarea: {
        default: {
          size: "lg",
          // color: "gray",
        },
      },
      select: {
        default: {
          size: "lg",
          // color: "gray",
        },
      },
      button: {
        default: {
          size: "lg",
          // color: 'gray',
        },
      },
      formGroup: {
        default: {
          size: "lg",
        },
      },
      checkbox: {
        default: {
          size: "lg",
        },
      },
      toggle: {
        default: {
          size: "lg",
        },
      },
      radio: {
        default: {
          size: "lg",
        },
      },
      card: {
        background: 'bg-white dark:bg-zinc-900',
        divide: 'divide-zinc-200 dark:divide-zinc-800',
        ring: 'ring-1 ring-zinc-200 dark:ring-zinc-800',
      },
      header: {
        wrapper: 'bg-white dark:bg-zinc-900',
        links: 'text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary'
      },
      footer: {
        wrapper: 'bg-white dark:bg-zinc-900'
      }
    }
  });