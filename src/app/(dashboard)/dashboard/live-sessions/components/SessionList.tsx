// src/app/(dashboard)/live-sessions/components/SessionList.tsx
'use client'

import { useState, useEffect } from 'react'
import SessionCard from './SessionCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

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

export default function SessionList() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'live'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const mockSessions: Session[] = [
      {
        id: '1',
        title: 'Marriage Counseling Session',
        counselor: 'Dr. Sarah Johnson',
        date: '2025-06-09',
        time: '14:00',
        duration: 60,
        status: 'live',
        meetLink: 'https://meet.google.com/abc-defg-hij',
        description: 'Focus on communication strategies and conflict resolution',
        type: 'couples'
      },
      {
        id: '2',
        title: 'Individual Therapy',
        counselor: 'Dr. Michael Chen',
        date: '2025-06-10',
        time: '10:30',
        duration: 45,
        status: 'upcoming',
        description: 'Personal development and anxiety management',
        type: 'individual'
      },
      {
        id: '3',
        title: 'Group Support Session',
        counselor: 'Dr. Lisa Rodriguez',
        date: '2025-06-12',
        time: '16:00',
        duration: 90,
        status: 'upcoming',
        description: 'Peer support for addiction recovery',
        type: 'group'
      },
      {
        id: '4',
        title: 'Family Counseling',
        counselor: 'Dr. James Wilson',
        date: '2025-06-08',
        time: '11:00',
        duration: 75,
        status: 'completed',
        description: 'Family dynamics and parenting strategies',
        type: 'group'
      }
    ]

    setTimeout(() => {
      setSessions(mockSessions)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true
    return session.status === filter
  })

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(['all', 'upcoming', 'live'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === tab
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab !== 'all' && (
              <Badge className="ml-2">
                {sessions.filter(s => s.status === tab).length}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Session Cards */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No sessions found</div>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You don't have any sessions scheduled yet."
                : `No ${filter} sessions at the moment.`
              }
            </p>
            <Button className="mt-4">
              Book New Session
            </Button>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        )}
      </div>
    </div>
  )
}