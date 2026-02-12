import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/auth/me - Get current user info from ID (simulated session)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                subscription: {
                    include: {
                        tier: true
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const { passwordHash, ...userProps } = user;

        return NextResponse.json({
            user: {
                ...userProps,
                role: user.role,
                membership: user.subscription ? {
                    ...user.subscription,
                    tier: user.subscription.tier.name
                } : null
            }
        });
    } catch (error) {
        console.error('Auth Check Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
