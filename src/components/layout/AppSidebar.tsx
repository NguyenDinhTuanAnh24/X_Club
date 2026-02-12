"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    FolderOpen,
    Users,
    FileText,
    ClipboardCheck,
    GraduationCap,
    PieChart,
    MessageSquare,
    BookOpen,
    ChevronDown,
    ChevronRight,
    Users2,
    Shield,
    DollarSign,
    Briefcase,
    Lock
} from "lucide-react";
import clsx from "clsx";

interface NavItem {
    name: string;
    href?: string;
    icon: any;
    allowedRoles?: string[]; // undefined means allow all by default, or specific roles
    children?: { name: string; href: string; icon?: any; allowedRoles?: string[] }[];
}

const ALL_ROLES = ['SUPER_ADMIN', 'SUPPORT', 'INSTRUCTOR', 'CONTENT_EDITOR', 'AFFILIATE', 'GROUP_LEADER', 'STUDENT'];

const ALL_ROLES_EXCEPT_ADMIN = ['SUPPORT', 'INSTRUCTOR', 'CONTENT_EDITOR', 'AFFILIATE', 'GROUP_LEADER', 'STUDENT'];

const navigation: NavItem[] = [
    {
        name: "Tổng quan",
        href: "/dashboard",
        icon: LayoutDashboard,
        allowedRoles: ALL_ROLES
    },
    {
        name: "Quản trị hệ thống",
        icon: Shield,
        allowedRoles: ['SUPER_ADMIN', 'SUPPORT'],
        children: [
            { name: "Cài đặt & Server", href: "/dashboard/admin/settings", icon: Shield, allowedRoles: ['SUPER_ADMIN'] },
            { name: "Quản lý người dùng", href: "/dashboard/admin/users", icon: Users },
            { name: "Khóa học (Courses)", href: "/dashboard/admin/courses", icon: BookOpen, allowedRoles: ['SUPER_ADMIN', 'CONTENT_EDITOR'] },
            { name: "Phân quyền & Roles", href: "/dashboard/admin/roles", icon: Lock, allowedRoles: ['SUPER_ADMIN'] },
            { name: "Thanh toán & Doanh thu", href: "/dashboard/admin/finance", icon: DollarSign, allowedRoles: ['SUPER_ADMIN'] }
        ]
    },
    {
        name: "Affiliate & Partner",
        icon: DollarSign,
        allowedRoles: ['AFFILIATE', 'SUPER_ADMIN'],
        children: [
            { name: "Dashboard", href: "/dashboard/affiliate", icon: LayoutDashboard },
            { name: "Link giới thiệu", href: "/dashboard/affiliate/links", icon: FileText },
            { name: "Hoa hồng", href: "/dashboard/affiliate/commissions", icon: DollarSign }
        ]
    },
    {
        name: "Quản lý nhóm (B2B)",
        icon: Briefcase,
        allowedRoles: ['GROUP_LEADER', 'SUPER_ADMIN'],
        children: [
            { name: "Thành viên nhóm", href: "/dashboard/group/members", icon: Users },
            { name: "Báo cáo học tập", href: "/dashboard/group/reports", icon: PieChart }
        ]
    },
    {
        name: "Học tập & Phát triển",
        icon: BookOpen,
        allowedRoles: ['STUDENT', 'INSTRUCTOR', 'GROUP_LEADER', 'CONTENT_EDITOR'],
        children: [
            { name: "Đào tạo & Đánh giá", href: "/dashboard/learning", icon: GraduationCap },
            { name: "Bài tập", href: "/dashboard/assignments", icon: FileText },
            { name: "Tiến độ", href: "/dashboard/progress", icon: PieChart },
            { name: "Kho tài liệu", href: "/dashboard/docs", icon: FolderOpen },
        ]
    },
    {
        name: "Cộng đồng",
        icon: Users2,
        allowedRoles: ['STUDENT', 'INSTRUCTOR', 'GROUP_LEADER'],
        children: [
            { name: "Squad của tôi", href: "/dashboard/squad", icon: Users },
            { name: "Tin nhắn", href: "/dashboard/messages", icon: MessageSquare },
            { name: "Lịch hoạt động", href: "/dashboard/schedule", icon: Calendar },
        ]
    },
    {
        name: "Mentor & Teaching",
        icon: ClipboardCheck,
        allowedRoles: ['INSTRUCTOR', 'CONTENT_EDITOR'],
        children: [
            { name: "Quản lý khóa học", href: "/dashboard/mentor/courses", icon: BookOpen, allowedRoles: ['INSTRUCTOR'] },
            { name: "Chấm bài", href: "/dashboard/mentor/assignments", icon: ClipboardCheck, allowedRoles: ['INSTRUCTOR'] },
            { name: "Upload Video", href: "/dashboard/mentor/upload-video", icon: FileText, allowedRoles: ['INSTRUCTOR', 'CONTENT_EDITOR'] }
        ]
    }
];

// Helper to check permissions
const hasPermission = (allowedRoles: string[] | undefined, userRole: string) => {
    if (!allowedRoles) return true;
    return allowedRoles.includes(userRole);
};

