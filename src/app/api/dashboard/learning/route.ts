
import { NextResponse } from "next/server";

// This is a Mock API for Learning Data (since we might not have a full LMS schema yet)
// In a real app, you would query tables like `Modules`, `Lessons`, `UserProgress`, `Assignments`

export async function GET() {
    // Simulated DB fetch
    const modules = [
        {
            id: 1,
            title: "Module 1: Tư duy người dẫn đầu",
            progress: 100,
            status: "completed",
            lessons: 4,
            duration: "2h 30m"
        },
        {
            id: 2,
            title: "Module 2: Xây dựng văn hóa kỷ luật",
            progress: 65,
            status: "in-progress",
            lessons: 6,
            duration: "3h 15m"
        },
        {
            id: 3,
            title: "Module 3: Chiến lược vận hành tinh gọn",
            progress: 0,
            status: "locked",
            lessons: 5,
            duration: "4h 00m"
        }
    ];

    const assignments = [
        {
            id: 1,
            title: "Bài tập tuần 40: Phân tích SWOT",
            deadline: "23:59 hôm nay",
            status: "pending",
            type: "Required"
        },
        {
            id: 2,
            title: "Review sách: Từ tốt đến vĩ đại",
            deadline: "Hoàn thành",
            status: "submitted",
            grade: "9/10",
            type: "Optional"
        }
    ];

    const overall = {
        averageGrade: 8.5,
        ranking: "Top 10%"
    };

    return NextResponse.json({
        modules,
        assignments,
        overall
    });
}
