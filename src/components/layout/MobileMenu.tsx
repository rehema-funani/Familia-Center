'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth/useAuth'
import {
  Home,
  Video,
  Calendar,
  BookOpen,
  FileText,
  History,
  UserCheck,
  Shield,
  Users,
  CreditCard,
  BarChart3,
  X
} from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  name: string
  href: string
  icon: any
  roles?: string[]
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  // Close menu when route changes
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navigationItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home
    },
    {
      name: 'Live Sessions',
      href: '/dashboard/live-sessions',
      icon: Video
    },
    {
      name: 'Recorded Library',
      href: '/dashboard/recorded-library',
      icon: BookOpen
    },
    {
      name: 'Private Bookings',
      href: '/dashboard/private-bookings',
      icon: Calendar
    },
    {
      name: 'Teaching Modules',
      href: '/dashboard/teaching-modules',
      icon: FileText
    },
    {
      name: 'Anonymous Access',
      href: '/dashboard/anonymous-access',
      icon: UserCheck
    },
    {
      name: 'Resources',
      href: '/dashboard/resources',
      icon: BookOpen
    },
    {
      name: 'Session History',
      href: '/dashboard/session-history',
      icon: History
    }
  ]

  const counselorItems: NavItem[] = [
    {
      name: 'Counselor Dashboard',
      href: '/counselor-dashboard',
      icon: BarChart3
    },
    {
      name: 'Sessions',
      href: '/counselor/sessions',
      icon: Video
    },
    {
      name: 'Resources',
      href: '/counselor-resources',
      icon: FileText
    }
  ]

  const adminItems: NavItem[] = [
    {
      name: 'Admin Dashboard',
      href: '/admin-dashboard',
      icon: Shield
    },
    {
      name: 'User Management',
      href: '/admin/users',
      icon: Users
    },
    {
      name: 'Program Management',
      href: '/admin/programs',
      icon: BookOpen
    },
    {
      name: 'Payments',
      href: '/admin/payments',
      icon: CreditCard
    }
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const canAccess = (roles?: string[]) => {
    if (!roles) return true
    return roles.includes(user?.role || '')
  }

  const renderNavItem = (item: NavItem) => {
    if (!canAccess(item.roles)) return null

    const active = isActive(item.href)

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`
          flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors duration-200
          ${active
            ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }
        `}
      >
        <item.icon className={`mr-3 h-6 w-6 ${active ? 'text-blue-700' : 'text-gray-400'}`} />
        {item.name}
      </Link>
    )
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="lg:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75" onClick={onClose} />

      {/* Mobile menu */}
      <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <span className="text-xl font-bold text-blue-600">Family Center</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-4">
          {/* User info */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-2 pt-4">
            {/* Main Navigation */}
            <div className="mb-6">
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Main Menu
              </h3>
              <nav className="space-y-1">
                {navigationItems.map(item => renderNavItem(item))}
              </nav>
            </div>

            {/* Counselor Section */}
            {canAccess(['counselor', 'admin']) && (
              <div className="mb-6">
                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Counselor Tools
                </h3>
                <nav className="space-y-1">
                  {counselorItems.map(item => renderNavItem(item))}
                </nav>
              </div>
            )}

            {/* Admin Section */}
            {canAccess(['admin']) && (
              <div className="mb-6">
                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Administration
                </h3>
                <nav className="space-y-1">
                  {adminItems.map(item => renderNavItem(item))}
                </nav>
              </div>
            )}
          </div>

          {/* Profile Links */}
          <div className="px-2 pt-4 border-t border-gray-200 mt-6">
            <nav className="space-y-1">
              <Link
                href="/dashboard/profile"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md"
              >
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  // Handle logout
                  onClose()
                }}
                className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
              >
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}