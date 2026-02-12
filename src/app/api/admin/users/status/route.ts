import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { userId, status } = body;

        // Validation
        if (!userId || !status) {
            return NextResponse.json({ error: 'Missing userId or status' }, { status: 400 });
        }

        if (!['ACTIVE', 'BANNED', 'PENDING'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        // Prevent banning SUPER_ADMIN (Self-preservation check could be added, but minimal for now)
        const targetUser = await prisma.user.findUnique({ where: { id: userId } });
        if (targetUser?.role === 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'Cannot change status of Super Admin' }, { status: 403 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { status: status as any }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Update status failed", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
