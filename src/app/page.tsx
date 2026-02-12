
import Link from "next/link";
import {
    BookOpen,
    Users,
    Target,
    Calendar,
    BarChart3,
    Trophy,
    CheckCircle2,
    ArrowRight
} from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            {/* 1. Header Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1120]/90 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-2">
                                <span className="text-2xl font-black text-white tracking-tighter">
                                    x <span className="text-blue-500">CLUB</span>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {['Tính năng', 'Membership', 'Cách thức', 'Liên hệ'].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="px-5 py-2 text-sm font-semibold text-white border border-slate-600 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0B1120] overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 center w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
                        Nền tảng dành cho <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Doanh chủ</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                        Học tập - Kết nối - Phát triển cùng cộng đồng doanh nhân chuyên nghiệp.
                        Nơi kỷ luật tạo nên sức mạnh và thành công bền vững.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-500/25"
                        >
                            Kết nối ngay
                        </Link>
                        <Link
                            href="#features"
                            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-300 border border-slate-700 rounded-xl hover:bg-white/5 transition-all"
                        >
                            Tìm hiểu thêm
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3. Features Section */}
            <section id="features" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tính năng nổi bật</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: BookOpen,
                                title: "Đào tạo Online",
                                desc: "Khóa học chất lượng cao từ các chuyên gia hàng đầu, được cập nhật liên tục.",
                                color: "bg-emerald-100 text-emerald-600"
                            },
                            {
                                icon: Users,
                                title: "Nhóm học 16 người",
                                desc: "Học tập trong nhóm cố định, tương tác sâu và xây dựng mối quan hệ bền vững.",
                                color: "bg-blue-100 text-blue-600"
                            },
                            {
                                icon: Target,
                                title: "Mentor hỗ trợ",
                                desc: "Được mentor kèm cặp, đánh giá và phản hồi chuyên sâu hàng tuần.",
                                color: "bg-purple-100 text-purple-600"
                            },
                            {
                                icon: Calendar,
                                title: "Lịch họp cố định",
                                desc: "Thứ Năm hàng tuần 20:30-22:00, giúp bạn duy trì kỷ luật học tập.",
                                color: "bg-orange-100 text-orange-600"
                            },
                            {
                                icon: BarChart3,
                                title: "Theo dõi tiến độ",
                                desc: "Dashboard trực quan giúp bạn nắm bắt tiến độ học tập và phát triển.",
                                color: "bg-indigo-100 text-indigo-600"
                            },
                            {
                                icon: Trophy,
                                title: "Sản phẩm số",
                                desc: "Truy cập kho tài liệu, template và công cụ hỗ trợ kinh doanh.",
                                color: "bg-rose-100 text-rose-600"
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Membership Section */}
            <section id="membership" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Gói Membership</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: "BRONZE",
                                price: "2.000.000đ",
                                features: ["Truy cập khóa học cơ bản", "Tham gia nhóm học", "Họp online hàng tuần", "Dashboard cá nhân"],
                                highlight: false
                            },
                            {
                                name: "SILVER",
                                price: "4.000.000đ",
                                features: ["Tất cả tính năng Bronze", "Khóa học nâng cao", "1-1 Mentor session/tháng", "Tài liệu độc quyền"],
                                highlight: false
                            },
                            {
                                name: "GOLD",
                                price: "8.000.000đ",
                                features: ["Tất cả tính năng Bronze", "Ưu tiên hỗ trợ Mentor", "Workshop độc quyền", "Networking events", "Sản phẩm số premium"],
                                highlight: true
                            },
                            {
                                name: "PLATINUM",
                                price: "15.000.000đ",
                                features: ["Tất cả tính năng Bronze", "Personal coaching", "Tư vấn chiến lược", "Truy cập trọn đời", "VIP community"],
                                highlight: false
                            }
                        ].map((tier, idx) => (
                            <div
                                key={idx}
                                className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${tier.highlight
                                        ? "border-blue-500 shadow-xl scale-105 z-10 bg-white"
                                        : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                                    }`}
                            >
                                {tier.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Phổ biến nhất
                                    </div>
                                )}
                                <div className="text-center mb-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{tier.name}</h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className={`text-2xl font-black ${tier.highlight ? 'text-blue-600' : 'text-slate-900'}`}>{tier.price}</span>
                                        <span className="text-xs text-slate-500">/tháng</span>
                                    </div>
                                </div>
                                <ul className="flex-1 space-y-4 mb-8">
                                    {tier.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-slate-700">
                                            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${tier.highlight ? 'text-blue-600' : 'text-slate-400'}`} />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className={`w-full py-3 rounded-xl text-sm font-bold transition-colors text-center ${tier.highlight
                                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                                            : "bg-white border border-blue-200 text-blue-600 hover:bg-blue-50"
                                        }`}
                                >
                                    Chọn gói
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Process Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Quy trình hoạt động</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-0.5 bg-slate-200 z-0"></div>

                        {[
                            { step: "1", title: "Đăng ký", desc: "Chọn gói membership phù hợp với nhu cầu của bạn" },
                            { step: "2", title: "Xếp nhóm", desc: "Hệ thống tự động xếp bạn vào nhóm 16 người phù hợp" },
                            { step: "3", title: "Học tập", desc: "Tham gia họp online, làm bài tập và nhận feedback" },
                            { step: "4", title: "Phát triển", desc: "Theo dõi tiến độ, cải thiện kỹ năng và mở rộng network" },
                        ].map((item, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-14 h-14 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-600 max-w-[200px]">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CTA Footer */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Sẵn sàng bắt đầu hành trình?
                    </h2>
                    <p className="text-blue-100 text-lg mb-10">
                        Tham gia cộng đồng 1000+ doanh chủ đang phát triển cùng xCLUB
                    </p>
                    <Link
                        href="/register"
                        className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-xl"
                    >
                        Đăng ký ngay <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* 7. Footer */}
            <footer className="bg-[#0B1120] text-slate-400 py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm">
                        © 2024 xCLUB. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm font-medium">
                        <Link href="#" className="hover:text-white transition-colors">Về chúng tôi</Link>
                        <Link href="#" className="hover:text-white transition-colors">Điều khoản</Link>
                        <Link href="#" className="hover:text-white transition-colors">Chính sách</Link>
                        <Link href="#" className="hover:text-white transition-colors">Liên hệ</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
