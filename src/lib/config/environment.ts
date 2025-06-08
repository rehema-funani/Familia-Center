// src/lib/config/environment.ts
export const ENV = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',
  
  // Authentication
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  
  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  
  // Google Meet/Calendar
  GOOGLE_MEET_CLIENT_ID: process.env.GOOGLE_MEET_CLIENT_ID || '',
  GOOGLE_MEET_CLIENT_SECRET: process.env.GOOGLE_MEET_CLIENT_SECRET || '',
  
  // Payment Gateways
  STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY || '',
  MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET || '',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || '',
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || '',
  
  // Cloud Storage
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || '',
  
  // Notifications
  EMAIL_SERVICE_API_KEY: process.env.EMAIL_SERVICE_API_KEY || '',
  SMS_SERVICE_API_KEY: process.env.SMS_SERVICE_API_KEY || '',
  
  // Django Backend (if using)
  DJANGO_API_URL: process.env.DJANGO_API_URL || 'http://localhost:8000/api',
  
  // App Settings
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
};

export const isProduction = ENV.NODE_ENV === 'production';
export const isDevelopment = ENV.NODE_ENV === 'development';