import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { GroupingService } from '@/lib/services/grouping';
import { MembershipTier } from '@prisma/client';

// Mock Input: { "userId": "...", "tier": "GOLD", "paymentStatus": "SUCCESS" }
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, tier, paymentStatus } = body;

        if (paymentStatus !== 'SUCCESS') {
            return NextResponse.json({ message: "Payment ignored" }, { status: 200 });
        }

        // 1. Activate Subscription
        // (Logic upsert subscription would go here)

        // 2. Trigger Auto-Grouping
        console.log(`[Webhook] Processing grouping for User ${userId}...`);

        const result = await GroupingService.assignUserToGroup(
            userId,
            tier as MembershipTier
        );

        return NextResponse.json({
            success: true,
            message: "Membership activated & Group assigned",
            group: result.groupName
        });

    } catch (error: any) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
