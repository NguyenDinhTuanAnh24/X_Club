
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Download,
    FileText,
    Info,
    CheckCircle2,
    Zap,
    Lightbulb,
    BarChart3,
    AlertTriangle,
    MessageSquare,
    Save,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal'; // Assuming Modal is exported as named export or similar, need to check file content again. It is named export.

export default function GradingPage() {
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('xclub_user_role');
            if (role !== 'INSTRUCTOR' && role !== 'SUPER_ADMIN') {
                router.push('/dashboard');
            }
        }
    }, [router]);

    // Mock State for Scoring
    const [scores, setScores] = useState({
        sc1: 2, // Phân tích tình huống (Max 2)
        sc2: 1.5, // SWOT Analysis (Max 2)
        sc3: 3, // Chiến lược đề xuất (Max 3)
        sc4: 1, // Timeline & Budget (Max 2)
        sc5: 1, // Tính khả thi (Max 1)
    });

    const [feedback, setFeedback] = useState("Bài làm rất tốt! Em đã phân tích SWOT chi tiết và đề xuất chiến lược hợp lý cho bối cảnh startup.\n\nĐiểm mạnh:\n- Phân tích tình huống chuẩn xác");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

    const handleQuickInsert = (text: string) => {
        setFeedback(prev => prev + (prev.endsWith('\n') ? "" : "\n") + "- " + text);
    };

    const confirmSubmit = () => {
        // In a real app, this would send data to an API
        // Close modal
        setShowConfirmModal(false);
        router.push('/dashboard/mentor');
    };

    const ScoreButton = ({ value, current, max, onClick }: { value: number, current: number, max: number, onClick: (v: number) => void }) => (
        <button
            onClick={() => onClick(value)}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-sm font-bold border transition-all ${current === value
                ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
        >
            {value}
        </button>
    );

    return (
        <div className="p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* 1. Student Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center font-black text-xl shadow-lg border-4 border-white/20">
                        NVA
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">Nguyễn Văn A</h1>
                        <p className="text-blue-200 text-sm font-medium">Nhóm Alpha #03 • Gold Member</p>
                    </div>
                </div>
                <div className="flex gap-8 bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="text-center">
                        <p className="text-xl font-black">28/32</p>
                        <p className="text-[10px] text-blue-200 uppercase font-bold tracking-wide">Buổi tham gia</p>
                    </div>
                    <div className="w-px bg-white/20"></div>
                    <div className="text-center">
                        <p className="text-xl font-black">15/18</p>
                        <p className="text-[10px] text-blue-200 uppercase font-bold tracking-wide">Bài hoàn thành</p>
                    </div>
                    <div className="w-px bg-white/20"></div>
                    <div className="text-center">
                        <p className="text-xl font-black">8.4</p>
                        <p className="text-[10px] text-blue-200 uppercase font-bold tracking-wide">Điểm TB</p>
                    </div>
                </div>
            </div>

            {/* 2. Info Alert */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                    <span className="font-bold">Lưu ý:</span> Feedback của bạn sẽ được gửi ẩn danh tới học viên. Hãy đưa ra nhận xét mang tính xây dựng và cụ thể để giúp học viên phát triển.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Left Column: Student Submission (2 cols) */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        {/* Assignment Title */}
                        <div className="border-b border-slate-100 pb-6 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
                                    <FileText className="w-4 h-4" />
                                </span>
                                <h2 className="text-xl font-bold text-slate-900">Bài tập tuần 8: Phân tích Case Study Marketing</h2>
                            </div>
                            <p className="text-xs text-slate-500 font-medium ml-9">Nộp ngày: 13/02/2026, 14:30</p>
                        </div>

                        {/* Submission Content */}
                        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600 text-sm leading-relaxed">
                            <h3>Chiến lược Marketing cho Startup TechViet</h3>

                            <h4>1. Phân tích tình hình</h4>
                            <p>TechViet là một startup công nghệ mới thành lập 6 tháng, chuyên cung cấp giải pháp quản lý dự án cho doanh nghiệp vừa và nhỏ. Hiện tại công ty đang gặp khó khăn trong việc tiếp cận khách hàng mục tiêu và xây dựng brand awareness.</p>

                            <h4>2. Phân tích SWOT</h4>
                            <p><strong>Strengths (Điểm mạnh):</strong></p>
                            <ul>
                                <li>Sản phẩm có tính năng vượt trội so với đối thủ</li>
                                <li>Đội ngũ kỹ thuật giàu kinh nghiệm</li>
                                <li>Chi phí cạnh tranh</li>
                            </ul>

                            <p><strong>Weaknesses (Điểm yếu):</strong></p>
                            <ul>
                                <li>Thiếu kinh nghiệm marketing</li>
                                <li>Ngân sách hạn chế</li>
                                <li>Chưa có case study thuyết phục</li>
                            </ul>

                            <p><strong>Opportunities (Cơ hội):</strong></p>
                            <ul>
                                <li>Thị trường SME đang tăng trưởng</li>
                                <li>Xu hướng chuyển đổi số</li>
                            </ul>

                            <p><strong>Threats (Thách thức):</strong></p>
                            <ul>
                                <li>Cạnh tranh gay gắt từ các đối thủ lớn</li>
                                <li>Khách hàng chưa tin tưởng startup mới</li>
                            </ul>

                            <h4>3. Đề xuất chiến lược</h4>
                            <p>Dựa trên phân tích trên, tôi đề xuất chiến lược Marketing tập trung vào 3 trụ cột chính:</p>

                            <h5>3.1. Content Marketing & Thought Leadership</h5>
                            <ul>
                                <li>Xuất bản 2-3 blog posts/tuần về quản lý dự án</li>
                                <li>Tao case study từ 5 khách hàng đầu tiên (offer free trial)</li>
                                <li>Webinar hàng tháng về best practices</li>
                            </ul>

                            <h5>3.2. Community Building</h5>
                            <ul>
                                <li>Facebook Group cho Project Managers Việt Nam</li>
                                <li>LinkedIn presence mạnh với founder & team</li>
                            </ul>

                            <h5>3.3. Freemium Model & Product-Led Growth</h5>
                            <ul>
                                <li>Free tier với đầy đủ tính năng cho team &lt; 5 người</li>
                                <li>In-app education & onboarding tốt</li>
                            </ul>

                            <h4>4. Timeline & Budget (6 tháng)</h4>
                            <p><strong>Tháng 1-2:</strong> Setup infrastructure (website, blog, social) - 15 triệu</p>
                            <p><strong>Tháng 3-4:</strong> Content production & community building - 20 triệu/tháng</p>
                            <p><strong>Tháng 5-6:</strong> Scale & optimize - 30 triệu/tháng</p>
                            <p><strong>Tổng Budget:</strong> 135 triệu VNĐ</p>
                        </div>

                        {/* Attachments */}
                        <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/50 rounded-xl p-4">
                            <h4 className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-4">
                                <PaperclipIcon className="w-4 h-4 text-slate-500" />
                                File đính kèm
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">Marketing-Strategy-TechViet.pdf</p>
                                            <p className="text-xs text-slate-500">2.5 MB • PDF Document</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="secondary" className="h-8 text-xs font-bold text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100">
                                        <Download className="w-3 h-3 mr-2" />
                                        Tải xuống
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                                            <BarChart3 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">Budget-Timeline.xlsx</p>
                                            <p className="text-xs text-slate-500">1.2 MB • Excel Spreadsheet</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="secondary" className="h-8 text-xs font-bold text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100">
                                        <Download className="w-3 h-3 mr-2" />
                                        Tải xuống
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Student Note */}
                        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <h4 className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-2">
                                <MessageSquare className="w-4 h-4 text-slate-500" />
                                Ghi chú từ học viên
                            </h4>
                            <p className="text-sm text-slate-600 italic leading-relaxed">
                                "Em có tham khảo một số case study từ các startup thành công ở VN. Tuy nhiên em vẫn còn băn khoăn về phần budget allocation - không biết có hợp lý không ạ. Mong thầy/cô góp ý thêm về phần này."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Grading Form (Sticky) */}
                <div className="space-y-6 lg:sticky lg:top-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                                <Zap className="w-4 h-4" />
                            </span>
                            Chấm điểm
                        </h3>

                        <div className="space-y-6">
                            {/* Criterion 1 */}
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-slate-700">Phân tích tình huống</span>
                                    <span className="text-slate-400 text-xs">/ 2 điểm</span>
                                </div>
                                <div className="flex gap-2">
                                    {[0, 0.5, 1, 1.5, 2].map(v => (
                                        <ScoreButton key={v} value={v} current={scores.sc1} max={2} onClick={(val) => setScores({ ...scores, sc1: val })} />
                                    ))}
                                </div>
                            </div>

                            {/* Criterion 2 */}
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-slate-700">SWOT Analysis</span>
                                    <span className="text-slate-400 text-xs">/ 2 điểm</span>
                                </div>
                                <div className="flex gap-2">
                                    {[0, 0.5, 1, 1.5, 2].map(v => (
                                        <ScoreButton key={v} value={v} current={scores.sc2} max={2} onClick={(val) => setScores({ ...scores, sc2: val })} />
                                    ))}
                                </div>
                            </div>

                            {/* Criterion 3 */}
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-slate-700">Chiến lược đề xuất</span>
                                    <span className="text-slate-400 text-xs">/ 3 điểm</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {[0, 0.5, 1, 1.5, 2, 2.5, 3].map(v => (
                                        <ScoreButton key={v} value={v} current={scores.sc3} max={3} onClick={(val) => setScores({ ...scores, sc3: val })} />
                                    ))}
                                </div>
                            </div>

                            {/* Criterion 4 */}
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-slate-700">Timeline & Budget</span>
                                    <span className="text-slate-400 text-xs">/ 2 điểm</span>
                                </div>
                                <div className="flex gap-2">
                                    {[0, 0.5, 1, 1.5, 2].map(v => (
                                        <ScoreButton key={v} value={v} current={scores.sc4} max={2} onClick={(val) => setScores({ ...scores, sc4: val })} />
                                    ))}
                                </div>
                            </div>

                            {/* Criterion 5 */}
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-slate-700">Tính khả thi</span>
                                    <span className="text-slate-400 text-xs">/ 1 điểm</span>
                                </div>
                                <div className="flex gap-2">
                                    {[0, 0.25, 0.5, 0.75, 1].map(v => (
                                        <ScoreButton key={v} value={v} current={scores.sc5} max={1} onClick={(val) => setScores({ ...scores, sc5: val })} />
                                    ))}
                                </div>
                            </div>

                            {/* Total Score */}
                            <div className="bg-blue-600 rounded-xl p-6 text-center text-white shadow-lg shadow-blue-500/20">
                                <p className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-1">Tổng điểm</p>
                                <p className="text-4xl font-black">{totalScore} <span className="text-2xl text-blue-200">/ 10</span></p>
                            </div>

                            {/* Detailed Feedback */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Nhận xét chi tiết <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-slate-400 mb-3">Feedback của bạn sẽ được gửi ẩn danh</p>

                                {/* Quick Inserts */}
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <button
                                        onClick={() => handleQuickInsert("Phân tích tốt")}
                                        className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-xs font-bold hover:bg-emerald-100 transition-colors"
                                    >
                                        <CheckCircle2 className="w-3 h-3" /> Phân tích tốt
                                    </button>
                                    <button
                                        onClick={() => handleQuickInsert("Đề xuất sáng tạo")}
                                        className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-amber-50 text-amber-700 border border-amber-100 rounded text-xs font-bold hover:bg-amber-100 transition-colors"
                                    >
                                        <Lightbulb className="w-3 h-3" /> Đề xuất sáng tạo
                                    </button>
                                    <button
                                        onClick={() => handleQuickInsert("Data cụ thể")}
                                        className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 rounded text-xs font-bold hover:bg-purple-100 transition-colors"
                                    >
                                        <BarChart3 className="w-3 h-3" /> Data cụ thể
                                    </button>
                                    <button
                                        onClick={() => handleQuickInsert("Cần cải thiện")}
                                        className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-orange-50 text-orange-700 border border-orange-100 rounded text-xs font-bold hover:bg-orange-100 transition-colors"
                                    >
                                        <AlertTriangle className="w-3 h-3" /> Cần cải thiện
                                    </button>
                                </div>

                                <textarea
                                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px] text-sm text-slate-900 resize-none font-medium mb-3"
                                    placeholder="Nhập nội dung nhận xét..."
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                ></textarea>

                                <div className="flex items-center gap-2 mb-6">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                    <span className="text-xs text-slate-500 font-medium">Gửi feedback ẩn danh (khuyến nghị)</span>
                                </div>

                                <Button
                                    fullWidth
                                    onClick={() => setShowConfirmModal(true)}
                                    variant="primary"
                                    className="bg-emerald-500 hover:bg-emerald-600 border-none shadow-lg shadow-emerald-500/20 h-10 font-bold"
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Hoàn thành chấm điểm
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 animate-in zoom-in-95 duration-200 relative">
                        <button
                            onClick={() => setShowConfirmModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-sm">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Xác nhận chấm điểm?</h3>
                            <p className="text-slate-500 text-sm">
                                Bạn đang chấm điểm cho học viên <span className="font-bold text-slate-900">Nguyễn Văn A</span> với tổng điểm:
                            </p>
                            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 inline-block">
                                <span className="text-3xl font-black text-blue-600">{totalScore}</span>
                                <span className="text-xl font-bold text-blue-400">/10</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="secondary"
                                onClick={() => setShowConfirmModal(false)}
                                className="font-bold"
                            >
                                Quay lại
                            </Button>
                            <Button
                                variant="brand"
                                onClick={confirmSubmit}
                                className="font-bold bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Icon for Paperclip since not imported
const PaperclipIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
)
