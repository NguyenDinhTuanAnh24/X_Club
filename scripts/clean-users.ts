import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Starting database cleanup...');

        // 1. Identify Users to Delete (All non-SUPER_ADMIN)
        const usersToDelete = await prisma.user.findMany({
            where: {
                role: {
                    not: 'SUPER_ADMIN'
                }
            },
            select: { id: true, email: true }
        });

        if (usersToDelete.length === 0) {
            console.log('No non-admin users found to delete.');
            return;
        }

        const userIds = usersToDelete.map(u => u.id);
        console.log(`Found ${usersToDelete.length} users to delete:`, usersToDelete.map(u => u.email));

        // 2. Delete Related Data (Manually for safety, though cascade might handle some)

        // Subscriptions
        const deletedSubs = await prisma.subscription.deleteMany({
            where: { userId: { in: userIds } }
        });
        console.log(`Deleted ${deletedSubs.count} subscriptions.`);

        // Group Members
        const deletedMembers = await prisma.groupMember.deleteMany({
            where: { userId: { in: userIds } }
        });
        console.log(`Deleted ${deletedMembers.count} group memberships.`);

        // Attendance Logs
        const deletedLogs = await prisma.attendanceLog.deleteMany({
            where: { userId: { in: userIds } }
        });
        console.log(`Deleted ${deletedLogs.count} attendance logs.`);

        // Mentor Reviews (User as Mentor)
        await prisma.mentorReview.deleteMany({
            where: { mentorId: { in: userIds } }
        });

        // Mentor Reviews (On User's Submissions)
        const userSubmissions = await prisma.submission.findMany({
            where: { userId: { in: userIds } },
            select: { id: true }
        });
        const submissionIds = userSubmissions.map(s => s.id);

        if (submissionIds.length > 0) {
            const deletedReviewsOnSubs = await prisma.mentorReview.deleteMany({
                where: { submissionId: { in: submissionIds } }
            });
            console.log(`Deleted ${deletedReviewsOnSubs.count} reviews on user submissions.`);
        }

        // Submissions
        const deletedSubmissions = await prisma.submission.deleteMany({
            where: { userId: { in: userIds } }
        });
        console.log(`Deleted ${deletedSubmissions.count} submissions.`);

        // Discipline Reports
        const deletedReports = await prisma.disciplineReport.deleteMany({
            where: { userId: { in: userIds } }
        });
        console.log(`Deleted ${deletedReports.count} discipline reports.`);

        // Tasks (Created By or Assigned To)
        const deletedTasks = await prisma.task.deleteMany({
            where: {
                OR: [
                    { createdById: { in: userIds } },
                    { assignedToId: { in: userIds } }
                ]
            }
        });
        console.log(`Deleted ${deletedTasks.count} tasks.`);

        // Schedules (Created By these users)
        const deletedSchedules = await prisma.schedule.deleteMany({
            where: { createdById: { in: userIds } }
        });
        console.log(`Deleted ${deletedSchedules.count} schedules.`);

        // 3. Finally, Delete the Users
        const deletedUsers = await prisma.user.deleteMany({
            where: { id: { in: userIds } }
        });

        console.log(`Successfully deleted ${deletedUsers.count} users.`);
        console.log('Cleanup complete. Only SUPER_ADMIN remains.');

    } catch (error) {
        console.error('Error cleaning up database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
