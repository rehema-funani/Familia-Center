// src/app/(dashboard)/dashboard/live-sessions/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live Sessions | Family Center',
  description: 'Join live counseling sessions'
}

export default function LiveSessionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}