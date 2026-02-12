"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    DollarSign,
    TrendingUp,
    CreditCard,
    Download,
    Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function FinancePage() {
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('xclub_user_role') !== 'SUPER_ADMIN') {
            router.push('/dashboard');
        }
    }, [router]);

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-1 flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-emerald-600" />
                        Doanh thu & Tài chính
                    </h1>
                    <p className="text-slate-500 font-medium">Báo cáo doanh thu, lịch sử giao dịch và đối soát.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-slate-200">
                        <Calendar className="w-4 h-4 mr-2" />
                        Tháng này
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/30">
                        <Download className="w-4 h-4 mr-2" />
                        Xuất báo cáo
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tổng doanh thu</p>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">45,200,000 đ</h3>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +12.5% so với tháng trước
                    </span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Giao dịch thành công</p>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">128</h3>
                    <span className="text-xs font-bold text-blue-600">Đơn hàng mới</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hoa hồng Affiliate</p>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">5,400,000 đ</h3>
                    <span className="text-xs font-bold text-orange-600">Chờ thanh toán</span>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Giao dịch gần đây</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Mã đơn</th>
                                <th className="px-6 py-4">Khách hàng</th>
                                <th className="px-6 py-4">Sản phẩm</th>
                                <th className="px-6 py-4">Ngày</th>
                                <th className="px-6 py-4 text-right">Số tiền</th>
                                <th className="px-6 py-4 text-right">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-mono text-slate-500">#ORD-00{i}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">Nguyễn Văn Khách {i}</td>
                                    <td className="px-6 py-4 text-slate-600">Gói Membership Gold</td>
                                    <td className="px-6 py-4 text-slate-500">12/02/2026</td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">2,000,000 đ</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Hoàn tất</span>
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
