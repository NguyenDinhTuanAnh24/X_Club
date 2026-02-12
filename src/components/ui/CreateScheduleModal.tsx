"use client";

import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Calendar, Clock, MapPin, Video, AlignLeft } from 'lucide-react';

interface CreateScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onScheduleCreated?: (schedule: ScheduleFormData) => void;
}

export interface ScheduleFormData {
    title: string;
    description: string;
    type: 'ONLINE_MEETING' | 'OFFLINE_EVENT' | 'WORKSHOP' | 'OTHER';
    startTime: string;
    endTime: string;
    location: string;
}

const typeOptions = [
    { value: 'ONLINE_MEETING', label: 'Họp Online', icon: Video, color: 'bg-blue-100 text-blue-600 border-blue-200' },
    { value: 'OFFLINE_EVENT', label: 'Sự kiện', icon: MapPin, color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
    { value: 'WORKSHOP', label: 'Workshop', icon: Calendar, color: 'bg-amber-100 text-amber-600 border-amber-200' },
    { value: 'OTHER', label: 'Khác', icon: Clock, color: 'bg-slate-100 text-slate-600 border-slate-200' }
];

export const CreateScheduleModal: React.FC<CreateScheduleModalProps> = ({
    isOpen,
    onClose,
    onScheduleCreated
}) => {
    const [formData, setFormData] = useState<ScheduleFormData>({
        title: '',
        description: '',
        type: 'ONLINE_MEETING',
        startTime: '',
        endTime: '',
        location: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.title.trim()) {
            setError('Vui lòng nhập tiêu đề');
            return;
        }

        if (!formData.startTime || !formData.endTime) {
            setError('Vui lòng chọn thời gian bắt đầu và kết thúc');
            return;
        }

        if (new Date(formData.startTime) >= new Date(formData.endTime)) {
            setError('Thời gian kết thúc phải sau thời gian bắt đầu');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/schedules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    createdById: 'user-123' // Mock user ID
                })
            });

            const data = await response.json();

            if (data.success) {
                onScheduleCreated?.(formData);
                setFormData({
                    title: '',
                    description: '',
                    type: 'ONLINE_MEETING',
                    startTime: '',
                    endTime: '',
                    location: ''
                });
                onClose();
            } else {
                setError(data.error || 'Có lỗi xảy ra');
            }
        } catch (err) {
            setError('Không thể tạo lịch trình. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            type: 'ONLINE_MEETING',
            startTime: '',
            endTime: '',
            location: ''
        });
        setError(null);
        onClose();
    };

    const selectedType = typeOptions.find(t => t.value === formData.type);

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Tạo lịch trình mới" size="lg">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error message */}
                {error && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600 text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Title */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <AlignLeft className="w-4 h-4" />
                        Tiêu đề
                    </label>
                    <Input
                        type="text"
                        placeholder="Nhập tiêu đề lịch trình..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full"
                    />
                </div>

                {/* Type */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Calendar className="w-4 h-4" />
                        Loại lịch trình
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {typeOptions.map((option) => {
                            const IconComponent = option.icon;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: option.value as ScheduleFormData['type'] })}
                                    className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all flex items-center gap-2 ${formData.type === option.value
                                            ? `${option.color} ring-2 ring-offset-2 ring-blue-500`
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Time Range */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Clock className="w-4 h-4" />
                            Bắt đầu
                        </label>
                        <Input
                            type="datetime-local"
                            value={formData.startTime}
                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Clock className="w-4 h-4" />
                            Kết thúc
                        </label>
                        <Input
                            type="datetime-local"
                            value={formData.endTime}
                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Location/Link */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        {formData.type === 'ONLINE_MEETING' ? (
                            <>
                                <Video className="w-4 h-4" />
                                Link họp (Google Meet, Zoom...)
                            </>
                        ) : (
                            <>
                                <MapPin className="w-4 h-4" />
                                Địa điểm
                            </>
                        )}
                    </label>
                    <Input
                        type="text"
                        placeholder={formData.type === 'ONLINE_MEETING' ? "https://meet.google.com/..." : "Nhập địa điểm..."}
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <AlignLeft className="w-4 h-4" />
                        Mô tả (tùy chọn)
                    </label>
                    <textarea
                        placeholder="Mô tả chi tiết về lịch trình..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        className="h-11 px-5 border-2 font-semibold"
                    >
                        Hủy
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        className="h-11 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/40 font-semibold"
                    >
                        Tạo lịch trình
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

CreateScheduleModal.displayName = 'CreateScheduleModal';
