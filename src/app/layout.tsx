// import { ReactNode } from 'react'
// import Navigation from '@/components/layout/Navigation'
// import Sidebar from '@/components/layout/Sidebar'

// interface DashboardLayoutProps {
//   children: ReactNode
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1 ml-64">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Family Center - Professional Counseling & Support',
  description: 'Supporting families and individuals through professional counseling and educational resources',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}