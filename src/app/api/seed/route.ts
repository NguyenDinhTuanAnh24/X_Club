import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { MembershipTier, UserRole, GroupStatus, AttendanceStatus, SubmissionStatus } from '@prisma/client';

export async function POST(request: Request) {
    try {
        console.log('Seeding via API...');

        // 1. Create Users (1 Demo Member, 1 Mentor)
        const user = await prisma.user.upsert({
            where: { email: 'member@demo.com' },
            update: {},
            create: {
                id: 'user-demo-id', // Force ID for easy testing
                email: 'member@demo.com',
                fullName: 'Nguyen Van Demo',
                passwordHash: 'placeholder',
                role: UserRole.MEMBER,
                avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            },
        });

        const mentor = await prisma.user.upsert({
            where: { email: 'mentor@demo.com' },
            update: {},
            create: {
                email: 'mentor@demo.com',
                fullName: 'Thay Doanh Tri',
                passwordHash: 'placeholder',
                role: UserRole.MENTOR,
                avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mentor',
            },
        });

        // 2. Create Membership Subscription
        await prisma.subscription.upsert({
            where: { userId: user.id },
            update: {},
            create: {
                userId: user.id,
                tier: MembershipTier.GOLD,
                startDate: new Date(),
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                isActive: true,
            }
        });

        // 3. Create Group
        // 3. Create Group or Get Existing
        const existingMember = await prisma.groupMember.findUnique({
            where: { userId: user.id },
            include: { group: true }
        });

        let groupId = existingMember?.groupId;

        if (!existingMember) {
            const group = await prisma.group.create({
                data: {
                    name: 'Squad Alpha-01',
                    tier: MembershipTier.GOLD,
                    status: GroupStatus.OPEN,
                    currentMemberCount: 1,
                    members: {
                        create: {
                            userId: user.id,
                            isLeader: true
                        }
                    }
                }
            });
            groupId = group.id;
        } else {
            console.log("User already in a group, skipping group creation.");
        }

        if (!groupId) throw new Error("Could not determine Group ID");

        // 4. Create Meeting (Today + 1 hour for LIVE testing, or Next Thursday)
        // Cleanup old demo meetings to keep dashboard clean

        // A. Delete Attendances linked to this group's meetings
        await prisma.attendance.deleteMany({
            where: { meeting: { groupId } }
        });

        // B. Delete Submissions (and linked Reviews)
        const submissions = await prisma.submission.findMany({
            where: { meeting: { groupId } },
            select: { id: true }
        });
        const submissionIds = submissions.map(s => s.id);

        if (submissionIds.length > 0) {
            await prisma.review.deleteMany({
                where: { submissionId: { in: submissionIds } }
            });
            await prisma.submission.deleteMany({
                where: { id: { in: submissionIds } }
            });
        }

        // C. Now safe to delete meetings
        await prisma.meeting.deleteMany({
            where: { groupId }
        });

        // Let's create a LIVE MEETING DEMO to show off the "Join" button
        // Let's create a LIVE MEETING DEMO to show off the "Join" button
        const now = new Date();
        const meetingStart = new Date(now.getTime() - 10 * 60000); // Started 10 mins ago
        const meetingEnd = new Date(now.getTime() + 80 * 60000);   // Ends in 80 mins

        const meeting = await prisma.meeting.create({
            data: {
                groupId: groupId,
                title: 'Live Session: Business Strategy Check-in',
                startTime: meetingStart,
                endTime: meetingEnd,
                weekNumber: 43,
                meetingLink: 'https://meet.google.com/abc-demo-xyz',
            }
        });

        return NextResponse.json({ success: true, message: "Data seeded successfully! Refresh Dashboard." });

    } catch (error: any) {
        console.error("Seed API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
