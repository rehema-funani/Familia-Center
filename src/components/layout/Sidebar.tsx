'use client'

import { useState } from 'react'
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
  Settings,
  Shield,
  Users,
  CreditCard,
  BarChart3,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

interface SidebarProps {
  className?: string
}

interface NavItem {
  name: string
  href: string
  icon: any
  roles?: string[]
  children?: NavItem[]
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    )
  }

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

  const renderNavItem = (item: NavItem, level = 0) => {
    if (!canAccess(item.roles)) return null

    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.name)
    const active = isActive(item.href)

    return (
      <div key={item.name} className="mb-1">
        <div className="flex items-center">
          <Link
            href={item.href}
            className={`
              flex items-center flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
              ${level > 0 ? 'ml-6' : ''}
              ${active
                ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
          >
            <item.icon className={`mr-3 h-5 w-5 ${active ? 'text-blue-700' : 'text-gray-400'}`} />
            {item.name}
          </Link>
          
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.name)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`fixed left-0 top-16 h-full w-64 bg-white shadow-sm border-r border-gray-200 overflow-y-auto ${className}`}>
      <div className="p-4">
        {/* Main Navigation */}
        <div className="mb-8">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Main Menu
          </h3>
          <nav className="space-y-1">
            {navigationItems.map(item => renderNavItem(item))}
          </nav>
        </div>

        {/* Counselor Section */}
        {canAccess(['counselor', 'admin']) && (
          <div className="mb-8">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Counselor Tools
            </h3>
            <nav className="space-y-1">
              {counselorItems.map(item => renderNavItem(item))}
            </nav>
          </div>
        )}

        {/* Admin Section */}
        {canAccess(['admin']) && (
          <div className="mb-8">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Administration
            </h3>
            <nav className="space-y-1">
              {adminItems.map(item => renderNavItem(item))}
            </nav>
          </div>
        )}

        {/* Settings */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <nav className="space-y-1">
            <Link
              href="/dashboard/profile"
              className={`
                flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
                ${isActive('/dashboard/profile')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <Settings className="mr-3 h-5 w-5 text-gray-400" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}