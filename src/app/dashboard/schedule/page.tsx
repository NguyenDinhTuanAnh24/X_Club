
"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    Calendar,
    Clock,
    Video,
    Users,
    MapPin,
    Copy,
    ExternalLink,
    Info,
    CheckCircle2,
    PlayCircle,
    AlertTriangle,
    AlignLeft,
    HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function MeetingSchedulePage() {
    // State
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [goal, setGoal] = useState("");
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mock Data
    const [attendees, setAttendees] = useState([
        { name: "Nguyễn Văn A", avatar: "NA", status: "checked-in", time: "20:15" },
        { name: "Phạm Thị B", avatar: "PB", status: "checked-in", time: "20:18" },
        { name: "Lê Văn C", avatar: "LC", status: "checked-in", time: "20:20" },
        { name: "Hoàng Thị D", avatar: "HD", status: "checked-in", time: "20:22" },
        { name: "Đặng Văn E", avatar: "DE", status: "checked-in", time: "20:25" },
    ]);

    const agenda = [
        { time: "20:30 - 20:40", title: "Check-in và giới thiệu", desc: "Ổn định tổ chức, điểm danh và khởi động" },
        { time: "20:40 - 21:10", title: "Phần 1: Xây dựng quy trình bán hàng", desc: "Lý thuyết cốt lõi và các mô hình funnel quy chuẩn" },
        { time: "21:10 - 21:40", title: "Phần 2: Case study thực tế", desc: "Phân tích mô hình thành công của Top Doanh nghiệp" },
        { time: "21:40 - 21:55", title: "Thảo luận nhóm và Q&A", desc: "Giải đáp thắc mắc và bài tập tình huống" },
        { time: "21:55 - 22:00", title: "Tổng kết và bài tập về nhà", desc: "Giao nhiệm vụ tuần tiếp theo" },
    ];

    const handleCheckIn = () => {
        if (!goal.trim()) {
            setShowErrorModal(true);
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsCheckedIn(true);
            setAttendees(prev => [
                ...prev,
                { name: "Bạn", avatar: "ME", status: "checked-in", time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }
            ]);
            setLoading(false);
            setShowSuccessModal(true);
        }, 800);
    };

    const handleJoin = () => {
        if (!isCheckedIn) {
            setShowWarningModal(true);
            return;
        }
        window.open("https://meet.google.com/abc-defg-hijkl", "_blank");
    };

    const confirmJoin = () => {
        setShowWarningModal(false);
        window.open("https://meet.google.com/abc-defg-hijkl", "_blank");
    };


    const handleCopy = () => {
        navigator.clipboard.writeText("https://meet.google.com/abc-defg-hijkl");
        alert("Đã sao chép đường dẫn buổi họp!");
    };

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Breadcrumb & Header */}
            <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Nhóm Alpha #03 / Buổi họp #33</p>
                <h1 className="text-3xl font-black text-slate-900">Xây dựng hệ thống bán hàng</h1>
            </div>

            {/* 1. Hero Banner with Countdown */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden text-white relative">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                <div className="relative z-10 p-8 md:p-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-6 border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                        Sắp bắt đầu
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-2">Buổi họp #33</h2>
                    <p className="text-blue-100 font-medium text-lg mb-10">Thứ Năm, 15/02/2026 • 20:30 - 22:00</p>

                    {/* Countdown Timer */}
                    <div className="mb-4">
                        <span className="text-6xl md:text-8xl font-black tracking-tight tabular-nums drop-shadow-lg">
                            02:15:43
                        </span>
                    </div>
                    <p className="text-blue-200 text-sm font-medium">Còn 2 giờ 15 phút để bắt đầu</p>
                </div>

                {/* Bottom Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10 bg-black/10 backdrop-blur-sm">
                    {[
                        { label: "Nhóm Alpha #03", sub: "16 thành viên", icon: Users },
                        { label: "Trần Thị B", sub: "Mentor", icon: Users },
                        { label: "90 phút", sub: "Thời lượng", icon: Clock },
                        { label: "Google Meet", sub: "Online", icon: MapPin },
                    ].map((item, idx) => (
                        <div key={idx} className={`p-4 flex flex-col items-center justify-center text-center border-white/10 ${idx !== 3 ? 'border-r' : ''} ${idx > 1 ? 'border-t md:border-t-0' : ''}`}>
                            <item.icon className="w-5 h-5 mb-2 text-blue-200" />
                            <p className="font-bold text-sm">{item.label}</p>
                            <p className="text-[10px] text-blue-200 uppercase tracking-wide font-semibold">{item.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Check-in Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                    <CheckCircle2 className={`w-5 h-5 ${isCheckedIn ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <h3 className="font-bold text-slate-800">Check-in trước buổi họp</h3>
                    {isCheckedIn && <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase">Đã Check-in</span>}
                </div>

                {!isCheckedIn ? (
                    <div className="p-6 space-y-6">
                        {/* Info Alert */}
                        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
                            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="leading-relaxed">
                                <span className="font-bold">Lưu ý:</span> Vui lòng check-in trước khi tham gia buổi họp. Check-in giúp chúng tôi theo dõi sự tham gia và chuẩn bị tốt hơn cho buổi học.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Mục tiêu cá nhân cho buổi họp này</label>
                                <textarea
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px] text-sm text-slate-900 resize-none font-medium"
                                    placeholder="Ví dụ: Tôi muốn học cách xây dựng quy trình bán hàng hiệu quả cho startup của mình..."
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                ></textarea>
                                <p className="text-xs text-slate-400 text-right italic">Bắt buộc</p>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Câu hỏi muốn thảo luận (Không bắt buộc)</label>
                                <textarea
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px] text-sm text-slate-900 resize-none font-medium"
                                    placeholder="Chia sẻ những thắc mắc bạn muốn được giải đáp trong buổi họp..."
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                onClick={handleCheckIn}
                                isLoading={loading}
                                className="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5 h-auto text-base"
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                Check-in ngay
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 text-center bg-emerald-50/30">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Check-in thành công!</h3>
                        <p className="text-slate-600 mb-6">Bạn đã sẵn sàng tham gia buổi họp. Vui lòng chuẩn bị thiết bị và tham gia đúng giờ.</p>
                        <div className="flex justify-center gap-4">
                            <Button onClick={handleJoin} className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-6">
                                Tham gia ngay
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Join Info Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                    <Video className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-slate-800">Tham gia buổi họp</h3>
                </div>
                <div className="p-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
                        <h4 className="font-bold text-slate-900 mb-3 text-sm">Hướng dẫn tham gia:</h4>
                        <ul className="space-y-2 text-sm text-slate-600 list-decimal pl-4 leading-relaxed">
                            <li>Đảm bảo bạn đã check-in trước khi tham gia</li>
                            <li>Click vào nút "Tham gia Google Meet" bên dưới</li>
                            <li>Cửa sổ mới sẽ mở ra với phòng họp Google Meet</li>
                            <li>Bật camera và microphone khi được yêu cầu</li>
                            <li>Đúng giờ <span className="font-bold text-slate-900">20:30</span>, buổi họp sẽ chính thức bắt đầu</li>
                        </ul>
                    </div>

                    {/* Link Box */}
                    <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-blue-50/30 mb-6">
                        <code className="text-blue-600 font-mono text-sm bg-white px-3 py-1 rounded border border-blue-100 w-full md:w-auto text-center md:text-left truncate">
                            https://meet.google.com/abc-defg-hijkl
                        </code>
                        <div className="flex gap-3 w-full md:w-auto">
                            <Button
                                onClick={handleJoin}
                                variant="brand"
                                className="whitespace-nowrap flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <Video className="w-4 h-4 mr-2" />
                                Tham gia
                            </Button>
                            <Button
                                onClick={handleCopy}
                                variant="secondary"
                                className="whitespace-nowrap flex-1 md:flex-none bg-white border-slate-200"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                Sao chép
                            </Button>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs font-semibold text-amber-700">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        Lưu ý quan trọng: Link Google Meet chỉ hoạt động trong khung giờ họp (20:20 - 22:00). Vui lòng không chia sẻ link này với người khác.
                    </div>
                </div>
            </div>

            {/* 4. Attendees List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-bold text-slate-800">Danh sách tham gia <span className="font-normal text-slate-500 text-sm ml-1">({attendees.length}/16 đã check-in)</span></h3>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex flex-wrap gap-4">
                        {attendees.map((user, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full border-2 text-slate-600 flex items-center justify-center font-bold text-xs relative shadow-sm mb-2 ${user.name === 'Bạn' ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-slate-100 border-emerald-500'}`}>
                                    {user.avatar}
                                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white">
                                        <CheckCircle2 className="w-3 h-3" />
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-slate-900 mb-0.5">{user.name}</p>
                                <p className="text-[9px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Đã check-in</p>
                            </div>
                        ))}
                        {/* Placeholders for others */}
                        {Array.from({ length: Math.max(0, 16 - attendees.length) }).slice(0, 5).map((_, i) => (
                            <div key={i} className="flex flex-col items-center opacity-50">
                                <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-200 text-slate-300 flex items-center justify-center font-bold text-xs mb-2 border-dashed">
                                    ?
                                </div>
                                <p className="text-[10px] font-bold text-slate-400">Chưa check-in</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. Agenda */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                    <AlignLeft className="w-5 h-5 text-slate-600" />
                    <h3 className="font-bold text-slate-800">Nội dung buổi họp</h3>
                </div>
                <div className="p-6">
                    <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 my-2">
                        {agenda.map((item, idx) => (
                            <div key={idx} className="relative pl-8">
                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-blue-500 bg-white shadow-sm"></div>

                                <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-200 mb-1">
                                    {item.time}
                                </span>
                                <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                                <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 6. Success Modal */}
            {showSuccessModal && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
                    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 animate-in zoom-in-95 duration-200 relative text-center">
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-sm animate-bounce">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Check-in thành công!</h3>
                        <p className="text-slate-500 text-sm mb-6">
                            Bạn đã check-in và sẵn sàng tham gia.<br />Chúc bạn có một buổi họp hiệu quả.
                        </p>

                        <Button
                            fullWidth
                            variant="primary"
                            onClick={() => setShowSuccessModal(false)}
                            className="bg-emerald-500 hover:bg-emerald-600 border-none h-10 font-bold"
                        >
                            Tuyệt vời
                        </Button>
                    </div>
                </div>,
                document.body
            )}

            {/* 7. Warning Modal */}
            {showWarningModal && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
                    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 animate-in zoom-in-95 duration-200 relative text-center">
                        <button
                            onClick={() => setShowWarningModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 shadow-sm">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Chưa Check-in</h3>
                        <p className="text-slate-500 text-sm mb-6">
                            Bạn chưa hoàn thành check-in. Chúng tôi khuyến khích check-in để điểm danh.<br />Bạn có chắc chắn muốn tham gia ngay?
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="secondary"
                                onClick={() => setShowWarningModal(false)}
                                className="font-bold border-slate-200"
                            >
                                Quay lại
                            </Button>
                            <Button
                                variant="brand"
                                onClick={confirmJoin}
                                className="font-bold bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Vẫn tham gia
                            </Button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* 8. Error Modal (Validation) */}
            {showErrorModal && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
                    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 animate-in zoom-in-95 duration-200 relative text-center">
                        <button
                            onClick={() => setShowErrorModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 shadow-sm animate-shake">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Thiếu thông tin</h3>
                        <p className="text-slate-500 text-sm mb-6">
                            Vui lòng nhập <span className="font-bold text-slate-800">Mục tiêu cá nhân</span> để hoàn tất check-in. Điều này giúp chúng tôi hiểu rõ nhu cầu của bạn.
                        </p>

                        <Button
                            fullWidth
                            variant="primary"
                            onClick={() => setShowErrorModal(false)}
                            className="bg-red-500 hover:bg-red-600 border-none h-10 font-bold"
                        >
                            Đã hiểu
                        </Button>
                    </div>
                </div>,
                document.body
            )}

        </div>
    );
}

// Simple X Icon since it wasn't imported
const X = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
)
