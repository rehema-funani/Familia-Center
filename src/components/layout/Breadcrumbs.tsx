'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // Add home/dashboard
    breadcrumbs.push({
      label: 'Dashboard',
      href: '/dashboard'
    })

    // Convert path segments to readable labels
    const segmentLabels: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'live-sessions': 'Live Sessions',
      'recorded-library': 'Recorded Library',
      'private-bookings': 'Private Bookings',
      'teaching-modules': 'Teaching Modules',
      'anonymous-access': 'Anonymous Access',
      'resources': 'Resources',
      'session-history': 'Session History',
      'profile': 'Profile',
      'settings': 'Settings',
      'admin-dashboard': 'Admin Dashboard',
      'counselor-dashboard': 'Counselor Dashboard',
      'users': 'User Management',
      'programs': 'Program Management',
      'payments': 'Payments',
      'sessions': 'Sessions',
      'counselor-resources': 'Counselor Resources',
      'admin': 'Administration',
      'counselor': 'Counselor',
      'analytics': 'Analytics',
      'audit': 'Audit Logs',
      'logs': 'System Logs',
      'booking': 'Booking',
      'recorded': 'Recorded Sessions',
      'live': 'Live Sessions'
    }

    let currentPath = ''
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Skip the first 'dashboard' segment as we already added it
      if (segment === 'dashboard' && index === 0) return

      // Handle dynamic routes (like [id], [sessionId], etc.)
      let label = segmentLabels[segment] || segment
      
      // Check if it's a dynamic route (UUID pattern or numeric)
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment) || 
          /^\d+$/.test(segment)) {
        // Get context from previous segment
        const prevSegment = segments[index - 1]
        if (prevSegment === 'teaching-modules' || prevSegment === 'courses') {
          label = 'Course Details'
        } else if (prevSegment === 'live-sessions' || prevSegment === 'sessions') {
          label = 'Session Details'
        } else if (prevSegment === 'users') {
          label = 'User Details'
        } else if (prevSegment === 'recorded-library') {
          label = 'Video Details'
        } else {
          label = 'Details'
        }
      } else if (!segmentLabels[segment]) {
        // Capitalize first letter for unknown segments
        label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      }
      
      // Don't add href for the last item (current page)
      breadcrumbs.push({
        label,
        href: index === segments.length - 1 ? undefined : currentPath
      })
    })

    return breadcrumbs
  }

  const breadcrumbItems = items || generateBreadcrumbs()

  // Don't show breadcrumbs if only one item (dashboard)
  if (breadcrumbItems.length <= 1) return null

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            )}
            
            {index === 0 && (
              <Home className="w-4 h-4 text-gray-500 mr-2" />
            )}
            
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-sm font-medium text-gray-500" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}