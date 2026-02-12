"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Link as LinkIcon,
    Copy,
    Check,
    Plus,
    ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AffiliateLinksPage() {
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('xclub_user_role');
            if (role !== 'AFFILIATE' && role !== 'SUPER_ADMIN') {
                router.push('/dashboard');
            }
        }
    }, [router]);

    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const links = [
        { id: 1, name: "Trang chủ mặc định", url: "https://xclub.vn?ref=123456", clicks: 120, conversions: 5 },
        { id: 2, name: "Chiến dịch Facebook Ads - T9", url: "https://xclub.vn/course/marketing?ref=123456&utm_source=fb", clicks: 850, conversions: 42 },
        { id: 3, name: "Bài viết Blog Review", url: "https://xclub.vn/register?ref=123456&utm_medium=blog", clicks: 45, conversions: 2 },
    ];

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-1 flex items-center gap-2">
                        <LinkIcon className="w-6 h-6 text-blue-600" />
                        Link giới thiệu
                    </h1>
                    <p className="text-slate-500 font-medium">Tạo và quản lý các liên kết tiếp thị của bạn.</p>
                </div>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo Link Mới
                </Button>
            </div>

            {/* Quick Generator */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Tạo nhanh Link (Quick Generate)</h3>
                <div className="flex gap-4">
                    <Input placeholder="Dán link gốc (VD: https://xclub.vn/course/sales-mastery)" className="flex-1" />
                    <Input placeholder="Tên gợi nhớ (VD: Zalo Group)" className="w-64" />
                    <Button className="bg-blue-600 text-white font-bold h-10">Lấy Link</Button>
                </div>
            </div>

            {/* Active Links Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Danh sách Link đang hoạt động</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Tên chiến dịch</th>
                                <th className="px-6 py-4">URL giới thiệu</th>
                                <th className="px-6 py-4 text-center">Clicks</th>
                                <th className="px-6 py-4 text-center">Đăng ký</th>
                                <th className="px-6 py-4 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {links.map((link, idx) => (
                                <tr key={link.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-700">{link.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg w-max border border-slate-200 font-mono text-xs text-slate-600">
                                            {link.url}
                                            <a href={link.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-medium">{link.clicks}</td>
                                    <td className="px-6 py-4 text-center font-bold text-emerald-600">{link.conversions}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-8 text-xs gap-1.5 border-slate-200"
                                            onClick={() => copyToClipboard(link.url, idx)}
                                        >
                                            {copiedIndex === idx ? (
                                                <>
                                                    <Check className="w-3 h-3 text-emerald-600" /> Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3 h-3 text-slate-500" /> Copy
                                                </>
                                            )}
                                        </Button>
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
