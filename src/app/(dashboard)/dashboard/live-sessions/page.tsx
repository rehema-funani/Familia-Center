// src/app/(dashboard)/dashboard/live-sessions/page.tsx
'use client'

import { Suspense } from 'react'
import SessionList from './components/SessionList'
import AccessControl from './components/AccessControl'
import GoogleMeetEmbed from './components/GoogleMeetEmbed'

export default function LiveSessionsPage() {
  // Event handlers can now be defined in the Client Component
  const handleJoinMeeting = () => {
    console.log('User joined meeting')
    // Handle join meeting logic
    // You can add state updates, API calls, etc. here
  }

  const handleLeaveMeeting = () => {
    console.log('User left meeting')
    // Handle leave meeting logic
    // You can add state updates, API calls, etc. here
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Live Sessions
        </h1>
        <p className="text-lg text-gray-600">
          Join your scheduled live counseling sessions
        </p>
      </div>

      {/* Access Control Notice */}
      <div className="mb-8">
        <AccessControl />
      </div>

      {/* Session List */}
      <div className="mb-8">
        <Suspense fallback={<div>Loading sessions...</div>}>
          <SessionList />
        </Suspense>
      </div>

      {/* Google Meet Embed Example */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Current Session
        </h2>
        <GoogleMeetEmbed
          meetingId="meet-123-456-789"
          isHost={false}
          hasAccess={true}
          onJoinMeeting={handleJoinMeeting}
          onLeaveMeeting={handleLeaveMeeting}
        />
      </div>
    </div>
  )
}