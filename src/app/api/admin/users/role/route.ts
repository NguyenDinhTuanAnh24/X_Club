import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PATCH /api/admin/users/role - Update user role
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, role } = body;

        if (!userId || !role) {
            return NextResponse.json({ error: 'Missing userId or role' }, { status: 400 });
        }

        // In a real app, verify Admin here

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating role:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
