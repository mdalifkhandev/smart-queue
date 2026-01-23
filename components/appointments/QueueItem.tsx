import React from 'react';
import { AlertCircle } from 'lucide-react';
import moment from 'moment';
import { Card } from '../ui/Card';

interface QueueItemProps {
    appointment: any;
    index: number;
}

export const QueueItem = ({ appointment, index }: QueueItemProps) => {
    return (
        <Card className="p-4 bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/50">
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full uppercase">
                    Pos #{index + 1}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                    {moment(appointment.appointmentDate).format('HH:mm')}
                </span>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">{appointment.customerName}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {appointment.service?.name} (Requires {appointment.service?.staffType})
            </p>

            <div className="text-xs font-medium text-amber-700 dark:text-amber-400 flex items-center space-x-1">
                <AlertCircle size={12} />
                <span>No staff available at creation.</span>
            </div>
        </Card>
    );
};
