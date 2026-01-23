import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card = ({ children, className = '', onClick }: CardProps) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 ${className}`}
        >
            {children}
        </div>
    );
};
