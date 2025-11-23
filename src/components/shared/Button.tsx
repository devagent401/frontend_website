import React from 'react';

type TButton = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const btnSize = {
    sm: 'w-48 h-14',
    md: 'w-36 h-12',
    lg: 'w-48 h-14',
}

export default function Button({ children, onClick, className, size = 'lg', disabled, type = 'button' }: TButton) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`bg-secondary-deep text-primary-foreground w-12 ${btnSize[size]} rounded-[3px] inline-flex justify-center items-center gap-2 cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
