"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    FileText,
    Clock,
    CheckCircle2,
    Eye,
    Edit3,
    Search,
    Filter
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default function GradingListPage() {
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('xclub_user_role');
            if (role !== 'INSTRUCTOR' && role !== 'SUPER_ADMIN') {
                router.push('/dashboard');
            }
        }
    }, [router]);

    const [filter, setFilter] = useState('all');

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <DashboardHeader
                title="Danh sách bài chấm"
                description="Toàn bộ bài tập cần chấm điểm và nhận xét của bạn"
            />

            {/* Filters & Search - Moved to separate row */}
            <div className="flex justify-end">
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm học viên/bài tập..."
                            className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 bg-white"
                        />
                    </div>
                    <button className="px-3 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 bg-white">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex gap-4 overflow-x-auto">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        Tất cả (28)
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filter === 'pending' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        Chưa chấm (15)
                    </button>
                    <button
                        onClick={() => setFilter('graded')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filter === 'graded' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        Đã chấm (13)
                    </button>
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
        </div>
    );
}
