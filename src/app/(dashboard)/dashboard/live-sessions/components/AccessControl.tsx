// // src/app/(dashboard)/live-sessions/components/AccessControl.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { Alert } from '@/components/ui/Alert'
// import { Button } from '@/components/ui/Button'
// import { Badge } from '@/components/ui/Badge'

// interface UserSubscription {
//   isActive: boolean
//   plan: string
//   expiresAt?: string
//   sessionsRemaining?: number
// }

// export default function AccessControl() {
//   const [subscription, setSubscription] = useState<UserSubscription | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Simulate API call to check subscription status
//     setTimeout(() => {
//       setSubscription({
//         isActive: true,
//         plan: 'Premium',
//         expiresAt: '2025-07-09',
//         sessionsRemaining: 8
//       })
//       setLoading(false)
//     }, 500)
//   }, [])

//   if (loading) {
//     return (
//       <div className="bg-white rounded-lg p-4 animate-pulse">
//         <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//         <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//       </div>
//     )
//   }

//   if (!subscription?.isActive) {
//     return (
//       <Alert className="border-orange-200 bg-orange-50">
//         <div className="flex items-center justify-between">
//           <div>
//             <h3 className="font-medium text-orange-800">
//               Subscription Required
//             </h3>
//             <p className="text-sm text-orange-700 mt-1">
//               You need an active subscription to join live sessions. 
//               Upgrade now to access all features.
//             </p>
//           </div>
//           <Button className="bg-orange-600 hover:bg-orange-700">
//             Upgrade Now
//           </Button>
//         </div>
//       </Alert>
//     )
//   }

//   return (
//     <div className="bg-white rounded-lg p-4 border border-green-200">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//           <div>
//             <h3 className="font-medium text-green-800">
//               Access Granted
//             </h3>
//             <div className="flex items-center gap-2 mt-1">
//               <Badge className="bg-green-100 text-green-800">
//                 {subscription.plan} Plan
//               </Badge>
//               {subscription.sessionsRemaining && (
//                 <span className="text-sm text-green-700">
//                   {subscription.sessionsRemaining} sessions remaining
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
        
//         {subscription.expiresAt && (
//           <div className="text-right">
//             <p className="text-xs text-gray-600">Expires</p>
//             <p className="text-sm font-medium text-gray-900">
//               {new Date(subscription.expiresAt).toLocaleDateString()}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
// src/app/(dashboard)/live-sessions/components/AccessControl.tsx
'use client'

import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'

export default function AccessControl() {
  return (
    <Alert className="bg-blue-50 border-blue-200">
      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-blue-800">
          Session Access Information
        </h3>
        <p className="mt-1 text-sm text-blue-700">
          Live sessions are available to premium subscribers. Upgrade your subscription to join live counseling sessions.
        </p>
        <div className="mt-4">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Upgrade Now
          </Button>
        </div>
      </div>
    </Alert>
  )
}