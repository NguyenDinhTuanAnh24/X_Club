"use client";

import React, { useState } from 'react';
import {
    UploadCloud,
    FileVideo,
    Folder,
    CheckCircle2,
    AlertCircle,
    X,
    Film
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default function UploadVideoPage() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) return;
        setUploading(true);
        // Simulate upload
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setUploading(false);
                alert("Upload thành công!");
                setFile(null);
                setProgress(0);
            }
        }, 100);
    };

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <DashboardHeader
                title="Upload Video Bài Giảng"
                description="Tải lên video mới cho các khóa học của bạn"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Upload Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* File Drop Zone */}
                    <div
                        className={`relative border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-white
                            ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}
                        `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept="video/*"
                            onChange={handleChange}
                        />

                        {!file ? (
                            <>
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                                    <UploadCloud className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Kéo thả video vào đây</h3>
                                <p className="text-slate-500 font-medium mb-6">hoặc nhấn để chọn file từ máy tính</p>
                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Hỗ trợ MP4, MOV, AVI • Tối đa 2GB</p>
                            </>
                        ) : (
                            <div className="w-full">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6 text-left">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                        <FileVideo className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-bold text-slate-900 truncate">{file.name}</p>
                                        <p className="text-sm text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                        className="p-2 hover:bg-slate-200 rounded-full text-slate-500"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {uploading && (
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm font-bold text-slate-700">
                                            <span>Đang tải lên...</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Metadata Form */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-4">Thông tin bài giảng</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Tiêu đề video</label>
                                <Input placeholder="Nhập tiêu đề video..." />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Chọn khóa học</label>
                                    <select className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white font-medium text-slate-700">
                                        <option value="">-- Chọn khóa học --</option>
                                        <option value="1">Marketing Strategy Fundamentals</option>
                                        <option value="2">Advanced Sales Techniques</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Chọn chương / Module</label>
                                    <select className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white font-medium text-slate-700">
                                        <option value="">-- Chọn chương --</option>
                                        <option value="1">Module 1: Giới thiệu</option>
                                        <option value="2">Module 2: Phân tích thị trường</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Mô tả ngắn</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium h-32 resize-none"
                                    placeholder="Mô tả nội dung bài học..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                            <Button variant="ghost" className="font-bold text-slate-500 hover:bg-slate-100">Hủy bỏ</Button>
                            <Button
                                onClick={handleUpload}
                                disabled={!file || uploading}
                                className={`font-bold px-8 shadow-lg shadow-blue-500/30 transition-all ${!file || uploading ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none' : 'bg-blue-600 hover:bg-blue-700 text-white hover:-translate-y-1'}`}
                            >
                                {uploading ? 'Đang xử lý...' : 'Đăng video ngay'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right: Guidelines */}
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-4">
                            <AlertCircle className="w-5 h-5 text-blue-600" />
                            Lưu ý quan trọng
                        </h3>
                        <ul className="space-y-3">
                            {[
                                "Video nên có độ phân giải tối thiểu 1080p (FullScreen HD).",
                                "Tỷ lệ khung hình chuẩn 16:9.",
                                "Âm thanh rõ ràng, không có tiếng ồn background.",
                                "Thời lượng tối đa mỗi video là 60 phút để đảm bảo trải nghiệm học tập."
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm font-medium text-blue-700/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Film className="w-5 h-5 text-slate-500" />
                            Video đã tải lên gần đây
                        </h3>
                        <div className="space-y-4">
                            {[
                                { title: "Lecture 1.1: Why Marketing Matters", status: "Success", date: "2 giờ trước" },
                                { title: "Lecture 2.3: Target Audience Analysis", status: "Processing", date: "5 giờ trước" },
                                { title: "Lecture 1.2: The Marketing Funnel", status: "Success", date: "1 ngày trước" },
                            ].map((video, idx) => (
                                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                        <FileVideo className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 line-clamp-1">{video.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${video.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                {video.status}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-semibold">{video.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
