import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/users - List all users
export async function GET(request: NextRequest) {
    try {
        // In a real app, verify Admin role here
        // const userId = request.headers.get('x-user-id');
        // Check if user is admin...

        const users = await prisma.user.findMany({
            include: {
                subscription: {
                    include: {
                        tier: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const mappedUsers = users.map(user => {
            const { subscription, passwordHash, ...userProps } = user;
            return {
                ...userProps,
                tier: subscription ? subscription.tier.name : 'Free', // or N/A
                membership: subscription
            };
        });

        return NextResponse.json(mappedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
