import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { MembershipTier } from '@prisma/client';

// POST /api/auth/login - Login user
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                subscription: {
                    include: {
                        tier: true
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // In production, use bcrypt to compare password hash
        // For now, simple comparison (demo only)
        if (user.passwordHash !== password) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        if (user.status !== 'ACTIVE') {
            return NextResponse.json({ error: 'Account is not active' }, { status: 403 });
        }

        // Return user data (exclude password)
        const { passwordHash, subscription, ...userProps } = user;

        return NextResponse.json({
            user: {
                ...userProps,
                role: user.role, // Explicitly return role
                membership: subscription ? {
                    ...subscription,
                    tier: subscription.tier.name
                } : null
            },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
