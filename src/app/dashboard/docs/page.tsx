
"use client";

import React from 'react';
import { FolderOpen, FileText, Download, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function DocsPage() {
    const today = new Date();

    const getPastDate = (daysAgo: number) => {
        const d = new Date();
        d.setDate(today.getDate() - daysAgo);
        return new Intl.DateTimeFormat('vi-VN').format(d);
    };

    const documents = [
        { id: 1, title: "Quy trình vận hành chuẩn (SOP)", category: "Vận hành", size: "2.4 MB", date: getPastDate(2), type: "pdf", color: "red" },
        { id: 2, title: "Mẫu báo cáo tài chính Quý", category: "Tài chính", size: "1.1 MB", date: getPastDate(5), type: "xls", color: "green" },
        { id: 3, title: "Slide đào tạo Lãnh đạo cấp trung", category: "Nhân sự", size: "15.0 MB", date: getPastDate(10), type: "ppt", color: "orange" },
        { id: 4, title: "Chiến lược Marketing 0 đồng", category: "Marketing", size: "5.6 MB", date: getPastDate(14), type: "pdf", color: "red" },
        { id: 5, title: "Biên bản họp nhóm Tuần 40", category: "Biên bản", size: "500 KB", date: getPastDate(20), type: "doc", color: "blue" },
        { id: 6, title: "Checklist Tuyển dụng nhân sự", category: "Nhân sự", size: "800 KB", date: getPastDate(25), type: "pdf", color: "red" },
    ];

    const getColorClasses = (color: string) => {
        switch (color) {
            case 'red': return 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white';
            case 'green': return 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white';
            case 'orange': return 'bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white';
            case 'blue': return 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white';
            default: return 'bg-slate-100 text-slate-600 group-hover:bg-slate-600 group-hover:text-white';
        }
    };

    return (
        <div className="p-6 lg:p-10 space-y-8 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Kho tài liệu</h1>
                    <p className="text-slate-600 font-medium">Truy cập tài nguyên độc quyền dành cho thành viên</p>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm tài liệu..."
                        className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                    />
                </div>
                <Button variant="outline" className="h-12 border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 font-semibold">
                    <Filter className="w-4 h-4 mr-2" /> Lọc
                </Button>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <div key={doc.id} className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-200 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[200px]">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all shadow-md ${getColorClasses(doc.color)}`}>
                                    <FileText className="w-7 h-7" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                                    {doc.type}
                                </span>
                            </div>
                            <h3 className="font-bold text-slate-900 line-clamp-2 leading-snug mb-2 text-lg group-hover:text-blue-600 transition-colors">
                                {doc.title}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium">{doc.category} • {doc.date}</p>
                        </div>

                        <div className="flex items-center justify-between pt-5 border-t-2 border-slate-100 mt-4">
                            <span className="text-sm font-bold text-slate-600">{doc.size}</span>
                            <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-md">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
