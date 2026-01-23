"use client";
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { toast } from 'react-toastify';

// Components
import { Card } from '@/components/ui/Card';
import { LogTable } from '@/components/logs/LogTable';

export default function LogsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const { data } = await api.get('/logs');
            setLogs(data);
        } catch (error) {
            toast.error('Failed to fetch logs');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen text-slate-500">Loading Activity Logs...</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Activity Logs</h1>
                <p className="text-slate-500 dark:text-slate-400">Track important system actions and assignments.</p>
            </div>

            <Card className="p-0 overflow-hidden">
                <LogTable logs={logs} loading={loading} />
            </Card>
        </div>
    );
}
