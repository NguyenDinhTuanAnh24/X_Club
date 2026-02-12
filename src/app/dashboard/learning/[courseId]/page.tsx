"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Clock,
    BookOpen,
    Star,
    User,
    CheckCircle,
    PlayCircle,
    ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock Data
const COURSES = [
    { id: "marketing-strategy", title: "Marketing Strategy", category: "Marketing", desc: "Xây dựng chiến lược marketing toàn diện từ con số 0.", rating: 4.8, students: 1200, duration: "4h 30m", lessons: 12, instructor: "Nguyễn Văn Mentor" },
    { id: "sales-mastery", title: "Sales Mastery", category: "Sales", desc: "Kỹ năng chốt sale đỉnh cao cho B2B.", rating: 4.9, students: 850, duration: "6h 15m", lessons: 18, instructor: "Trần Sales" },
];

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;

    // Fallback/Mock course finding
    const course = COURSES.find(c => c.id === courseId) || {
        id: courseId,
        title: "Chi tiết khóa học",
        category: "General",
        desc: "Thông tin chi tiết về khóa học này đang được cập nhật.",
        rating: 5.0,
        students: 0,
        duration: "Unknown",
        lessons: 0,
        instructor: "Unknown"
    };

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Back Button */}
            <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-blue-600 gap-2" onClick={() => router.back()}>
                <ArrowLeft className="w-5 h-5" />
                Quay lại danh sách
            </Button>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <BookOpen className="w-32 h-32 text-white" />
                    </div>
                </div>
                <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 space-y-6">
                            <div>
                                <span className="text-blue-600 font-bold uppercase tracking-wide text-xs mb-2 block">{course.category}</span>
                                <h1 className="text-3xl font-black text-slate-900 mb-2">{course.title}</h1>
                                <p className="text-slate-500 text-lg leading-relaxed">{course.desc}</p>
                            </div>

                            <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-slate-400" />
                                    {course.duration}
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-slate-400" />
                                    {course.lessons} bài học
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    {course.rating} ({course.students} học viên)
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-slate-400" />
                                    {course.instructor}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <h3 className="font-bold text-lg mb-4">Nội dung khóa học</h3>
                                <div className="space-y-3">
                                    {[1, 2, 3, 4, 5].map((lesson) => (
                                        <div key={lesson} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-blue-50 cursor-pointer group transition-colors border border-slate-100 hover:border-blue-100">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-500 shadow-sm font-bold text-xs group-hover:text-blue-600 group-hover:bg-blue-100">
                                                    {lesson}
                                                </div>
                                                <div className="font-medium text-slate-700 group-hover:text-blue-700">Bài học số {lesson}: Giới thiệu tổng quan</div>
                                            </div>
                                            <PlayCircle className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Action */}
                        <div className="w-full md:w-80 space-y-6">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-6">
                                <div className="mb-6">
                                    <span className="text-sm text-slate-500 line-through">2.000.000 VND</span>
                                    <div className="text-3xl font-black text-blue-600">Miễn phí</div>
                                    <p className="text-xs text-orange-500 font-bold mt-1">Dành riêng cho thành viên X-Club</p>
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-lg shadow-blue-500/30 text-base mb-3">
                                    Bắt đầu học ngay
                                </Button>
                                <p className="text-center text-xs text-slate-500">Truy cập trọn đời • Cập nhật liên tục</p>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Chứng chỉ hoàn thành</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Tài liệu đính kèm</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Hỗ trợ từ Mentor</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
