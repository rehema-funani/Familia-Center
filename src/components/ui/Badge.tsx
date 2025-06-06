import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'secondary':
          return 'bg-gray-100 text-gray-800 border-gray-200';
        case 'destructive':
          return 'bg-red-100 text-red-800 border-red-200';
        case 'outline':
          return 'bg-transparent border-gray-300 text-gray-700';
        case 'success':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'warning':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default:
          return 'bg-blue-100 text-blue-800 border-blue-200';
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'px-2 py-0.5 text-xs';
        case 'lg':
          return 'px-3 py-1.5 text-base';
        default:
          return 'px-2.5 py-1 text-sm';
      }
    };

    const classes = [
      'inline-flex items-center rounded-full border font-medium transition-colors',
      getVariantClasses(),
      getSizeClasses(),
      className
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
export default Badge;