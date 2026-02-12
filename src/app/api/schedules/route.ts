import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, description, startTime, endTime, location, groupId, type, email } = body;

        // Basic validation
        if (!title || !startTime || !endTime) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Find the creator
        let creator;
        if (email) {
            creator = await prisma.user.findUnique({
                where: { email }
            });
        }

        // Fallback or validation
        if (!creator) {
            // Fallback for testing if no email passed or user not found
            creator = await prisma.user.findFirst({
                where: { role: 'GROUP_LEADER' }
            });
        }

        if (!creator) {
            return NextResponse.json(
                { error: 'User not found or unauthorized' },
                { status: 403 }
            );
        }

        const schedule = await prisma.schedule.create({
            data: {
                title,
                description,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                location,
                type: type || 'ONLINE_MEETING',
                groupId, // Optional: Link to specific group if provided
                createdById: creator.id
            }
        });

        return NextResponse.json(schedule, { status: 201 });
    } catch (error) {
        console.error('Error creating schedule:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
