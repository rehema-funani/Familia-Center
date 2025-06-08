'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth/useAuth'
import { useNotifications } from '@/hooks/common/useNotifications'
import { Bell, Menu, User, Settings, LogOut, Search } from 'lucide-react'

interface NavigationProps {
  onMobileMenuToggle: () => void
  isMobileMenuOpen: boolean
}

export default function Navigation({ onMobileMenuToggle, isMobileMenuOpen }: NavigationProps) {
  const { user, logout } = useAuth()
  const { notifications, unreadCount } = useNotifications()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = async () => {
    await logout()
    setShowProfileMenu(false)
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link href="/dashboard" className="flex items-center ml-4 lg:ml-0">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">Family Center</span>
              </div>
            </Link>

            {/* Search bar - hidden on mobile */}
            <div className="hidden md:block ml-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search sessions, courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Notifications</h3>
                    {notifications.length > 0 ? (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {notifications.slice(0, 5).map((notification) => (
                          <div key={notification.id} className="p-3 bg-gray-50 rounded-md">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No new notifications</p>
                    )}
                    <Link
                      href="/dashboard/notifications"
                      className="block mt-3 text-sm text-blue-600 hover:text-blue-500"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
              </button>

              {/* Profile dropdown menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="p-2">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mt-2"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md mt-2"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}