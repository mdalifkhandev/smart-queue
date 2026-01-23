import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface AppointmentModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: any;
    setFormData: (data: any) => void;
    services: any[];
    staff: any[];
}

export const AppointmentModal = ({
    show,
    onClose,
    onSubmit,
    formData,
    setFormData,
    services,
    staff
}: AppointmentModalProps) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl p-8 border border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Schedule Appointment</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <Input
                                label="Customer Name"
                                placeholder="Full Name"
                                value={formData.customerName}
                                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Select
                                label="Service"
                                value={formData.serviceId}
                                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                                required
                                options={[
                                    { value: '', label: 'Select Service' },
                                    ...services.map(s => ({ value: s._id, label: `${s.name} (${s.duration}m)` }))
                                ]}
                            />
                        </div>
                        <div>
                            <Select
                                label="Staff (Optional)"
                                value={formData.staffId}
                                onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                                options={[
                                    { value: '', label: 'Auto-Queue / No Staff' },
                                    ...staff.map(s => ({
                                        value: s._id,
                                        label: `${s.name} (${s.currentLoad}/${s.dailyCapacity})`,
                                        disabled: s.availabilityStatus === 'On Leave'
                                    }))
                                ]}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Input
                                label="Date & Time"
                                type="datetime-local"
                                value={formData.appointmentDate}
                                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex space-x-3 pt-6">
                        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1">
                            Book Appointment
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
