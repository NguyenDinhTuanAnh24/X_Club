
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Users,
    FileText,
    Calendar,
    Star,
    CheckCircle2,
    Clock,
    MoreHorizontal,
    MessageSquare,
    BarChart3,
    ArrowRight,
    Edit3,
    Eye,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function MentorDashboardPage() {
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
            {/* 1. Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-1">Mentor Dashboard</h1>
                    <p className="text-slate-500 font-medium">Chào mừng trở lại, Trần Thị B</p>
                </div>
                <div className="hidden md:block">
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                        Senior Mentor
                    </span>
                </div>
            </div>

            {/* 2. Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Nhóm quản lý", value: "3", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
                    { label: "Bài chờ chấm", value: "28", icon: FileText, color: "text-red-600", bg: "bg-red-100" },
                    { label: "Buổi họp tuần nay", value: "2", icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
                    { label: "Đánh giá TB", value: "4.8/5", icon: Star, color: "text-amber-600", bg: "bg-amber-100" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-0.5">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (2 cols) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 3. Assignment Grading List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-red-500" />
                                Bài tập cần chấm <span className="text-slate-400 font-medium text-sm">(28)</span>
                            </h3>
                            <div className="flex gap-2">
                                <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">Mới nhất</button>
                                <button className="text-xs font-bold text-slate-500 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors">Sắp hết hạn</button>
                            </div>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {/* Item 1 */}
                            <div className="p-6 hover:bg-slate-50/50 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">NA</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">Nguyễn Văn A</h4>
                                            <p className="text-[10px] text-slate-500 uppercase font-semibold">Nhóm Alpha #03 • Gold Member</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded border border-blue-100">Mới nộp</span>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-bold text-slate-800 mb-1">Phân tích Case Study Marketing cho Startup</p>
                                    <p className="text-xs text-slate-500 line-clamp-1">Phân tích SWOT chi tiết về tình hình hiện tại của công ty, đề xuất chiến lược Marketing 6 tháng với timeline cụ thể...</p>
                                    <div className="flex gap-4 mt-2 text-xs text-slate-400 font-medium">
                                        <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Bài tập tuần 8</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Nộp: 15/02/2026</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Link href="/dashboard/mentor/grading">
                                        <Button variant="brand" size="sm" className="bg-blue-600 hover:bg-blue-700 h-9 font-bold">
                                            <Edit3 className="w-3 h-3 mr-2" />
                                            Chấm điểm
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/mentor/grading">
                                        <Button variant="secondary" size="sm" className="h-9 font-bold bg-white border-slate-200">
                                            <Eye className="w-3 h-3 mr-2" />
                                            Xem chi tiết
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="p-6 hover:bg-slate-50/50 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">LC</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">Lê Văn C</h4>
                                            <p className="text-[10px] text-slate-500 uppercase font-semibold">Nhóm Beta #05 • Silver Member</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded border border-blue-100">Mới nộp</span>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-bold text-slate-800 mb-1">Biên bản: Quản lý dòng tiền</p>
                                    <p className="text-xs text-slate-500 line-clamp-1">Tóm tắt: Buổi học tập trung vào phương pháp quản lý dòng tiền hiệu quả. Key takeaways gồm 5 điểm chính...</p>
                                    <div className="flex gap-4 mt-2 text-xs text-slate-400 font-medium">
                                        <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Biên bản họp #32</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Nộp: 13/02/2026</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Link href="/dashboard/mentor/grading">
                                        <Button variant="brand" size="sm" className="bg-blue-600 hover:bg-blue-700 h-9 font-bold">
                                            <Edit3 className="w-3 h-3 mr-2" />
                                            Chấm điểm
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/mentor/grading">
                                        <Button variant="secondary" size="sm" className="h-9 font-bold bg-white border-slate-200">
                                            <Eye className="w-3 h-3 mr-2" />
                                            Xem chi tiết
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Item 3 (Done) */}
                            <div className="p-6 hover:bg-slate-50/50 transition-colors opacity-75">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">PB</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">Phạm Thị B</h4>
                                            <p className="text-[10px] text-slate-500 uppercase font-semibold">Nhóm Beta #05 • Silver Member</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded border border-emerald-100 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Đã chấm
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-bold text-slate-800 mb-1">Chiến lược Content Marketing</p>
                                    <div className="flex gap-4 mt-2 text-xs text-emerald-600 font-medium">
                                        <span>Điểm: 8.5/10</span>
                                        <span className="text-slate-400">•</span>
                                        <span className="text-slate-400">Chấm lúc: 12/02/2026</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Link href="/dashboard/mentor/grading">
                                        <Button variant="secondary" size="sm" className="h-9 font-bold bg-white border-slate-200">
                                            <Eye className="w-3 h-3 mr-2" />
                                            Xem chi tiết
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/mentor/grading">
                                        <Button variant="secondary" size="sm" className="h-9 font-bold bg-white border-slate-200 text-slate-500">
                                            <Edit3 className="w-3 h-3 mr-2" />
                                            Sửa điểm
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Managed Groups */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Users className="w-5 h-5 text-purple-600" />
                                Nhóm quản lý
                            </h3>
                            <Link href="/dashboard/squad" className="text-xs font-bold text-blue-600 hover:underline">Xem tất cả</Link>
                        </div>
                        <div className="p-6 space-y-6">
                            {[
                                { name: "Nhóm Alpha #03", members: 16, status: "Hoạt động tốt", statusColor: "text-emerald-600 bg-emerald-50", stats: { participation: "87%", meetings: 32, score: 8.2, completion: "82%" } },
                                { name: "Nhóm Beta #05", members: 16, status: "Cần chú ý", statusColor: "text-orange-600 bg-orange-50", stats: { participation: "72%", meetings: 28, score: 7.5, completion: "68%" } },
                            ].map((group, idx) => (
                                <div key={idx} className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-slate-900">{group.name}</h4>
                                            <p className="text-xs text-slate-500 font-medium">{group.members} thành viên • Họp Thứ Năm 20:30</p>
                                        </div>
                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${group.statusColor}`}>{group.status}</span>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4 text-center divide-x divide-slate-100 bg-slate-50 rounded-lg p-3">
                                        <div>
                                            <p className="text-lg font-bold text-blue-600">{group.stats.participation}</p>
                                            <p className="text-[10px] text-slate-400 font-semibold uppercase">Tham gia</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-slate-700">{group.stats.meetings}</p>
                                            <p className="text-[10px] text-slate-400 font-semibold uppercase">Buổi họp</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-slate-700">{group.stats.score}</p>
                                            <p className="text-[10px] text-slate-400 font-semibold uppercase">Điểm TB</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-slate-700">{group.stats.completion}</p>
                                            <p className="text-[10px] text-slate-400 font-semibold uppercase">Hoàn thành</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <Link href="/dashboard/squad">
                                            <Button variant="secondary" size="sm" className="w-full h-8 text-xs font-bold border-slate-200">
                                                <BarChart3 className="w-3 h-3 mr-2" />
                                                Xem báo cáo
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column (1 col) */}
                <div className="space-y-8">

                    {/* 5. Weekly Schedule */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                Lịch tuần này
                            </h3>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                                <p className="text-xs font-bold text-blue-600 mb-1">Nhóm Alpha #03 - Buổi #22</p>
                                <p className="text-sm font-bold text-slate-900">Xây dựng hệ thống bán hàng</p>
                                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Thứ Năm, 15/02 • 20:30 - 22:00
                                </p>
                            </div>
                            <div className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                                <p className="text-xs font-bold text-slate-500 mb-1">Nhóm Beta #05 - Buổi #29</p>
                                <p className="text-sm font-bold text-slate-900">Chiến lược phát triển sản phẩm</p>
                                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Thứ Sáu, 16/02 • 20:30 - 22:00
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 6. Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-orange-500" />
                                Hoạt động gần đây
                            </h3>
                        </div>
                        <div className="p-5">
                            <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pb-2">
                                {[
                                    { text: "Nguyễn Văn A đã nộp bài tập tuần 8", time: "2 giờ trước", bold: "Nguyễn Văn A" },
                                    { text: "Bạn đã chấm bài của Phạm Thị B", time: "5 giờ trước", bold: "Phạm Thị B" },
                                    { text: "Lê Văn C đã nộp biên bản họp #32", time: "1 ngày trước", bold: "Lê Văn C" },
                                    { text: "Nhóm Alpha #03 hoàn thành buổi họp #32", time: "1 ngày trước", bold: "Nhóm Alpha #03" },
                                ].map((act, idx) => (
                                    <div key={idx} className="relative pl-6 text-sm">
                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300 ring-4 ring-white"></div>
                                        <p className="text-slate-600">
                                            <span className="font-bold text-slate-900">{act.bold}</span> {act.text.replace(act.bold, '')}
                                        </p>
                                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5 uppercase">{act.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 7. Monthly Stats */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-2 mb-6">
                            <BarChart3 className="w-5 h-5 text-white" />
                            <h3 className="font-bold">Thống kê tháng này</h3>
                        </div>

                        <div className="space-y-5">
                            {[
                                { label: "Bài đã chấm", max: "156/180", percent: 85 },
                                { label: "Buổi họp", max: "10/12", percent: 90 },
                                { label: "Phản hồi kịp thời", max: "95%", percent: 95 },
                            ].map((stat, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-blue-100 uppercase tracking-wide">
                                        <span>{stat.label}</span>
                                        <span className="text-white">{stat.max}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white rounded-full opacity-90"
                                            style={{ width: `${stat.percent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
