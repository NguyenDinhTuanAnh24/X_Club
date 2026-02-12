"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    DollarSign,
    ArrowRightCircle,
    Calendar,
    Clock,
    CheckCircle,
    Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AffiliateCommissionsPage() {
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
            <div>
                <h1 className="text-2xl font-black text-slate-900 mb-1 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                    Hoa hồng & Thanh toán
                </h1>
                <p className="text-slate-500 font-medium">Chi tiết thu nhập và lịch sử thanh toán của bạn.</p>
            </div>

            {/* Balances */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Số dư khả dụng</p>
                        <h3 className="text-4xl font-black text-emerald-600">2,100,000 đ</h3>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 shadow-lg shadow-emerald-500/30 text-sm">
                        Yêu cầu Rút tiền
                    </Button>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Chờ đối soát (Pending)</p>
                        <h3 className="text-4xl font-black text-orange-500">5,400,000 đ</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Sẽ khả dụng sau 30 ngày kể từ ngày chốt đơn.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Đã thanh toán (Lifetime)</p>
                        <h3 className="text-4xl font-black text-slate-900">18,500,000 đ</h3>
                    </div>
                    <Button variant="outline" className="w-full border-slate-200 text-slate-600 text-sm h-10">
                        <Download className="w-4 h-4 mr-2" />
                        Tải sao kê
                    </Button>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Lịch sử giao dịch</h3>
                    <div className="flex gap-2 text-xs font-bold">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 cursor-pointer">Tất cả</span>
                        <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer">Thu nhập</span>
                        <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer">Rút tiền</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Mã GD</th>
                                <th className="px-6 py-4">Ngày</th>
                                <th className="px-6 py-4">Nội dung</th>
                                <th className="px-6 py-4 text-right">Số tiền</th>
                                <th className="px-6 py-4 text-right">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            <tr className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-slate-500">#PAY-8821</td>
                                <td className="px-6 py-4 text-slate-600">10/02/2026</td>
                                <td className="px-6 py-4 font-medium text-slate-800">Rút tiền về Vietcombank ***1234</td>
                                <td className="px-6 py-4 text-right font-bold text-red-600">- 5,000,000 đ</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                                        <CheckCircle className="w-3 h-3" /> Thành công
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-slate-500">#REF-9932</td>
                                <td className="px-6 py-4 text-slate-600">08/02/2026</td>
                                <td className="px-6 py-4 font-medium text-slate-800">Hoa hồng từ đơn hàng #ORD-123</td>
                                <td className="px-6 py-4 text-right font-bold text-emerald-600">+ 400,000 đ</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                                        <Clock className="w-3 h-3" /> Chờ đối soát
                                    </span>
                                </td>
                            </tr>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-mono text-slate-500">#REF-99{i}0</td>
                                    <td className="px-6 py-4 text-slate-600">05/02/2026</td>
                                    <td className="px-6 py-4 font-medium text-slate-800">Hoa hồng từ đơn hàng #ORD-456</td>
                                    <td className="px-6 py-4 text-right font-bold text-emerald-600">+ 1,200,000 đ</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                                            <CheckCircle className="w-3 h-3" /> Khả dụng
                                        </span>
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
