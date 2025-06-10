// src/app/(dashboard)/recorded-library/components/VideoPlayer.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface VideoPlayerProps {
  videoId: string
  title: string
  description: string
  counselor: string
  date: string
  category: string
  isLocked: boolean
  videoUrl?: string
  previewDuration?: number
}

export default function VideoPlayer({
  videoId,
  title,
  description,
  counselor,
  date,
  category,
  isLocked,
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  previewDuration = 180 // 3 minutes
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [previewEnded, setPreviewEnded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    
    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('ended', () => setIsPlaying(false))

    // Preview mode handling
    if (isLocked) {
      const checkPreviewTime = () => {
        if (video.currentTime >= previewDuration) {
          video.pause()
          setIsPlaying(false)
          setPreviewEnded(true)
        }
      }
      video.addEventListener('timeupdate', checkPreviewTime)
    }

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('ended', () => setIsPlaying(false))
      if (isLocked) {
        video.removeEventListener('timeupdate', checkPreviewTime)
      }
    }
  }, [isLocked, previewDuration])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isLocked && currentTime >= previewDuration) {
      setPreviewEnded(true)
      return
    }

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newTime = parseFloat(e.target.value)
    
    // Restrict seeking in preview mode
    if (isLocked && newTime > previewDuration) {
      return
    }
    
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = parseFloat(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!isFullscreen) {
      video.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    if (duration === 0) return 0
    const maxTime = isLocked ? Math.min(previewDuration, duration) : duration
    return (currentTime / maxTime) * 100
  }

  const getPreviewPercentage = () => {
    if (!isLocked || duration === 0) return 100
    return (previewDuration / duration) * 100
  }

  if (previewEnded) {
    return (
      <div className="bg-black aspect-video flex items-center justify-center text-white">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Preview Ended</h3>
          <p className="text-gray-300 mb-4">Subscribe to continue watching this session</p>
          <Button onClick={() => window.location.href = '/dashboard/profile'}>
            Upgrade Now
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Video Player */}
      <div 
        className="relative bg-black aspect-video"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full"
          onClick={togglePlay}
        />
        
        {/* Preview Warning */}
        {isLocked && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium">
            Preview Mode ({Math.max(0, Math.floor(previewDuration - currentTime))}s left)
          </div>
        )}

        {/* Controls */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            {/* Progress Bar */}
            <div className="relative mb-4">
              <div className="w-full bg-gray-600 rounded-full h-1">
                {/* Preview limit indicator */}
                {isLocked && (
                  <div 
                    className="absolute top-0 left-0 h-1 bg-yellow-500 rounded-full"
                    style={{ width: `${getPreviewPercentage()}%` }}
                  />
                )}
                {/* Current progress */}
                <div 
                  className="h-1 bg-blue-500 rounded-full transition-all"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max={isLocked ? Math.min(previewDuration, duration) : duration}
                value={currentTime}
                onChange={handleSeek}
                className="absolute top-0 w-full h-1 opacity-0 cursor-pointer"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>

                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600 mb-4">{description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>with {counselor}</span>
              <span>•</span>
              <span>{new Date(date).toLocaleDateString()}</span>
              <span>•</span>
              <Badge>{category}</Badge>
            </div>
          </div>
          
          {isLocked && (
            <Button onClick={() => window.location.href = '/dashboard/profile'}>
              Upgrade to Full Access
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function checkPreviewTime(this: HTMLVideoElement, ev: Event) {
    throw new Error('Function not implemented.')
}
