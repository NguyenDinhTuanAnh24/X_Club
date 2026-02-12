"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Users,
    Shield,
    DollarSign,
    Activity,
    Server,
    Lock,
    AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardPage() {
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('xclub_user_role') !== 'SUPER_ADMIN') {
            router.push('/dashboard');
        }
    }, [router]);

    const stats = [
        { label: "Total Users", value: "1,245", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Revenue (MTD)", value: "$45,200", change: "+8.5%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "System Health", value: "99.9%", change: "Stable", icon: Activity, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Active Roles", value: "7", change: "2 Custom", icon: Shield, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    const alerts = [
        { id: 1, type: "warning", message: "Backup storage reaching 85% capacity.", time: "2 hours ago" },
        { id: 2, type: "error", message: "Failed login attempts detected from IP 192.168.1.1", time: "5 hours ago" },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">System Administration</h1>
                <p className="text-slate-500 font-medium">Welcome back, Root. You have full control over the system.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                                {stat.change}
                            </span>
                        </div>
                        <div className={`p-4 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Admin Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Mgmt */}
                <div onClick={() => router.push('/dashboard/admin/users')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">User Management</h3>
                    <p className="text-slate-500 text-sm">Manage users, impersonate sessions, and reset passwords.</p>
                </div>

                {/* Role Mgmt */}
                <div onClick={() => router.push('/dashboard/admin/roles')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Role & Permissions</h3>
                    <p className="text-slate-500 text-sm">Define capabilities (Can Read, Can Edit) for each role.</p>
                </div>

                {/* System Config */}
                <div onClick={() => router.push('/dashboard/admin/settings')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-4 group-hover:scale-110 transition-transform">
                        <Server className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">System Configuration</h3>
                    <p className="text-slate-500 text-sm">API Keys, SMTP, Backup settings, and Payment Gateways.</p>
                </div>
            </div>

            {/* System Alerts */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        System Alerts & Logs
                    </h3>
                    <Button variant="ghost" className="text-xs">View Full Log</Button>
                </div>
                <div className="divide-y divide-slate-50">
                    {alerts.map((alert) => (
                        <div key={alert.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                            <div className={`w-2 h-2 rounded-full ${alert.type === 'error' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-800">{alert.message}</p>
                                <p className="text-xs text-slate-400 font-mono mt-0.5">{alert.time}</p>
                            </div>
                            <Button size="sm" variant="outline" className="text-xs h-8">Resolve</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
