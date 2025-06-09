// src/app/(dashboard)/live-sessions/components/SessionTimer.tsx
'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface SessionTimerProps {
  sessionStartTime: string
  sessionDuration: number // in minutes
  onSessionEnd?: () => void
  showWarningAt?: number // minutes before end to show warning
  isActive: boolean
}

export default function SessionTimer({ 
  sessionStartTime, 
  sessionDuration, 
  onSessionEnd, 
  showWarningAt = 5,
  isActive 
}: SessionTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [sessionStatus, setSessionStatus] = useState<'upcoming' | 'active' | 'ending' | 'ended'>('upcoming')
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime()
      const startTime = new Date(sessionStartTime).getTime()
      const endTime = startTime + (sessionDuration * 60 * 1000)
      
      if (now < startTime) {
        // Session hasn't started yet
        setTimeRemaining(Math.ceil((startTime - now) / 1000))
        setSessionStatus('upcoming')
        setHasStarted(false)
      } else if (now >= startTime && now < endTime) {
        // Session is active
        const remaining = Math.ceil((endTime - now) / 1000)
        setTimeRemaining(remaining)
        setHasStarted(true)
        
        if (remaining <= showWarningAt * 60) {
          setSessionStatus('ending')
        } else {
          setSessionStatus('active')
        }
      } else {
        // Session has ended
        setTimeRemaining(0)
        setSessionStatus('ended')
        setHasStarted(true)
        
        if (onSessionEnd) {
          onSessionEnd()
        }
      }
    }

    // Calculate initial time
    calculateTimeRemaining()

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [sessionStartTime, sessionDuration, showWarningAt, onSessionEnd])

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return '00:00:00'
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusColor = () => {
    switch (sessionStatus) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'ending':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'ended':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = () => {
    switch (sessionStatus) {
      case 'upcoming':
        return 'Starts in'
      case 'active':
        return 'Time remaining'
      case 'ending':
        return 'Ending soon'
      case 'ended':
        return 'Session ended'
      default:
        return 'Unknown'
    }
  }

  const getTimerIcon = () => {
    switch (sessionStatus) {
      case 'upcoming':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
        )
      case 'active':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14" stroke="white" strokeWidth="2"/>
          </svg>
        )
      case 'ending':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        )
      case 'ended':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
      default:
        return null
    }
  }

  if (!isActive && sessionStatus === 'upcoming') {
    return (
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {getTimerIcon()}
              <span className="text-sm font-medium text-gray-600">{getStatusText()}</span>
            </div>
            <div className="text-2xl font-mono font-bold text-blue-600">
              {formatTime(timeRemaining)}
            </div>
          </div>
          <Badge className={getStatusColor()}>
            Upcoming
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getTimerIcon()}
          <h3 className="font-semibold text-gray-900">Session Timer</h3>
        </div>
        <Badge className={getStatusColor()}>
          {sessionStatus === 'upcoming' && 'Upcoming'}
          {sessionStatus === 'active' && 'Live'}
          {sessionStatus === 'ending' && 'Ending Soon'}
          {sessionStatus === 'ended' && 'Ended'}
        </Badge>
      </div>

      {/* Timer Display */}
      <div className="p-6 text-center">
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-600">{getStatusText()}</span>
        </div>
        
        <div className={`text-4xl font-mono font-bold mb-4 ${
          sessionStatus === 'ending' ? 'text-orange-600' : 
          sessionStatus === 'ended' ? 'text-red-600' :
          sessionStatus === 'active' ? 'text-green-600' : 'text-blue-600'
        }`}>
          {formatTime(timeRemaining)}
        </div>

        {/* Progress Bar */}
        {hasStarted && sessionStatus !== 'ended' && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                sessionStatus === 'ending' ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ 
                width: `${Math.max(0, (timeRemaining / (sessionDuration * 60)) * 100)}%` 
              }}
            ></div>
          </div>
        )}

        {/* Session Info */}
        <div className="text-sm text-gray-500 space-y-1">
          <div>Duration: {sessionDuration} minutes</div>
          <div>Started: {new Date(sessionStartTime).toLocaleTimeString()}</div>
        </div>

        {/* Warning Messages */}
        {sessionStatus === 'ending' && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 text-orange-800">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
              <span className="text-sm font-medium">Session ending soon!</span>
            </div>
            <p className="text-sm text-orange-700 mt-1">
              Please wrap up your discussion.
            </p>
          </div>
        )}

        {sessionStatus === 'ended' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800 mb-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-sm font-medium">Session has ended</span>
            </div>
            <p className="text-sm text-red-700 mb-3">
              Thank you for participating. The recording will be available shortly.
            </p>
            <Button size="sm" variant="outline">
              View Recording
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}