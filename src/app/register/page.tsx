
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        tier: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const tiers = [
        { id: 'bronze', name: 'Bronze Member', price: '2.000.000đ/tháng' },
        { id: 'silver', name: 'Silver Member', price: '4.000.000đ/tháng' },
        { id: 'gold', name: 'Gold Member', price: '8.000.000đ/tháng' },
        { id: 'platinum', name: 'Platinum Member', price: '15.000.000đ/tháng' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // Basic Validation
        const newErrors: Record<string, string> = {};
        if (!formData.firstName) newErrors.firstName = "Vui lòng nhập tên";
        if (!formData.lastName) newErrors.lastName = "Vui lòng nhập họ";
        if (!formData.email) newErrors.email = "Vui lòng nhập email";
        if (!formData.phone) newErrors.phone = "Vui lòng nhập SĐT";
        if (!formData.tier) newErrors.tier = "Vui lòng chọn gói";
        if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mật khẩu không khớp";
        if (!formData.termsAccepted) newErrors.terms = "Bạn cần đồng ý điều khoản";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    fullName: `${formData.lastName} ${formData.firstName}`,
                    tier: formData.tier,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors({ api: data.error || 'Đăng ký thất bại' });
                setLoading(false);
                return;
            }

            // Save user data
            if (typeof window !== 'undefined') {
                localStorage.setItem('xclub_user_id', data.user.id);
                localStorage.setItem('xclub_user_name', data.user.fullName);
                localStorage.setItem('xclub_user_email', data.user.email);
                const tierName = tiers.find(t => t.id === formData.tier)?.name || 'Standard Member';
                localStorage.setItem('xclub_user_tier', tierName);
            }

            window.location.href = '/dashboard';
        } catch (err) {
            setErrors({ api: 'Có lỗi xảy ra. Vui lòng thử lại.' });
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-lg mx-auto">
                {/* Header */}
                <h2 className="text-3xl font-black text-slate-900 mb-2">Tạo tài khoản mới</h2>
                <p className="text-slate-500 font-medium mb-8">Bắt đầu hành trình của bạn</p>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 mb-8">
                    <Link href="/login" className="flex-1 py-3 text-sm font-semibold text-slate-400 hover:text-slate-600 text-center transition-colors">
                        Đăng nhập
                    </Link>
                    <button className="flex-1 py-3 text-sm font-bold text-blue-600 border-b-2 border-blue-600">
                        Đăng ký
                    </button>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 text-blue-700 text-sm p-4 rounded-lg mb-6 border border-blue-100 font-medium">
                    Chọn gói membership để bắt đầu hành trình của bạn
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {errors.api && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                            {errors.api}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Họ và tên đệm</label>
                            <Input
                                placeholder="Nguyễn Văn"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                error={errors.lastName}
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tên</label>
                            <Input
                                placeholder="A"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                error={errors.firstName}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                        <Input
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={errors.email}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Số điện thoại</label>
                        <Input
                            type="tel"
                            placeholder="0901234567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            error={errors.phone}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gói Membership</label>
                        <div className="relative">
                            <select
                                className="w-full h-11 px-4 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all cursor-pointer font-medium"
                                value={formData.tier}
                                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                            >
                                <option value="">-- Chọn gói --</option>
                                {tiers.map(t => (
                                    <option key={t.id} value={t.id}>{t.name} - {t.price}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                        </div>
                        {errors.tier && <p className="mt-1 text-xs text-red-500 font-medium">{errors.tier}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mật khẩu</label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Tối thiểu 8 ký tự"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password}
                            icon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            togglePassword={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Xác nhận mật khẩu</label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập lại mật khẩu"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            error={errors.confirmPassword}
                            icon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            togglePassword={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                        <input
                            id="terms"
                            type="checkbox"
                            className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            checked={formData.termsAccepted}
                            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                        />
                        <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer select-none leading-tight">
                            Tôi đồng ý với <Link href="#" className="font-bold text-blue-600 hover:text-blue-700 underline decoration-blue-600/30">Điều khoản sử dụng</Link>
                        </label>
                    </div>
                    {errors.terms && <p className="text-xs text-red-500 font-medium ml-6">{errors.terms}</p>}

                    <Button
                        type="submit"
                        isLoading={loading}
                        className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 mt-6"
                    >
                        Đăng ký
                    </Button>
                </form>

                <div className="text-center mt-6 text-sm text-slate-500 font-medium">
                    Đã có tài khoản? <Link href="/login" className="text-blue-500 hover:text-blue-600 font-bold transition-colors">Đăng nhập</Link>
                </div>
            </div>
        </AuthLayout>
    );
}
