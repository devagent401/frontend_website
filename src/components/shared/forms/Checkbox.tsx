import React, { forwardRef } from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label?: string;
    description?: string;
    error?: string;
    variant?: 'default' | 'filled';
    size?: 'sm' | 'md' | 'lg';
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
    label,
    description,
    error,
    variant = 'default',
    size = 'md',
    className = '',
    ...props
}, ref) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    const variantClasses = {
        default: 'border-border',
        filled: 'border-border bg-muted'
    };

    return (
        <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
                <input
                    ref={ref}
                    type="checkbox"
                    className={`
                        rounded border-2 text-primary
                        focus:ring-2 focus:ring-primary focus:ring-offset-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all
                        ${sizeClasses[size]}
                        ${variantClasses[variant]}
                        ${error ? 'border-danger focus:ring-danger' : ''}
                        ${className}
                    `}
                    {...props}
                />
            </div>

            <div className="flex-1">
                {label && (
                    <label className="block text-sm font-medium text-foreground">
                        {label}
                        {props.required && <span className="text-danger ml-1">*</span>}
                    </label>
                )}

                {description && (
                    <p className="text-sm text-foreground/60 mt-1">{description}</p>
                )}

                {error && (
                    <p className="text-danger text-sm mt-1">{error}</p>
                )}
            </div>
        </div>
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
