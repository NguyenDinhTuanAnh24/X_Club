"use client";

import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Calendar, Flag, AlignLeft, User } from 'lucide-react';

interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTaskCreated?: (task: TaskFormData) => void;
}

export interface TaskFormData {
    title: string;
    description: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    dueDate: string;
}

const priorityOptions = [
    { value: 'LOW', label: 'Thấp', color: 'bg-slate-100 text-slate-600 border-slate-200' },
    { value: 'MEDIUM', label: 'Trung bình', color: 'bg-blue-100 text-blue-600 border-blue-200' },
    { value: 'HIGH', label: 'Cao', color: 'bg-amber-100 text-amber-600 border-amber-200' },
    { value: 'URGENT', label: 'Khẩn cấp', color: 'bg-red-100 text-red-600 border-red-200' }
];

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
    isOpen,
    onClose,
    onTaskCreated
}) => {
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        priority: 'MEDIUM',
        dueDate: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.title.trim()) {
            setError('Vui lòng nhập tiêu đề công việc');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    createdById: 'user-123' // Mock user ID
                })
            });

            const data = await response.json();

            if (data.success) {
                onTaskCreated?.(formData);
                setFormData({ title: '', description: '', priority: 'MEDIUM', dueDate: '' });
                onClose();
            } else {
                setError(data.error || 'Có lỗi xảy ra');
            }
        } catch (err) {
            setError('Không thể tạo công việc. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({ title: '', description: '', priority: 'MEDIUM', dueDate: '' });
        setError(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Tạo công việc mới" size="lg">
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
                        Tiêu đề công việc
                    </label>
                    <Input
                        type="text"
                        placeholder="Nhập tiêu đề công việc..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <AlignLeft className="w-4 h-4" />
                        Mô tả
                    </label>
                    <textarea
                        placeholder="Mô tả chi tiết công việc..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                </div>

                {/* Priority */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Flag className="w-4 h-4" />
                        Mức độ ưu tiên
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {priorityOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, priority: option.value as TaskFormData['priority'] })}
                                className={`px-3 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${formData.priority === option.value
                                        ? `${option.color} ring-2 ring-offset-2 ring-blue-500`
                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Calendar className="w-4 h-4" />
                        Ngày hết hạn
                    </label>
                    <Input
                        type="datetime-local"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="w-full"
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
                        Tạo công việc
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

CreateTaskModal.displayName = 'CreateTaskModal';
