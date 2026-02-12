import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/user - Get current user info
export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                subscription: {
                    include: {
                        tier: true
                    }
                },
                groupMemberships: {
                    include: {
                        group: true
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Transform response for frontend compatibility
        const { subscription, ...userProps } = user;
        const mappedUser = {
            ...userProps,
            membership: subscription ? {
                ...subscription,
                tier: subscription.tier.name
            } : null
        };

        return NextResponse.json(mappedUser);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/user - Update user profile
export async function PUT(request: NextRequest) {
    try {
        const userId = request.headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { fullName, avatarUrl } = body;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                fullName,
                avatarUrl
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
