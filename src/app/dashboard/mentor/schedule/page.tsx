"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Calendar as CalendarIcon,
    Clock,
    Video,
    MapPin,
    Users
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function MentorSchedulePage() {
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('xclub_user_role');
            if (role !== 'INSTRUCTOR' && role !== 'SUPER_ADMIN') {
                router.push('/dashboard');
            }
        }
    }, [router]);

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-1 flex items-center gap-2">
                        <CalendarIcon className="w-6 h-6 text-purple-600" />
                        Lịch dạy (Teaching Schedule)
                    </h1>
                    <p className="text-slate-500 font-medium">Quản lý lịch dạy và các buổi workshop sắp tới.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-slate-200">
                        Tháng này
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg shadow-purple-500/30">
                        + Thêm lịch mới
                    </Button>
                </div>
            </div>

            {/* Schedule List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-6 flex items-start gap-6 hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col items-center min-w-[60px]">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">TH {i + 2}</span>
                                <span className="text-2xl font-black text-slate-900">{10 + i}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Workshop: Chiến lược Content Marketing {2026}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                    <span className="flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full text-blue-700 font-bold">
                                        <Clock className="w-4 h-4" /> 19:30 - 21:00
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Video className="w-4 h-4 text-slate-400" /> Google Meet
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4 text-slate-400" /> 45/50 Học viên
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" className="border-slate-200">Chi tiết</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
