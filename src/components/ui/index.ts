// UI Components Index
// Export all UI components for easy importing

// Import components so they're available for the default export
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from './Alert';

import {
  Dropdown,
} from './Dropdown';

import {
  Form,
  FormField,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormMessage,
  FormDescription,
  FormGroup,
  FormActions,
} from './Form';

// Alert Components
export {
  Alert,
  AlertTitle,
  AlertDescription,
  type AlertProps,
} from './Alert';

// Dropdown Components
export {
  Dropdown,
  type DropdownProps,
  type DropdownOption,
} from './Dropdown';

// Form Components
export {
  Form,
  FormField,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormMessage,
  FormDescription,
  FormGroup,
  FormActions,
  type FormProps,
  type FormFieldProps,
  type FormLabelProps,
  type FormInputProps,
  type FormTextareaProps,
  type FormSelectProps,
  type FormMessageProps,
  type FormDescriptionProps,
  type FormGroupProps,
  type FormActionsProps,
} from './Form';

// Export other UI components (assuming they exist)
// These would be imported from their respective files
// export { Button, type ButtonProps } from './Button';
// export { Card, type CardProps } from './Card';
// export { Input, type InputProps } from './Input';
// export { Modal, type ModalProps } from './Modal';
// export { Badge, type BadgeProps } from './Badge';
// export { Progress, type ProgressProps } from './Progress';
// export { Spinner, type SpinnerProps } from './Spinner';
// export { Table, type TableProps } from './Table';
// export { Tabs, type TabsProps } from './Tabs';
// export { Tooltip, type TooltipProps } from './Tooltip';

// Re-export everything as a default object for convenience
// Now the components are in scope and can be used with shorthand syntax
export default {
  Alert,
  AlertTitle,
  AlertDescription,
  Dropdown,
  Form,
  FormField,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormMessage,
  FormDescription,
  FormGroup,
  FormActions,
};