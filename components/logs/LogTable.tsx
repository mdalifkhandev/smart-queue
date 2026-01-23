import React from 'react';
import { Info } from 'lucide-react';
import moment from 'moment';
import { Badge } from '../ui/Badge';

interface Log {
    _id: string;
    timestamp: string;
    action: string;
    details: string;
}

interface LogTableProps {
    logs: Log[];
    loading: boolean;
}

export const LogTable = ({ logs, loading }: LogTableProps) => {
    const getActionVariant = (action: string) => {
        if (action.includes('Created')) return 'indigo';
        if (action.includes('Queue')) return 'amber';
        return 'slate';
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Timestamp</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Action</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Details</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {logs.map((log) => (
                        <tr key={log._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                        {moment(log.timestamp).format('hh:mm A')}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {moment(log.timestamp).format('MMM DD, YYYY')}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <Badge variant={getActionVariant(log.action)}>
                                    {log.action}
                                </Badge>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                                    <Info size={14} className="text-slate-400" />
                                    <span>{log.details}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {logs.length === 0 && !loading && (
                        <tr>
                            <td colSpan={3} className="px-6 py-12 text-center text-slate-400 text-sm font-medium uppercase tracking-widest">
                                No activity logs found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
