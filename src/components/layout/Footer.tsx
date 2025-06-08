'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth/useAuth'
import { 
  Heart, 
  Shield, 
  HelpCircle, 
  Mail, 
  Phone, 
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react'

export default function Footer() {
  const { user } = useAuth()
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { name: 'Live Sessions', href: '/dashboard/live-sessions' },
      { name: 'Recorded Library', href: '/dashboard/recorded-library' },
      { name: 'Teaching Modules', href: '/dashboard/teaching-modules' },
      { name: 'Resources', href: '/dashboard/resources' }
    ],
    support: [
      { name: 'Help Center', href: '/support/help' },
      { name: 'Contact Support', href: '/support/contact' },
      { name: 'System Status', href: '/support/status' },
      { name: 'Report Issue', href: '/support/report' }
    ],
    counseling: [
      { name: 'Private Bookings', href: '/dashboard/private-bookings' },
      { name: 'Anonymous Access', href: '/dashboard/anonymous-access' },
      { name: 'Find a Counselor', href: '/counselors' },
      { name: 'Emergency Resources', href: '/emergency' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Terms of Service', href: '/legal/terms' },
      { name: 'Cookie Policy', href: '/legal/cookies' },
      { name: 'Data Protection', href: '/legal/data-protection' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin }
  ]

  const emergencyContacts = [
    { name: 'Crisis Helpline', phone: '+254-800-123-456', available: '24/7' },
    { name: 'Support Email', email: 'support@familycenter.ke', available: 'Mon-Fri 8AM-6PM' }
  ]

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800 mb-1">
                Crisis Support Available
              </h3>
              <p className="text-sm text-red-700 mb-2">
                If you're experiencing a mental health emergency, please contact emergency services or use our crisis resources.
              </p>
              <div className="flex flex-wrap gap-4 text-xs">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center text-red-800">
                    {contact.phone && <Phone className="h-3 w-3 mr-1" />}
                    {contact.email && <Mail className="h-3 w-3 mr-1" />}
                    <span className="font-medium mr-2">
                      {contact.phone || contact.email}
                    </span>
                    <span className="text-red-600">({contact.available})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="xl:col-span-1">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">Family Center</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Supporting families and individuals through professional counseling and educational resources. Your journey to wellness starts here.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Counseling Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Counseling
            </h3>
            <ul className="space-y-2">
              {footerLinks.counseling.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center"
                  >
                    {link.name}
                    {link.name === 'Emergency Resources' && (
                      <ExternalLink className="h-3 w-3 ml-1" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center"
                  >
                    {link.name}
                    {link.name === 'Help Center' && (
                      <HelpCircle className="h-3 w-3 ml-1" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-gray-500">
                © {currentYear} Family Center. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>Made with ❤️ in Kenya</span>
                <span>•</span>
                <span>Powered by secure technology</span>
              </div>
            </div>
            
            {user && (
              <div className="mt-4 md:mt-0 text-xs text-gray-500">
                Logged in as: <span className="font-medium">{user.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Disclaimer */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center max-w-4xl mx-auto">
            <strong>Professional Disclaimer:</strong> The information and services provided through Family Center are for educational and support purposes. 
            They do not constitute professional medical, psychological, or legal advice. Always consult with qualified professionals for serious mental health concerns. 
            In case of emergency, contact local emergency services immediately.
          </p>
        </div>
      </div>
    </footer>
  )
}