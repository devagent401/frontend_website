import React, { forwardRef } from 'react';

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
    placeholder?: string;
    variant?: 'default' | 'filled' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    helperText,
    options,
    placeholder,
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
                <select
                    ref={ref}
                    className={`
                        w-full rounded-lg text-foreground
                        focus:outline-none focus:ring-2 focus:ring-primary transition-all
                        disabled:opacity-50 disabled:cursor-not-allowed
                        appearance-none cursor-pointer
                        ${variantClasses[variant]}
                        ${sizeClasses[size]}
                        ${error ? 'border-danger focus:ring-danger' : ''}
                        ${className}
                    `}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Custom dropdown arrow */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
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

Select.displayName = 'Select';

export default Select;
