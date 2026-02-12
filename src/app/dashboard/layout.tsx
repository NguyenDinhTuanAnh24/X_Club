
import React from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex">
            {/* Sidebar */}
            <AppSidebar />

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 min-h-screen transition-all duration-300">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
