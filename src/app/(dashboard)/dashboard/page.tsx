import { Metadata } from 'next'
import { Suspense } from 'react'
import DashboardHeader from './components/DashboardHeader'
import StatCards from './components/StatCards'
import UpcomingSessions from './components/UpcomingSessions'
import ProgressTracker from './components/ProgressTracker'
import QuickActions from './components/QuickActions'

export const metadata: Metadata = {
  title: 'Dashboard | Family Center',
  description: 'Your personalized dashboard for Family Center'
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <Suspense fallback={<div>Loading stats...</div>}>
            <StatCards />
          </Suspense>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upcoming Sessions */}
            <div className="lg:col-span-2">
              <Suspense fallback={<div>Loading sessions...</div>}>
                <UpcomingSessions />
              </Suspense>
            </div>

            {/* Right Column - Progress & Actions */}
            <div className="space-y-6">
              <Suspense fallback={<div>Loading progress...</div>}>
                <ProgressTracker />
              </Suspense>
              
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
