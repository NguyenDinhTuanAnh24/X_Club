
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Mock middleware to get current user ID
// In production, use your auth provider (e.g. NextAuth session)
const getUserId = () => "user-123";

export async function GET() {
    try {
        const userId = getUserId();

        // 1. Find user's current active group (using findFirst as a user handles only one main group for now)
        const groupMember = await prisma.groupMember.findFirst({
            where: { userId },
            include: { group: true }
        });

        if (!groupMember) {
            return NextResponse.json({
                hasGroup: false,
                message: "User is not assigned to any group yet."
            });
        }

        const groupId = groupMember.groupId;

        // 2. Get all members of this group
        const squadMembers = await prisma.groupMember.findMany({
            where: { groupId },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true, // Correct field name
                        email: true,
                        role: true,
                    }
                }
            }
        });

        // 3. Format response
        const members = squadMembers.map(m => ({
            id: m.user.id,
            name: m.user.fullName, // Correct field name
            email: m.user.email,
            role: m.roleInGroup || "MEMBER", // Correct field name from GroupMember model
            company: "Doanh nghiệp Mẫu", // Placeholder
            avatar: m.user.fullName ? m.user.fullName.charAt(0).toUpperCase() : "U"
        }));

        return NextResponse.json({
            hasGroup: true,
            groupName: groupMember.group.name,
            totalMembers: groupMember.group.currentMemberCount, // Correct field name
            members: members
        });

    } catch (error: any) {
        console.error("Squad API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
