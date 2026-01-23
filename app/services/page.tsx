"use client";
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';

// Components
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceModal } from '@/components/services/ServiceModal';

export default function ServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        duration: 30,
        staffType: 'Doctor'
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data } = await api.get('/services');
            setServices(data);
        } catch (error) {
            toast.error('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/services', formData);
            toast.success('Service created successfully');
            setShowModal(false);
            fetchServices();
            setFormData({ name: '', duration: 30, staffType: 'Doctor' });
        } catch (error) {
            toast.error('Failed to create service');
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen text-slate-500">Loading Services...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Services</h1>
                    <p className="text-slate-500">Define the types of services you offer.</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <Plus size={20} />
                    <span>Add Service</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((s) => (
                    <ServiceCard key={s._id} service={s} />
                ))}
            </div>

            <ServiceModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleCreate}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
}
