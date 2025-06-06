'use client'

import { Calendar, Clock, Users, VideoIcon, BookOpen, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface StatItem {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  description?: string
}

interface StatCardsProps {
  stats?: StatItem[]
}

const defaultStats: StatItem[] = [
  {
    title: "Total Sessions",
    value: 24,
    change: "+12%",
    changeType: "positive",
    icon: <VideoIcon className="h-6 w-6" />,
    description: "This month"
  },
  {
    title: "Active Programs",
    value: 3,
    change: "+1",
    changeType: "positive", 
    icon: <BookOpen className="h-6 w-6" />,
    description: "Currently enrolled"
  },
  {
    title: "Next Session",
    value: "Tomorrow",
    icon: <Calendar className="h-6 w-6" />,
    description: "2:00 PM"
  },
  {
    title: "Progress",
    value: "75%",
    change: "+5%",
    changeType: "positive",
    icon: <TrendingUp className="h-6 w-6" />,
    description: "Overall completion"
  }
]

export default function StatCards({ stats = defaultStats }: StatCardsProps) {
  const getChangeColor = (changeType?: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              {stat.description && (
                <p className="text-sm text-gray-500">
                  {stat.description}
                </p>
              )}
              {stat.change && (
                <p className={`text-sm font-medium mt-1 ${getChangeColor(stat.changeType)}`}>
                  {stat.change}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 ml-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                {stat.icon}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}