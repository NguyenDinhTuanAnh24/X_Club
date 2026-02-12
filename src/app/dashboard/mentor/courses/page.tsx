"use client";

import React, { useState } from 'react';
import {
    BookOpen,
    MoreVertical,
    Plus,
    Search,
    Users,
    Clock,
    Star,
    Edit,
    Trash2,
    BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Input } from '@/components/ui/Input';

export default function CourseManagementPage() {
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: "Marketing Strategy Fundamentals",
            students: 1250,
            duration: "12h 30m",
            rating: 4.8,
            modules: 8,
            status: "Published",
            thumbnail: "bg-blue-500"
        },
        {
            id: 2,
            title: "Advanced Sales Techniques",
            students: 850,
            duration: "8h 45m",
            rating: 4.9,
            modules: 6,
            status: "Draft",
            thumbnail: "bg-emerald-500"
        },
        {
            id: 3,
            title: "Leadership & Team Management",
            students: 540,
            duration: "15h 00m",
            rating: 4.7,
            modules: 10,
            status: "Published",
            thumbnail: "bg-purple-500"
        }
    ]);

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <DashboardHeader
                title="Quản lý khóa học"
                description="Quản lý và cập nhật nội dung các khóa học của bạn"
            />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm khóa học..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                    />
                </div>
                <select className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white text-slate-700">
                    <option value="all">Tất cả trạng thái</option>
                    <option value="published">Đang hoạt động</option>
                    <option value="draft">Bản nháp</option>
                </select>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2 whitespace-nowrap">
                    <Plus className="w-5 h-5" />
                    Tạo khóa học mới
                </Button>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                        {/* Thumbnail */}
                        <div className={`h-48 w-full ${course.thumbnail} relative`}>
                            <div className="absolute top-4 right-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${course.status === 'Published'
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-slate-500 text-white'
                                    }`}>
                                    {course.status === 'Published' ? 'Đang hoạt động' : 'Bản nháp'}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                                {course.title}
                            </h3>

                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {course.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    {course.modules} chương
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 text-slate-700 font-bold text-sm">
                                        <Users className="w-4 h-4 text-slate-400" />
                                        {course.students.toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                        <Star className="w-4 h-4 fill-current" />
                                        {course.rating}
                                    </div>
                                </div>

                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Actions Overlay (on Hover) */}
                            <div className="mt-4 flex gap-2">
                                <Button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm h-10">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Chỉnh sửa
                                </Button>
                                <Button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-sm h-10">
                                    <BarChart className="w-4 h-4 mr-2" />
                                    Thống kê
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create New Card */}
                <button className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center h-[400px] group cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-slate-200 group-hover:bg-blue-200 flex items-center justify-center mb-4 transition-colors">
                        <Plus className="w-8 h-8 text-slate-500 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <span className="font-bold text-slate-500 group-hover:text-blue-600 transition-colors">Tạo khóa học mới</span>
                </button>
            </div>
        </div>
    );
}
