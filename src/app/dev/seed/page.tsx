"use client";

import { useState } from "react";
import { Database, CheckCircle, AlertTriangle } from "lucide-react";

export default function DevSeedPage() {
    const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [msg, setMsg] = useState("");

    const runSeed = async () => {
        setStatus('LOADING');
        try {
            const res = await fetch('/api/seed', { method: 'POST' });
            const json = await res.json();

            if (res.ok) {
                setStatus('SUCCESS');
                setMsg(json.message);
            } else {
                setStatus('ERROR');
                setMsg(json.error || "Unknown error");
            }
        } catch (e: any) {
            setStatus('ERROR');
            setMsg(e.message);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
                <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <Database className="w-8 h-8 text-slate-600" />
                </div>

                <h1 className="text-2xl font-bold text-slate-800 mb-2">Developer Tools</h1>
                <p className="text-slate-500 mb-8">Reset Database & Seed Demo Data</p>

                {status === 'IDLE' && (
                    <button
                        onClick={runSeed}
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-lg transition-all"
                    >
                        RUN SEED NOW
                    </button>
                )}

                {status === 'LOADING' && (
                    <div className="animate-pulse text-slate-500 font-medium">Processing... Please wait...</div>
                )}

                {status === 'SUCCESS' && (
                    <div className="text-green-600 space-y-4">
                        <CheckCircle className="w-12 h-12 mx-auto" />
                        <p className="font-bold">{msg}</p>
                        <a href="/dashboard" className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold">
                            Go to Dashboard
                        </a>
                    </div>
                )}

                {status === 'ERROR' && (
                    <div className="text-red-600 space-y-4">
                        <AlertTriangle className="w-12 h-12 mx-auto" />
                        <p className="font-bold">Error: {msg}</p>
                        <button onClick={() => setStatus('IDLE')} className="text-slate-500 underline text-sm">Try again</button>
                    </div>
                )}
            </div>
        </div>
    );
}
