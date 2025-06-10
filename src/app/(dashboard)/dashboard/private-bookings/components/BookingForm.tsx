'use client';

import { useState } from 'react';
import { User, Mail, Phone, FileText, CreditCard, Users, Clock, Upload } from 'lucide-react';
import FileUpload from './FileUpload';

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

interface BookingFormProps {
  bookingData: Partial<BookingData>;
  selectedCounselor: Counselor | null;
  onSubmit: (formData: Partial<BookingData>) => void;
  isLoading: boolean;
  total: number;
}

const sessionTypes = [
  { value: 'individual', label: 'Individual Session', icon: User, description: 'One-on-one therapy session' },
  { value: 'couple', label: 'Couple Session', icon: Users, description: 'Relationship counseling for two people' },
  { value: 'family', label: 'Family Session', icon: Users, description: 'Family therapy session' }
];

const durations = [
  { value: 30, label: '30 minutes', price: 0.5 },
  { value: 45, label: '45 minutes', price: 0.75 },
  { value: 60, label: '60 minutes', price: 1 },
  { value: 90, label: '90 minutes', price: 1.5 }
];

export default function BookingForm({ bookingData, selectedCounselor, onSubmit, isLoading, total }: BookingFormProps) {
  const [formData, setFormData] = useState<Partial<BookingData>>({
    ...bookingData,
    sessionType: bookingData.sessionType || 'individual',
    duration: bookingData.duration || 60,
    notes: bookingData.notes || '',
    files: bookingData.files || [],
    contactInfo: {
      name: bookingData.contactInfo?.name || '',
      email: bookingData.contactInfo?.email || '',
      phone: bookingData.contactInfo?.phone || ''
    }
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mpesa'>('mpesa');

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('contactInfo.')) {
      const contactField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo!,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFileUpload = (files: File[]) => {
    setFormData(prev => ({ ...prev, files }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const calculatePrice = (duration: number) => {
    if (!selectedCounselor) return 0;
    return (selectedCounselor.hourlyRate * duration) / 60;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Details</h2>
        <p className="text-gray-600">Provide your information and session preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Session Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Session Type</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sessionTypes.map(type => {
              const Icon = type.icon;
              const isSelected = formData.sessionType === type.value;
              
              return (
                <div
                  key={type.value}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange('sessionType', type.value)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div>
                      <h3 className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                        {type.label}
                      </h3>
                      <p className={`text-sm ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                        {type.description}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Session Duration</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {durations.map(duration => {
              const isSelected = formData.duration === duration.value;
              const price = calculatePrice(duration.value);
              
              return (
                <div
                  key={duration.value}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange('duration', duration.value)}
                >
                  <div className="text-center">
                    <Clock className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                    <h3 className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                      {duration.label}
                    </h3>
                    <p className={`text-sm ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                      KES {price.toFixed(0)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.contactInfo?.name || ''}
                  onChange={(e) => handleInputChange('contactInfo.name', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.contactInfo?.email || ''}
                  onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={formData.contactInfo?.phone || ''}
                  onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+254 xxx xxx xxx"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Session Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Notes (Optional)
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              rows={4}
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share any specific concerns, topics you'd like to discuss, or background information that might be helpful..."
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supporting Documents (Optional)
          </label>
          <FileUpload onFilesUploaded={handleFileUpload} />
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                paymentMethod === 'mpesa' ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
              onClick={() => setPaymentMethod('mpesa')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">M-Pesa</h3>
                  <p className="text-sm text-gray-500">Pay via mobile money</p>
                </div>
              </div>
            </div>

            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setPaymentMethod('card')}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Credit/Debit Card</h3>
                  <p className="text-sm text-gray-500">Pay with Visa, Mastercard</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Session Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Counselor:</span>
              <span className="font-medium">{selectedCounselor?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {formData.date ? new Date(formData.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Not selected'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{formData.time || 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Session Type:</span>
              <span className="font-medium capitalize">{formData.sessionType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{formData.duration} minutes</span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>KES {total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>,{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>, and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Cancellation Policy</a>.
            I understand that sessions must be cancelled at least 24 hours in advance.
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Confirm & Pay KES {total.toFixed(0)}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}