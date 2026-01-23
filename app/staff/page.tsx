"use client";
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';

// Components
import { Button } from '@/components/ui/Button';
import { StaffCard } from '@/components/staff/StaffCard';
import { StaffModal } from '@/components/staff/StaffModal';

export default function StaffPage() {
    const [staff, setStaff] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        serviceType: 'Doctor',
        dailyCapacity: 5
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const { data } = await api.get('/staff');
            setStaff(data);
        } catch (error) {
            toast.error('Failed to fetch staff');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/staff', formData);
            toast.success('Staff member created');
            setShowModal(false);
            fetchStaff();
            setFormData({ name: '', serviceType: 'Doctor', dailyCapacity: 5 });
        } catch (error) {
            toast.error('Failed to create staff');
        }
    };

    const toggleAvailability = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'Available' ? 'On Leave' : 'Available';
            await api.put(`/staff/${id}`, { availabilityStatus: newStatus });
            toast.success('Staff status updated');
            fetchStaff();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen text-slate-500">Loading Staff...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Staff Management</h1>
                    <p className="text-slate-500">Manage your team and their daily capacities.</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <Plus size={20} />
                    <span>Add Staff Member</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((s) => (
                    <StaffCard key={s._id} member={s} onToggleStatus={toggleAvailability} />
                ))}
            </div>

            <StaffModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleCreate}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
}
