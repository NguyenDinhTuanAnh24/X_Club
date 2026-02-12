"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * FETCH DASHBOARD DATA
 * Lấy toàn bộ thông tin cần thiết cho màn hình Dashboard
 * @param userId - ID của user đăng nhập
 */
/**
 * FETCH DASHBOARD DATA
 * Lấy toàn bộ thông tin cần thiết cho màn hình Dashboard
 * @param userIdentifier - ID hoặc Email của user
 */
export async function getDashboardData(userIdentifier: string) {
    try {
        // 1. Get User with Membership, Group, and Recent Attendances
        // Use findFirst to allow flexible lookup by ID or Email
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { id: userIdentifier },
                    { email: userIdentifier }
                ]
            },
            include: {
                membership: true,
                groupMember: {
                    include: {
                        group: {
                            include: {
                                meetings: {
                                    // Get nearest future OR active meeting (End time is in the future)
                                    where: { endTime: { gte: new Date() } },
                                    orderBy: { startTime: 'asc' },
                                    take: 1
                                }
                            }
                        }
                    }
                },
                // Get last 10 attendances to calc stats
                attendances: {
                    orderBy: { meeting: { startTime: 'desc' } },
                    take: 10
                },
                // Get pending tasks (missing submissions)
                submissions: {
                    where: { status: 'MISSING' },
                    take: 5
                }
            }
        });

        if (!user) {
            console.error(`User not found with identifier: ${userIdentifier}`);
            throw new Error("User not found");
        }

        // 2. Process Next Meeting Logic
        const group = user.groupMember?.group;
        const nextMeeting = group?.meetings[0];

        let meetingState = 'UPCOMING'; // UPCOMING | LIVE | NONE
        if (nextMeeting) {
            const now = new Date();
            // Logic: Live if within [Start - 15m, End]
            const openTime = new Date(nextMeeting.startTime.getTime() - 15 * 60000);
            if (now >= openTime && now <= nextMeeting.endTime) {
                meetingState = 'LIVE';
            }
        }

        // 3. Process Discipline Stats
        const attendanceCount = user.attendances.length;
        const presentCount = user.attendances.filter(a => a.status === 'PRESENT').length;
        const attendanceRate = attendanceCount > 0 ? Math.round((presentCount / attendanceCount) * 100) : 100;

        return {
            user: {
                name: user.fullName,
                email: user.email,
                avatar: user.avatarUrl,
            },
            group: group ? {
                id: group.id,
                name: group.name,
                tier: group.tier,
                count: group.currentMemberCount,
                mentorName: "Ban Cố Vấn" // Placeholder until logic assigns specific mentor
            } : null,
            nextMeeting: nextMeeting ? {
                id: nextMeeting.id,
                title: nextMeeting.title,
                startTime: nextMeeting.startTime,
                endTime: nextMeeting.endTime,
                link: nextMeeting.meetingLink,
                state: meetingState
            } : null,
            stats: {
                attendanceRate,
                tasksPending: user.submissions.length
            }
        };

    } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        return null;
    }
}

/**
 * ACTION: JOIN MEETING (CHECK-IN)
 */
export async function joinMeetingAction(userId: string, meetingId: string) {
    try {
        // 1. Record Check-in
        await prisma.attendance.upsert({
            where: {
                meetingId_userId: {
                    meetingId,
                    userId
                }
            },
            update: {
                checkInAt: new Date(),
                status: 'PRESENT' // Tạm thời set luôn PRESENT, sau này có cron sẽ tính lại theo duration
            },
            create: {
                meetingId,
                userId,
                checkInAt: new Date(),
                status: 'PRESENT'
            }
        });

        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error("Check-in failed:", error);
        return { success: false };
    }
}
