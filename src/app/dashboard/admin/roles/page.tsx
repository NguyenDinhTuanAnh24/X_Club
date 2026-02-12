"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Lock,
    Shield,
    Key,
    Save,
    RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock Roles & Permissions
const ROLES = ['SUPER_ADMIN', 'SUPPORT', 'INSTRUCTOR', 'CONTENT_EDITOR', 'AFFILIATE', 'GROUP_LEADER', 'STUDENT'];

const PERMISSIONS = [
    {
        category: "System Administration",
        actions: [
            { id: "sys_config", label: "System Configuration (API, SMTP, Backup)" },
            { id: "role_mgmt", label: "Role & Permission Management" },
            { id: "user_impersonate", label: "User Impersonation" },
            { id: "logs_view", label: "View Audit Logs" }
        ]
    },
    {
        category: "Content & Teaching",
        actions: [
            { id: "course_create", label: "Create/Edit Courses" },
            { id: "course_publish", label: "Publish Courses" },
            { id: "assignment_grade", label: "Grade Assignments" },
            { id: "video_upload", label: "Upload Video Content" }
        ]
    },
    {
        category: "Finance & Sales",
        actions: [
            { id: "finance_view", label: "View Revenue Reports" },
            { id: "refund_process", label: "Process Refunds" },
            { id: "coupon_manage", label: "Manage Coupons" },
            { id: "affiliate_view", label: "View Affiliate Dashboard" }
        ]
    }
];

// Initial State (Mock)
const INITIAL_STATE: Record<string, string[]> = {
    'SUPER_ADMIN': ['sys_config', 'role_mgmt', 'user_impersonate', 'logs_view', 'course_create', 'course_publish', 'assignment_grade', 'video_upload', 'finance_view', 'refund_process', 'coupon_manage', 'affiliate_view'],
    'INSTRUCTOR': ['course_create', 'assignment_grade', 'video_upload'],
    'SUPPORT': ['user_impersonate', 'logs_view', 'refund_process'],
    'CONTENT_EDITOR': ['video_upload', 'course_create'],
    'AFFILIATE': ['affiliate_view']
};

export default function RoleManagementPage() {
    const router = useRouter();
    const [rolePermissions, setRolePermissions] = useState(INITIAL_STATE);
    const [isSaving, setIsSaving] = useState(false);

    React.useEffect(() => {
        const role = localStorage.getItem('xclub_user_role');
        if (role !== 'SUPER_ADMIN') {
            // Optional: alert can be annoying during dev, but good for demo security
            // alert("Access Denied: Admin privileges required."); 
            router.push('/dashboard');
        }
    }, [router]);

    const togglePermission = (role: string, permissionId: string) => {
        if (role === 'SUPER_ADMIN') return; // Cannot edit super admin

        const currentPerms = rolePermissions[role] || [];
        const hasPerm = currentPerms.includes(permissionId);

        let newPerms;
        if (hasPerm) {
            newPerms = currentPerms.filter(id => id !== permissionId);
        } else {
            newPerms = [...currentPerms, permissionId];
        }

        setRolePermissions(prev => ({
            ...prev,
            [role]: newPerms
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert("Permissions updated successfully!");
        }, 1000);
    };

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-1 flex items-center gap-2">
                        <Lock className="w-6 h-6 text-purple-600" />
                        Phân quyền (Role Management)
                    </h1>
                    <p className="text-slate-500 font-medium">Định nghĩa quyền hạn chi tiết cho từng vai trò trong hệ thống.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-slate-200" onClick={() => setRolePermissions(INITIAL_STATE)}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset Default
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg shadow-purple-500/30">
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Saving..." : "Lưu thay đổi"}
                    </Button>
                </div>
            </div>

            {/* Matrix */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 w-64 min-w-[250px] font-black text-slate-800 uppercase tracking-wider text-xs sticky left-0 bg-slate-50 z-10 border-r border-slate-200">
                                    Permission / Action
                                </th>
                                {ROLES.map(role => (
                                    <th key={role} className="p-4 min-w-[120px] text-center font-bold text-slate-700 text-xs border-r border-slate-100 last:border-0 uppercase tracking-tight">
                                        {role.replace('_', ' ')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {PERMISSIONS.map((group) => (
                                <React.Fragment key={group.category}>
                                    <tr className="bg-slate-50/50">
                                        <td colSpan={ROLES.length + 1} className="p-3 font-bold text-slate-500 text-xs uppercase tracking-wider pl-4 border-b border-slate-100">
                                            {group.category}
                                        </td>
                                    </tr>
                                    {group.actions.map(action => (
                                        <tr key={action.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 text-sm font-medium text-slate-700 border-r border-slate-100 sticky left-0 bg-white group-hover:bg-slate-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                                                {action.label}
                                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{action.id}</div>
                                            </td>
                                            {ROLES.map(role => {
                                                const isSuperAdmin = role === 'SUPER_ADMIN';
                                                const hasPerm = (rolePermissions[role] || []).includes(action.id);

                                                return (
                                                    <td key={role} className="p-4 text-center border-r border-slate-100 last:border-0 relative">
                                                        <div className="flex justify-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={hasPerm}
                                                                disabled={isSuperAdmin}
                                                                onChange={() => togglePermission(role, action.id)}
                                                                className={`w-5 h-5 rounded border-2 transition-all cursor-pointer 
                                                                    ${isSuperAdmin
                                                                        ? 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed opacity-60'
                                                                        : 'border-slate-300 text-purple-600 focus:ring-purple-500 hover:border-purple-400'
                                                                    }`}
                                                            />
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm text-yellow-800 flex items-start gap-3">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                    <span className="font-bold">Lưu ý quan trọng:</span> Thay đổi quyền hạn sẽ có hiệu lực ngay lập tức. Hãy cẩn trọng khi cấp quyền <span className="font-mono font-bold bg-yellow-100 px-1 rounded">sys_config</span> hoặc <span className="font-mono font-bold bg-yellow-100 px-1 rounded">role_mgmt</span> cho các vai trò không phải Admin.
                </div>
            </div>
        </div>
    );
}
