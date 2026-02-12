"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    DollarSign,
    Users,
    MousePointer,
    TrendingUp,
    ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AffiliateDashboardPage() {
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('xclub_user_role');
            if (role !== 'AFFILIATE' && role !== 'SUPER_ADMIN') {
                router.push('/dashboard');
            }
        }
    }, [router]);

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-1">Affiliate Dashboard</h1>
                    <p className="text-slate-500 font-medium">Theo dõi hiệu quả chiến dịch và hoa hồng của bạn.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Rút tiền
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tổng Click</p>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">1,245</h3>
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                        <MousePointer className="w-3 h-3" /> +15% tuần này
                    </span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Đăng ký mới</p>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">85</h3>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Tỷ lệ chuyển đổi 6.8%
                    </span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hoa hồng chờ duyệt</p>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">5,400k</h3>
                    <span className="text-xs font-bold text-orange-600">Pending</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                    <p className="text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">Số dư khả dụng</p>
                    <h3 className="text-3xl font-black text-white mb-1">2,100k</h3>
                    <span className="text-xs font-bold text-blue-100 opacity-80">Sẵn sàng rút</span>
                </div>
            </div>

            {/* Recent Conversions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Chuyển đổi gần đây</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Khách hàng</th>
                                <th className="px-6 py-4">Nguồn</th>
                                <th className="px-6 py-4">Sản phẩm</th>
                                <th className="px-6 py-4">Giá trị đơn</th>
                                <th className="px-6 py-4 text-right">Hoa hồng (20%)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-bold text-slate-700">User_{1000 + i}***</td>
                                    <td className="px-6 py-4 text-slate-500">Facebook Ads</td>
                                    <td className="px-6 py-4 text-slate-600">Combo Marketing Pro</td>
                                    <td className="px-6 py-4 font-medium">2,000,000 đ</td>
                                    <td className="px-6 py-4 text-right font-bold text-emerald-600">+400,000 đ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
