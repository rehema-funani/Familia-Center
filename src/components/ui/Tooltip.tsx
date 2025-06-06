import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Tooltip Context
interface TooltipContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  delayDuration: number;
}

const TooltipContext = createContext<TooltipContextValue | undefined>(undefined);

const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip components must be used within a TooltipProvider');
  }
  return context;
};

// Tooltip Props
export interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

export interface TooltipProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  hideWhenDetached?: boolean;
  avoidCollisions?: boolean;
}

// Tooltip Provider Component
export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  delayDuration = 700,
}) => {
  return (
    <div className="tooltip-provider">
      {children}
    </div>
  );
};

// Tooltip Component
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  open,
  onOpenChange,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenChange = (newOpen: boolean) => {
    if (open === undefined) {
      setIsOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const currentOpen = open !== undefined ? open : isOpen;

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    if (currentOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentOpen]);

  return (
    <TooltipContext.Provider
      value={{
        isOpen: currentOpen,
        setIsOpen: handleOpenChange,
        triggerRef,
        contentRef,
        delayDuration: 700,
      }}
    >
      <div className="relative inline-block">
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

// Tooltip Trigger Component
export const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const { setIsOpen, triggerRef, delayDuration } = useTooltipContext();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsOpen(true);
      }, delayDuration);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(false);
    };

    const handleFocus = () => {
      setIsOpen(true);
    };

    const handleBlur = () => {
      setIsOpen(false);
    };

    // Helper function to properly handle ref assignment
    const setRefs = (node: HTMLElement | null) => {
      // Handle the forwarded ref
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      // Handle the trigger ref
      triggerRef.current = node;
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: setRefs,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        className: cn((children as any).props?.className, className),
        ...props,
      });
    }

    return (
      <div
        ref={setRefs}
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipTrigger.displayName = 'TooltipTrigger';

// Tooltip Content Component
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({
    className,
    side = 'top',
    align = 'center',
    sideOffset = 4,
    alignOffset = 0,
    children,
    ...props
  }, ref) => {
    const { isOpen, contentRef, triggerRef } = useTooltipContext();
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
      if (isOpen && triggerRef.current && contentRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        
        let top = 0;
        let left = 0;

        // Calculate position based on side
        switch (side) {
          case 'top':
            top = triggerRect.top - contentRect.height - sideOffset;
            break;
          case 'bottom':
            top = triggerRect.bottom + sideOffset;
            break;
          case 'left':
            left = triggerRect.left - contentRect.width - sideOffset;
            break;
          case 'right':
            left = triggerRect.right + sideOffset;
            break;
        }

        // Calculate alignment
        if (side === 'top' || side === 'bottom') {
          switch (align) {
            case 'start':
              left = triggerRect.left + alignOffset;
              break;
            case 'center':
              left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2 + alignOffset;
              break;
            case 'end':
              left = triggerRect.right - contentRect.width - alignOffset;
              break;
          }
        } else {
          switch (align) {
            case 'start':
              top = triggerRect.top + alignOffset;
              break;
            case 'center':
              top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2 + alignOffset;
              break;
            case 'end':
              top = triggerRect.bottom - contentRect.height - alignOffset;
              break;
          }
        }

        setPosition({ top, left });
      }
    }, [isOpen, side, align, sideOffset, alignOffset]);

    if (!isOpen) {
      return null;
    }

    const sideClasses = {
      top: 'mb-2',
      bottom: 'mt-2',
      left: 'mr-2',
      right: 'ml-2',
    };

    // Helper function to properly handle ref assignment
    const setRefs = (node: HTMLDivElement | null) => {
      // Handle the forwarded ref
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      // Handle the content ref
      contentRef.current = node;
    };

    return (
      <>
        {/* Portal-like positioning */}
        <div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            top: 0,
            left: 0,
          }}
        >
          <div
            ref={setRefs}
            className={cn(
              'absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md shadow-lg pointer-events-auto',
              'animate-in fade-in-0 zoom-in-95',
              sideClasses[side],
              className
            )}
            style={{
              top: position.top,
              left: position.left,
            }}
            {...props}
          >
            {children}
            {/* Arrow */}
            <div
              className={cn(
                'absolute w-2 h-2 bg-gray-900 transform rotate-45',
                side === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
                side === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
                side === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
                side === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
              )}
            />
          </div>
        </div>
      </>
    );
  }
);
TooltipContent.displayName = 'TooltipContent';