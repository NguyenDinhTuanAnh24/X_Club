"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Save,
    Layers,
    Video,
    FileText,
    Plus,
    GripVertical,
    UploadCloud,
    X,
    CheckCircle2,
    Edit3
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function CourseBuilderPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('curriculum');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('xclub_user_role');
            if (role !== 'SUPER_ADMIN') {
                router.push('/dashboard');
            }
        }
    }, [router]);

    const handleUpload = () => {
        setUploading(true);
        // Simulate upload
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setUploading(false);
                setUploadProgress(0);
                alert("Upload video thành công!");
            }
        }, 300);
    };

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="h-10 w-10 p-0 rounded-full bg-white border border-slate-200" onClick={() => router.back()}>
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </Button>
                    <div>
                        <h1 className="text-xl font-black text-slate-900">Digital Marketing Mastery 2026</h1>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Editing Course #{params.id}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="bg-white border-slate-200 font-bold">Xem trước (Preview)</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30">
                        <Save className="w-4 h-4 mr-2" />
                        Lưu thay đổi
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="flex space-x-8" aria-label="Tabs">
                    {['details', 'curriculum', 'settings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                py-4 px-1 inline-flex items-center border-b-2 font-bold text-sm uppercase tracking-wide
                                ${activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                            `}
                        >
                            {tab === 'details' && 'Thông tin cơ bản'}
                            {tab === 'curriculum' && 'Nội dung (Curriculum)'}
                            {tab === 'settings' && 'Cài đặt'}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">

                    {activeTab === 'curriculum' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[500px]">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-slate-900 text-lg">Cấu trúc khóa học</h3>
                                <Button size="sm" variant="outline" className="border-slate-200 bg-slate-50 font-bold text-slate-600">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Thêm chương mới
                                </Button>
                            </div>

                            {/* Section List */}
                            <div className="space-y-4">
                                {/* Section 1 */}
                                <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                                    <div className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <GripVertical className="w-4 h-4 text-slate-400 cursor-move" />
                                            <span className="font-bold text-slate-700 text-sm">Chương 1: Tổng quan về Digital Marketing</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-slate-200">
                                                <Edit3 className="w-3 h-3 text-slate-500" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-slate-200 text-red-500">
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        {/* Lesson 1 */}
                                        <div className="flex items-center justify-between p-2 hover:bg-white rounded-lg group transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                                                    <Video className="w-3 h-3" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">Bài 1: Mindset đúng về Marketing</span>
                                            </div>
                                            <span className="text-xs text-slate-400 group-hover:text-blue-600 font-medium">12:30</span>
                                        </div>
                                        {/* Lesson 2 */}
                                        <div className="flex items-center justify-between p-2 hover:bg-white rounded-lg group transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded bg-orange-100 text-orange-600 flex items-center justify-center">
                                                    <FileText className="w-3 h-3" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">Tài liệu: Slide bài giảng</span>
                                            </div>
                                            <span className="text-xs text-slate-400 group-hover:text-blue-600 font-medium">PDF</span>
                                        </div>
                                    </div>
                                    <div className="p-2 border-t border-slate-200">
                                        <Button variant="ghost" className="w-full text-xs font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-8">
                                            <Plus className="w-3 h-3 mr-1.5" /> Thêm bài học
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'details' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Tên khóa học</label>
                                <Input defaultValue="Digital Marketing Mastery 2026" className="font-bold text-slate-900" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Mô tả ngắn</label>
                                <textarea className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-600 min-h-[100px]" defaultValue="Khóa học toàn diện từ A-Z..." />
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar: Upload & Settings */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <UploadCloud className="w-5 h-5 text-blue-600" />
                            Upload Video / Tài liệu
                        </h3>

                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer" onClick={handleUpload}>
                            {uploading ? (
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto"></div>
                                    <p className="text-sm font-bold text-slate-600">Đang tải lên... {uploadProgress}%</p>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <UploadCloud className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700">Kéo thả file vào đây</p>
                                    <p className="text-xs text-slate-400 mt-1">hoặc click để chọn file từ máy tính</p>
                                    <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-wide">Hỗ trợ MP4, MOV, PDF</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-900 mb-4">Cấu hình xuất bản</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-600">Trạng thái</span>
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold uppercase">Published</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-600">Quyền truy cập</span>
                                <span className="text-sm font-bold text-slate-900">Public</span>
                            </div>
                            <Button className="w-full mt-2 font-bold bg-slate-900 text-white hover:bg-slate-800">
                                Thay đổi trạng thái
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
