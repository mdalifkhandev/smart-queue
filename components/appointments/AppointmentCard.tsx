import React from 'react';
import { Clock, Briefcase, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import moment from 'moment';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface AppointmentCardProps {
    appointment: any;
    onUpdateStatus: (id: string, status: string) => void;
}

export const AppointmentCard = ({ appointment, onUpdateStatus }: AppointmentCardProps) => {
    const statusVariant = appointment.status === 'Completed' ? 'emerald' :
        appointment.status === 'Cancelled' ? 'rose' : 'indigo';

    return (
        <Card className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                    {appointment.customerName.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{appointment.customerName}</h4>
                    <p className="text-xs text-slate-500 flex items-center space-x-1">
                        <Briefcase size={12} />
                        <span>{appointment.service?.name} ({appointment.service?.duration}m)</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:items-end gap-1">
                <div className="flex items-center space-x-2 text-sm font-medium dark:text-slate-300">
                    <Clock size={14} className="text-slate-400" />
                    <span>
                        {moment(appointment.appointmentDate).format('HH:mm')} -
                        {moment(appointment.appointmentDate).add(appointment.service?.duration, 'm').format('HH:mm')}
                    </span>
                </div>
                <p className="text-xs text-slate-400">
                    Assigned to: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{appointment.staff?.name}</span>
                </p>
            </div>

            <div className="flex items-center space-x-2">
                <Badge variant={statusVariant}>{appointment.status}</Badge>

                {appointment.status === 'Scheduled' && (
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => onUpdateStatus(appointment._id, 'Completed')}
                            className="p-1.5 text-green-500 hover:bg-green-300 dark:hover:bg-green-500 rounded-lg transition-colors"
                            title="Complete"
                        >
                            <CheckCircle size={18} color='white' />
                        </button>
                        <button
                            onClick={() => onUpdateStatus(appointment._id, 'No-Show')}
                            className="p-1.5 text-yellow-600 hover:bg-yellow-300 dark:hover:bg-yellow-500 rounded-lg transition-colors"
                            title="No-Show"
                        >
                            <AlertCircle size={18} color='white' />
                        </button>
                        <button
                            onClick={() => onUpdateStatus(appointment._id, 'Cancelled')}
                            className="p-1.5 text-red-600 hover:bg-red-300 dark:hover:bg-red-500 rounded-lg transition-colors"
                            title="Cancel"
                        >
                            <XCircle size={18} color='white' />
                        </button>
                    </div>
                )}
            </div>
        </Card>
    );
};
