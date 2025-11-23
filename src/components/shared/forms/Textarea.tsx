import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    variant?: 'default' | 'filled' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
    label,
    error,
    helperText,
    variant = 'default',
    size = 'md',
    resize = 'vertical',
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

    const resizeClasses = {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize'
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-foreground mb-2">
                    {label}
                    {props.required && <span className="text-danger ml-1">*</span>}
                </label>
            )}

            <textarea
                ref={ref}
                className={`
                    w-full rounded-lg text-foreground placeholder:text-foreground/50
                    focus:outline-none focus:ring-2 focus:ring-primary transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${variantClasses[variant]}
                    ${sizeClasses[size]}
                    ${resizeClasses[resize]}
                    ${error ? 'border-danger focus:ring-danger' : ''}
                    ${className}
                `}
                {...props}
            />

            {error && (
                <p className="text-danger text-sm mt-1">{error}</p>
            )}

            {helperText && !error && (
                <p className="text-foreground/60 text-sm mt-1">{helperText}</p>
            )}
        </div>
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;
