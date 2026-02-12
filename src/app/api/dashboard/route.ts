import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
    try {
        // 1. Fake Auth (Trong thực tế sẽ lấy từ Session/JWT)
        // Giả sử lấy userId của một user mẫu (chúng ta sẽ seed sau)
        // Để test, nếu không có user nào, code sẽ lỗi nên ta cần try-catch kỹ
        // TODO: Replace with real auth (e.g., Clerk, NextAuth)
        const userId = "user-demo-id";

        // 2. Fetch User Data with Relations
        // Chúng ta tìm user và include các quan hệ cần thiết
        // (Tạm thời comment lại phần query thật để tránh lỗi nếu DB chưa migration xong)
        /*
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: {
            membership: true,
            groupMember: {
              include: {
                group: true
              }
            },
            attendances: true,
            submissions: true
          }
        });
        */

        // MOCK DATA RESPONSE (Trả về định dạng chuẩn để Frontend ghép nối trước)
        return NextResponse.json({
            user: {
                id: "user-123",
                name: "Nguyễn Văn A",
                tier: "GOLD"
            },
            nextMeeting: {
                isHappening: false, // Logic kiểm tra giờ
                title: "Phiên họp tuần 42: Review OKRs",
                time: "20:30 - 22:00, Thứ Năm",
                link: "https://meet.google.com/xxx-xxxx-xxx"
            },
            stats: {
                attendanceRate: 90,
                submissionRate: 100,
                strikes: 0 // Số lần vi phạm
            },
            tasks: [
                { id: 1, title: "Nộp biên bản tuần trước", due: "Hôm nay", urgent: true },
                { id: 2, title: "Đọc sách Chương 3", due: "Ngày mai", urgent: false }
            ]
        });

    } catch (error) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
