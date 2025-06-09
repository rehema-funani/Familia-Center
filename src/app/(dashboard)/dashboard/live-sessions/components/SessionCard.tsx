// src/app/(dashboard)/live-sessions/components/SessionCard.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

interface Session {
  id: string
  title: string
  counselor: string
  date: string
  time: string
  duration: number
  status: 'upcoming' | 'live' | 'completed' | 'cancelled'
  meetLink?: string
  description: string
  type: 'individual' | 'couples' | 'group'
}

interface SessionCardProps {
  session: Session
}

export default function SessionCard({ session }: SessionCardProps) {
  const [isJoining, setIsJoining] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-800'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'individual':
        return '👤'
      case 'couples':
        return '💑'
      case 'group':
        return '👥'
      default:
        return '📋'
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleJoinSession = () => {
    if (session.meetLink) {
      setIsJoining(true)
      // Simulate joining delay
      setTimeout(() => {
        window.open(session.meetLink, '_blank')
        setIsJoining(false)
      }, 1000)
    }
  }

  const isSessionActive = session.status === 'live'
  const canJoin = session.status === 'live' || session.status === 'upcoming'

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{getTypeIcon(session.type)}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {session.title}
              </h3>
              <p className="text-sm text-gray-600">
                with {session.counselor}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <span>{formatDate(session.date)}</span>
            <span>{formatTime(session.time)}</span>
            <span>({session.duration}min)</span>
          </div>

          <p className="text-gray-700 mb-4">
            {session.description}
          </p>

          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(session.status)}>
              {session.status === 'live' && '🔴 '}
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </Badge>
            <Badge variant="outline">
              {session.type}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-6">
          {canJoin && (
            <Button
              onClick={handleJoinSession}
              disabled={isJoining || !session.meetLink}
              className={`${
                isSessionActive 
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isJoining ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Joining...
                </div>
              ) : (
                <>
                  {isSessionActive ? 'Join Now' : 'Join Session'}
                </>
              )}
            </Button>
          )}
          
          {session.status === 'completed' && (
            <Button variant="outline">
              View Recording
            </Button>
          )}
          
          <Button variant="outline" size="sm">
            Details
          </Button>
        </div>
      </div>

      {isSessionActive && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-red-800">
              Session is live now! Join to participate.
            </span>
          </div>
        </div>
      )}
    </Card>
  )
}