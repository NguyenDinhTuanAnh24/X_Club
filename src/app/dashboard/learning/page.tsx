
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search,
    BookOpen,
    Clock,
    Star,
    MoreHorizontal,
    Briefcase,
    TrendingUp,
    Users,
    DollarSign,
    PenTool,
    Layout
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Mock Data for Courses
const COURSES = [
    {
        id: 1,
        title: "Marketing Strategy Masterclass",
        category: "Marketing",
        desc: "Học cách xây dựng chiến lược marketing hiệu quả cho doanh nghiệp của bạn",
        duration: "8 giờ",
        lessons: 24,
        rating: 4.8,
        imageGradient: "from-indigo-500 to-purple-600",
        icon: Layout,
        badge: "Mới",
        badgeColor: "bg-emerald-500",
        progress: 0,
        status: "new"
    },
    {
        id: 2,
        title: "Sales Mastery: Từ Zero đến Hero",
        category: "Sales",
        desc: "Nắm vững nghệ thuật bán hàng và xây dựng pipeline bền vững",
        duration: "10 giờ",
        lessons: 30,
        rating: 4.9,
        imageGradient: "from-rose-400 to-red-500",
        icon: Briefcase,
        badge: "Phổ biến",
        badgeColor: "bg-amber-400 text-slate-900",
        progress: 60,
        status: "in-progress"
    },
    {
        id: 3,
        title: "Leadership Essentials",
        category: "Leadership",
        desc: "Phát triển kỹ năng lãnh đạo và quản lý đội nhóm hiệu quả",
        duration: "6 giờ",
        lessons: 18,
        rating: 4.7,
        imageGradient: "from-sky-400 to-blue-500",
        icon: Users,
        progress: 90,
        status: "in-progress"
    },
    {
        id: 4,
        title: "Business Finance 101",
        category: "Finance",
        desc: "Hiểu rõ tài chính doanh nghiệp và quản lý dòng tiền thông minh",
        duration: "12 giờ",
        lessons: 36,
        rating: 4.6,
        imageGradient: "from-emerald-400 to-teal-500",
        icon: DollarSign,
        status: "in-progress",
        progress: 45
    },
    {
        id: 5,
        title: "Content Marketing Fundamentals",
        category: "Marketing",
        desc: "Tạo nội dung hấp dẫn và xây dựng thương hiệu cá nhân",
        duration: "7 giờ",
        lessons: 21,
        rating: 4.8,
        imageGradient: "from-orange-400 to-pink-500",
        icon: PenTool,
        badge: "Mới",
        badgeColor: "bg-emerald-500",
        status: "new",
        progress: 0
    },
    {
        id: 6,
        title: "Nghệ thuật đàm phán",
        category: "Sales",
        desc: "Thành thạo kỹ năng đàm phán trong kinh doanh và cuộc sống",
        duration: "5 giờ",
        lessons: 15,
        rating: 4.9,
        imageGradient: "from-cyan-500 to-blue-600",
        icon: Users,
        status: "completed",
        progress: 100
    }
];

const FILTERS = ["Tất cả", "Marketing", "Sales", "Leadership", "Finance"];
const TABS = [
    { id: 'all', label: 'Tất cả khóa học' },
    { id: 'learning', label: 'Đang học (3)' },
    { id: 'completed', label: 'Đã hoàn thành (12)' }
];

export default function LearningPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("Tất cả");
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter Logic
    const filteredCourses = COURSES.filter(course => {
        const matchesFilter = activeFilter === "Tất cả" || course.category === activeFilter;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "all" ||
            (activeTab === "learning" && course.progress > 0 && course.progress < 100) ||
            (activeTab === "completed" && course.progress === 100); // Simplified logic for demo

        // Adjust logic to match visual requirement if needed, 
        // but broadly filter based on these criteria.
        // For the purpose of the visual demo, we'll mostly rely on category filter.
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h1 className="text-2xl font-black text-slate-900 mb-1">Khóa học</h1>
                <p className="text-slate-500 font-medium">Khám phá và học hỏi từ các khóa học chất lượng cao</p>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học..."
                            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 font-bold">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`
                                    px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-colors border
                                    ${activeFilter === filter
                                        ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}
                                `}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-8 mt-6 border-b border-slate-100">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                pb-3 text-sm font-bold border-b-2 transition-colors
                                ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-200'}
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        onClick={() => router.push(`/dashboard/learning/${course.id}`)}
                        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full cursor-pointer"
                    >
                        {/* Course Header / Image */}
                        <div className={`h-32 bg-gradient-to-br ${course.imageGradient} p-4 relative flex items-center justify-center`}>
                            {course.badge && (
                                <span className={`absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase text-white shadow-sm ${course.badgeColor}`}>
                                    {course.badge}
                                </span>
                            )}
                            <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center shadow-inner">
                                {React.createElement(course.icon, { className: "w-6 h-6 text-white" })}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                            <div className="mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1 block">
                                    {course.category}
                                </span>
                                <h3 className="font-bold text-slate-900 text-base line-clamp-2 min-h-[48px] group-hover:text-blue-600 transition-colors">
                                    {course.title}
                                </h3>
                            </div>

                            <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-1">
                                {course.desc}
                            </p>

                            {/* Progress or Status */}
                            {course.progress > 0 && (
                                <div className="mb-4">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1">
                                        <span>Đang học</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full"
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Footer Stats */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-xs text-slate-500 font-medium">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {course.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="w-3 h-3" /> {course.lessons} bài học
                                    </span>
                                </div>
                                <span className="flex items-center gap-1 text-amber-500 font-bold">
                                    <Star className="w-3 h-3 fill-current" /> {course.rating}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
