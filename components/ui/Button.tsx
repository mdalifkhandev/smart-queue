import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    children: React.ReactNode;
}

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
        secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
        outline: 'border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800',
        ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800',
    };

    return (
        <button
            className={`px-4 py-2 rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 font-semibold flex items-center justify-center space-x-2 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
