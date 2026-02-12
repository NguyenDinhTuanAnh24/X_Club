"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Users,
    BookOpen,
    DollarSign,
    Shield,
    TrendingUp,
    AlertCircle,
    Activity,
    Server,
    CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default function AdminOverviewPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [statsData, setStatsData] = useState({
        users: { count: 0, growth: "0%" },
        revenue: { total: 0, currency: "VNĐ" },
        groups: { count: 0 },
        system: { status: "Unknown", pendingTasks: 0 }
    });

    useEffect(() => {
        const role = localStorage.getItem('xclub_user_role');
        if (role !== 'SUPER_ADMIN') {
            router.push('/dashboard');
            return;
        }

        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStatsData(data);
                }
            } catch (error) {
                console.error("Failed to load stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [router]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    };

    const stats = [
        { label: "Tổng người dùng", value: statsData.users.count.toLocaleString(), change: statsData.users.growth, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
        { label: "Doanh thu (Active)", value: formatCurrency(statsData.revenue.total), change: "Real-time", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100" },
        { label: "Nhóm hoạt động", value: statsData.groups.count.toString(), change: "Open", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100" },
        { label: "Bài nộp chờ chấm", value: statsData.system.pendingTasks.toString(), change: "Pending", icon: Server, color: "text-indigo-600", bg: "bg-indigo-100" },
    ];

    const alerts = [
        { title: "High Traffic Alert", desc: "Server load reached 85% at 20:00", time: "2h ago", type: "warning" },
        { title: "New Affiliate Request", desc: "User 'tuananh' applied for Affiliate", time: "4h ago", type: "info" },
        { title: "Failed Login Attempts", desc: "Multiple failures from IP 192.168.1.1", time: "6h ago", type: "critical" },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <DashboardHeader
                title="Admin Headquarters"
                description="Overview of system performance and integrity."
            />

            {/* Action Bar */}
            <div className="flex justify-end gap-3">
                <Button variant="outline" className="h-10 text-xs font-bold bg-white">
                    <Activity className="w-4 h-4 mr-2" />
                    System Logs
                </Button>
                <Button className="bg-slate-900 text-white hover:bg-slate-800 h-10 text-xs font-bold shadow-lg">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payouts
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                        <div className={`p-4 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.change.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main: Quick Actions & Chart Placeholder */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Quick Access */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Quick Management
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { label: "Approve Users", desc: "12 pending", href: "/dashboard/admin/users" },
                                { label: "Refund Requests", desc: "3 review needed", href: "/dashboard/admin/finance" },
                                { label: "Content Review", desc: "5 drafts", href: "/dashboard/admin/courses" },
                                { label: "System Config", desc: "Maintenance mode", href: "/dashboard/admin/settings" },
                                { label: "Role Manager", desc: "Access control", href: "/dashboard/admin/roles" },
                                { label: "B2B Groups", desc: "Add new group", href: "/dashboard/squad" },
                            ].map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => router.push(item.href)}
                                    className="text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                                >
                                    <p className="font-bold text-slate-800 text-sm group-hover:text-blue-700">{item.label}</p>
                                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="bg-slate-900 text-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Revenue Growth</h3>
                            <p className="text-slate-400 text-sm mb-6">Real-time statistics from payment gateways</p>

                            <div className="h-48 flex items-end gap-2">
                                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                    <div key={i} className="flex-1 bg-blue-500/30 rounded-t-lg hover:bg-blue-500 transition-colors relative group" style={{ height: `${h}%` }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            ${h}k
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: System Alerts */}
                <div className="space-y-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 bg-red-50/50">
                            <h3 className="font-bold text-red-900 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                System Alerts
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {alerts.map((alert, idx) => (
                                <div key={idx} className="p-5 hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-slate-800 text-sm">{alert.title}</h4>
                                        <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{alert.time}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-2">{alert.desc}</p>
                                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${alert.type === 'critical' ? 'bg-red-100 text-red-600' :
                                        alert.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                            'bg-blue-100 text-blue-600'
                                        }`}>
                                        {alert.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                            <button className="text-xs font-bold text-blue-600 hover:underline">View All Logs</button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white text-center shadow-lg">
                        <Server className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Maintenance Window</h3>
                        <p className="text-slate-400 text-xs mb-4">Scheduled for Feb 20, 02:00 AM UTC</p>
                        <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white w-full border border-white/20">
                            Reschedule
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
