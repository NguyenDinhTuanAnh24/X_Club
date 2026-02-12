import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Lấy danh sách lịch trình
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const upcoming = searchParams.get('upcoming') === 'true';

        const where: Record<string, unknown> = {};

        if (userId) {
            where.createdById = userId;
        }

        if (upcoming) {
            where.startTime = {
                gte: new Date()
            };
        }

        const schedules = await prisma.schedule.findMany({
            where,
            include: {
                createdBy: {
                    select: { id: true, fullName: true, avatarUrl: true }
                }
            },
            orderBy: {
                startTime: 'asc'
            }
        });

        return NextResponse.json({
            success: true,
            schedules
        });
    } catch (error) {
        console.error('Error fetching schedules:', error);
        return NextResponse.json(
            { success: false, error: 'Không thể lấy danh sách lịch trình' },
            { status: 500 }
        );
    }
}

// POST: Tạo lịch trình mới
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, type, startTime, endTime, location, createdById, groupId, isRecurring } = body;

        if (!title || !startTime || !endTime || !createdById) {
            return NextResponse.json(
                { success: false, error: 'Thiếu thông tin bắt buộc' },
                { status: 400 }
            );
        }

        const schedule = await prisma.schedule.create({
            data: {
                title,
                description: description || null,
                type: type || 'ONLINE_MEETING',
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                location: location || null,
                createdById,
                groupId: groupId || null,
                isRecurring: isRecurring || false
            },
            include: {
                createdBy: {
                    select: { id: true, fullName: true, avatarUrl: true }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Tạo lịch trình thành công',
            schedule
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating schedule:', error);
        return NextResponse.json(
            { success: false, error: 'Không thể tạo lịch trình' },
            { status: 500 }
        );
    }
}
