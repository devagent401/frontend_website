import React, { forwardRef } from 'react';

interface TInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'default' | 'filled' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, TInputProps>(({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    variant = 'default',
    size = 'md',
    className = '',
    ...props
}, ref) => {
    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg'
    };

    const variantClasses = {
        default: 'border border-border bg-background',
        filled: 'border-0 bg-muted',
        outlined: 'border-2 border-border bg-transparent'
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-foreground mb-2">
                    {label}
                    {props.required && <span className="text-danger ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50">
                        {leftIcon}
                    </div>
                )}

                <input
                    ref={ref}
                    className={`
                        w-full rounded-xs text-foreground placeholder:text-foreground/50
                        focus:outline-none focus:ring-2 focus:ring-primary transition-all
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${variantClasses[variant]}
                        ${sizeClasses[size]}
                        ${leftIcon ? 'pl-10' : ''}
                        ${rightIcon ? 'pr-10' : ''}
                        ${error ? 'border-danger focus:ring-danger' : ''}
                        ${className}
                    `}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50">
                        {rightIcon}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-danger text-sm mt-1">{error}</p>
            )}

            {helperText && !error && (
                <p className="text-foreground/60 text-sm mt-1">{helperText}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
