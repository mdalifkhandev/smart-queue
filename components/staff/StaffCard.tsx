import React from 'react';
import { User, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface StaffCardProps {
    member: any;
    onToggleStatus: (id: string, status: string) => void;
}

export const StaffCard = ({ member, onToggleStatus }: StaffCardProps) => {
    const statusVariant = member.availabilityStatus === 'Available' ? 'emerald' : 'rose';

    return (
        <Card className="group hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <User size={24} />
                </div>
                <button
                    onClick={() => onToggleStatus(member._id, member.availabilityStatus)}
                    className="transition-transform active:scale-95"
                >
                    <Badge variant={statusVariant} className="cursor-pointer hover:opacity-80">
                        {member.availabilityStatus}
                    </Badge>
                </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{member.serviceType}</p>

            <div className="flex items-center space-x-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Daily Capacity</p>
                    <div className="flex items-center space-x-1 dark:text-slate-300">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-sm font-semibold">{member.dailyCapacity} slots/day</span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Current Load</p>
                    <span className={`text-sm font-bold ${member.currentLoad >= member.dailyCapacity ? 'text-rose-600' : 'text-indigo-600 dark:text-indigo-400'}`}>
                        {member.currentLoad} assigned
                    </span>
                </div>
            </div>
        </Card>
    );
};
