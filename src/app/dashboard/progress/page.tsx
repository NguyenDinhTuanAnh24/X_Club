"use client";

import React, { useState } from 'react';
import {
    TrendingUp,
    Video,
    FileText,
    Clock,
    Award,
    Download,
    MoreHorizontal,
    CheckCircle2,
    Star,
    Zap,
    Users,
    Lock,
    ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Data Mock for different periods
const PROGRESS_DATA = {
    week: {
        label: "Tuần",
        stats: [
            { label: "Điểm trung bình", value: "9.2", trend: "+0.5 so với tuần trước", trendColor: "text-emerald-600 bg-emerald-50", icon: TrendingUp, iconColor: "text-blue-500 bg-blue-50" },
            { label: "Buổi họp tham gia", value: "2/2", trend: "Hoàn thành 100%", trendColor: "text-emerald-600 bg-emerald-50", icon: Video, iconColor: "text-emerald-500 bg-emerald-50" },
            { label: "Bài tập hoàn thành", value: "3/3", trend: "Đúng hạn", trendColor: "text-emerald-600 bg-emerald-50", icon: FileText, iconColor: "text-orange-500 bg-orange-50" },
            { label: "Thời gian học", value: "12h", trend: "+2h so với tuần trước", trendColor: "text-emerald-600 bg-emerald-50", icon: Clock, iconColor: "text-purple-500 bg-purple-50" },
        ],
        chart: {
            title: "Điểm số theo ngày",
            data: [
                { label: "T2", score: 8.0, height: "80%" },
                { label: "T3", score: 9.5, height: "95%" },
                { label: "T4", score: 8.5, height: "85%" },
                { label: "T5", score: 9.0, height: "90%" },
                { label: "T6", score: 8.0, height: "80%" },
                { label: "T7", score: 7.5, height: "75%" },
                { label: "CN", score: 9.0, height: "90%" },
            ]
        },
        goalsLabel: "Mục tiêu tuần này"
    },
    month: {
        label: "Tháng",
        stats: [
            { label: "Điểm trung bình", value: "87%", trend: "+5% so với tháng trước", trendColor: "text-emerald-600 bg-emerald-50", icon: TrendingUp, iconColor: "text-blue-500 bg-blue-50" },
            { label: "Buổi họp tham gia", value: "28/32", trend: "+2 buổi", trendColor: "text-emerald-600 bg-emerald-50", icon: Video, iconColor: "text-emerald-500 bg-emerald-50" },
            { label: "Bài tập hoàn thành", value: "15/18", trend: "-1 so với kỳ vọng", trendColor: "text-red-600 bg-red-50", icon: FileText, iconColor: "text-orange-500 bg-orange-50" },
            { label: "Thời gian học", value: "42h", trend: "+8h so với tháng trước", trendColor: "text-emerald-600 bg-emerald-50", icon: Clock, iconColor: "text-purple-500 bg-purple-50" },
        ],
        chart: {
            title: "Điểm số theo tuần",
            data: [
                { label: "Tuần 1", score: 8.5, height: "85%" },
                { label: "Tuần 2", score: 9.0, height: "90%" },
                { label: "Tuần 3", score: 8.0, height: "80%" },
                { label: "Tuần 4", score: 9.5, height: "95%" },
                { label: "Tuần 5", score: 8.7, height: "87%" },
            ]
        },
        goalsLabel: "Mục tiêu tháng này"
    },
    year: {
        label: "Năm",
        stats: [
            { label: "Điểm trung bình", value: "8.8", trend: "Ổn định", trendColor: "text-blue-600 bg-blue-50", icon: TrendingUp, iconColor: "text-blue-500 bg-blue-50" },
            { label: "Buổi họp tham gia", value: "145", trend: "95% tham gia", trendColor: "text-emerald-600 bg-emerald-50", icon: Video, iconColor: "text-emerald-500 bg-emerald-50" },
            { label: "Bài tập hoàn thành", value: "120", trend: "+15 bài", trendColor: "text-emerald-600 bg-emerald-50", icon: FileText, iconColor: "text-orange-500 bg-orange-50" },
            { label: "Thời gian học", value: "450h", trend: "Top 5% học viên", trendColor: "text-amber-600 bg-amber-50", icon: Clock, iconColor: "text-purple-500 bg-purple-50" },
        ],
        chart: {
            title: "Điểm số theo tháng",
            data: [
                { label: "T1", score: 8.0, height: "80%" },
                { label: "T2", score: 8.5, height: "85%" },
                { label: "T3", score: 9.0, height: "90%" },
                { label: "T4", score: 8.5, height: "85%" },
                { label: "T5", score: 9.5, height: "95%" },
                { label: "T6", score: 8.8, height: "88%" },
                { label: "T7", score: 9.2, height: "92%" },
                { label: "T8", score: 9.0, height: "90%" },
                { label: "T9", score: 8.5, height: "85%" },
                { label: "T10", score: 8.0, height: "80%" },
                { label: "T11", score: 9.0, height: "90%" },
                { label: "T12", score: 9.5, height: "95%" },
            ]
        },
        goalsLabel: "Mục tiêu năm nay"
    }
};

type PeriodType = 'week' | 'month' | 'year';

export default function ProgressPage() {
    const [period, setPeriod] = useState<PeriodType>('month');
    const currentData = PROGRESS_DATA[period];

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-1">Tiến độ & Báo cáo</h1>
                    <p className="text-slate-500 font-medium">Theo dõi sự phát triển của bạn theo {currentData.label.toLowerCase()}</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    {(['week', 'month', 'year'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${period === p
                                    ? 'text-blue-600 bg-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {p === 'week' ? 'Tuần' : p === 'month' ? 'Tháng' : 'Năm'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentData.stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                                <p className="text-sm font-semibold text-slate-500 mt-1">{stat.label}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.iconColor}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${stat.trendColor}`}>
                            {stat.trend}
                        </span>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (2 cols) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Course Progress (Static for now as courses usually run long term) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>
                                Tiến độ khóa học
                            </h3>
                            <Button size="sm" variant="outline" className="h-8 text-xs font-bold border-blue-200 text-blue-600 hover:bg-blue-50">
                                Xem chi tiết
                            </Button>
                        </div>
                        <div className="space-y-6">
                            {[
                                { name: "Marketing Strategy", progress: 75, color: "bg-indigo-500" },
                                { name: "Sales Mastery", progress: 60, color: "bg-rose-500" },
                                { name: "Leadership Essentials", progress: 90, color: "bg-cyan-500" },
                                { name: "Business Finance", progress: 45, color: "bg-emerald-500" },
                            ].map((course, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold text-slate-700">
                                        <span>{course.name}</span>
                                        <span className="text-blue-600">{course.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${course.color}`}
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Chart */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-emerald-500 to-teal-600"></div>
                                {currentData.chart.title}
                            </h3>
                        </div>
                        <div className="h-48 flex items-end justify-between px-2 gap-2 overflow-x-auto">
                            {currentData.chart.data.map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center flex-1 group gap-2 min-w-[30px]">
                                    <div className="text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity mb-1">{item.score}</div>
                                    <div
                                        className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-emerald-500 to-teal-400 group-hover:from-emerald-400 group-hover:to-teal-300 transition-all relative min-h-[4px]"
                                        style={{ height: item.height }}
                                    ></div>
                                    <span className="text-[10px] sm:text-xs font-bold text-slate-500 truncate w-full text-center">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-amber-500 to-orange-600"></div>
                                Thành tựu
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { title: "Early Bird", desc: "Check-in sớm 10 lần", icon: Star, color: "from-indigo-500 to-blue-600" },
                                { title: "Perfect Week", desc: "Hoàn thành 100% tuần", icon: Zap, color: "from-amber-400 to-orange-500" },
                                { title: "Team Player", desc: "Hỗ trợ 5 thành viên", icon: Users, color: "from-violet-500 to-purple-600" },
                                { title: "Marathon", desc: "50 giờ học liên tục", icon: Lock, color: "bg-slate-100 text-slate-400", locked: true },
                            ].map((badge, idx) => (
                                <div key={idx} className={`rounded-xl p-4 flex flex-col items-center text-center ${badge.locked ? 'bg-slate-50 border border-slate-100' : 'bg-gradient-to-br ' + badge.color + ' text-white shadow-lg shadow-blue-500/20'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${badge.locked ? 'bg-white shadow-sm' : 'bg-white/20 backdrop-blur-sm'}`}>
                                        <badge.icon className={`w-5 h-5 ${badge.locked ? 'text-slate-400' : 'text-white'}`} />
                                    </div>
                                    <h4 className={`font-bold text-xs mb-1 ${badge.locked ? 'text-slate-500' : 'text-white'}`}>{badge.title}</h4>
                                    <p className={`text-[10px] ${badge.locked ? 'text-slate-400' : 'text-white/80'}`}>{badge.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column (1 col) */}
                <div className="space-y-8">

                    {/* Leaderboard */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
                            <Award className="w-5 h-5 text-orange-500" /> Xếp hạng nhóm
                        </h3>
                        <div className="space-y-5">
                            {[
                                { rank: 1, name: "Đặng Văn E", score: 95, color: "bg-orange-500 text-white" },
                                { rank: 2, name: "Phạm Thị B", score: 92, color: "bg-blue-500 text-white" },
                                { rank: 3, name: "Nguyễn Văn A (Bạn)", score: 87, color: "bg-red-500 text-white" },
                                { rank: 4, name: "Lê Văn C", score: 85, color: "bg-slate-200 text-slate-600" },
                                { rank: 5, name: "Ngô Thị F", score: 82, color: "bg-slate-100 text-slate-500" },
                            ].map((user, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${user.color}`}>
                                            {user.rank}
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 overflow-hidden">
                                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">{user.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-blue-600">{user.score} điểm</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <button className="text-xs font-bold text-blue-500 hover:text-blue-600 hover:underline">Xem tất cả 16 thành viên &rarr;</button>
                        </div>
                    </div>

                    {/* Dynamic Goals */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
                            <TargetIcon className="w-5 h-5 text-rose-500" /> {currentData.goalsLabel}
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-slate-700">Tham gia họp</span>
                                    <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Hoàn thành</span>
                                </div>
                                <div className="h-1.5 w-full bg-emerald-100 rounded-full">
                                    <div className="h-full bg-emerald-500 rounded-full w-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-slate-700">Nộp bài tập</span>
                                    <span className="text-orange-500">75%</span>
                                </div>
                                <div className="h-1.5 w-full bg-orange-100 rounded-full">
                                    <div className="h-full bg-orange-500 rounded-full w-[75%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-slate-700">Học 5 giờ</span>
                                    <span className="text-blue-500">3/5h</span>
                                </div>
                                <div className="h-1.5 w-full bg-blue-100 rounded-full">
                                    <div className="h-full bg-blue-500 rounded-full w-[60%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
                            <Clock className="w-5 h-5 text-slate-500" /> Hoạt động gần đây
                        </h3>
                        <div className="space-y-6 pl-2 border-l-2 border-slate-100 ml-2">
                            {[
                                { title: 'Hoàn thành bài học "Marketing Mix"', time: "2 giờ trước", type: "learn" },
                                { title: 'Đạt thành tựu "Team Player"', time: "5 giờ trước", type: "achievement" },
                                { title: 'Nộp bài tập tuần 8', time: "1 ngày trước", type: "submit" },
                            ].map((act, idx) => (
                                <div key={idx} className="relative pl-6">
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-white"></div>
                                    <p className="text-xs font-bold text-slate-900">{act.title}</p>
                                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{act.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Report Export */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-indigo-500" /> Xuất báo cáo
                        </h3>
                        <p className="text-xs text-slate-500 mb-4">Tải xuống báo cáo tiến độ của bạn</p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 text-xs">
                            <Download className="w-4 h-4 mr-2" /> Tải báo cáo PDF
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Helper Icon for Target since lucide might behave differently with names
const TargetIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);
