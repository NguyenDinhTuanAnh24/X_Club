import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
        }

        // Prevent deleting SUPER_ADMIN
        const targetUser = await prisma.user.findUnique({ where: { id: userId } });
        if (targetUser?.role === 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'Cannot delete Super Admin' }, { status: 403 });
        }

        // Transactional delete to clean up related records might be needed?
        // Prisma cascade delete should handle it if configured, but let's be safe or just delete user.
        // For now, simple delete. In production, soft delete or cascading is improved.
        await prisma.user.delete({
            where: { id: userId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete user failed", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
