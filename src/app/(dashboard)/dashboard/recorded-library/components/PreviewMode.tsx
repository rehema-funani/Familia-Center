// src/app/(dashboard)/recorded-library/components/PreviewMode.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

interface PreviewModeProps {
  isPreviewUser: boolean
  onUpgrade: () => void
}

interface PreviewVideo {
  id: string
  title: string
  thumbnail: string
  duration: number
  category: string
  counselor: string
  previewDuration: number
}

export default function PreviewMode({ isPreviewUser, onUpgrade }: PreviewModeProps) {
  const [previewVideos, setPreviewVideos] = useState<PreviewVideo[]>([])
  const [selectedVideo, setSelectedVideo] = useState<PreviewVideo | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  useEffect(() => {
    // Simulate fetching preview videos
    const mockPreviewVideos: PreviewVideo[] = [
      {
        id: '1',
        title: 'Introduction to Couples Therapy',
        thumbnail: 'https://via.placeholder.com/320x180/3b82f6/ffffff?text=Couples+Therapy',
        duration: 1800, // 30 minutes
        category: 'Marriage',
        counselor: 'Dr. Sarah Johnson',
        previewDuration: 180 // 3 minutes preview
      },
      {
        id: '2',
        title: 'Managing Relationship Conflicts',
        thumbnail: 'https://via.placeholder.com/320x180/10b981/ffffff?text=Conflict+Resolution',
        duration: 2100, // 35 minutes
        category: 'Communication',
        counselor: 'Dr. Michael Chen',
        previewDuration: 180
      },
      {
        id: '3',
        title: 'Building Trust After Betrayal',
        thumbnail: 'https://via.placeholder.com/320x180/f59e0b/ffffff?text=Trust+Building',
        duration: 2700, // 45 minutes
        category: 'Healing',
        counselor: 'Dr. Lisa Rodriguez',
        previewDuration: 180
      }
    ]
    
    setPreviewVideos(mockPreviewVideos)
  }, [])

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m`
  }

  const handleVideoClick = (video: PreviewVideo) => {
    setSelectedVideo(video)
  }

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true)
  }

  if (!isPreviewUser) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Preview Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              You're in Preview Mode
            </h2>
            <p className="text-blue-700 mb-4">
              Get a taste of our content with 3-minute previews. Upgrade for full access to all sessions.
            </p>
            <div className="flex items-center gap-4 text-sm text-blue-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>3-minute previews</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>No commitment required</span>
              </div>
            </div>
          </div>
          <Button onClick={handleUpgradeClick} size="lg">
            Upgrade Now
          </Button>
        </div>
      </div>

      {/* Preview Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <div className="relative aspect-video bg-gray-200">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              
              {/* Preview Badge */}
              <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-medium">
                Preview: {formatDuration(video.previewDuration)}
              </div>
              
              {/* Duration */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {formatDuration(video.duration)}
              </div>
              
              {/* Play Button */}
              <div 
                className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-25 flex items-center justify-center transition-all"
                onClick={() => handleVideoClick(video)}
              >
                <div className="bg-white rounded-full p-3 shadow-lg opacity-0 hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
              
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline">{video.category}</Badge>
                <span className="text-sm text-gray-500">Preview Available</span>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                with {video.counselor}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleVideoClick(video)}
              >
                Watch Preview
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Features Comparison */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Compare Access Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Preview Access */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Preview Access (Current)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>3-minute previews</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Limited content access</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                <span className="text-gray-500">No live session access</span>
              </li>
            </ul>
          </div>

          {/* Full Access */}
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-3">Full Access</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Complete video library</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Live session participation</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>1-on-1 counseling booking</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Download resources</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Button onClick={handleUpgradeClick} size="lg" className="px-8">
            Upgrade to Full Access
          </Button>
        </div>
      </Card>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Upgrade Your Access</h3>
            <p className="text-gray-600 mb-6">
              Get unlimited access to our complete library of counseling sessions and resources.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Monthly Plan</span>
                <span className="font-semibold">$29/month</span>
              </div>
              <div className="flex justify-between">
                <span>Annual Plan</span>
                <span className="font-semibold">$299/year <span className="text-sm text-green-600">(Save 14%)</span></span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowUpgradeModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  setShowUpgradeModal(false)
                  onUpgrade()
                }}
              >
                Choose Plan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}