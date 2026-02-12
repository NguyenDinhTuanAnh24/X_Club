
"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Clear previous session data
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Đăng nhập thất bại');
                setLoading(false);
                return;
            }

            // Save user data to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('xclub_user_id', data.user.id);
                localStorage.setItem('xclub_user_email', data.user.email);
                localStorage.setItem('xclub_user_name', data.user.fullName);
                localStorage.setItem('xclub_user_tier', data.user.membership?.tier || 'BRONZE');
                localStorage.setItem('xclub_user_role', data.user.role);
            }

            // Route based on Role
            switch (data.user.role) {
                case 'SUPER_ADMIN':
                    window.location.href = '/dashboard/admin/overview';
                    break;
                case 'INSTRUCTOR':
                    window.location.href = '/dashboard/mentor';
                    break;
                case 'AFFILIATE':
                    window.location.href = '/dashboard/affiliate';
                    break;
                case 'GROUP_LEADER':
                    window.location.href = '/dashboard'; // Or /dashboard/squad?
                    break;
                default:
                    window.location.href = '/dashboard';
            }
        } catch (err) {
            setError('Có lỗi xảy ra. Vui lòng thử lại.');
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-sm mx-auto">
                {/* Header */}
                <h2 className="text-3xl font-black text-slate-900 mb-2">Chào mừng trở lại</h2>
                <p className="text-slate-500 font-medium mb-8">Đăng nhập để tiếp tục</p>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 mb-8">
                    <button className="flex-1 py-3 text-sm font-bold text-blue-600 border-b-2 border-blue-600">
                        Đăng nhập
                    </button>
                    <Link href="/register" className="flex-1 py-3 text-sm font-semibold text-slate-400 hover:text-slate-600 text-center transition-colors">
                        Đăng ký
                    </Link>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium animate-pulse">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                    />

                    <div>
                        <Input
                            label="Mật khẩu"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                            icon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            togglePassword={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="text-sm font-medium text-slate-600 cursor-pointer select-none">
                            Ghi nhớ đăng nhập
                        </label>
                    </div>

                    <Button
                        type="submit"
                        isLoading={loading}
                        className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
                    >
                        Đăng nhập
                    </Button>

                    <div className="text-center pt-2">
                        <Link href="#" className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
                            Quên mật khẩu?
                        </Link>
                    </div>
                </form>

                {/* Social Login */}
                <div className="mt-8">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-slate-400 font-medium">hoặc</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-600 text-sm">
                            <div className="w-4 h-4 rounded-full bg-blue-500"></div> {/* Placeholder for Google Icon */}
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-600 text-sm">
                            <div className="w-4 h-4 rounded-full bg-slate-800"></div> {/* Placeholder for Facebook Icon */}
                            Facebook
                        </button>
                    </div>

                    <div className="text-center mt-8 text-sm text-slate-500 font-medium">
                        Chưa có tài khoản? <Link href="/register" className="text-blue-500 hover:text-blue-600 font-bold transition-colors">Đăng ký ngay</Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
