"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    BookOpen,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function CreateCoursePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('xclub_user_role');
            if (role !== 'SUPER_ADMIN' && role !== 'CONTENT_EDITOR') {
                router.push('/dashboard');
            }
        }
    }, [router]);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            // Redirect to builder with new ID (mocking ID 123)
            router.push('/dashboard/admin/courses/123');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-slate-900">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-8 animate-in zoom-in-95 duration-300">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-sm border-4 border-white">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">Tạo khóa học mới</h1>
                    <p className="text-slate-500 font-medium">Bắt đầu xây dựng nội dung đào tạo chất lượng.</p>
                </div>

                <form onSubmit={handleCreate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên khóa học</label>
                        <Input
                            placeholder="VD: Master SEO 2026..."
                            className="bg-slate-50 font-bold text-slate-900 border-slate-200 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Danh mục</label>
                        <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="marketing">Marketing</option>
                            <option value="sales">Sales & Business</option>
                            <option value="tech">Technology</option>
                            <option value="design">Design</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            className="flex-1 font-bold text-slate-500 hover:bg-slate-50"
                            onClick={() => router.back()}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    Tiếp tục <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
