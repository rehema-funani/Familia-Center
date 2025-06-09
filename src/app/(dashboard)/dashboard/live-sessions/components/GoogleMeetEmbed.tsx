// // src/app/(dashboard)/live-sessions/components/GoogleMeetEmbed.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { Button } from '@/components/ui/Button'
// import { Alert } from '@/components/ui/Alert'

// interface GoogleMeetEmbedProps {
//   meetingId: string
//   isHost: boolean
//   hasAccess: boolean
//   onJoinMeeting: () => void
//   onLeaveMeeting: () => void
// }

// export default function GoogleMeetEmbed({ 
//   meetingId, 
//   isHost, 
//   hasAccess, 
//   onJoinMeeting, 
//   onLeaveMeeting 
// }: GoogleMeetEmbedProps) {
//   const [isJoined, setIsJoined] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [participantCount, setParticipantCount] = useState(0)
//   const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected')
//   const [audioEnabled, setAudioEnabled] = useState(true)
//   const [videoEnabled, setVideoEnabled] = useState(true)

//   useEffect(() => {
//     // Simulate participant count updates
//     const interval = setInterval(() => {
//       if (isJoined) {
//         setParticipantCount(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1))
//       }
//     }, 10000)

//     return () => clearInterval(interval)
//   }, [isJoined])

//   const handleJoinMeeting = async () => {
//     if (!hasAccess) {
//       setError('You need to upgrade your subscription to join live sessions.')
//       return
//     }

//     setIsLoading(true)
//     setError(null)
//     setConnectionStatus('connecting')

//     try {
//       // Simulate API call to join meeting
//       await new Promise(resolve => setTimeout(resolve, 1500))
      
//       setIsJoined(true)
//       setConnectionStatus('connected')
//       setParticipantCount(isHost ? 1 : Math.floor(Math.random() * 5) + 2)
//       onJoinMeeting()
//     } catch (err) {
//       setError('Failed to join meeting. Please try again.')
//       setConnectionStatus('disconnected')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleLeaveMeeting = () => {
//     setIsJoined(false)
//     setConnectionStatus('disconnected')
//     setParticipantCount(0)
//     onLeaveMeeting()
//   }

//   const toggleAudio = () => {
//     setAudioEnabled(!audioEnabled)
//   }

//   const toggleVideo = () => {
//     setVideoEnabled(!videoEnabled)
//   }

//   if (!hasAccess) {
//     return (
//       <div className="bg-white rounded-lg shadow p-6">
//         <Alert className="mb-4">
//           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
//           </svg>
//           This session requires a premium subscription to access.
//         </Alert>
        
//         <div className="text-center py-8">
//           <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
//             </svg>
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Session</h3>
//           <p className="text-gray-600 mb-4">
//             Upgrade your subscription to join live counseling sessions.
//           </p>
//           <Button>Upgrade Now</Button>
//         </div>
//       </div>
//     )
//   }

//   if (!isJoined) {
//     return (
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="text-center">
//           <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/>
//             </svg>
//           </div>
          
//           <h3 className="text-xl font-semibold text-gray-900 mb-2">
//             Ready to Join Session
//           </h3>
//           <p className="text-gray-600 mb-6">
//             Meeting ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{meetingId}</span>
//           </p>

//           {error && (
//             <Alert className="mb-4 text-red-700 bg-red-50 border-red-200">
//               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
//               </svg>
//               {error}
//             </Alert>
//           )}

//           <div className="flex items-center justify-center gap-4 mb-6">
//             <div className="flex items-center gap-2">
//               <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
//               <span className="text-sm text-gray-600 capitalize">{connectionStatus}</span>
//             </div>
//             {isHost && (
//               <div className="flex items-center gap-2">
//                 <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.08 5.68-.08 5.68s-.05 4.1-.08 5.68c-.03 1.57-1.22 2.73-2.8 2.76-1.56.04-5.21.04-5.21.04s-3.65 0-5.21-.04c-1.58-.03-2.77-1.19-2.8-2.76-.03-1.58-.08-5.68-.08-5.68s.05-4.1.08-5.68c.03-1.57 1.22-2.73 2.8-2.76 1.56-.04 5.21-.04 5.21-.04s3.65 0 5.21.04c1.58.03 2.77 1.19 2.8 2.76z"/>
//                 </svg>
//                 <span className="text-sm text-blue-600">Host</span>
//               </div>
//             )}
//           </div>

//           <Button 
//             onClick={handleJoinMeeting} 
//             disabled={isLoading}
//             size="lg"
//             className="w-full max-w-xs"
//           >
//             {isLoading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Joining...
//               </>
//             ) : (
//               'Join Meeting'
//             )}
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   // Meeting interface when joined
//   return (
//     <div className="bg-black rounded-lg overflow-hidden">
//       {/* Video Area */}
//       <div className="aspect-video bg-gray-900 relative">
//         {/* Simulated video feed */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-white text-center">
//             <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//               </svg>
//             </div>
//             <p className="text-lg font-medium">You're in the meeting</p>
//             <p className="text-sm text-gray-300">{participantCount} participant{participantCount !== 1 ? 's' : ''}</p>
//           </div>
//         </div>

//         {/* Connection status indicator */}
//         <div className="absolute top-4 left-4 flex items-center gap-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
//           <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
//           <span>{connectionStatus === 'connected' ? 'Connected' : 'Connecting...'}</span>
//         </div>

