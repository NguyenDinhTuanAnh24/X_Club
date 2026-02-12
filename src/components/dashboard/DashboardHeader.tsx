"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, LogOut } from 'lucide-react';

interface DashboardHeaderProps {
    title: string;
    description: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "Người dùng",
        role: "MEMBER",
        avatar: "U",
    });
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Initial hydration and role setup
    useEffect(() => {
        // Defaults
        let name = "Người dùng";
        let role = "MEMBER";

        if (typeof window !== 'undefined') {
            const storedName = localStorage.getItem('xclub_user_name');
            const storedRole = localStorage.getItem('xclub_user_role');
            const storedTier = localStorage.getItem('xclub_user_tier');

            if (storedName) name = storedName;

            // Display Logic: 
            // If User is Super Admin -> Role = "SUPER ADMIN"
            // If User is Instructor -> Role = "MENTOR" or "INSTRUCTOR"
            // If User has Tier (Gold/Platinum) -> Role = Tier Name

            if (storedRole === 'SUPER_ADMIN') {
                role = "SUPER ADMIN";
            } else if (storedRole === 'INSTRUCTOR') {
                role = "INSTRUCTOR";
            } else if (storedTier) {
                role = storedTier;
            } else if (storedRole) {
                role = storedRole;
            }
        }

        setUser({
            name,
            role,
            avatar: getInitials(name)
        });

        // Close menu when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('xclub_user_name');
            localStorage.removeItem('xclub_user_tier');
            localStorage.removeItem('xclub_user_email');
            localStorage.removeItem('xclub_user_role');
            localStorage.removeItem('xclub_user_id');
            localStorage.removeItem('xclub_dashboard_tasks');
        }
        router.push('/login');
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-20 gap-4">
            <div>
                <h1 className="text-2xl font-black text-slate-900 mb-1">{title}</h1>
                <p className="text-slate-500 font-medium">{description}</p>
            </div>

            <div className="relative" ref={menuRef}>
                <div
                    className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-xl hover:bg-slate-50"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                >
                    <div className="text-right hidden sm:block">
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-blue-100">
                            {user.role}
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20 border-2 border-white ring-2 ring-blue-100">
                        {user.avatar}
                    </div>
                </div>

                {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in zoom-in-95 duration-200 z-50">
                        <button
                            onClick={() => router.push('/dashboard/settings')}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 font-bold transition-colors"
                        >
                            <Settings className="w-4 h-4" />
                            Cài đặt
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Đăng xuất
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
