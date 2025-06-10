'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Mail, Upload, CreditCard, CheckCircle } from 'lucide-react';
import BookingCalendar from './components/BookingCalendar';
import CounselorSelection from './components/CounselorSelection';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import FileUpload from './components/FileUpload';

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

const counselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: ['Marriage Counseling', 'Relationship Therapy', 'Communication Skills'],
    image: '/api/placeholder/150/150',
    rating: 4.9,
    experience: '15 years',
    hourlyRate: 120,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    bio: 'Specialized in couples therapy with over 15 years of experience helping relationships thrive.'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: ['Individual Therapy', 'Anxiety', 'Depression', 'Personal Development'],
    image: '/api/placeholder/150/150',
    rating: 4.8,
    experience: '12 years',
    hourlyRate: 100,
    availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    bio: 'Expert in cognitive behavioral therapy and mindfulness-based interventions.'
  },
  {
    id: '3',
    name: 'Dr. Lisa Rodriguez',
    specialization: ['Family Therapy', 'Child Psychology', 'Parenting Support'],
    image: '/api/placeholder/150/150',
    rating: 4.9,
    experience: '18 years',
    hourlyRate: 130,
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    bio: 'Family systems therapist specializing in parent-child relationships and family dynamics.'
  }
];

export default function PrivateBookingsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({
    sessionType: 'individual',
    duration: 60,
    files: [],
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const steps = [
    { number: 1, title: 'Select Counselor', icon: User },
    { number: 2, title: 'Choose Date & Time', icon: Calendar },
    { number: 3, title: 'Session Details', icon: Clock },
    { number: 4, title: 'Payment & Confirmation', icon: CreditCard }
  ];

  const handleCounselorSelect = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setBookingData(prev => ({ ...prev, counselorId: counselor.id }));
    setCurrentStep(2);
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    setBookingData(prev => ({ ...prev, date, time }));
    setCurrentStep(3);
  };

  const handleBookingSubmit = async (formData: Partial<BookingData>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBookingData(prev => ({ ...prev, ...formData }));
      setCurrentStep(4);
      setBookingConfirmed(true);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedCounselor || !bookingData.duration) return 0;
    return (selectedCounselor.hourlyRate * bookingData.duration) / 60;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Private Bookings</h1>
          <p className="mt-2 text-gray-600">Book a personalized counseling session with our expert therapists</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted ? 'bg-green-500 border-green-500 text-white' :
                  isActive ? 'bg-blue-500 border-blue-500 text-white' :
                  'bg-white border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    Step {step.number}
                  </p>
                  <p className={`text-xs ${
                    isActive ? 'text-blue-500' : isCompleted ? 'text-green-500' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {currentStep === 1 && (
            <CounselorSelection
              counselors={counselors}
              onSelect={handleCounselorSelect}
              selectedCounselor={selectedCounselor}
            />
          )}

          {currentStep === 2 && selectedCounselor && (
            <BookingCalendar
              counselor={selectedCounselor}
              onDateTimeSelect={handleDateTimeSelect}
              selectedDate={bookingData.date}
              selectedTime={bookingData.time}
            />
          )}

          {currentStep === 3 && (
  <div className="p-6 space-y-6">
    <BookingForm
      bookingData={bookingData}
      selectedCounselor={selectedCounselor}
      onSubmit={handleBookingSubmit}
      isLoading={isLoading}
      total={calculateTotal()}
    />

    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Upload supporting documents (optional)</h2>
      <FileUpload
        onFilesUploaded={(files: File[]) =>
          setBookingData(prev => ({ ...prev, files }))
        }
      />
    </div>
  </div>
)}


          {currentStep === 4 && bookingConfirmed && (
            <BookingConfirmation
              bookingData={bookingData}
              counselor={selectedCounselor}
              total={calculateTotal()}
            />
          )}
        </div>

        {/* Back Button */}
        {currentStep > 1 && currentStep < 4 && (
          <div className="mt-6">
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Back
            </button>
          </div>
        )}
      </div>

      {/* Emergency Notice */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Phone className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Crisis Support Available</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>If you're experiencing a mental health emergency, please contact emergency services immediately or call our crisis line: <strong>+254-800-123-456</strong> (24/7)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}