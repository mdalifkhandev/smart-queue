import React from 'react';
import { Users } from 'lucide-react';
import { Card } from '../ui/Card';

interface StaffMember {
    _id: string;
    name: string;
    serviceType: string;
    currentLoad: number;
    dailyCapacity: number;
}

interface StaffLoadSummaryProps {
    staffList: StaffMember[];
}

export const StaffLoadSummary = ({ staffList }: StaffLoadSummaryProps) => {
    return (
        <Card>
            <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2 text-slate-900 dark:text-white">
                <Users size={20} className="text-indigo-600 dark:text-indigo-400" />
                <span>Staff Load Summary</span>
            </h2>
            <div className="space-y-4">
                {staffList.map((staff) => (
                    <div key={staff._id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <div>
                            <h3 className="font-medium text-slate-900 dark:text-white">{staff.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{staff.serviceType}</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center space-x-2">
                                <span className={`text-sm font-semibold ${staff.currentLoad >= staff.dailyCapacity ? 'text-rose-600' : 'text-emerald-600'}`}>
                                    {staff.currentLoad} / {staff.dailyCapacity}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${staff.currentLoad >= staff.dailyCapacity ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                    {staff.currentLoad >= staff.dailyCapacity ? 'Booked' : 'OK'}
                                </span>
                            </div>
                            <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${staff.currentLoad >= staff.dailyCapacity ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                    style={{ width: `${Math.min((staff.currentLoad / staff.dailyCapacity) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {staffList.length === 0 && (
                    <p className="text-center text-slate-400 py-4 uppercase text-[10px] font-bold tracking-widest">No staff data available</p>
                )}
            </div>
        </Card>
    );
};
