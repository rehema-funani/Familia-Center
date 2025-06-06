import React from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export interface AlertProps {
  variant?: 'default' | 'destructive' | 'warning' | 'success' | 'info';
  title?: string;
  description?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  icon?: boolean;
}

const alertVariants = {
  default: 'bg-gray-50 border-gray-200 text-gray-800',
  destructive: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const iconVariants = {
  default: AlertCircle,
  destructive: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle,
  info: Info,
};

const iconColors = {
  default: 'text-gray-500',
  destructive: 'text-red-500',
  warning: 'text-yellow-500',
  success: 'text-green-500',
  info: 'text-blue-500',
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  title,
  description,
  children,
  onClose,
  className = '',
  icon = true,
}) => {
  const IconComponent = iconVariants[variant];

  return (
    <div
      className={`
        relative rounded-lg border p-4 
        ${alertVariants[variant]} 
        ${className}
      `}
      role="alert"
    >
      <div className="flex">
        {icon && (
          <div className="flex-shrink-0">
            <IconComponent 
              className={`h-5 w-5 ${iconColors[variant]}`} 
              aria-hidden="true" 
            />
          </div>
        )}
        
        <div className={`${icon ? 'ml-3' : ''} flex-1`}>
          {title && (
            <h3 className="text-sm font-medium mb-1">
              {title}
            </h3>
          )}
          
          {description && (
            <div className="text-sm opacity-90">
              {description}
            </div>
          )}
          
          {children && (
            <div className="text-sm">
              {children}
            </div>
          )}
        </div>
        
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`
                  inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
                  hover:opacity-75 transition-opacity
                  ${iconColors[variant]} focus:ring-current
                `}
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Alert subcomponents for better API
export const AlertTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <h5 className={`mb-1 font-medium leading-none tracking-tight ${className}`}>
    {children}
  </h5>
);

export const AlertDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`text-sm opacity-90 ${className}`}>
    {children}
  </div>
);

export default Alert;