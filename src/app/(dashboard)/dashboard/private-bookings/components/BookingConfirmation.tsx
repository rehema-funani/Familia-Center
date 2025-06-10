'use client';

import { CheckCircle, Calendar, Clock, User, Mail, Phone, Download, Share2 } from 'lucide-react';

interface Counselor {
  id: string;
  name: string;
  specialization: string[];
  image: string;
  rating: number;
  experience: string;
  hourlyRate: number;
  availability: string[];
  bio: string;
}

interface BookingData {
  counselorId: string;
  date: string;
  time: string;
  sessionType: 'individual' | 'couple' | 'family';
  duration: 30 | 45 | 60 | 90;
  notes: string;
  files: File[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

interface BookingConfirmationProps {
  bookingData: Partial<BookingData>;
  counselor: Counselor | null;
  total: number;
}

export default function BookingConfirmation({ bookingData, counselor, total }: BookingConfirmationProps) {
  const bookingId = `FC-${Date.now().toString().slice(-6)}`;
  const sessionDate = bookingData.date ? new Date(bookingData.date) : new Date();
  
  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert('Receipt download functionality would be implemented here');
  };

  const handleShareSession = () => {
    // In a real app, this would share session details
    if (navigator.share) {
      navigator.share({
        title: 'Counseling Session Booked',
        text: `I've booked a counseling session with ${counselor?.name} on ${sessionDate.toLocaleDateString()}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `Counseling session booked with ${counselor?.name} on ${sessionDate.toLocaleDateString()} at ${bookingData.time}`
      );
      alert('Session details copied to clipboard!');
    }
  };

  return (
    <div className="p-6">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">Your counseling session has been successfully booked</p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          Booking ID: {bookingId}
        </div>
      </div>

      {/* Session Details Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Session Details</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Counselor</p>
                <p className="font-medium text-gray-900">{counselor?.name}</p>
                <p className="text-sm text-gray-600">{counselor?.specialization.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium text-gray-900">
                  {sessionDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-gray-600">{bookingData.time}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Session Type & Duration</p>
                <p className="font-medium text-gray-900 capitalize">{bookingData.sessionType} Session</p>
                <p className="text-sm text-gray-600">{bookingData.duration} minutes</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Client Information</p>
                <p className="font-medium text-gray-900">{bookingData.contactInfo?.name}</p>
                <p className="text-sm text-gray-600">{bookingData.contactInfo?.email}</p>
                <p className="text-sm text-gray-600">{bookingData.contactInfo?.phone}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-2">Total Amount Paid</p>
              <p className="text-2xl font-bold text-gray-900">KES {total.toFixed(0)}</p>
              <p className="text-sm text-green-600">Payment Confirmed</p>
            </div>
          </div>
        </div>

        {bookingData.notes && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Session Notes</p>
            <p className="text-gray-700">{bookingData.notes}</p>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">What's Next?</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div>
              <p className="font-medium text-blue-900">Confirmation Email</p>
              <p className="text-sm text-blue-700">
                You'll receive a confirmation email with session details and video call link at {bookingData.contactInfo?.email}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div>
              <p className="font-medium text-blue-900">Preparation</p>
              <p className="text-sm text-blue-700">
                Your counselor may send you pre-session materials or questionnaires to help make the most of your time together
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div>
              <p className="font-medium text-blue-900">Join Your Session</p>
              <p className="text-sm text-blue-700">
                15 minutes before your session, you'll be able to join via the video link in your confirmation email or through your dashboard
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handleDownloadReceipt}
          className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Receipt
        </button>

        <button
          onClick={handleShareSession}
          className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share Session
        </button>

        <button
          onClick={() => window.location.href = '/dashboard'}
          className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go to Dashboard
        </button>
      </div>

      {/* Important Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">Important Information</h3>
        <div className="space-y-2 text-sm text-yellow-800">
          <p>• <strong>Cancellation Policy:</strong> Sessions can be cancelled or rescheduled up to 24 hours before the appointment time.</p>
          <p>• <strong>Technical Requirements:</strong> Ensure you have a stable internet connection and a quiet, private space for your session.</p>
          <p>• <strong>Confidentiality:</strong> All sessions are completely confidential and secure.</p>
          <p>• <strong>Support:</strong> If you need to reschedule or have any questions, contact us at support@familycenter.ke or +254-800-123-456.</p>
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-4">Need help or have questions about your booking?</p>
        <div className="flex justify-center space-x-6">
          <a
            href="mailto:support@familycenter.ke"
            className="inline-flex items-center text-blue-600 hover:text-blue-500"
          >
            <Mail className="w-4 h-4 mr-2" />
            support@familycenter.ke
          </a>
          <a
            href="tel:+254800123456"
            className="inline-flex items-center text-blue-600 hover:text-blue-500"
          >
            <Phone className="w-4 h-4 mr-2" />
            +254-800-123-456
          </a>
        </div>
      </div>
    </div>
  );
}