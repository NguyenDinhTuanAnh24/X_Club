
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

        // 1. Find the Attendance record
        const attendance = await prisma.attendanceLog.findUnique({
            where: {
                meetingId_userId: {
                    meetingId: meetingId,
                    userId: userId
                }
            }
        });

        if (!attendance || !attendance.checkInAt) {
            return NextResponse.json({ error: "No check-in record found. Cannot check-out." }, { status: 404 });
        }

        // 2. Calculate Duration
        const now = new Date();
        const checkInTime = new Date(attendance.checkInAt);
        const durationMs = now.getTime() - checkInTime.getTime();
        const durationMin = Math.round(durationMs / 60000); // Check types

        // 3. Update Record
        const updatedAttendance = await prisma.attendanceLog.update({
            where: {
                meetingId_userId: {
                    meetingId: meetingId,
                    userId: userId
                }
            },
            data: {
                checkOutAt: now,
                durationMinutes: durationMin,
                status: 'PRESENT' // Confirm PRESENT upon successful checkout
            }
        });

        return NextResponse.json({
            success: true,
            checkOutTime: updatedAttendance.checkOutAt,
            duration: durationMin,
            message: `Checked out successfully after ${durationMin} minutes.`
        });

    } catch (error: any) {
        console.error("Check-out Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
