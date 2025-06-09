// src/app/(dashboard)/recorded-library/components/VideoGrid.tsx
'use client'

import { useState, useEffect } from 'react'
import VideoCard from './VideoCard'
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

export default function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 12

  useEffect(() => {
    // Simulate API call
    const mockVideos: Video[] = [
      {
        id: '1',
        title: 'Communication in Marriage - Session 1',
        description: 'Learn effective communication strategies for couples',
        thumbnail: '/api/placeholder/320/180',
        duration: 3600, // 60 minutes
        date: '2025-06-08',
        counselor: 'Dr. Sarah Johnson',
        category: 'Marriage Counseling',
        isLocked: false,
        viewCount: 45,
        type: 'session'
      },
      {
        id: '2',
        title: 'Managing Anxiety and Stress',
        description: 'Practical techniques for anxiety management',
        thumbnail: '/api/placeholder/320/180',
        duration: 2700, // 45 minutes
        date: '2025-06-07',
        counselor: 'Dr. Michael Chen',
        category: 'Individual Therapy',
        isLocked: false,
        viewCount: 32,
        type: 'educational'
      },
      {
        id: '3',
        title: 'Parenting Strategies - Week 1',
        description: 'Foundation principles of effective parenting',
        thumbnail: '/api/placeholder/320/180',
        duration: 4200, // 70 minutes
        date: '2025-06-06',
        counselor: 'Dr. Lisa Rodriguez',
        category: 'Family Counseling',
        isLocked: true,
        viewCount: 0,
        type: 'session'
      },
      {
        id: '4',
        title: 'Understanding Addiction Recovery',
        description: 'Support for addiction recovery journey',
        thumbnail: '/api/placeholder/320/180',
        duration: 5400, // 90 minutes
        date: '2025-06-05',
        counselor: 'Dr. James Wilson',
        category: 'Support Groups',
        isLocked: false,
        viewCount: 28,
        type: 'educational'
      },
      {
        id: '5',
        title: 'Conflict Resolution Techniques',
        description: 'Healthy ways to resolve conflicts in relationships',
        thumbnail: '/api/placeholder/320/180',
        duration: 3300, // 55 minutes
        date: '2025-06-04',
        counselor: 'Dr. Sarah Johnson',
        category: 'Marriage Counseling',
        isLocked: true,
        viewCount: 0,
        type: 'session'
      },
      {
        id: '6',
        title: 'Building Self-Esteem',
        description: 'Practical exercises to improve self-confidence',
        thumbnail: '/api/placeholder/320/180',
        duration: 2400, // 40 minutes
        date: '2025-06-03',
        counselor: 'Dr. Michael Chen',
        category: 'Individual Therapy',
        isLocked: false,
        viewCount: 67,
        type: 'educational'
      }
    ]

    setTimeout(() => {
      setVideos(mockVideos)
      setLoading(false)
    }, 1000)
  }, [])

  const totalPages = Math.ceil(videos.length / videosPerPage)
  const startIndex = (currentPage - 1) * videosPerPage
  const paginatedVideos = videos.slice(startIndex, startIndex + videosPerPage)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow animate-pulse">
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-2xl font-bold text-gray-900">{videos.length}</span>
            <span className="text-gray-600 ml-2">Total Videos</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-green-600">
              {videos.filter(v => !v.isLocked).length}
            </span>
            <span className="text-gray-600 ml-2">Available</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-orange-600">
              {videos.filter(v => v.isLocked).length}
            </span>
            <span className="text-gray-600 ml-2">Premium Only</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Most Recent
          </Button>
          <Button variant="outline" size="sm">
            Most Viewed
          </Button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "primary" : "outline"}

                size="sm"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {videos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No videos available</div>
          <p className="text-gray-600">
            Videos from your sessions will appear here once they're processed.
          </p>
        </div>
      )}
    </div>
  )
}