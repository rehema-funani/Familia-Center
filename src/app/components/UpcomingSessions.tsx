'use client'

import { Calendar, Clock, Video, User, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface Session {
  id: string
  title: string
  counselor: string
  date: string
  time: string
  duration: number
  type: 'individual' | 'couples' | 'group'
  status: 'scheduled' | 'confirmed' | 'pending'
  meetingLink?: string
}

interface UpcomingSessionsProps {
  sessions?: Session[]
  maxDisplay?: number
}

const defaultSessions: Session[] = [
  {
    id: '1',
    title: 'Marriage Counseling Session',
    counselor: 'Dr. Sarah Johnson',
    date: '2025-06-08',
    time: '14:00',
    duration: 60,
    type: 'couples',
    status: 'confirmed',
    meetingLink: 'https://meet.google.com/abc-def-ghi'
  },
  {
    id: '2',
    title: 'Individual Therapy',
    counselor: 'Dr. Michael Chen',
    date: '2025-06-10',
    time: '10:30',
    duration: 45,
    type: 'individual',
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Group Support Session',
    counselor: 'Dr. Lisa Rodriguez',
    date: '2025-06-12',
    time: '16:00',
    duration: 90,
    type: 'group',
    status: 'pending'
  }
]

export default function UpcomingSessions({ 
  sessions = defaultSessions, 
  maxDisplay = 5 
}: UpcomingSessionsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'individual':
        return <User className="h-4 w-4" />
      case 'couples':
        return <User className="h-4 w-4" />
      case 'group':
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const displaySessions = sessions.slice(0, maxDisplay)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Upcoming Sessions
        </h3>
        <Button variant="ghost" size="sm">
          View All
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="space-y-4">
        {displaySessions.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No upcoming sessions</p>
            <Button variant="outline" className="mt-4">
              Schedule a Session
            </Button>
          </div>
        ) : (
          displaySessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {getTypeIcon(session.type)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {session.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    with {session.counselor}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(session.date)}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(session.time)} ({session.duration}min)
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(session.status)}>
                  {session.status}
                </Badge>
                
                {session.meetingLink && session.status === 'confirmed' && (
                  <Button size="sm" variant="outline">
                    <Video className="h-4 w-4 mr-2" />
                    Join
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}