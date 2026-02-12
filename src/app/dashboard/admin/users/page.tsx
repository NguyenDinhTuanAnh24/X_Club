"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search,
    User,
    MoreHorizontal,
    Shield,
    Key,
    UserCheck,
    Lock,
    Save,
    Trash2,
    Power,
    Ban
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default function UserManagementPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Enforce Admin Access
        const role = localStorage.getItem('xclub_user_role');
        // if (role !== 'SUPER_ADMIN') {
        //    router.push('/dashboard');
        // }
        fetchUsers();

        // Click outside listener to close menus
        const handleClickOutside = () => {
            setOpenMenuId(null);
            // Optional: Close status edit on outside click? 
            // setEditingStatusId(null); 
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [router]);

    const handleUpdateRole = async (userId: string, newRole: string) => {
        try {
            const res = await fetch('/api/admin/users/role', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, role: newRole })
            });

            if (res.ok) {
                alert("Cập nhật vai trò thành công!");
                setEditingUserId(null);
                fetchUsers();
            } else {
                alert("Lỗi khi cập nhật vai trò.");
            }
        } catch (error) {
            console.error("Update role failed", error);
        }
    };

    const handleUpdateStatus = async (userId: string, newStatus: string) => {
        if (!confirm(`Bạn có chắc muốn chuyển trạng thái thành ${newStatus}?`)) return;

        try {
            const res = await fetch('/api/admin/users/status', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, status: newStatus })
            });

            if (res.ok) {
                setEditingStatusId(null);
                fetchUsers();
            } else {
                alert("Không thể cập nhật trạng thái.");
            }
        } catch (error) {
            console.error("Status update failed", error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("CẢNH BÁO: Bạn có chắc chắn muốn xóa vĩnh viễn người dùng này? Hành động này không thể hoàn tác.")) return;

        try {
            const res = await fetch(`/api/admin/users/delete?userId=${userId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                alert("Đã xóa người dùng.");
                fetchUsers();
            } else {
                // Try reading error message
                const data = await res.json().catch(() => ({}));
                alert(data.error || "Lỗi khi xóa người dùng.");
            }
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    // Stop propagation for menu buttons
    const handleMenuClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const filteredUsers = users.filter(u =>
        (u.name || u.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const roles = ['STUDENT', 'INSTRUCTOR', 'AFFILIATE', 'GROUP_LEADER'];

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <DashboardHeader
                title="Quản lý người dùng"
                description="Danh sách và quản quyền truy cập hệ thống"
            />

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
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
                <div className="overflow-visible">
                    {loading ? (
                        <div className="p-8 text-center text-slate-500">Đang tải danh sách...</div>
                    ) : (
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
                                                    {(user.fullName || user.email).charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-slate-900">{user.fullName || "No Name"}</p>
                                                    <p className="text-xs text-slate-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingUserId === user.id ? (
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        className="text-xs p-1 rounded border border-slate-300"
                                                        value={selectedRole}
                                                        onChange={(e) => setSelectedRole(e.target.value)}
                                                    >
                                                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                                    </select>
                                                    <button
                                                        onClick={() => handleUpdateRole(user.id, selectedRole)}
                                                        className="p-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                                                    >
                                                        <Save className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span
                                                    className={`cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                                        user.role === 'INSTRUCTOR' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                            user.role === 'AFFILIATE' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                                                'bg-slate-100 text-slate-700 border-slate-200'
                                                        }`}
                                                    onClick={() => {
                                                        if (user.role !== 'SUPER_ADMIN') {
                                                            setEditingUserId(user.id);
                                                            setSelectedRole(user.role || 'STUDENT');
                                                        }
                                                    }}
                                                    title={user.role === 'SUPER_ADMIN' ? "Không thể sửa Admin" : "Nhấn để sửa vai trò"}
                                                >
                                                    {user.role || 'STUDENT'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-600">
                                            {user.tier || "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingStatusId === user.id ? (
                                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                                    <select
                                                        className="text-xs p-1 rounded border border-slate-300"
                                                        value={selectedStatus}
                                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                                    >
                                                        <option value="ACTIVE">ACTIVE</option>
                                                        <option value="PENDING">PENDING</option>
                                                        <option value="BANNED">BANNED</option>
                                                    </select>
                                                    <button
                                                        onClick={() => handleUpdateStatus(user.id, selectedStatus)}
                                                        className="p-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                                    >
                                                        <Save className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border cursor-pointer hover:opacity-80
                                                        ${user.status === 'ACTIVE'
                                                            ? 'bg-green-50 text-green-700 border-green-100'
                                                            : user.status === 'BANNED'
                                                                ? 'bg-red-50 text-red-700 border-red-100'
                                                                : 'bg-amber-50 text-amber-700 border-amber-100'}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (user.role !== 'SUPER_ADMIN') {
                                                            setEditingStatusId(user.id);
                                                            setSelectedStatus(user.status);
                                                        }
                                                    }}
                                                    title={user.role === 'SUPER_ADMIN' ? "Không thể sửa Admin" : "Nhấn để sửa trạng thái"}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : user.status === 'BANNED' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                                                    {user.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={(e) => handleMenuClick(e, user.id)}
                                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 hover:shadow-sm"
                                                >
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Dropdown Menu */}
                                            {openMenuId === user.id && (
                                                <div className="absolute right-10 top-0 mt-8 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-[9999] animate-in fade-in zoom-in-95 duration-200 text-left">
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Xóa tài khoản
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
