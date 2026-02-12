"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Calendar,
    Clock,
    Video,
    AlignLeft,
    Link as LinkIcon,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function CreateMeetingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        meetLink: "",
        description: ""
    });

    useEffect(() => {
        // Role Check
        const role = localStorage.getItem('xclub_user_role');
        if (role !== 'GROUP_LEADER' && role !== 'SUPER_ADMIN' && role !== 'INSTRUCTOR') {
            router.push('/dashboard/squad');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Validation
            if (!formData.title || !formData.date || !formData.startTime || !formData.endTime) {
                throw new Error("Vui lòng điền đầy đủ các trường bắt buộc(*)");
            }

            // Combine date and time
            const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
            const endDateTime = new Date(`${formData.date}T${formData.endTime}`);

            if (startDateTime >= endDateTime) {
                throw new Error("Thời gian kết thúc phải sau thời gian bắt đầu");
            }

            // API Call
            const userEmail = localStorage.getItem('xclub_user_email');

            const response = await fetch('/api/schedules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    startTime: startDateTime.toISOString(),
                    endTime: endDateTime.toISOString(),
                    location: formData.meetLink,
                    type: 'ONLINE_MEETING',
                    email: userEmail, // Pass email to identify creator
                    groupId: 'group_alpha_03' // Mock linking
                })
            });

            if (!response.ok) {
                throw new Error("Không thể tạo cuộc họp. Vui lòng thử lại.");
            }

            setSuccess(true);

            // Redirect after success
            setTimeout(() => {
                router.push('/dashboard/squad');
            }, 1500);

        } catch (err: any) {
            setError(err.message || "Đã có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 lg:p-8 bg-slate-50 min-h-screen flex justify-center items-start">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <Video className="w-6 h-6 text-blue-600" />
                        Tạo cuộc họp mới
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Lên lịch họp nhóm và gắn link Google Meet</p>
                </div>

                <div className="p-8">
                    {success ? (
                        <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Tạo cuộc họp thành công!</h3>
                            <p className="text-slate-500">Đang chuyển hướng về trang nhóm...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">
                                        Tiêu đề cuộc họp <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400">
                                            <AlignLeft className="w-5 h-5" />
                                        </div>
                                        <Input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Ví dụ: Họp review tuần 8..."
                                            className="pl-10 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">
                                            Ngày họp <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400">
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <Input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="pl-10 font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">
                                                Bắt đầu <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                type="time"
                                                name="startTime"
                                                value={formData.startTime}
                                                onChange={handleChange}
                                                className="font-medium text-center"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">
                                                Kết thúc <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                type="time"
                                                name="endTime"
                                                value={formData.endTime}
                                                onChange={handleChange}
                                                className="font-medium text-center"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">
                                        Link Google Meet
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400">
                                            <LinkIcon className="w-5 h-5" />
                                        </div>
                                        <Input
                                            name="meetLink"
                                            value={formData.meetLink}
                                            onChange={handleChange}
                                            placeholder="https://meet.google.com/..."
                                            className="pl-10 font-mono text-blue-600"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 pl-1">Để trống nếu chưa có link</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">
                                        Mô tả / Nội dung
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-900 resize-none font-medium"
                                        placeholder="Nhập nội dung chi tiết cuộc họp..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <Button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
                                >
                                    Hủy bỏ
                                </Button>
                                <Button
                                    type="submit"
                                    isLoading={loading}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8"
                                >
                                    Tạo cuộc họp
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
