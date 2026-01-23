import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface StaffModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: any;
    setFormData: (data: any) => void;
}

export const StaffModal = ({ show, onClose, onSubmit, formData, setFormData }: StaffModalProps) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Add New Staff Member</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        label="Name"
                        placeholder="Staff Member name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Select
                        label="Service Type"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        options={[
                            { value: 'Doctor', label: 'Doctor' },
                            { value: 'Consultant', label: 'Consultant' },
                            { value: 'Support Agent', label: 'Support Agent' },
                            { value: 'Therapist', label: 'Therapist' }
                        ]}
                    />
                    <Input
                        label="Daily Capacity"
                        type="number"
                        value={formData.dailyCapacity}
                        onChange={(e) => setFormData({ ...formData, dailyCapacity: parseInt(e.target.value) })}
                        min="1"
                        max="50"
                        required
                    />
                    <div className="flex space-x-3 pt-4">
                        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1">
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
