"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    BookOpen,
    Plus,
    Search,
    MoreHorizontal,
    Video,
    Users,
    Edit3,
    Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function AdminCoursesPage() {
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('xclub_user_role');
            if (role !== 'SUPER_ADMIN' && role !== 'CONTENT_EDITOR') {
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
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        Quản lý khóa học (Courses)
                    </h1>
                    <p className="text-slate-500 font-medium">Tạo mới, chỉnh sửa và quản lý nội dung đào tạo.</p>
                </div>
                <Link href="/dashboard/admin/courses/create">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30">
                        <Plus className="w-4 h-4 mr-2" />
                        Tạo khóa học mới
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Tìm kiếm khóa học..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Tất cả danh mục</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                        <option>Management</option>
                    </select>
                    <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Tất cả trạng thái</option>
                        <option>Đang hoạt động</option>
                        <option>Nháp (Draft)</option>
                        <option>Đóng (Closed)</option>
                    </select>
                </div>
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Tên khóa học</th>
                                <th className="px-6 py-4">Giảng viên</th>
                                <th className="px-6 py-4 text-center">Học viên</th>
                                <th className="px-6 py-4 text-center">Bài học</th>
                                <th className="px-6 py-4 text-center">Trạng thái</th>
                                <th className="px-6 py-4 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-slate-200 flex-shrink-0 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 line-clamp-1">Digital Marketing Mastery 2026 - K{10 + i}</h4>
                                                <p className="text-xs text-slate-400">Marketing • Updated 2 days ago</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] flex items-center justify-center font-bold">TR</div>
                                            <span className="font-medium text-slate-700">Trần Mentor {i}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-slate-600">
                                        {120 + i * 15}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">
                                            <Video className="w-3 h-3" /> {32 + i}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {i === 2 ? (
                                            <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-500 border border-slate-200">Draft</span>
                                        ) : (
                                            <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">Published</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/dashboard/admin/courses/${i}`}>
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 text-blue-600">
                                                    <Edit3 className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 text-red-500">
                                                <Trash2 className="w-4 h-4" />
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