export function AppSidebar() {
    const pathname = usePathname();
    const [userRole, setUserRole] = useState<string>('STUDENT');
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // Hydrate role
        const storedRole = localStorage.getItem('xclub_user_role') || 'STUDENT';
        const storedId = localStorage.getItem('xclub_user_id');
        setUserRole(storedRole);

        // Sync Role with Server (Handling F5 updates)
        if (storedId) {
            fetch('/api/auth/me', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: storedId })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.user && data.user.role !== storedRole) {
                        console.log("Role synced from server:", storedRole, "->", data.user.role);

                        // Update Local Storage
                        localStorage.setItem('xclub_user_role', data.user.role);
                        localStorage.setItem('xclub_user_name', data.user.fullName);
                        if (data.user.membership?.tier) {
                            localStorage.setItem('xclub_user_tier', data.user.membership.tier);
                        }

                        // Update State
                        setUserRole(data.user.role);

                        // Broadcast event
                        window.dispatchEvent(new Event('roleChanged'));

                        // Force reload to apply changes to page content (e.g. redirect rules)
                        window.location.reload();
                    }
                })
                .catch(err => console.error("Failed to sync role", err));
        }

        // Auto open groups logic
        const newOpenGroups: Record<string, boolean> = {};
        navigation.forEach(group => {
            if (group.children && hasPermission(group.allowedRoles, storedRole)) { // Use storedRole here initially
                if (group.children.some(child => pathname === child.href)) {
                    newOpenGroups[group.name] = true;
                }
            }
        });
        setOpenGroups(newOpenGroups); // Initially open relevant groups

        const handleStorageChange = () => {
            const updatedRole = localStorage.getItem('xclub_user_role') || 'STUDENT';
            setUserRole(updatedRole);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('roleChanged', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('roleChanged', handleStorageChange);
        }
    }, [pathname]);

    const toggleGroup = (groupName: string) => {
        setOpenGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
    };

    const getHomeLink = (role: string) => {
        switch (role) {
            case 'SUPER_ADMIN': return '/dashboard/admin/overview';
            case 'INSTRUCTOR': return '/dashboard/mentor';
            case 'AFFILIATE': return '/dashboard/affiliate';
            default: return '/dashboard';
        }
    };

    const homeHref = getHomeLink(userRole);

    return (
        <aside className="hidden lg:flex w-64 bg-white border-r-2 border-slate-200 flex-col h-screen fixed inset-y-0 left-0 z-50 shadow-sm overflow-hidden">
            {/* Logo Header */}
            <div className="h-16 flex items-center px-6 border-b-2 border-slate-200 bg-white z-10 sticky top-0">
                <Link href={homeHref} className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-black shadow-md transition-transform group-hover:scale-105">
                        X
                    </div>
                    <span className="font-black text-xl text-slate-900 tracking-tight">CLUB</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-hide">
                {navigation.map((item) => {
                    if (!hasPermission(item.allowedRoles, userRole)) return null;

                    if (item.children) {
                        // Check if at least one child is visible
                        const visibleChildren = item.children.filter(child => hasPermission(child.allowedRoles, userRole));
                        if (visibleChildren.length === 0) return null;

                        // Render Group
                        const isOpen = openGroups[item.name];
                        const isGroupActive = visibleChildren.some(child => pathname === child.href);

                        return (
                            <div key={item.name} className="space-y-1">
                                <button
                                    onClick={() => toggleGroup(item.name)}
                                    className={clsx(
                                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all select-none",
                                        isGroupActive
                                            ? "text-blue-700 bg-blue-50/50"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className={clsx("w-5 h-5", isGroupActive ? "text-blue-600" : "text-slate-400")} />
                                        <span>{item.name}</span>
                                    </div>
                                    {isOpen ? (
                                        <ChevronDown className="w-4 h-4 text-slate-400" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                    )}
                                </button>

                                {isOpen && (
                                    <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 fade-in duration-200">
                                        {visibleChildren.map((child) => {
                                            const isChildActive = pathname === child.href;
                                            const ChildIcon = child.icon || FileText;
                                            return (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className={clsx(
                                                        "flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ml-4 border-l-2",
                                                        isChildActive
                                                            ? "bg-blue-600 text-white border-transparent shadow-md shadow-blue-500/20"
                                                            : "text-slate-500 border-slate-100 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50"
                                                    )}
                                                >
                                                    <ChildIcon className={clsx("w-4 h-4", isChildActive ? "text-white" : "text-slate-400")} />
                                                    {child.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    // Render Single Item
                    const realHref = item.href === '/dashboard' ? homeHref : item.href!;
                    const isActive = pathname === realHref;
                    return (
                        <Link
                            key={item.name}
                            href={realHref}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                isActive
                                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                                    : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-slate-500")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500 flex flex-col gap-1">
                    <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-400">Current Role</span>
                    <span className="font-bold text-slate-700">{userRole.replace('_', ' ')}</span>
                </div>
            </div>
        </aside>
    );
}
