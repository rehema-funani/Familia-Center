// src/app/(dashboard)/recorded-library/components/VideoCard.tsx
'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: number
  date: string
  counselor: string
  category: string
  isLocked: boolean
  viewCount?: number
  type: 'session' | 'educational'
}

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handlePlay = () => {
    if (video.isLocked) {
      // Show upgrade modal or redirect to subscription page
      alert('This video requires a premium subscription to access.')
      return
    }
    
    // Navigate to video player
    window.location.href = `/dashboard/recorded-library/${video.id}`
  }

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlay}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = `https://via.placeholder.com/320x180/e2e8f0/64748b?text=${encodeURIComponent(video.title.slice(0, 20))}`
          }}
        />
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </div>
        
        {/* Lock Overlay */}
        {video.isLocked && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-sm font-medium">Premium Content</p>
            </div>
          </div>
        )}
        
        {/* Play Button on Hover */}
        {isHovered && !video.isLocked && (
          <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
        
        {/* Metadata */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant={video.type === 'session' ? 'default' : 'secondary'}>
              {video.type === 'session' ? 'Session' : 'Educational'}
            </Badge>
            <Badge variant="outline">{video.category}</Badge>
          </div>
          
          {video.viewCount && (
            <span className="text-xs text-gray-500">{video.viewCount} views</span>
          )}
        </div>
        
        {/* Counselor and Date */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>with {video.counselor}</span>
          <span>{formatDate(video.date)}</span>
        </div>
        
        {/* Action Button */}
        <div className="mt-4">
          <Button 
            variant={video.isLocked ? "outline" : "primary"}
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation()
              handlePlay()
            }}
          >
            {video.isLocked ? 'Upgrade to Watch' : 'Watch Now'}
          </Button>
        </div>
      </div>
    </div>
  )
}