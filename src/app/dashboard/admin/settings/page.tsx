"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Server,
    Save,
    CreditCard,
    Mail,
    Database
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SystemSettingsPage() {
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('xclub_user_role') !== 'SUPER_ADMIN') {
            router.push('/dashboard');
        }
    }, [router]);

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-black text-slate-900 mb-1 flex items-center gap-2">
                    <Server className="w-6 h-6 text-slate-700" />
                    System Configuration
                </h1>
                <p className="text-slate-500 font-medium">Manage backend settings, API keys, and third-party integrations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Payment Gateway */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-slate-900">Payment Gateways</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Stripe API Key (Publishable)</label>
                            <Input type="password" value="pk_test_51Mz..." />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Stripe Secret Key</label>
                            <Input type="password" value="sk_test_51Mz..." />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" checked readOnly />
                            <span className="text-sm font-medium text-slate-600">Enable PayPal integration</span>
                        </div>
                    </div>
                </div>

                {/* 2. SMTP / Email */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <Mail className="w-5 h-5 text-orange-600" />
                        <h3 className="font-bold text-slate-900">Email Configuration (SMTP)</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">SMTP Host</label>
                            <Input value="smtp.sendgrid.net" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Port</label>
                                <Input value="587" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Secure</label>
                                <select className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium">
                                    <option>TLS</option>
                                    <option>SSL</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Database & Backup */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <Database className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-bold text-slate-900">Backup & Storage</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-emerald-800">Last Successful Backup</p>
                                <p className="text-xs text-emerald-600">Today at 04:00 AM</p>
                            </div>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">Download</Button>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Retention Policy</label>
                            <select className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium">
                                <option>Keep last 30 days</option>
                                <option>Keep last 3 months</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-200">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 shadow-lg">
                    <Save className="w-4 h-4 mr-2" />
                    Save Configuration
                </Button>
            </div>
        </div>
    );
}
