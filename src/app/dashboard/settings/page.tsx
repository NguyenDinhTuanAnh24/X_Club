
"use client";

import React, { useState } from 'react';
import {
    User,
    Shield,
    Bell,
    Lock,
    Camera,
    LogOut,
    Crown,
    Download,
    FileText,
    Save
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch'; // Assuming Switch is correctly placed

// Tabs Configuration
const TABS = [
    { id: 'profile', label: 'Hồ sơ', icon: User },
    { id: 'account', label: 'Tài khoản', icon: Lock },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'privacy', label: 'Quyền riêng tư', icon: Shield },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    // --- State Management for Forms ---

    // 1. Profile State
    const [profile, setProfile] = useState({
        firstName: "Nguyễn Văn",
        lastName: "A",
        email: "nguyenvana@email.com",
        phone: "0901234567",
        dob: "1990-08-15",
        bio: "Tôi là một doanh nhân với 5 năm kinh nghiệm trong lĩnh vực công nghệ. Đang tìm kiếm cơ hội học hỏi và mở rộng network trong cộng đồng X CLUB."
    });

    // 2. Account State (Password)
    const [password, setPassword] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    // 3. Notification Settings
    const [notifications, setNotifications] = useState({
        email: true,
        meetings: true,
        assignments: true,
        feedback: true,
        group_messages: false,
        system_updates: true,
    });

    // 4. Privacy Settings
    const [privacy, setPrivacy] = useState({
        show_profile: true,
        show_progress: true,
        allow_messages: true,
    });

    // Handlers
    const handleProfileChange = (field: string, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const handlePasswordChange = (field: string, value: string) => {
        setPassword(prev => ({ ...prev, [field]: value }));
    };

    const toggleNotification = (key: string) => {
        setNotifications(prev => ({ ...prev, [key as keyof typeof notifications]: !prev[key as keyof typeof notifications] }));
    };

    const togglePrivacy = (key: string) => {
        setPrivacy(prev => ({ ...prev, [key as keyof typeof privacy]: !prev[key as keyof typeof privacy] }));
    };

    const handleSaveProfile = () => {
        // Simulate API call
        alert("Đã lưu thay đổi hồ sơ thành công!");
    };

    const handleUpdatePassword = () => {
        if (password.new !== password.confirm) {
            alert("Mật khẩu mới không khớp!");
            return;
        }
        alert("Đã cập nhật mật khẩu thành công!");
    };

    return (
        <div className="p-6 lg:p-8 space-y-6 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Page Header */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h1 className="text-2xl font-black text-slate-900 mb-1">Cài đặt</h1>
                <p className="text-sm text-slate-500 font-medium">Quản lý tài khoản và tùy chọn cá nhân của bạn</p>

                {/* Tabs Navigation */}
                <div className="flex items-center gap-6 mt-6 border-b border-slate-100 overflow-x-auto">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center gap-2 pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap px-1
                                    ${isActive
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200'}
                                `}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm min-h-[500px]">

                {/* 1. Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-50">Thông tin cá nhân</h2>

                        {/* Avatar Section */}
                        <div className="flex flex-col items-center mb-10">
                            <div className="relative group">
                                <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-black text-white shadow-lg mb-4">
                                    NVA
                                </div>
                                <button className="absolute bottom-4 right-0 bg-white p-2 rounded-full shadow-md border border-slate-100 text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all transform hover:scale-105 active:scale-95" title="Đổi ảnh đại diện">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <Button variant="secondary" size="sm" className="text-xs font-bold border-slate-200">
                                Đổi ảnh đại diện
                            </Button>
                        </div>

                        {/* Profile Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Họ và tên đệm</label>
                                <Input
                                    className="font-medium"
                                    value={profile.firstName}
                                    onChange={(e) => handleProfileChange('firstName', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Tên</label>
                                <Input
                                    className="font-medium"
                                    value={profile.lastName}
                                    onChange={(e) => handleProfileChange('lastName', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-700">Email</label>
                                <Input
                                    className="font-medium bg-slate-50 text-slate-500"
                                    value={profile.email}
                                    disabled
                                />
                                <p className="text-[10px] text-slate-400 italic">Email không thể thay đổi</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Số điện thoại</label>
                                <Input
                                    className="font-medium"
                                    value={profile.phone}
                                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Ngày sinh</label>
                                <Input
                                    type="date"
                                    className="font-medium"
                                    value={profile.dob}
                                    onChange={(e) => handleProfileChange('dob', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-700">Giới thiệu bản thân</label>
                                <textarea
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] text-sm text-slate-900 resize-none font-medium text-slate-600"
                                    value={profile.bio}
                                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                            <Button variant="secondary" className="font-bold border-slate-200 text-slate-500">
                                Hủy
                            </Button>
                            <Button variant="primary" onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700 font-bold px-6">
                                <Save className="w-4 h-4 mr-2" />
                                Lưu thay đổi
                            </Button>
                        </div>
                    </div>
                )}

                {/* 2. Account Tab */}
                {activeTab === 'account' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
                        {/* Membership Card */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Membership</h2>
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white shadow-lg">
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

                                <div className="relative z-10 flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Crown className="w-5 h-5 text-yellow-200 animate-pulse" />
                                            <span className="text-sm font-bold uppercase tracking-wider text-yellow-100">Gold Member</span>
                                        </div>
                                        <h3 className="text-2xl font-black mb-1">Membership hiện tại của bạn</h3>
                                        <p className="text-xs text-orange-100 font-medium mb-6">Ngày gia hạn tiếp theo: <span className="font-bold text-white">15/03/2026</span></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black">8.000.000đ</p>
                                        <p className="text-xs text-orange-100 uppercase font-bold">/ tháng</p>
                                    </div>
                                </div>

                                <div className="relative z-10 flex flex-wrap gap-3 mt-4">
                                    <button className="px-4 py-2 bg-white text-orange-600 text-xs font-bold rounded-lg shadow-sm hover:bg-orange-50 transition-colors flex items-center gap-2">
                                        <Crown className="w-3 h-3" />
                                        Nâng cấp lên Platinum
                                    </button>
                                    <button className="px-4 py-2 bg-black/20 text-white text-xs font-bold rounded-lg hover:bg-black/30 transition-colors backdrop-blur-sm">
                                        Hủy Membership
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Change Password */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-50">Đổi mật khẩu</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700">Mật khẩu hiện tại</label>
                                    <Input
                                        type="password"
                                        className="font-medium"
                                        placeholder="Nhập mật khẩu hiện tại"
                                        value={password.current}
                                        onChange={(e) => handlePasswordChange('current', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Mật khẩu mới</label>
                                    <Input
                                        type="password"
                                        className="font-medium"
                                        placeholder="Tối thiểu 8 ký tự"
                                        value={password.new}
                                        onChange={(e) => handlePasswordChange('new', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Xác nhận mật khẩu mới</label>
                                    <Input
                                        type="password"
                                        className="font-medium"
                                        placeholder="Nhập lại mật khẩu mới"
                                        value={password.confirm}
                                        onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button variant="primary" onClick={handleUpdatePassword} className="bg-blue-600 hover:bg-blue-700 font-bold px-6">
                                    Cập nhật mật khẩu
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-50">Cài đặt thông báo</h2>
                        <div className="space-y-1 divide-y divide-slate-50">
                            {[
                                { key: 'email', label: 'Email thông báo', desc: 'Nhận thông báo quan trọng qua email' },
                                { key: 'meetings', label: 'Nhắc nhở buổi họp', desc: 'Nhận thông báo trước buổi họp 1 giờ' },
                                { key: 'assignments', label: 'Bài tập mới', desc: 'Thông báo khi có bài tập mới được giao' },
                                { key: 'feedback', label: 'Feedback từ Mentor', desc: 'Thông báo khi nhận feedback chấm bài' },
                                { key: 'group_messages', label: 'Tin nhắn nhóm', desc: 'Nhận thông báo tin nhắn từ thành viên nhóm' },
                                { key: 'system_updates', label: 'Cập nhật hệ thống', desc: 'Thông báo về tính năng và cập nhật mới' },
                            ].map((item) => (
                                <div key={item.key} className="hover:bg-slate-50 rounded-lg px-3 -mx-3 transition-colors">
                                    <Switch
                                        label={item.label}
                                        description={item.desc}
                                        checked={notifications[item.key as keyof typeof notifications]}
                                        onCheckedChange={() => toggleNotification(item.key)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. Privacy Tab */}
                {activeTab === 'privacy' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
                        {/* Switches */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-50">Quyền riêng tư</h2>
                            <div className="space-y-1 divide-y divide-slate-50">
                                {[
                                    { key: 'show_profile', label: 'Hiển thị hồ sơ', desc: 'Cho phép thành viên khác xem hồ sơ của bạn' },
                                    { key: 'show_progress', label: 'Hiển thị tiến độ học tập', desc: 'Chia sẻ tiến độ với các thành viên trong nhóm' },
                                    { key: 'allow_messages', label: 'Cho phép nhắn tin', desc: 'Thành viên khác có thể nhắn tin cho bạn' },
                                ].map((item) => (
                                    <div key={item.key} className="hover:bg-slate-50 rounded-lg px-3 -mx-3 transition-colors">
                                        <Switch
                                            label={item.label}
                                            description={item.desc}
                                            checked={privacy[item.key as keyof typeof privacy]}
                                            onCheckedChange={() => togglePrivacy(item.key)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Data & Privacy Actions */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-50">Dữ liệu & Quyền riêng tư</h2>

                            <div className="space-y-6">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="text-sm font-bold text-slate-900 mb-1">Tải xuống dữ liệu của bạn</h4>
                                    <p className="text-xs text-slate-500 mb-4">Tải xuống bản sao tất cả dữ liệu cá nhân của bạn trên hệ thống.</p>
                                    <Button variant="secondary" size="sm" className="font-bold border-slate-300 bg-white">
                                        <Download className="w-4 h-4 mr-2" />
                                        Tải xuống dữ liệu
                                    </Button>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="text-sm font-bold text-slate-900 mb-1">Chính sách bảo mật</h4>
                                    <p className="text-xs text-slate-500 mb-4">Xem cách chúng tôi thu thập và sử dụng dữ liệu của bạn.</p>
                                    <Button variant="secondary" size="sm" className="font-bold border-slate-300 bg-white">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Xem chính sách
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
