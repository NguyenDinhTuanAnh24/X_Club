import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const emailToDelete = "anh249205@gmail.com";
        console.log(`Searching for user ${emailToDelete}...`);

        const user = await prisma.user.findUnique({
            where: { email: emailToDelete }
        });

        if (!user) {
            console.log('User not found.');
            return;
        }

        if (user.role === 'SUPER_ADMIN') {
            // Double check if this is THE legit admin
            if (user.email === 'admin@xclub.com') {
                console.log("Cannot delete the main admin account!");
                return;
            }
        }

        const userId = user.id;

        // Delete related data first
        await prisma.subscription.deleteMany({ where: { userId } });
        await prisma.groupMember.deleteMany({ where: { userId } });
        await prisma.attendanceLog.deleteMany({ where: { userId } });
        await prisma.mentorReview.deleteMany({ where: { mentorId: userId } });

        // Careful with submissions and their reviews
        const submissions = await prisma.submission.findMany({ where: { userId }, select: { id: true } });
        const subIds = submissions.map(s => s.id);
        if (subIds.length > 0) {
            await prisma.mentorReview.deleteMany({ where: { submissionId: { in: subIds } } });
            await prisma.submission.deleteMany({ where: { userId } });
        }

        await prisma.disciplineReport.deleteMany({ where: { userId } });
        await prisma.task.deleteMany({ where: { OR: [{ createdById: userId }, { assignedToId: userId }] } });
        await prisma.schedule.deleteMany({ where: { createdById: userId } });

        // Finally delete user
        await prisma.user.delete({ where: { id: userId } });
        console.log(`Successfully deleted user: ${emailToDelete}`);

    } catch (error) {
        console.error('Error deleting user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
