import prisma from '@/lib/db';
import { MembershipTier, GroupStatus, UserRole } from '@prisma/client';

/**
 * SERVICE: Auto Grouping
 * Logic: Tìm nhóm còn trống (<16) hoặc tạo mới.
 */

export const GroupingService = {

    async assignUserToGroup(userId: string, tier: MembershipTier) {
        // 1. Check if user already in group
        const existingMember = await prisma.groupMember.findUnique({
            where: { userId }
        });

        if (existingMember) {
            throw new Error("User is already in a group.");
        }

        // 2. Transaction to ensure Atomicity
        const result = await prisma.$transaction(async (tx) => {

            // Step A: Find an OPEN group of same Tier with < 16 members
            // Prioritize oldest created group to fill them up first (FIFO)
            const openGroup = await tx.group.findFirst({
                where: {
                    tier: tier,
                    status: GroupStatus.OPEN,
                    currentMemberCount: { lt: 16 }
                },
                orderBy: { createdAt: 'asc' }
            });

            let targetGroupId = openGroup?.id;

            // Step B: If no open group found, CREATE NEW one
            if (!targetGroupId) {
                // Generate name logic, e.g., "MEMBER-TIER-05"
                const count = await tx.group.count({ where: { tier } });
                const newGroupName = `${tier}-SQUAD-${(count + 1).toString().padStart(2, '0')}`;

                const newGroup = await tx.group.create({
                    data: {
                        name: newGroupName,
                        tier: tier,
                        status: GroupStatus.OPEN,
                        currentMemberCount: 0 // Will increment below
                    }
                });
                targetGroupId = newGroup.id;
                console.log(`[AutoGrouping] Created new group: ${newGroupName}`);
            }

            // Step C: Add Member to Group
            await tx.groupMember.create({
                data: {
                    userId: userId,
                    groupId: targetGroupId,
                    isLeader: false // Default false
                }
            });

            // Step D: Increment Counter & Check if FULL
            const updatedGroup = await tx.group.update({
                where: { id: targetGroupId },
                data: {
                    currentMemberCount: { increment: 1 }
                }
            });

            // Step E: If count reaches 16, CLOSE the group
            if (updatedGroup.currentMemberCount >= 16) {
                await tx.group.update({
                    where: { id: targetGroupId },
                    data: { status: GroupStatus.CLOSED }
                });
                console.log(`[AutoGrouping] Group ${updatedGroup.name} is now FULL (CLOSED).`);
            }

            return { success: true, groupName: updatedGroup.name, groupId: updatedGroup.id };
        });

        return result;
    },

    /**
     * Helper: Tìm Mentor phù hợp để assign monitor group (Optional logic)
     */
    async assignMentorToGroup(groupId: string) {
        // Future logic: Randomly pick a mentor or Round-robin
    }
};
