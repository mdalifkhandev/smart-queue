import React from 'react';
import { Card } from '../ui/Card';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

export const StatCard = ({ title, value, icon, color }: StatCardProps) => {
    return (
        <Card className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${color} dark:bg-opacity-20`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            </div>
        </Card>
    );
};
