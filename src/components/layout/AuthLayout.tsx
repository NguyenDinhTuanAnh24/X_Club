
import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex w-full bg-white">
            {/* Left Side - Brand Panel */}
            <div className="hidden lg:flex w-5/12 bg-gradient-to-br from-blue-600 to-blue-500 relative overflow-hidden flex-col justify-center items-center text-white p-8 lg:p-12">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-300/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-md w-full">
                    {/* Logo */}
                    <Link href="/" className="inline-flex flex-col items-center mb-12">
                        <h1 className="text-6xl font-black tracking-tight leading-none mb-4">
                            x <span className="opacity-90">CLUB</span>
                        </h1>
                        <p className="text-xl font-bold tracking-wide opacity-90">
                            Nền tảng dành cho Doanh chủ
                        </p>
                    </Link>

                    {/* Features List */}
                    <div className="space-y-6 text-lg">
                        {[
                            "Đào tạo online chất lượng cao",
                            "Nhóm học 16 người cố định",
                            "Mentor kèm cặp chuyên nghiệp",
                            "Lịch họp cố định hàng tuần",
                            "Theo dõi tiến độ chi tiết"
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-medium opacity-90">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Copyright */}
                <div className="absolute bottom-8 text-white/50 text-sm font-medium">
                    © 2024 xCLUB. All rights reserved.
                </div>
            </div>

            {/* Right Side - Form Panel */}
            <div className="w-full lg:w-7/12 flex flex-col overflow-y-auto h-screen bg-white">
                <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20 xl:px-24 max-w-2xl mx-auto w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
