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
    access: ['admin', 'moderator', 'student'],
    items: [
      {
        title: 'Dashboard',
        href: '/console/dashboard',
        icon: 'i-heroicons-squares-2x2',
        access: ['admin', 'moderator', 'student']
      },
      {
        title: 'Join Requests',
        href: '/console/join-requests',
        icon: 'i-heroicons-users',
        access: ['admin']
      },
      {
        title: 'Resources Hub',
        href: '/console/resources-hub',
        icon: 'i-heroicons-chat-bubble-left-right',
        access: ['admin', 'moderator', 'student']
      }
    ]
  },
  {
    title: "Academic",
    access: ['admin', 'moderator', 'student'],
    items: [
      {
        title: 'Classes',
        href: '/console/classes',
        icon: 'i-heroicons-book-open',
        access: ['admin', 'moderator', 'student']
      },
      {
        title: 'Attendance',
        href: '/console/attendance',
        icon: 'i-heroicons-calendar',
        access: ['admin', 'moderator', 'student']
      },
      {
        title: 'Lessons',
        href: '/console/lessons',
        icon: 'i-heroicons-academic-cap',
        access: ['admin', 'moderator', 'student']
      },
      {
        title: 'Quizzes',
        href: '/console/quizzes',
        icon: 'i-heroicons-clipboard-document-list',
        access: ['admin', 'moderator', 'student']
      }
    ]
  },
  {
    title: "Administration",
    access: ['admin', 'moderator'],
    items: [
      {
        title: 'Student Management',
        href: '/console/students',
        icon: 'i-heroicons-users',
        access: ['admin', 'moderator']
      },
      {
        title: 'Moderator Management',
        href: '/console/moderators',
        icon: 'i-heroicons-user-group',
        access: ['admin']
      },
      {
        title: 'Fees Management',
        href: '/console/fees',
        icon: 'i-heroicons-credit-card',
        access: ['admin']
      },
      {
        title: 'Product Management',
        href: '/console/products',
        icon: 'i-heroicons-shopping-bag',
        access: ['admin']
      }
    ]
  }
]