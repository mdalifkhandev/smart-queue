import React from 'react';
import { Briefcase, Clock, Tag } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ServiceCardProps {
    service: any;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
    return (
        <Card className="group hover:scale-[1.02] transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-xl text-violet-600 dark:text-violet-400">
                    <Briefcase size={24} />
                </div>
                <Badge variant="slate" className="bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {service.staffType} Required
                </Badge>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{service.name}</h3>

            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
                <Clock size={16} />
                <span>{service.duration} minutes</span>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center space-x-1 text-xs font-medium text-slate-400">
                    <Tag size={12} />
                    <span>Standard Category</span>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">Active</div>
            </div>
        </Card>
    );
};
