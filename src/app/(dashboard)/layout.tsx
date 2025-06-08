'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/hooks/auth/useAuth'
import Navigation from '@/components/layout/Navigation'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import MobileMenu from '@/components/layout/MobileMenu'
import { useState } from 'react'
import LoadingSpinner from '@/components/common/LoadingSpinner'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

 if (isLoading) {
  return <LoadingSpinner fullScreen text="Loading dashboard..." />
}

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      {/* Mobile menu overlay */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <div className="flex">
        <Sidebar className="hidden lg:block" />
        
        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}