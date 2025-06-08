'use client'

import { useState, useEffect, useCallback } from 'react'

// Types
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionLabel?: string
  persistent?: boolean
  userId?: string
}

interface NotificationPreferences {
  email: boolean
  sms: boolean
  inApp: boolean
  sessionReminders: boolean
  systemUpdates: boolean
  marketingEmails: boolean
}

interface UseNotificationsReturn {
  notifications: Notification[]
  unreadCount: number
  preferences: NotificationPreferences
  isLoading: boolean
  error: string | null
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  removeNotification: (notificationId: string) => void
  clearAllNotifications: () => void
  updatePreferences: (prefs: Partial<NotificationPreferences>) => Promise<void>
  sendTestNotification: () => void
  refreshNotifications: () => Promise<void>
}

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    sms: true,
    inApp: true,
    sessionReminders: true,
    systemUpdates: true,
    marketingEmails: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load notifications on mount
  useEffect(() => {
    loadNotifications()
    loadPreferences()
  }, [])

  // Auto-refresh notifications every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshNotifications()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const loadNotifications = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const token = localStorage.getItem('auth_token')
      if (!token) return

      const response = await fetch('/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })))
      }
    } catch (err) {
      setError('Failed to load notifications')
      console.error('Notification loading error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const loadPreferences = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return

      const response = await fetch('/api/notifications/preferences', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setPreferences(data.preferences)
      }
    } catch (err) {
      console.error('Failed to load notification preferences:', err)
    }
  }

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    }

    setNotifications(prev => [newNotification, ...prev])

    // Auto-remove non-persistent notifications after 5 seconds
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, 5000)
    }
  }, [])

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      )

      const token = localStorage.getItem('auth_token')
      if (token) {
        await fetch(`/api/notifications/${notificationId}/read`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }, [])

  const markAllAsRead = useCallback(async () => {
    try {
      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      )

      const token = localStorage.getItem('auth_token')
      if (token) {
        await fetch('/api/notifications/read-all', {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err)
    }
  }, [])

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }, [])

  const clearAllNotifications = useCallback(async () => {
    try {
      setNotifications([])

      const token = localStorage.getItem('auth_token')
      if (token) {
        await fetch('/api/notifications/clear', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
    } catch (err) {
      console.error('Failed to clear notifications:', err)
    }
  }, [])

  const updatePreferences = useCallback(async (prefs: Partial<NotificationPreferences>) => {
    try {
      const updatedPrefs = { ...preferences, ...prefs }
      setPreferences(updatedPrefs)

      const token = localStorage.getItem('auth_token')
      if (token) {
        await fetch('/api/notifications/preferences', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ preferences: updatedPrefs })
        })
      }
    } catch (err) {
      setError('Failed to update notification preferences')
      console.error('Preference update error:', err)
    }
  }, [preferences])

  const sendTestNotification = useCallback(() => {
    addNotification({
      title: 'Test Notification',
      message: 'This is a test notification to verify the system is working correctly.',
      type: 'info'
    })
  }, [addNotification])

  const refreshNotifications = useCallback(async () => {
    await loadNotifications()
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return {
    notifications,
    unreadCount,
    preferences,
    isLoading,
    error,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    updatePreferences,
    sendTestNotification,
    refreshNotifications
  }
}