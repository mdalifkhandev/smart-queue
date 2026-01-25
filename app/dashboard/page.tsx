"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

// Components
import { StatCard } from "@/components/dashboard/StatCard";
import { StaffLoadSummary } from "@/components/dashboard/StaffLoadSummary";
import { Card } from "@/components/ui/Card";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalToday: 0,
    completed: 0,
    pending: 0,
    waitingQueue: 0,
  });
  const [staffLoad, setStaffLoad] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const [appRes, staffRes] = await Promise.all([
        api.get(`/appointments?date=${today}`),
        api.get("/staff"),
      ]);

      const apps = appRes.data;
      setStats({
        totalToday: apps.length,
        completed: apps.filter((a: any) => a.status === "Completed").length,
        pending: apps.filter((a: any) => a.status === "Scheduled").length,
        waitingQueue: apps.filter((a: any) => a.status === "Waiting").length,
      });

      setStaffLoad(staffRes.data.data);
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-500">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Real-time summary of your service operations today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Appointments"
          value={stats.totalToday}
          icon={<Calendar className="text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle className="text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<Clock className="text-amber-600" />}
          color="bg-amber-50"
        />
        <StatCard
          title="Waiting Queue"
          value={stats.waitingQueue}
          icon={<TrendingUp className="text-indigo-600" />}
          color="bg-indigo-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StaffLoadSummary staffList={staffLoad} />

        <Card className="h-fit">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2 text-slate-900 dark:text-white">
            <AlertCircle
              size={20}
              className="text-indigo-600 dark:text-indigo-400"
            />
            <span>Usage Tips</span>
          </h2>
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Check the Waiting Queue if staff are fully booked.</li>
              <li>
                Manually assign staff from the queue once they become available.
              </li>
              <li>
                Toggle staff availability in the Staff Management section.
              </li>
              <li>Use Conflict Detection to avoid overlapping appointments.</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
