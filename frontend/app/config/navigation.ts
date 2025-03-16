interface NavigationItem {
  title: string;
  href: string;
  icon: string;
  access: string[];
}

interface NavigationSection {
  title: string;
  access: string[];
  items: NavigationItem[];
}

export const navSections: NavigationSection[] = [
  {
    title: "Core",
    access: ['ADMIN', 'MODERATOR', 'STUDENT'],
    items: [
      {
        title: 'Dashboard',
        href: '/console/dashboard',
        icon: 'i-heroicons-squares-2x2',
        access: ['ADMIN', 'MODERATOR', 'STUDENT']
      },
      {
        title: 'Join Requests',
        href: '/console/join-requests',
        icon: 'i-heroicons-users',
        access: ['ADMIN']
      },
      {
        title: 'Resources Hub',
        href: '/console/resources-hub',
        icon: 'i-heroicons-chat-bubble-left-right',
        access: ['ADMIN', 'MODERATOR', 'STUDENT']
      }
    ]
  },
  {
    title: "Academic",
    access: ['ADMIN', 'MODERATOR', 'STUDENT'],
    items: [
      {
        title: 'Classes',
        href: '/console/classes',
        icon: 'i-heroicons-book-open',
        access: ['ADMIN', 'MODERATOR', 'STUDENT']
      },
      {
        title: 'Attendance',
        href: '/console/attendance',
        icon: 'i-heroicons-calendar',
        access: ['ADMIN', 'MODERATOR', 'STUDENT']
      },
      {
        title: 'Lessons',
        href: '/console/lessons',
        icon: 'i-heroicons-academic-cap',
        access: ['ADMIN', 'MODERATOR', 'STUDENT']
      },
      {
        title: 'Quizzes',
        href: '/console/quizzes',
        icon: 'i-heroicons-clipboard-document-list',
        access: ['ADMIN', 'MODERATOR', 'STUDENT']
      }
    ]
  },
  {
    title: "Administration",
    access: ['ADMIN', 'MODERATOR'],
    items: [
      {
        title: 'Student Management',
        href: '/console/students',
        icon: 'i-heroicons-users',
        access: ['ADMIN', 'MODERATOR']
      },
      {
        title: 'Moderator Management',
        href: '/console/moderators',
        icon: 'i-heroicons-user-group',
        access: ['ADMIN']
      },
      {
        title: 'Fees Management',
        href: '/console/fees',
        icon: 'i-heroicons-credit-card',
        access: ['ADMIN']
      },
      {
        title: 'Product Management',
        href: '/console/products',
        icon: 'i-heroicons-shopping-bag',
        access: ['ADMIN']
      }
    ]
  }
]