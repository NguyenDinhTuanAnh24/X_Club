"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    PieChart,
    BarChart,
    Download,
    TrendingUp,
    Clock,
    Award
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function GroupReportsPage() {
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('xclub_user_role');
            if (role !== 'GROUP_LEADER' && role !== 'SUPER_ADMIN') {
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
                        <PieChart className="w-6 h-6 text-indigo-600" />
                        Báo cáo học tập
                    </h1>
                    <p className="text-slate-500 font-medium">Theo dõi hiệu suất và kết quả đào tạo của đội ngũ.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-slate-200">
                        Tháng này
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30">
                        <Download className="w-4 h-4 mr-2" />
                        Tải báo cáo PDF
                    </Button>
                </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tỷ lệ hoàn thành</p>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">78%</h3>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +5% so với tháng trước
                    </span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Giờ học trung bình</p>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">12.5h</h3>
                    <span className="text-xs font-bold text-slate-400">của mỗi nhân viên</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Điểm Quiz TB</p>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">8.5/10</h3>
                    <span className="text-xs font-bold text-blue-600">Level: Xuất sắc</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Chứng chỉ đã cấp</p>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">15</h3>
                    <span className="text-xs font-bold text-orange-600">Trong tháng này</span>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Course Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-80 flex flex-col">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <BarChart className="w-5 h-5 text-slate-400" />
                        Phân bổ khóa học
                    </h3>
                    <div className="flex-1 flex items-end justify-between px-4 pb-4 gap-2">
                        {[40, 65, 30, 85, 55].map((h, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group w-full">
                                <div className="w-full bg-slate-100 rounded-t-xl relative overflow-hidden h-48 flex items-end">
                                    <div
                                        className="w-full bg-blue-500 rounded-t-xl transition-all duration-500 group-hover:bg-blue-600"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs font-bold text-slate-500">Course {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performers */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-80 flex flex-col">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-500" />
                        Top Nhân viên xuất sắc
                    </h3>
                    <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${i === 1 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-200 text-slate-600'}`}>#{i}</span>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Nguyễn Văn Top {i}</p>
                                        <p className="text-xs text-slate-500">Sales Dept</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-emerald-600">98%</p>
                                    <p className="text-[10px] text-slate-400">Score</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
