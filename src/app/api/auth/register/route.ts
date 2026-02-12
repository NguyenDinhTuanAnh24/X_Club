import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/auth/register - Register new user
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, fullName, tier, role } = body;

        if (!email || !password || !fullName) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Validate Role
        const ALLOWED_ROLES = ['STUDENT', 'INSTRUCTOR']; // Restricted to Student and Instructor
        const userRole = (role && ALLOWED_ROLES.includes(role)) ? role : 'STUDENT';

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
        }

        // Map tier from frontend to database Tier Name
        // Frontend sends 'bronze', 'silver', 'gold', 'platinum'
        const tierMap: Record<string, string> = {
            'bronze': 'Bronze',
            'silver': 'Silver',
            'gold': 'Gold',
            'platinum': 'Platinum'
        };

        const tierName = tierMap[tier.toLowerCase()] || 'Bronze';

        // Find Membership Tier in DB
        const selectedTier = await prisma.membershipTier.findUnique({
            where: { name: tierName } // Case sensitive matches seed data 'Standard', 'Gold'
        });

        if (!selectedTier) {
            // Should not happen if seeded correctly
            return NextResponse.json({ error: 'Selected tier not found in system' }, { status: 400 });
        }

        // Create new user
        // In production, hash the password with bcrypt
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash: password, // In production: await bcrypt.hash(password, 10)
                fullName,
                role: userRole,
                status: 'ACTIVE'
            }
        });

        // Create subscription with selected tier link
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + selectedTier.durationDays);

        const subscription = await prisma.subscription.create({
            data: {
                userId: user.id,
                tierId: selectedTier.id,
                startDate: new Date(),
                endDate: endDate,
                status: 'ACTIVE'
            },
            include: {
                tier: true
            }
        });

        const { passwordHash, ...userWithoutPassword } = user;

        return NextResponse.json({
            user: {
                ...userWithoutPassword,
                membership: {
                    ...subscription,
                    tier: subscription.tier.name
                }
            },
            message: 'Registration successful'
        }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
