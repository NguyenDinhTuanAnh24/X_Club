
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, meetingId } = body;

        // Validation
        if (!userId || !meetingId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if meeting exists
        const meeting = await prisma.meeting.findUnique({
            where: { id: meetingId }
        });

        if (!meeting) {
            return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
        }

        // Logic: Create or Update Attendance Record
        const attendance = await prisma.attendanceLog.upsert({
            where: {
                meetingId_userId: {
                    meetingId: meetingId,
                    userId: userId
                }
            },
            update: {
                checkInAt: new Date(), // Update check-in time if re-joining
                status: 'PRESENT'
            },
            create: {
                userId: userId,
                meetingId: meetingId,
                checkInAt: new Date(),
                status: 'PRESENT',
                durationMinutes: 0
            }
        });

        // Return Success + Google Meet Link
        return NextResponse.json({
            success: true,
            checkInTime: attendance.checkInAt,
            meetingLink: meeting.meetLink
        });

    } catch (error: any) {
        console.error("Check-in Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
