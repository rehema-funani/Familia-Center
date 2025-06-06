import React from 'react';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'white';
  className?: string;
  label?: string;
  variant?: 'border' | 'dots' | 'pulse';
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
  label,
  variant = 'border',
}) => {
  const sizeStyles = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const colorStyles = {
    primary: 'border-blue-600',
    secondary: 'border-gray-600',
    success: 'border-green-600',
    danger: 'border-red-600',
    warning: 'border-yellow-600',
    info: 'border-cyan-600',
    white: 'border-white',
  };

  const dotColorStyles = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-cyan-600',
    white: 'bg-white',
  };

  const pulseColorStyles = {
    primary: 'bg-blue-200',
    secondary: 'bg-gray-200',
    success: 'bg-green-200',
    danger: 'bg-red-200',
    warning: 'bg-yellow-200',
    info: 'bg-cyan-200',
    white: 'bg-white/20',
  };

  if (variant === 'border') {
    return (
      <div className="inline-flex items-center gap-2">
        <div
          className={`
            ${sizeStyles[size]} 
            animate-spin rounded-full border-2 border-gray-200 
            ${colorStyles[color]} border-t-transparent
            ${className}
          `}
          role="status"
          aria-label={label || 'Loading'}
        />
        {label && <span className="text-sm text-gray-600">{label}</span>}
      </div>
    );
  }

  if (variant === 'dots') {
    const dotSize = {
      xs: 'h-1 w-1',
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
      xl: 'h-3 w-3',
    };

    return (
      <div className="inline-flex items-center gap-2">
        <div className={`inline-flex gap-1 ${className}`} role="status" aria-label={label || 'Loading'}>
          <div
            className={`${dotSize[size]} ${dotColorStyles[color]} rounded-full animate-bounce`}
            style={{ animationDelay: '0ms' }}
          />
          <div
            className={`${dotSize[size]} ${dotColorStyles[color]} rounded-full animate-bounce`}
            style={{ animationDelay: '150ms' }}
          />
          <div
            className={`${dotSize[size]} ${dotColorStyles[color]} rounded-full animate-bounce`}
            style={{ animationDelay: '300ms' }}
          />
        </div>
        {label && <span className="text-sm text-gray-600">{label}</span>}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className="inline-flex items-center gap-2">
        <div
          className={`
            ${sizeStyles[size]} 
            ${pulseColorStyles[color]} 
            rounded-full animate-pulse
            ${className}
          `}
          role="status"
          aria-label={label || 'Loading'}
        />
        {label && <span className="text-sm text-gray-600">{label}</span>}
      </div>
    );
  }

  return null;
};

// Full Page Spinner Component
export interface FullPageSpinnerProps {
  message?: string;
  size?: SpinnerProps['size'];
  color?: SpinnerProps['color'];
  variant?: SpinnerProps['variant'];
}

export const FullPageSpinner: React.FC<FullPageSpinnerProps> = ({
  message = 'Loading...',
  size = 'lg',
  color = 'primary',
  variant = 'border',
}) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        <Spinner size={size} color={color} variant={variant} />
        {message && (
          <p className="mt-4 text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

// Inline Spinner for buttons
export interface ButtonSpinnerProps {
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
  };

  return (
    <div
      className={`
        ${sizeStyles[size]} 
        animate-spin rounded-full border-2 border-white/30 border-t-white
        ${className}
      `}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;