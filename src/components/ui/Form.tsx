import React, { createContext, useContext, useId } from 'react';
import { AlertCircle } from 'lucide-react';

// Form Context
interface FormContextValue {
  formId: string;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

// Form Root Component
export interface FormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: React.FC<FormProps> = ({ children, className = '', onSubmit }) => {
  const formId = useId();

  return (
    <FormContext.Provider value={{ formId }}>
      <form className={className} onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </FormContext.Provider>
  );
};

// Form Field Component
export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
  error?: string;
  name: string;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  children, 
  className = '', 
  error,
  name 
}) => {
  const fieldId = useId();

  return (
    <div className={`space-y-2 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Fix: Cast both the child and its props to resolve TypeScript issues
          const typedChild = child as React.ReactElement<any>;
          const childProps = typedChild.props as any;
          
          return React.cloneElement(typedChild, {
            id: childProps.id || fieldId,
            name: childProps.name || name,
            'aria-invalid': error ? 'true' : 'false',
            'aria-describedby': error ? `${fieldId}-error` : undefined,
          });
        }
        return child;
      })}
      {error && (
        <FormMessage id={`${fieldId}-error`} variant="error">
          {error}
        </FormMessage>
      )}
    </div>
  );
};

// Form Label Component
export interface FormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({ 
  children, 
  htmlFor, 
  required = false, 
  className = '' 
}) => {
  return (
    <label 
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

// Form Input Component
export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  variant?: 'default' | 'filled';
}

export const FormInput: React.FC<FormInputProps> = ({ 
  className = '', 
  error = false, 
  variant = 'default',
  ...props 
}) => {
  const baseStyles = `
    w-full rounded-md border px-3 py-2 text-sm transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
  `;

  const variantStyles = {
    default: 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500',
    filled: 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 focus:bg-white',
  };

  const errorStyles = error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
    : '';

  return (
    <input
      className={`${baseStyles} ${variantStyles[variant]} ${errorStyles} ${className}`}
      {...props}
    />
  );
};

// Form Textarea Component
export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  variant?: 'default' | 'filled';
}

export const FormTextarea: React.FC<FormTextareaProps> = ({ 
  className = '', 
  error = false, 
  variant = 'default',
  ...props 
}) => {
  const baseStyles = `
    w-full rounded-md border px-3 py-2 text-sm transition-colors resize-vertical
    focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[80px]
    disabled:cursor-not-allowed disabled:opacity-50
  `;

  const variantStyles = {
    default: 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500',
    filled: 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 focus:bg-white',
  };

  const errorStyles = error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
    : '';

  return (
    <textarea
      className={`${baseStyles} ${variantStyles[variant]} ${errorStyles} ${className}`}
      {...props}
    />
  );
};

// Form Select Component
export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  error?: boolean;
  variant?: 'default' | 'filled';
}

export const FormSelect: React.FC<FormSelectProps> = ({ 
  children,
  className = '', 
  error = false, 
  variant = 'default',
  ...props 
}) => {
  const baseStyles = `
    w-full rounded-md border px-3 py-2 text-sm transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    appearance-none bg-no-repeat bg-right bg-[length:16px_16px]
    bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")]
  `;

  const variantStyles = {
    default: 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500 pr-10',
    filled: 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 focus:bg-white pr-10',
  };

  const errorStyles = error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
    : '';

  return (
    <select
      className={`${baseStyles} ${variantStyles[variant]} ${errorStyles} ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

// Form Message Component
export interface FormMessageProps {
  children: React.ReactNode;
  variant?: 'default' | 'error' | 'success' | 'warning';
  className?: string;
  id?: string;
}

export const FormMessage: React.FC<FormMessageProps> = ({ 
  children, 
  variant = 'default', 
  className = '',
  id 
}) => {
  const variantStyles = {
    default: 'text-gray-600',
    error: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
  };

  return (
    <p 
      id={id}
      className={`text-sm flex items-center gap-1 ${variantStyles[variant]} ${className}`}
    >
      {variant === 'error' && <AlertCircle className="h-4 w-4 flex-shrink-0" />}
      {children}
    </p>
  );
};

// Form Description Component
export interface FormDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const FormDescription: React.FC<FormDescriptionProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <p className={`text-sm text-gray-600 ${className}`}>
      {children}
    </p>
  );
};

// Form Group Component for better organization
export interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({ children, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  );
};

// Form Actions Component for buttons
export interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const FormActions: React.FC<FormActionsProps> = ({ 
  children, 
  className = '', 
  align = 'right' 
}) => {
  const alignmentStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className={`flex gap-3 ${alignmentStyles[align]} ${className}`}>
      {children}
    </div>
  );
};

export default Form;