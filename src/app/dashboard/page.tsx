"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    BookOpen,
    Calendar,
    FileText,
    Award,
    Clock,
    ArrowRight,
    CheckCircle2,
    Users,
    MessageSquare,
    MoreHorizontal,
    Bell,
    ExternalLink,
    PlayCircle,
    LogOut,
    Settings,
    Video
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "Nguyễn Văn A",
        role: "Gold Member",
        avatar: "NA",
        id: "user_123" // Mock ID
    });
    const [isCheckingIn, setIsCheckingIn] = useState(false);

    const handleCheckIn = async () => {
        setIsCheckingIn(true);
        try {
            // Mock API call
            const response = await fetch('/api/attendance/check-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id || "mock_user_id",
                    meetingId: "meeting_456" // Mock Meeting ID
                })
            });

            const data = await response.json();

            if (data.success || response.ok) { // Allow success even if backend fails (mock logic)
                alert("Check-in thành công! Bạn đang được chuyển hướng đến phòng họp...");
                // In real scenario, redirect to data.meetingLink
                // For now, demo purpose
            } else {
                // For update demo, show success anyway since backend might not have data seeded
                alert("Check-in thành công! (Mô phỏng)");
            }
        } catch (error) {
            console.error("Checkin failed", error);
            alert("Lỗi kết nối. Vui lòng thử lại sau.");
        } finally {
            setIsCheckingIn(false);
        }
    };

    const [tasks, setTasks] = useState([
        { id: 1, title: "Nộp bài tập tuần 8", desc: "Phân tích case study về Marketing Funnel", status: "Đang chờ", statusColor: "text-orange-600 bg-orange-50 border-orange-100", done: false },
        { id: 2, title: "Hoàn thành khóa học 'Sales 101'", desc: "Còn 3 bài học cuối", status: "Đang chơi", statusColor: "text-orange-600 bg-orange-50 border-orange-100", done: false },
        { id: 3, title: "Nộp biên bản họp tuần 7", desc: "Đã nộp và nhận feedback từ mentor", status: "Hoàn thành", statusColor: "text-emerald-600 bg-emerald-50 border-emerald-100", done: true },
        { id: 4, title: "Đánh giá thành viên nhóm", desc: "Hạn cuối: 10/02/2026", status: "Quá hạn", statusColor: "text-red-600 bg-red-50 border-red-100", done: false },
    ]);

    useEffect(() => {
        const checkUserRole = async () => {
            // Hydrate initial state from localStorage
            const storedName = localStorage.getItem('xclub_user_name');
            const storedTier = localStorage.getItem('xclub_user_tier');
            const storedRole = localStorage.getItem('xclub_user_role');
            const storedId = localStorage.getItem('xclub_user_id');

            // 1. Initial hydration (optimistic)
            if (storedName) {
                setUser(prev => ({
                    ...prev,
                    name: storedName,
                    role: storedTier || "Member",
                    avatar: getInitials(storedName),
                    id: storedId || "user_123"
                }));
            }

            // 2. Fetch latest data from server to check for role updates (Hot Reload)
            if (storedId) {
                try {
                    const res = await fetch('/api/auth/me', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: storedId })
                    });

                    if (res.ok) {
                        const data = await res.json();
                        const realRole = data.user.role;

                        // If role changed, update localStorage and redirect if needed
                        if (realRole !== storedRole) {
                            localStorage.setItem('xclub_user_role', realRole);
                            // Also update name/tier if changed
                            localStorage.setItem('xclub_user_name', data.user.fullName);
                            localStorage.setItem('xclub_user_tier', data.user.membership?.tier || 'BRONZE');

                            // Re-run redirection logic immediately
                            if (realRole === 'SUPER_ADMIN') {
                                router.push('/dashboard/admin/overview');
                                return;
                            }
                            if (realRole === 'INSTRUCTOR') {
                                router.push('/dashboard/mentor');
                                return;
                            }
                        }
                    }
                } catch (error) {
                    console.error("Failed to re-validate role", error);
                }
            }

            // 3. Client-side Route Guard (using potentially updated role)
            // Re-read strictly from what we might have just updated or existing
            const currentRole = localStorage.getItem('xclub_user_role');

            if (currentRole === 'SUPER_ADMIN') {
                router.push('/dashboard/admin/overview');
                return;
            }
            if (currentRole === 'INSTRUCTOR') {
                router.push('/dashboard/mentor');
                return;
            }
            if (currentRole === 'AFFILIATE') {
                router.push('/dashboard/affiliate');
                return;
            }
        };

        checkUserRole();

        // Load tasks state
        const storedTasks = localStorage.getItem('xclub_dashboard_tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, [router]);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const toggleTask = (id: number) => {
        const newTasks = tasks.map(t =>
            t.id === id ? { ...t, done: !t.done, status: !t.done ? "Hoàn thành" : "Đang chờ", statusColor: !t.done ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-orange-600 bg-orange-50 border-orange-100" } : t
        );
        setTasks(newTasks);
        localStorage.setItem('xclub_dashboard_tasks', JSON.stringify(newTasks));
    };

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* 1. Header Section */}
            <DashboardHeader
                title="Dashboard"
                description="Chào mừng trở lại, chúc bạn một ngày làm việc hiệu quả!"
            />

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Khóa học hoàn thành", value: "12/20", icon: BookOpen, color: "bg-emerald-500", bg: "bg-emerald-50 text-emerald-700" },
                    { label: "Buổi họp tham gia", value: "28/32", icon: Calendar, color: "bg-blue-500", bg: "bg-blue-50 text-blue-700" },
                    { label: "Bài tập hoàn thành", value: "15/18", icon: FileText, color: "bg-orange-500", bg: "bg-orange-50 text-orange-700" },
                    { label: "Điểm trung bình", value: "87%", icon: Award, color: "bg-purple-500", bg: "bg-purple-50 text-purple-700" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                            <stat.icon className="w-6 h-6" />
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

                    {/* 3. Next Meeting Banner */}
                    <div
                        onClick={() => router.push('/dashboard/schedule')}
                        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.01]"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-white/15 transition-all duration-700"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6 opacity-90">
                                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                <span className="font-bold uppercase tracking-wider text-xs">Buổi họp tiếp theo</span>
                            </div>

                            <div className="text-center mb-8">
                                <CountdownTimer targetDate={new Date('2026-02-15T20:30:00')} />
                                <p className="text-blue-200 font-medium">Chủ Nhật, 15/02/2026 • 20:30 - 22:00</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/20 pt-6">
                                <div>
                                    <p className="text-blue-200 text-xs font-semibold uppercase mb-1">Nhóm</p>
                                    <div className="flex items-center gap-2 font-bold">
                                        <Users className="w-4 h-4" />
                                        Nhóm Alpha #03
                                    </div>
                                </div>
                                <div>
                                    <p className="text-blue-200 text-xs font-semibold uppercase mb-1">Chủ đề</p>
                                    <div className="font-bold">Xây dựng hệ thống bán hàng</div>
                                </div>
                                <div>
                                    <p className="text-blue-200 text-xs font-semibold uppercase mb-1">Mentor</p>
                                    <div className="flex items-center gap-2 font-bold">
                                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">T</div>
                                        Trần Thị B
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <Button
                                    onClick={(e) => { e.stopPropagation(); handleCheckIn(); }}
                                    disabled={isCheckingIn}
                                    className="bg-green-500 hover:bg-green-600 text-white border-none shadow-lg shadow-green-500/30 transition-all font-bold group-hover:scale-105"
                                >
                                    <Video className="w-4 h-4 mr-2" />
                                    {isCheckingIn ? "Đang xử lý..." : "Tham gia ngay"}
                                </Button>
                                <Button
                                    onClick={(e) => { e.stopPropagation(); router.push('/dashboard/schedule'); }}
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm transition-all font-semibold"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Chi tiết
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* 4. Tasks List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                Nhiệm vụ cần hoàn thành
                            </h3>
                            <button onClick={() => router.push('/dashboard/assignments')} className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">Xem tất cả</button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {tasks.map((task) => (
                                <div key={task.id} className={`p-4 hover:bg-slate-50 transition-colors flex items-start gap-4 group ${task.done ? 'bg-slate-50/50' : ''}`}>
                                    <div className="mt-1">
                                        <input
                                            type="checkbox"
                                            checked={task.done}
                                            onChange={() => toggleTask(task.id)}
                                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />
                                    </div>
                                    <div className={`flex-1 transition-opacity ${task.done ? 'opacity-50' : ''}`}>
                                        <h4 className={`font-bold text-slate-900 group-hover:text-blue-600 transition-colors ${task.done ? 'line-through' : ''}`}>{task.title}</h4>
                                        <p className="text-sm text-slate-500 mt-1">{task.desc}</p>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${task.statusColor}`}>
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 5. Learning Progress */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-indigo-500" />
                                Tiến độ học tập
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {[
                                { subject: "Marketing Strategy", progress: 75, color: "bg-blue-500" },
                                { subject: "Sales Mastery", progress: 60, color: "bg-emerald-500" },
                                { subject: "Leadership Essentials", progress: 90, color: "bg-indigo-500" },
                                { subject: "Business Finance", progress: 45, color: "bg-orange-500" },
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors" onClick={() => router.push('/dashboard/learning')}>
                                    <div className="flex justify-between text-sm font-bold text-slate-700">
                                        <span>{item.subject}</span>
                                        <span className="text-slate-500">{item.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                                            style={{ width: `${item.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column (1 col) */}
                <div className="space-y-8">

                    {/* 6. Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-slate-500" />
                                Hoạt động gần đây
                            </h3>
                        </div>
                        <div className="p-5">
                            <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 pb-2">
                                {[
                                    { title: "Hoàn thành bài học", desc: "Content Marketing Fundamentals - Lesson 5", time: "2 giờ trước", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
                                    { title: "Nộp bài tập", desc: "Case Study: Chiến lược Marketing cho Startup", time: "1 ngày trước", icon: FileText, color: "text-blue-500 bg-blue-50 border-blue-100" },
                                    { title: "Nhận feedback từ Mentor", desc: "Biên bản họp tuần 7 - Điểm: 9/10", time: "2 ngày trước", icon: MessageSquare, color: "text-purple-500 bg-purple-50 border-purple-100" },
                                    { title: "Tham gia họp nhóm", desc: "Nhóm Alpha #03 - Tuần 7", time: "7 ngày trước", icon: Users, color: "text-orange-500 bg-orange-50 border-orange-100" },
                                ].map((activity, idx) => (
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

                    {/* 7. Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <PlayCircle className="w-5 h-5 text-orange-500" />
                                Thao tác nhanh
                            </h3>
                        </div>
                        <div className="p-4 space-y-3">
                            {[
                                { label: "Nộp bài tập mới", icon: FileText, bg: "bg-blue-600 hover:bg-blue-700 text-white", onClick: () => router.push('/dashboard/assignments') },
                                { label: "Tiếp tục học", icon: BookOpen, bg: "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700", onClick: () => router.push('/dashboard/learning') },
                                { label: "Xem nhóm", icon: Users, bg: "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700", onClick: () => router.push('/dashboard/squad') },
                                { label: "Liên hệ Mentor", icon: MessageSquare, bg: "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700", onClick: () => router.push('/dashboard/messages') }, // Updated to Messages
                            ].map((action, idx) => (
                                <button
                                    key={idx}
                                    onClick={action.onClick}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-bold text-sm shadow-sm ${action.bg}`}
                                >
                                    <span className="flex items-center gap-3">
                                        {React.createElement(action.icon, { className: "w-4 h-4" })}
                                        {action.label}
                                    </span>
                                    <ArrowRight className="w-4 h-4 opacity-50" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 8. Membership Card */}
                    <div className="rounded-2xl p-6 text-white shadow-lg relative overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-orange-100 text-xs font-bold uppercase tracking-wider mb-1">Gói hiện tại</p>
                                    <h3 className="text-2xl font-black">Gold Membership</h3>
                                </div>
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            <p className="text-orange-100 text-sm mb-1 font-medium">Membership của bạn sẽ gia hạn vào</p>
                            <p className="text-xl font-bold mb-6">15/03/2026</p>

                            <button className="w-full py-3 bg-white text-orange-600 font-bold rounded-xl text-sm hover:bg-orange-50 transition-colors shadow-lg">
                                Gia hạn ngay
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
