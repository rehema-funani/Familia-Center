'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth/useAuth'
import { useNotifications } from '@/hooks/common/useNotifications'
import Breadcrumbs from './Breadcrumbs'
import { 
  Bell, 
  Search, 
  HelpCircle, 
  Settings,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react'

interface HeaderProps {
  title?: string
  subtitle?: string
  showBreadcrumbs?: boolean
  actions?: React.ReactNode
  className?: string
}

export default function Header({ 
  title, 
  subtitle, 
  showBreadcrumbs = true, 
  actions,
  className = '' 
}: HeaderProps) {
  const { user } = useAuth()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  // Quick stats for dashboard context
  const quickStats = {
    nextSession: '2:00 PM Today',
    unreadMessages: 3,
    pendingTasks: 2
  }

  const handleNotificationClick = (notificationId: string) => {
    markAsRead(notificationId)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchQuery)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'info':
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Main Header Content */}
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Title and Breadcrumbs */}
          <div className="flex-1 min-w-0">
            {showBreadcrumbs && (
              <div className="mb-1">
                <Breadcrumbs />
              </div>
            )}
            
            {title && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Search, Quick Actions, Notifications */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              {showSearch ? (
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search sessions, courses, resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                    onBlur={() => !searchQuery && setShowSearch(false)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  title="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Quick Stats - visible on larger screens */}
            <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Next: {quickStats.nextSession}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{quickStats.pendingTasks} pending</span>
              </div>
            </div>

            {/* Help */}
            <Link
              href="/support/help"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title="Help & Support"
            >
              <HelpCircle className="h-5 w-5" />
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-500"
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {notifications.length > 0 ? (
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {notifications.slice(0, 8).map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification.id)}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                              notification.read 
                                ? 'bg-gray-50 border-gray-200' 
                                : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No new notifications</p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link
                        href="/dashboard/notifications"
                        className="block text-center text-sm text-blue-600 hover:text-blue-500"
                        onClick={() => setShowNotifications(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <Link
              href="/dashboard/settings"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </Link>

            {/* Custom Actions */}
            {actions && (
              <div className="flex items-center space-x-2">
                {actions}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </form>
        </div>
      </div>
    </header>
  )
}