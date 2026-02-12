"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Users,
    Briefcase,
    UserPlus,
    Search,
    MoreHorizontal,
    Mail
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function GroupMembersPage() {
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('xclub_user_role');
            if (role !== 'GROUP_LEADER' && role !== 'SUPER_ADMIN') {
                router.push('/dashboard');
            }
        }
    }, [router]);

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-1 flex items-center gap-2">
                        <Users className="w-6 h-6 text-blue-600" />
                        Thành viên nhóm
                    </h1>
                    <p className="text-slate-500 font-medium">Quản lý nhân viên và theo dõi tiến độ học tập (B2B).</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Thêm thành viên
                </Button>
            </div>

            {/* Overview Stats */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tổng thành viên</p>
                    <h3 className="text-3xl font-black text-slate-900">24/30</h3>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-blue-600 w-[80%]"></div>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Hoàn thành khóa học</p>
                    <h3 className="text-3xl font-black text-emerald-600">65%</h3>
                    <span className="text-xs text-slate-400 font-medium">Trung bình toàn nhóm</span>
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Gói doanh nghiệp</p>
                    <h3 className="text-xl font-black text-slate-900">Enterprise Plan</h3>
                    <span className="text-xs font-bold text-orange-600">Hết hạn: 12/2026</span>
                </div>
            </div>

            {/* Member List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input placeholder="Tìm kiếm nhân viên..." className="pl-10" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Nhân viên</th>
                                <th className="px-6 py-4">Phòng ban</th>
                                <th className="px-6 py-4">Khóa học đang học</th>
                                <th className="px-6 py-4">Tiến độ</th>
                                <th className="px-6 py-4 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 border border-white shadow-sm">
                                                NV
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">Nguyễn Văn {i}</p>
                                                <p className="text-xs text-slate-500">nv{i}@company.com</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-600">Marketing Dept</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-2 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                                            Digital Marketing Pro
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 w-48">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500 rounded-full" style={{ width: `${60 + i * 5}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-700">{60 + i * 5}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                                <Mail className="w-4 h-4 text-slate-500" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                                <MoreHorizontal className="w-4 h-4 text-slate-500" />
                                            </Button>
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
