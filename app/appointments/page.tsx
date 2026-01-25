"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  Plus,
  Calendar,
  User,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";
import moment from "moment";

// Components
import { Button } from "@/components/ui/Button";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import { QueueItem } from "@/components/appointments/QueueItem";
import { AppointmentModal } from "@/components/appointments/AppointmentModal";
import { Card } from "@/components/ui/Card";

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterDate, setFilterDate] = useState(moment().format("YYYY-MM-DD"));
  const [filterStaff, setFilterStaff] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    serviceId: "",
    staffId: "",
    appointmentDate: moment().format("YYYY-MM-DDTHH:mm"),
  });

  useEffect(() => {
    fetchData();
  }, [filterDate, filterStaff]);

  const fetchData = async () => {
    try {
      const [appRes, staffRes, servRes] = await Promise.all([
        api.get(
          `/appointments?date=${filterDate}${filterStaff ? `&staffId=${filterStaff}` : ""}`,
        ),
        api.get("/staff"),
        api.get("/services"),
      ]);
      setAppointments(appRes.data);
      setStaff(staffRes.data.data);
      setServices(servRes.data);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/appointments", formData);
      toast.success("Appointment created");
      setShowModal(false);
      fetchData();
      setFormData({
        customerName: "",
        serviceId: "",
        staffId: "",
        appointmentDate: moment().format("YYYY-MM-DDTHH:mm"),
      });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Conflict detected or limit reached",
      );
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      toast.success(`Appointment marked as ${status}`);
      fetchData();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const assignFromQueue = async (staffId: string) => {
    try {
      await api.post("/appointments/assign-queue", { staffId });
      toast.success("Staff assigned from queue");
      fetchData();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "No eligible appointments in queue",
      );
    }
  };

  const waitingQueue = appointments.filter((a) => a.status === "Waiting");
  const scheduledApps = appointments.filter((a) => a.status !== "Waiting");

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-500">
        Loading Appointments...
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Appointments
          </h1>
          <p className="text-slate-500">
            Manage bookings and the waiting queue.
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={20} />
          <span>New Appointment</span>
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="flex flex-wrap gap-4 items-end p-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-slate-400 dark:text-white uppercase mb-1">
            Filter Date
          </label>
          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
            />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-900 dark:text-white!"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-slate-400 dark:text-white uppercase mb-1">
            Filter Staff
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white"
            />
            <select
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none text-slate-900 dark:text-white!"
              value={filterStaff}
              onChange={(e) => setFilterStaff(e.target.value)}
            >
              <option value="">All Staff</option>
              {staff.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main List */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-lg font-bold flex items-center space-x-2 text-slate-900 dark:text-white">
            <CheckCircle size={20} className="text-indigo-600" />
            <span>Scheduled Appointments</span>
          </h2>
          {scheduledApps.length === 0 ? (
            <Card className="text-center py-12 text-slate-500">
              No appointments scheduled.
            </Card>
          ) : (
            <div className="grid gap-4">
              {scheduledApps.map((app) => (
                <AppointmentCard
                  key={app._id}
                  appointment={app}
                  onUpdateStatus={updateStatus}
                />
              ))}
            </div>
          )}
        </div>

        {/* Queue Sidebar */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center space-x-2 text-slate-900 dark:text-white">
            <Clock size={20} className="text-amber-600" />
            <span>Waiting Queue ({waitingQueue.length})</span>
          </h2>
          <div className="space-y-4">
            {waitingQueue.map((app, index) => (
              <QueueItem key={app._id} appointment={app} index={index} />
            ))}

            {waitingQueue.length > 0 && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-slate-400">
                  Quick Assign
                </h3>
                <div className="space-y-2">
                  {staff
                    .filter((s) => s.availabilityStatus === "Available")
                    .map((s) => (
                      <button
                        key={s._id}
                        onClick={() => assignFromQueue(s._id)}
                        className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-xs font-semibold group transition-all text-slate-700 dark:text-white"
                      >
                        <span>
                          Assign earliest to <strong>{s.name}</strong>
                        </span>
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    ))}
                </div>
              </div>
            )}

            {waitingQueue.length === 0 && (
              <Card className="text-center py-8 text-slate-400 text-sm border-dashed bg-transparent">
                Queue is empty.
              </Card>
            )}
          </div>
        </div>
      </div>

      <AppointmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
        formData={formData}
        setFormData={setFormData}
        services={services}
        staff={staff}
      />
    </div>
  );
}
