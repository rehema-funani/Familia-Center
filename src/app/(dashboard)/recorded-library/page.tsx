// src/app/(dashboard)/recorded-library/page.tsx
import { Metadata } from 'next'
import { Suspense } from 'react'
import VideoGrid from './components/VideoGrid'
import CategoryFilter from './components/CategoryFilter'

export const metadata: Metadata = {
  title: 'Video Library | Family Center',
  description: 'Access recorded counseling sessions and educational content'
}

export default function RecordedLibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Video Library</h1>
          <p className="mt-2 text-gray-600">
            Access your recorded sessions and educational content
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <CategoryFilter onCategoryChange={function (categories: string[]): void {
            throw new Error('Function not implemented.')
          } } selectedCategories={[]} />
        </div>

        {/* Video Grid */}
        <Suspense fallback={<div className="animate-pulse">Loading videos...</div>}>
          <VideoGrid />
        </Suspense>
      </div>
    </div>
  )
}