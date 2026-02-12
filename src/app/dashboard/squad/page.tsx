
"use client";

import React from 'react';
import {
    Users,
    Calendar,
    BarChart3,
    Award,
    MessageSquare,
    MoreHorizontal,
    CheckCircle2,
    FileText,
    Clock,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SquadPage() {
    // Mock Data
    const members = [
        { name: "Nguyễn Văn A", role: "Gold Member", status: "Hoạt động", meetings: 20, rate: 92, avatar: "NA", color: "bg-red-500" },
        { name: "Phạm Thị B", role: "Silver Member", status: "Hoạt động", meetings: 18, rate: 85, avatar: "PB", color: "bg-blue-500" },
        { name: "Lê Văn C", role: "Gold Member", status: "Hoạt động", meetings: 24, rate: 100, avatar: "LC", color: "bg-purple-500" },
        { name: "Hoàng Thị D", role: "Bronze Member", status: "Ít tham gia", meetings: 10, rate: 45, avatar: "HD", color: "bg-orange-500" },
        { name: "Đặng Văn E", role: "Platinum Member", status: "Hoạt động", meetings: 22, rate: 100, avatar: "DE", color: "bg-emerald-500" },
    ];

    const meetings = [
        { id: "#32", date: "15/02/2026", time: "20:30 - 22:00", topic: "Xây dựng hệ thống bán hàng", status: "Sắp diễn ra", attendance: "-" },
        { id: "#31", date: "08/02/2026", time: "20:30 - 22:00", topic: "Quản lý dòng tiền", status: "Đã hoàn thành", attendance: "15/16" },
        { id: "#30", date: "01/02/2026", time: "20:30 - 22:00", topic: "Phân tích đối thủ cạnh tranh", status: "Đã hoàn thành", attendance: "14/16" },
        { id: "#29", date: "25/01/2026", time: "20:30 - 22:00", topic: "Chiến lược content marketing", status: "Đã hoàn thành", attendance: "16/16" },
    ];

    const activities = [
        { title: "Biên bản họp mới", desc: "Nguyễn Văn A đã nộp biên bản buổi #32", time: "2 giờ trước", icon: FileText, color: "text-orange-500 bg-orange-50" },
        { title: "Feedback từ Mentor", desc: "Mentor đã phản hồi bài tập tuần 5", time: "5 giờ trước", icon: MessageSquare, color: "text-blue-500 bg-blue-50" },
        { title: "Hoàn thành buổi họp", desc: "Buổi #32: Quản lý dòng tiền - 15/16 tham gia", time: "1 ngày trước", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50" },
        { title: "Thành viên mới", desc: "Chào mừng Hoàng Thị D gia nhập nhóm", time: "2 ngày trước", icon: Users, color: "text-purple-500 bg-purple-50" },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Breadcrumb & Header */}
            <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Dashboard / Nhóm của tôi</p>
                <h1 className="text-3xl font-black text-slate-900">Nhóm Alpha #03</h1>
            </div>

            {/* 1. Group Banner */}
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">Nhóm Alpha #03</h2>
                        </div>
                        <p className="text-blue-100 text-sm font-medium">Được thành lập: 15/11/2025 • Mentor: Trần Thị B</p>
                    </div>

                    <div className="flex gap-8 text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                        <div>
                            <p className="text-2xl font-black">16/16</p>
                            <p className="text-xs text-blue-100 font-bold uppercase tracking-wide">Thành viên</p>
                        </div>
                        <div className="w-px bg-white/20 h-10"></div>
                        <div>
                            <p className="text-2xl font-black">32</p>
                            <p className="text-xs text-blue-100 font-bold uppercase tracking-wide">Buổi họp</p>
                        </div>
                        <div className="w-px bg-white/20 h-10"></div>
                        <div>
                            <p className="text-2xl font-black">87%</p>
                            <p className="text-xs text-blue-100 font-bold uppercase tracking-wide">Tỷ lệ tham gia</p>
                        </div>
                        <div className="w-px bg-white/20 h-10"></div>
                        <div>
                            <p className="text-2xl font-black">#3</p>
                            <p className="text-xs text-blue-100 font-bold uppercase tracking-wide">Xếp hạng</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (2 cols) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 2. Members List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-600" />
                                Thành viên nhóm (16)
                            </h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {members.map((member, idx) => (
                                <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50/30 flex flex-col items-center text-center">
                                    <div className={`w-12 h-12 rounded-full ${member.color} text-white flex items-center justify-center font-bold text-sm mb-3 shadow-md border-2 border-white`}>
                                        {member.avatar}
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-sm mb-0.5">{member.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium mb-3">{member.role}</p>

                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-4 ${member.status === 'Hoạt động' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                                        }`}>
                                        {member.status}
                                    </span>

                                    <div className="grid grid-cols-2 w-full border-t border-slate-100 pt-3 gap-2">
                                        <div>
                                            <p className="text-slate-900 font-bold text-sm">{member.meetings}</p>
                                            <p className="text-[10px] text-slate-400 font-semibold uppercase">Họp</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-900 font-bold text-sm">{member.rate}%</p>
                                            <p className="text-[10px] text-slate-400 font-semibold uppercase">Tham gia</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* More Members Card */}
                            <div className="border border-dashed border-slate-300 rounded-xl p-4 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[200px]">
                                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-lg mb-3">
                                    +10
                                </div>
                                <p className="font-bold text-slate-600 text-sm">Xem thêm</p>
                                <p className="text-xs text-slate-400">10 thành viên khác</p>
                            </div>
                        </div>
                    </div>

                    {/* 3. Meeting Schedule */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                Lịch họp
                            </h3>
                            <Button size="sm" variant="brand" className="h-8 text-xs">Xem đầy đủ</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Buổi</th>
                                        <th className="px-6 py-4 font-bold">Ngày giờ</th>
                                        <th className="px-6 py-4 font-bold">Chủ đề</th>
                                        <th className="px-6 py-4 font-bold">Trạng thái</th>
                                        <th className="px-6 py-4 font-bold text-right">Tham gia</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {meetings.map((meeting, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-900">{meeting.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">{meeting.date}</div>
                                                <div className="text-xs text-slate-500 font-medium">{meeting.time}</div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-700">{meeting.topic}</td>
                                            <td className="px-6 py-4">
                                                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide ${meeting.status === 'Sắp diễn ra' ? 'text-orange-500' : 'text-slate-500'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${meeting.status === 'Sắp diễn ra' ? 'bg-orange-500 animate-pulse' : 'bg-slate-400'
                                                        }`}></div>
                                                    {meeting.status}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-900 text-right">
                                                {meeting.attendance === '-' ? <span className="text-slate-400">-</span> : (
                                                    <span className="text-emerald-600">{meeting.attendance}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Right Column (1 col) */}
                <div className="space-y-8">

                    {/* 4. Mentor Profile */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden text-center p-6">
                        <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                            <Award className="w-5 h-5 text-slate-900" />
                            <h3 className="font-bold text-slate-900">Mentor</h3>
                        </div>

                        <div className="flex flex-col items-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg border-4 border-emerald-100">
                                TTB
                            </div>
                            <h3 className="text-lg font-black text-slate-900">Trần Thị B</h3>
                            <p className="text-sm font-semibold text-slate-500 mb-4">Senior Business Mentor</p>
                            <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed mx-auto italic">
                                "15+ năm kinh nghiệm trong lĩnh vực Marketing & Sales. Đã tư vấn cho hơn 100 doanh nghiệp."
                            </p>
                        </div>

                        <Button variant="brand" className="w-full font-bold h-10 rounded-xl shadow-lg shadow-blue-500/20">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Nhắn tin
                        </Button>
                    </div>

                    {/* 5. Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-orange-500" />
                                Hoạt động gần đây
                            </h3>
                        </div>
                        <div className="p-5">
                            <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 pb-2">
                                {activities.map((activity, idx) => (
                                    <div key={idx} className="relative pl-8 group">
                                        <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center ${activity.color.split(' ')[0]} border-white shadow-sm ring-2 ring-slate-100`}>
                                            <div className={`w-2 h-2 rounded-full bg-current`}></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{activity.title}</p>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{activity.desc}</p>
                                            <span className="text-[10px] font-semibold text-slate-400 mt-1 block uppercase tracking-wide">{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 6. Group Stats (Blue Box) */}
                    <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-2 mb-6">
                            <BarChart3 className="w-5 h-5 text-blue-200" />
                            <h3 className="font-bold">Thống kê nhóm</h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: "Tỷ lệ tham gia", value: "87%" },
                                { label: "Bài tập hoàn thành", value: "92%" },
                                { label: "Điểm trung bình", value: "8.5/10" },
                            ].map((stat, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-blue-100 uppercase tracking-wide">
                                        <span>{stat.label}</span>
                                        <span className="text-white">{stat.value}</span>
                                    </div>
                                    <div className="h-2 w-full bg-blue-900/40 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white rounded-full"
                                            style={{ width: stat.value.includes('/') ? `${(parseFloat(stat.value) * 10)}%` : stat.value }}
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
