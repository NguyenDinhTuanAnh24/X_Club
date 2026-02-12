import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Lấy danh sách công việc
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const status = searchParams.get('status');

        const where: Record<string, unknown> = {};

        if (userId) {
            where.OR = [
                { createdById: userId },
                { assignedToId: userId }
            ];
        }

        if (status) {
            where.status = status;
        }

        const tasks = await prisma.task.findMany({
            where,
            include: {
                createdBy: {
                    select: { id: true, fullName: true, avatarUrl: true }
                },
                assignedTo: {
                    select: { id: true, fullName: true, avatarUrl: true }
                }
            },
            orderBy: [
                { priority: 'desc' },
                { dueDate: 'asc' },
                { createdAt: 'desc' }
            ]
        });

        return NextResponse.json({
            success: true,
            tasks
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json(
            { success: false, error: 'Không thể lấy danh sách công việc' },
            { status: 500 }
        );
    }
}

// POST: Tạo công việc mới
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, priority, dueDate, createdById, assignedToId, groupId } = body;

        if (!title || !createdById) {
            return NextResponse.json(
                { success: false, error: 'Thiếu thông tin bắt buộc' },
                { status: 400 }
            );
        }

        const task = await prisma.task.create({
            data: {
                title,
                description: description || null,
                priority: priority || 'MEDIUM',
                dueDate: dueDate ? new Date(dueDate) : null,
                createdById,
                assignedToId: assignedToId || null,
                groupId: groupId || null
            },
            include: {
                createdBy: {
                    select: { id: true, fullName: true, avatarUrl: true }
                },
                assignedTo: {
                    select: { id: true, fullName: true, avatarUrl: true }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Tạo công việc thành công',
            task
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json(
            { success: false, error: 'Không thể tạo công việc' },
            { status: 500 }
        );
    }
}
