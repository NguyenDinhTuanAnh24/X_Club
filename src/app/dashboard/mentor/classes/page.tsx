"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Users,
    BookOpen,
    Calendar,
    Clock,
    MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function MentorClassesPage() {
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
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        Lớp học của tôi
                    </h1>
                    <p className="text-slate-500 font-medium">Danh sách các lớp đang giảng dạy và quản lý học viên.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30">
                    Tạo lớp mới
                </Button>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="h-32 bg-slate-100 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                <h3 className="text-white font-bold text-lg">Digital Marketing Masterclass - K{10 + i}</h3>
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex justify-between items-center text-sm text-slate-500">
                                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 45 Học viên</span>
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 12 Buổi</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(j => (
                                        <div key={j} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">HV</div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">+42</div>
                                </div>
                                <Button size="sm" variant="outline" className="border-slate-200">Chi tiết</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
