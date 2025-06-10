'use client';

import { Star, Clock, MapPin, Users } from 'lucide-react';

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

interface CounselorSelectionProps {
  counselors: Counselor[];
  onSelect: (counselor: Counselor) => void;
  selectedCounselor: Counselor | null;
}

export default function CounselorSelection({ counselors, onSelect, selectedCounselor }: CounselorSelectionProps) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Counselor</h2>
        <p className="text-gray-600">Select from our team of experienced and qualified therapists</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {counselors.map((counselor) => (
          <div
            key={counselor.id}
            className={`relative bg-white border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedCounselor?.id === counselor.id
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelect(counselor)}
          >
            {selectedCounselor?.id === counselor.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}

            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{counselor.name}</h3>
              <div className="flex items-center justify-center mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(counselor.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({counselor.rating})</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>{counselor.experience} experience</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>KES {counselor.hourlyRate}/hour</span>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-1">
                  {counselor.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{counselor.bio}</p>

              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1">Available Days:</p>
                <div className="flex flex-wrap gap-1">
                  {counselor.availability.map((day, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              className={`w-full mt-4 px-4 py-2 rounded-md font-medium transition-colors ${
                selectedCounselor?.id === counselor.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {selectedCounselor?.id === counselor.id ? 'Selected' : 'Select Counselor'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Need Help Choosing?</h4>
        <p className="text-sm text-blue-700">
          All our counselors are licensed professionals. You can schedule a brief consultation call to help you decide which therapist might be the best fit for your needs.
        </p>
      </div>
    </div>
  );
}