//         {/* Participant count */}
//         <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
//           {participantCount} participant{participantCount !== 1 ? 's' : ''}
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="bg-gray-800 p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={toggleAudio}
//               className={`p-3 rounded-full transition-colors ${
//                 audioEnabled 
//                   ? 'bg-gray-600 hover:bg-gray-500 text-white' 
//                   : 'bg-red-600 hover:bg-red-500 text-white'
//               }`}
//               title={audioEnabled ? 'Mute' : 'Unmute'}
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 {audioEnabled ? (
//                   <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
//                 ) : (
//                   <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
//                 )}
//               </svg>
//             </button>

//             <button
//               onClick={toggleVideo}
//               className={`p-3 rounded-full transition-colors ${
//                 videoEnabled 
//                   ? 'bg-gray-600 hover:bg-gray-500 text-white' 
//                   : 'bg-red-600 hover:bg-red-500 text-white'
//               }`}
//               title={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 {videoEnabled ? (
//                   <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
//                 ) : (
//                   <path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z"/>
//                 )}
//               </svg>
//             </button>
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="text-white text-sm">Meeting ID: {meetingId}</span>
//           </div>

//           <Button 
//             onClick={handleLeaveMeeting}
//             variant="danger"
//             size="sm"
//           >
//             Leave Meeting
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// src/app/(dashboard)/live-sessions/components/GoogleMeetEmbed.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'

export interface GoogleMeetEmbedProps {
  meetingId: string
  isHost: boolean
  hasAccess: boolean
  onJoinMeeting: () => void
  onLeaveMeeting: () => void
}

export default function GoogleMeetEmbed({ 
  meetingId, 
  isHost, 
  hasAccess, 
  onJoinMeeting, 
  onLeaveMeeting 
}: GoogleMeetEmbedProps) {
  const [isJoined, setIsJoined] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [participantCount, setParticipantCount] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected')
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)

  useEffect(() => {
    // Simulate participant count updates
    const interval = setInterval(() => {
      if (isJoined) {
        setParticipantCount(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1))
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [isJoined])

  const handleJoinMeeting = async () => {
    if (!hasAccess) {
      setError('You need to upgrade your subscription to join live sessions.')
      return
    }

    setIsLoading(true)
    setError(null)
    setConnectionStatus('connecting')

    try {
      // Simulate API call to join meeting
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsJoined(true)
      setConnectionStatus('connected')
      setParticipantCount(isHost ? 1 : Math.floor(Math.random() * 5) + 2)
      onJoinMeeting()
    } catch (err) {
      setError('Failed to join meeting. Please try again.')
      setConnectionStatus('disconnected')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLeaveMeeting = () => {
    setIsJoined(false)
    setConnectionStatus('disconnected')
    setParticipantCount(0)
    onLeaveMeeting()
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
  }

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled)
  }

  if (!hasAccess) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <Alert className="mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          This session requires a premium subscription to access.
        </Alert>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Session</h3>
          <p className="text-gray-600 mb-4">
            Upgrade your subscription to join live counseling sessions.
          </p>
          <Button>Upgrade Now</Button>
        </div>
      </div>
    )
  }

  if (!isJoined) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/>
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to Join Session
          </h3>
          <p className="text-gray-600 mb-6">
            Meeting ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{meetingId}</span>
          </p>

          {error && (
            <Alert className="mb-4 text-red-700 bg-red-50 border-red-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {error}
            </Alert>
          )}

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-600 capitalize">{connectionStatus}</span>
            </div>
            {isHost && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.08 5.68-.08 5.68s-.05 4.1-.08 5.68c-.03 1.57-1.22 2.73-2.8 2.76-1.56.04-5.21.04-5.21.04s-3.65 0-5.21-.04c-1.58-.03-2.77-1.19-2.8-2.76-.03-1.58-.08-5.68-.08-5.68s.05-4.1.08-5.68c.03-1.57 1.22-2.73 2.8-2.76 1.56-.04 5.21-.04 5.21.04s3.65 0 5.21.04c1.58.03 2.77 1.19 2.8 2.76z"/>
                </svg>
                <span className="text-sm text-blue-600">Host</span>
              </div>
            )}
          </div>

          <Button 
            onClick={handleJoinMeeting} 
            disabled={isLoading}
            size="lg"
            className="w-full max-w-xs"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Joining...
              </>
            ) : (
              'Join Meeting'
            )}
          </Button>
        </div>
      </div>
    )
  }

  // Meeting interface when joined
  return (
    <div className="bg-black rounded-lg overflow-hidden">
      {/* Video Area */}
      <div className="aspect-video bg-gray-900 relative">
        {/* Simulated video feed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <p className="text-lg font-medium">You're in the meeting</p>
            <p className="text-sm text-gray-300">{participantCount} participant{participantCount !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Connection status indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span>{connectionStatus === 'connected' ? 'Connected' : 'Connecting...'}</span>
        </div>

        {/* Participant count */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {participantCount} participant{participantCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full transition-colors ${
                audioEnabled 
                  ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                  : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
              title={audioEnabled ? 'Mute' : 'Unmute'}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {audioEnabled ? (
                  <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                ) : (
                  <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
                )}
              </svg>
            </button>

            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full transition-colors ${
                videoEnabled 
                  ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                  : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
              title={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {videoEnabled ? (
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                ) : (
                  <path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z"/>
                )}
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white text-sm">Meeting ID: {meetingId}</span>
          </div>

          <Button 
            onClick={handleLeaveMeeting}
            variant="danger"
            size="sm"
          >
            Leave Meeting
          </Button>
        </div>
      </div>
    </div>
  )
}