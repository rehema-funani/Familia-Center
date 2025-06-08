// src/lib/types/index.ts

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'counselor' | 'admin';
  userType?: 'individual' | 'couple';
  profileImage?: string;
  isEmailVerified: boolean;
  subscriptionStatus: 'free' | 'premium' | 'family';
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  counselorId: string;
  counselor: User;
  participants: User[];
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  meetingUrl?: string;
  recordingUrl?: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  sessionType: 'individual' | 'couple' | 'group' | 'anonymous';
  isRecorded: boolean;
  maxParticipants: number;
  price: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // weeks
  sessionsPerWeek: number;
  totalSessions: number;
  price: number;
  currency: string;
  counselorId: string;
  counselor: User;
  sessions: Session[];
  resources: Resource[];
  isActive: boolean;
  enrolledUsers: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'audio' | 'document' | 'worksheet';
  fileUrl: string;
  size: number;
  isPublic: boolean;
  programId?: string;
  sessionId?: string;
  uploadedBy: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  sessionId: string;
  programId?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  totalAmount: number;
  currency: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  bookingId: string;
  amount: number;
  currency: string;
  paymentMethod: 'stripe' | 'mpesa' | 'paypal' | 'bank_transfer';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnonymousSession {
  id: string;
  alias: string;
  token: string;
  sessionType: 'chat' | 'audio' | 'video';
  isActive: boolean;
  expiresAt: Date;
  counselorId?: string;
  messages: AnonymousMessage[];
  createdAt: Date;
}

export interface AnonymousMessage {
  id: string;
  sessionId: string;
  sender: 'client' | 'counselor';
  message: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'session_reminder' | 'payment_success' | 'session_started' | 'assignment_due' | 'general';
  isRead: boolean;
  scheduledFor?: Date;
  sentAt?: Date;
  createdAt: Date;
}

export interface Progress {
  id: string;
  userId: string;
  programId: string;
  currentWeek: number;
  completedSessions: number;
  totalSessions: number;
  completedAssignments: number;
  totalAssignments: number;
  overallProgress: number; // percentage
  lastUpdated: Date;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  programId: string;
  weekNumber: number;
  dueDate: Date;
  type: 'essay' | 'reflection' | 'exercise' | 'quiz';
  isRequired: boolean;
  submissions: AssignmentSubmission[];
  createdAt: Date;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  content: string;
  fileUrl?: string;
  submittedAt: Date;
  grade?: number;
  feedback?: string;
  isLate: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'individual' | 'couple';
  agreeToTerms: boolean;
}

export interface BookingForm {
  sessionId: string;
  notes?: string;
  preferredTime?: Date;
  paymentMethod: string;
}