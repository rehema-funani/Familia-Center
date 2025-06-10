'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';

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

interface BookingCalendarProps {
  counselor: Counselor;
  onDateTimeSelect: (date: string, time: string) => void;
  selectedDate?: string;
  selectedTime?: string;
}

// Sample time slots
const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30'
];

export default function BookingCalendar({ counselor, onDateTimeSelect, selectedDate, selectedTime }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateState, setSelectedDateState] = useState<string>(selectedDate || '');

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateAvailable = (date: Date) => {
    if (date < new Date()) return false;
    const dayName = date.toLocaleString('en-US', { weekday: 'long' }).toLocaleLowerCase();

    return counselor.availability.some(day => day.toLowerCase() === dayName.toLowerCase());
  };

  const isTimeSlotAvailable = (time: string) => {
    // Simple logic - assume some slots are booked
    const bookedSlots = ['09:00', '14:00', '16:30'];
    return !bookedSlots.includes(time);
  };

  const handleDateSelect = (date: Date) => {
    if (!isDateAvailable(date)) return;
    const dateString = formatDate(date);
    setSelectedDateState(dateString);
  };

  const handleTimeSelect = (time: string) => {
    if (!isTimeSlotAvailable(time) || !selectedDateState) return;
    onDateTimeSelect(selectedDateState, time);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Date & Time</h2>
        <p className="text-gray-600">Book a session with {counselor.name}</p>
        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Available on: {counselor.availability.join(', ')} • Rate: KES {counselor.hourlyRate}/hour
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{monthYear}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="h-10" />;
                }

                const dateString = formatDate(day);
                const isAvailable = isDateAvailable(day);
                const isSelected = selectedDateState === dateString;
                const isToday = formatDate(new Date()) === dateString;

                return (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(day)}
                    disabled={!isAvailable}
                    className={`h-10 text-sm rounded-md transition-colors ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : isToday
                        ? 'bg-blue-100 text-blue-600'
                        : isAvailable
                        ? 'hover:bg-gray-100 text-gray-900'
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1" />
                  <span>Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-100 rounded-full mr-1" />
                  <span>Today</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-100 rounded-full mr-1" />
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Available Times
            </h3>

            {!selectedDateState ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Please select a date first</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => {
                  const isAvailable = isTimeSlotAvailable(time);
                  const isSelected = selectedTime === time;
                  
                  return (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      disabled={!isAvailable}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        isSelected
                          ? 'bg-blue-500 text-white border-blue-500'
                          : isAvailable
                          ? 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                          : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            )}

            {selectedDateState && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Selected Date: <span className="font-medium">{new Date(selectedDateState).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </p>
                {selectedTime && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected Time: <span className="font-medium">{selectedTime}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}