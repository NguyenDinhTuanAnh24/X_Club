
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, CreditCard, Save, User, Briefcase, Mail, Crown, Zap, Shield, CheckCircle2, Download } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AppSidebar } from '@/components/layout/AppSidebar';

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [membershipTier, setMembershipTier] = useState("Standard Member");

    const [profile, setProfile] = useState({
        name: "",
        title: "CEO & Founder",
        company: "TechStart Solutions",
        email: ""
    });

    // Membership data
    const today = new Date();
    const expiryDate = new Date(new Date().setFullYear(today.getFullYear() + 1));
    const formattedExpiry = new Intl.DateTimeFormat('vi-VN').format(expiryDate);

    const getPastDate = (monthsAgo: number) => {
        const d = new Date();
        d.setMonth(today.getMonth() - monthsAgo);
        return new Intl.DateTimeFormat('vi-VN').format(d);
    };

    // Get tier display info
    const getTierInfo = (tier: string) => {
        if (tier.toLowerCase().includes('gold')) {
            return {
                name: 'Gold Member',
                color: 'amber',
                bgClass: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100',
                borderClass: 'border-amber-200',
                iconClass: 'text-amber-600',
                labelClass: 'text-amber-700'
            };
        }
        return {
            name: 'Standard Member',
            color: 'blue',
            bgClass: 'bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100',
            borderClass: 'border-blue-200',
            iconClass: 'text-blue-600',
            labelClass: 'text-blue-700'
        };
    };

    const tierInfo = getTierInfo(membershipTier);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedName = localStorage.getItem('xclub_user_name');
            const storedEmail = localStorage.getItem('xclub_user_email');
            const storedTier = localStorage.getItem('xclub_user_tier');

            setProfile(prev => ({
                ...prev,
                name: storedName || "Nguyễn Văn A",
                email: storedEmail || "nguyenvana@gmail.com"
            }));

            if (storedTier) {
                setMembershipTier(storedTier);
            }
        }
    }, []);

    const handleChange = (field: string, value: string) => {
        setProfile({ ...profile, [field]: value });
        setIsDirty(true);
    };

    const handleSave = () => {
        setLoading(true);

        if (typeof window !== 'undefined') {
            localStorage.setItem('xclub_user_name', profile.name);
            localStorage.setItem('xclub_user_email', profile.email);
        }

        setTimeout(() => {
            setLoading(false);
            setIsDirty(false);
            window.location.reload();
        }, 800);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex">
            <AppSidebar />

            <main className="flex-1 lg:ml-64 min-h-screen transition-all duration-300 p-4 md:p-8 pb-24">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8 pt-8">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Cài đặt & Membership</h1>
                    <p className="text-slate-600 font-medium">Quản lý hồ sơ, gói thành viên và quyền lợi của bạn</p>
                </div>

                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Profile & Membership Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Profile Card */}
                        <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden">
                            {/* Profile Header */}
                            <div className="p-8 border-b-2 border-slate-100 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50/30">
                                <div className="relative group cursor-pointer mb-6">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 border-4 border-white shadow-2xl flex items-center justify-center text-3xl font-black text-white overflow-hidden">
                                        {getInitials(profile.name)}
                                    </div>
                                    <div className="absolute bottom-0 right-0 p-2 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-full shadow-xl border-4 border-white hover:scale-110 transition-transform cursor-pointer">
                                        <Camera className="w-4 h-4" />
                                    </div>
                                </div>
                                <p className="font-black text-xl text-slate-900 mb-1">{profile.name}</p>
                                <p className="text-sm text-slate-600 font-medium">{profile.email}</p>
                            </div>

                            {/* Form Fields */}
                            <div className="p-8 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                                        <User className="w-4 h-4 text-blue-600" />
                                        Họ và tên
                                    </label>
                                    <Input
                                        label=""
                                        value={profile.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="h-11 border-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-blue-600" />
                                        Chức danh
                                    </label>
                                    <Input
                                        label=""
                                        value={profile.title}
                                        onChange={(e) => handleChange('title', e.target.value)}
                                        className="h-11 border-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-blue-600" />
                                        Tên doanh nghiệp
                                    </label>
                                    <Input
                                        label=""
                                        value={profile.company}
                                        onChange={(e) => handleChange('company', e.target.value)}
                                        className="h-11 border-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-blue-600" />
                                        Email
                                    </label>
                                    <Input
                                        label=""
                                        value={profile.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="h-11 border-2"
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/30 border-t-2 border-slate-200 flex justify-end gap-3">
                                <Button
                                    disabled={!isDirty}
                                    isLoading={loading}
                                    className={`min-w-[140px] h-11 transition-all font-bold ${isDirty
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/40'
                                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                        }`}
                                    onClick={handleSave}
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Lưu thay đổi
                                </Button>
                            </div>
                        </div>

                        {/* Membership Card */}
                        <div className={`${tierInfo.bgClass} rounded-3xl p-8 text-slate-900 relative overflow-hidden shadow-2xl border-2 ${tierInfo.borderClass}`}>
                            <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${tierInfo.color === 'amber' ? 'from-yellow-100/50 to-amber-200/30' : 'from-blue-100/50 to-blue-200/30'} rounded-full blur-3xl pointer-events-none`}></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <Crown className={`w-6 h-6 ${tierInfo.iconClass}`} />
                                    <span className={`${tierInfo.labelClass} font-bold tracking-widest text-sm uppercase`}>Gói hiện tại</span>
                                </div>
                                <h2 className="text-3xl font-black mb-3 text-slate-900">{tierInfo.name}</h2>
                                <p className="text-slate-600 text-sm font-medium mb-6">Hết hạn: {formattedExpiry}</p>

                                <div className="flex items-center gap-2 mb-6">
                                    <div className={`flex items-center gap-2 bg-white px-3 py-2 rounded-xl border-2 ${tierInfo.borderClass} shadow-md`}>
                                        <CreditCard className="w-4 h-4 text-slate-600" />
                                        <span className="font-mono text-sm text-slate-700 font-bold">•••• 1234</span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <Button
                                        variant="secondary"
                                        onClick={() => alert("Chức năng gia hạn sẽ sớm ra mắt!")}
                                        className={`w-full h-11 bg-white text-slate-900 hover:bg-slate-50 shadow-lg font-bold border-2 ${tierInfo.borderClass}`}
                                    >
                                        Gia hạn ngay
                                    </Button>
                                </div>

                                <div className={`pt-6 border-t-2 ${tierInfo.borderClass} space-y-4`}>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shadow-md border-2 border-blue-200">
                                            <Zap className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900">Mentor 1-1</h4>
                                            <p className="text-xs text-slate-600 mt-0.5">1 session / tháng</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shadow-md border-2 border-emerald-200">
                                            <Shield className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900">Tài liệu Premium</h4>
                                            <p className="text-xs text-slate-600 mt-0.5">Truy cập không giới hạn</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shadow-md border-2 border-amber-200">
                                            <CheckCircle2 className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900">Hỗ trợ ưu tiên</h4>
                                            <p className="text-xs text-slate-600 mt-0.5">24/7 support</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Billing History */}
                    <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden">
                        <div className="p-6 border-b-2 border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/30">
                            <h3 className="text-2xl font-black text-slate-900">Lịch sử thanh toán</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gradient-to-r from-slate-50 to-blue-50 text-slate-700 font-bold border-b-2 border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4">Mã hóa đơn</th>
                                        <th className="px-6 py-4">Ngày</th>
                                        <th className="px-6 py-4">Gói dịch vụ</th>
                                        <th className="px-6 py-4">Số tiền</th>
                                        <th className="px-6 py-4">Trạng thái</th>
                                        <th className="px-6 py-4 text-right">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-slate-100">
                                    {[
                                        { id: "#INV-2023-012", date: getPastDate(0), plan: "Gold Member (Tháng)", amount: "5.000.000đ", status: "Thành công" },
                                        { id: "#INV-2023-008", date: getPastDate(1), plan: "Gold Member (Tháng)", amount: "5.000.000đ", status: "Thành công" },
                                        { id: "#INV-2023-004", date: getPastDate(2), plan: "Standard Member", amount: "1.000.000đ", status: "Thành công" },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-900">{row.id}</td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">{row.date}</td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">{row.plan}</td>
                                            <td className="px-6 py-4 font-black text-slate-900">{row.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md">
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors">
                                                    <Download className="w-4 h-4" />
                                                    Tải về
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
