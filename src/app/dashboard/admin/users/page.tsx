"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search,
    User,
    MoreHorizontal,
    Shield,
    Key,
    UserCheck,
    Lock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock Data
const USERS = [
    { id: 1, name: "Nguyễn Văn A", email: "student@example.com", role: "STUDENT", tier: "Gold Member", status: "Active" },
    { id: 2, name: "Trần Thị B", email: "mentor@example.com", role: "INSTRUCTOR", tier: "N/A", status: "Active" },
    { id: 3, name: "Lê Văn C", email: "affiliate@example.com", role: "AFFILIATE", tier: "Silver Partner", status: "Active" },
    { id: 4, name: "Hoàng Thị D", email: "group_lead@company.com", role: "GROUP_LEADER", tier: "Plan B2B", status: "Active" },
    { id: 5, name: "Admin Root", email: "root@system.com", role: "SUPER_ADMIN", tier: "System", status: "Active" },
];

export default function UserManagementPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    React.useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('xclub_user_role') !== 'SUPER_ADMIN') {
            router.push('/dashboard');
        }
    }, [router]);

    const handleImpersonate = (user: typeof USERS[0]) => {
        if (confirm(`Bạn có chắc muốn đăng nhập dưới danh nghĩa ${user.name}?`)) {
            // Set localStorage to simulate login
            localStorage.setItem('xclub_user_name', user.name);
            localStorage.setItem('xclub_user_email', user.email);
            localStorage.setItem('xclub_user_role', user.role);
            localStorage.setItem('xclub_user_tier', user.tier);

            // Reload to apply changes across specific components reading from localStorage
            window.location.href = '/dashboard';
        }
    };

    const filteredUsers = USERS.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-1">Quản lý người dùng</h1>
                    <p className="text-slate-500 font-medium">Danh sách và quản quyền truy cập hệ thống</p>
                </div>
                <Button className="bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30">
                    <User className="w-4 h-4 mr-2" />
                    Thêm mới
                </Button>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-100 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc email..."
                            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Người dùng</th>
                                <th className="px-6 py-4">Vai trò (Role)</th>
                                <th className="px-6 py-4">Gói (Tier)</th>
                                <th className="px-6 py-4">Trạng thái</th>
                                <th className="px-6 py-4 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-bold border border-white shadow-sm">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-slate-900">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                                    user.role === 'INSTRUCTOR' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                        user.role === 'AFFILIATE' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                                            'bg-slate-100 text-slate-700 border-slate-200'
                                                }`}>
                                                {user.role}
                                            </span>
                                            {user.role === 'SUPER_ADMIN' && (
                                                <span title="Tài khoản duy nhất hệ thống" className="bg-slate-100 text-slate-500 rounded p-1">
                                                    <Lock className="w-3 h-3" />
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                                        {user.tier}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {user.role !== 'SUPER_ADMIN' && (
                                                <button
                                                    onClick={() => handleImpersonate(user)}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 hover:shadow-sm group/btn relative"
                                                    title="Đăng nhập với tư cách user này"
                                                >
                                                    <Key className="w-4 h-4" />
                                                    <span className="absolute bottom-full right-0 mb-2 w-max px-2 py-1 text-[10px] font-bold text-white bg-slate-900 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none">
                                                        Impersonate
                                                    </span>
                                                </button>
                                            )}
                                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 hover:shadow-sm">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
