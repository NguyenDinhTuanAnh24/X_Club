
"use client";

import React, { useEffect } from 'react';
import { X, Quote } from 'lucide-react';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    mentorName?: string; // Optional, usually generic
    content?: string;
}

export function FeedbackModal({ isOpen, onClose, content }: FeedbackModalProps) {

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1 bg-slate-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                    <h3 className="text-lg font-bold text-navy-900 uppercase tracking-wide">Phản hồi từ Ban cố vấn</h3>
                    <div className="flex justify-center mt-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                            {/* Abstract Mentor Icon */}
                            <Quote className="w-8 h-8 opacity-50" />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 relative">
                    {/* Decorative quote mark */}
                    <span className="absolute top-4 left-4 text-4xl text-slate-200 font-serif leading-none">“</span>

                    <p className="font-serif text-lg text-slate-700 leading-relaxed text-center px-4 italic">
                        {content || "Cách bạn tiếp cận vấn đề này rất sắc bén. Tuy nhiên, hãy chú ý hơn đến dòng tiền ngắn hạn trong chiến lược Quý 4. Kỷ luật là tốt, nhưng sự linh hoạt mới giúp doanh nghiệp sống sót qua bão."}
                    </p>

                    <span className="absolute bottom-2 right-4 text-4xl text-slate-200 font-serif leading-none rotate-180">“</span>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium hover:bg-slate-50 transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}
