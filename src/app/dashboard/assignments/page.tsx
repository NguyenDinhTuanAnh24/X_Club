
"use client";

import React, { useState } from 'react';
import {
    FileText,
    Calendar,
    Clock,
    Award,
    Info,
    Upload,
    Trash2,
    Paperclip,
    PenTool,
    Save
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AssignmentsPage() {
    const [files, setFiles] = useState([
        { name: "Marketing-Analysis.pdf", size: "2.5 MB", time: "Đã tải lên 2 phút trước", type: "pdf" },
        { name: "Strategy-Presentation.pptx", size: "4.8 MB", time: "Đã tải lên 5 phút trước", type: "ppt" }
    ]);

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Breadcrumb & Header */}
            <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Bài tập & Biên bản</p>
                <h1 className="text-3xl font-black text-slate-900">Nộp bài</h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200">
                <button className="flex items-center gap-2 px-6 py-4 border-b-2 border-blue-600 text-blue-600 font-bold text-sm bg-blue-50/50">
                    <PenTool className="w-4 h-4" />
                    Nộp bài mới
                </button>
                <button className="flex items-center gap-2 px-6 py-4 text-slate-500 font-medium text-sm hover:text-slate-900 transition-colors">
                    <FileText className="w-4 h-4" />
                    Biên bản họp
                </button>
                <button className="flex items-center gap-2 px-6 py-4 text-slate-500 font-medium text-sm hover:text-slate-900 transition-colors">
                    <Award className="w-4 h-4" />
                    Bài tập đã nộp
                </button>
            </div>

            {/* Assignment Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-6 h-6 text-blue-200" />
                        <h2 className="text-2xl font-bold">Bài tập tuần 8: Phân tích Case Study</h2>
                    </div>
                    <p className="text-blue-100 mb-8 max-w-2xl text-sm font-medium">
                        Phân tích và đưa ra giải pháp Marketing cho Startup công nghệ
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] text-blue-200 uppercase font-bold tracking-wide">Hạn nộp</p>
                                <p className="font-bold text-sm">20/02/2026</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] text-blue-200 uppercase font-bold tracking-wide">Thời gian còn lại</p>
                                <p className="font-bold text-sm">5 ngày</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Award className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] text-blue-200 uppercase font-bold tracking-wide">Điểm tối đa</p>
                                <p className="font-bold text-sm">10 điểm</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Requirements Alert */}
            <div className="flex items-start gap-4 p-5 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-900 shadow-sm">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                    <span className="font-bold">Yêu cầu:</span> Bài tập cần phân tích chi tiết về chiến lược Marketing, bao gồm phân tích SWOT, đề xuất giải pháp cụ thể và timeline thực hiện. Độ dài tối thiểu 1500 từ, kèm theo slides thuyết trình (nếu có).
                </p>
            </div>

            {/* Submission Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Nộp bài tập</h3>

                <div className="space-y-8">
                    {/* Title Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700">
                            Tiêu đề bài làm <span className="text-red-500">*</span>
                        </label>
                        <Input
                            placeholder="Ví dụ: Chiến lược Marketing cho Startup X"
                            className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                        />
                    </div>

                    {/* Content Textarea */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700">
                            Nội dung bài làm <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-slate-400 font-medium">Trình bày phân tích và giải pháp của bạn một cách chi tiết</p>
                        <textarea
                            className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[200px] text-sm text-slate-900 resize-none font-medium bg-slate-50 focus:bg-white transition-colors"
                            placeholder="Nhập nội dung bài làm của bạn..."
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700">
                            Đính kèm file (không bắt buộc)
                        </label>
                        <p className="text-xs text-slate-400 font-medium -mt-2">Hỗ trợ: PDF, DOCX, PPTX, Excel (tối đa 10MB)</p>

                        <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-blue-50/30 hover:bg-blue-50 transition-colors cursor-pointer group">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-blue-100 group-hover:scale-110 transition-transform">
                                <Paperclip className="w-5 h-5 text-blue-500" />
                            </div>
                            <p className="text-sm font-bold text-slate-700 mb-1">Kéo thả file vào đây hoặc <span className="text-blue-600">click để chọn</span></p>
                            <p className="text-xs text-slate-400">Tối đa 3 file, mỗi file không quá 10MB</p>
                        </div>

                        {/* Uploaded Files List */}
                        <div className="space-y-3">
                            {files.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                                            {file.type === 'pdf' ? (
                                                <FileText className="w-5 h-5 text-red-500" />
                                            ) : (
                                                <FileText className="w-5 h-5 text-orange-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{file.name}</p>
                                            <p className="text-xs text-slate-500">{file.size} • {file.time}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mentor Note */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700">
                            Ghi chú cho Mentor (không bắt buộc)
                        </label>
                        <textarea
                            className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] text-sm text-slate-900 resize-none font-medium bg-slate-50 focus:bg-white transition-colors"
                            placeholder="Chia sẻ những khó khăn hoặc điểm bạn muốn nhận feedback..."
                        ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
                        <Button variant="secondary" className="font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border-none">
                            <Save className="w-4 h-4 mr-2" />
                            Lưu nháp
                        </Button>
                        <Button variant="brand" className="px-8 font-bold">
                            <Upload className="w-4 h-4 mr-2" />
                            Nộp bài
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
