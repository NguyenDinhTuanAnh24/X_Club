import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure this path is correct based on your project structure

export const dynamic = 'force-dynamic'; // Ensure no caching for real-time stats

export async function GET() {
    try {
        // 1. Total Users
        const usersCount = await prisma.user.count();

        // 2. Revenue (Aggregation)
        // Sum of all subscriptions linked to a tier
        // Note: This assumes infinite duration or one-time payment logic for simplicity unless duration is factored.
        // For a monthly recurring model, we'd calculate realized revenue based on active subs.
        // Here we'll just sum the price of all "ACTIVE" subscriptions.

        // Fetch subscriptions with their tier price
        const activeSubscriptions = await prisma.subscription.findMany({
            where: {
                status: 'ACTIVE'
            },
            include: {
                tier: true
            }
        });

        const revenue = activeSubscriptions.reduce((acc, sub) => {
            return acc + Number(sub.tier.price);
        }, 0);

        // 3. Active Groups (Proxy for "Active Courses" or "Classes")
        const activeGroupsCount = await prisma.group.count({
            where: {
                status: 'OPEN'
            }
        });

        // 4. Tasks/Submissions pending (Proxy for "Activity" or something else useful)
        const pendingSubmissions = await prisma.submission.count({
            where: { status: 'PENDING' }
        });

        return NextResponse.json({
            users: {
                count: usersCount,
                growth: "+5%" // Placeholder, or calculate from createdAt
            },
            revenue: {
                total: revenue, // e.g. 45000000
                currency: "VNĐ"
            },
            groups: {
                count: activeGroupsCount
            },
            system: {
                status: "Operational", // Mock system check
                pendingTasks: pendingSubmissions
            }
        });

    } catch (error) {
        console.error("Stats Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch statistics" },
            { status: 500 }
        );
    }
}
