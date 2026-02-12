import { PrismaClient, UserRole, ScheduleType, TaskPriority, TaskStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seeding...')

  // 1. Membership Tiers
  const bronzeTier = await prisma.membershipTier.upsert({
    where: { name: 'Bronze' },
    update: {},
    create: {
      name: 'Bronze',
      price: 2000000,
      durationDays: 30,
    },
  })

  const silverTier = await prisma.membershipTier.upsert({
    where: { name: 'Silver' },
    update: {},
    create: {
      name: 'Silver',
      price: 4000000,
      durationDays: 30,
    },
  })

  const goldTier = await prisma.membershipTier.upsert({
    where: { name: 'Gold' },
    update: {},
    create: {
      name: 'Gold',
      price: 8000000,
      durationDays: 30,
    },
  })

  const platinumTier = await prisma.membershipTier.upsert({
    where: { name: 'Platinum' },
    update: {},
    create: {
      name: 'Platinum',
      price: 15000000,
      durationDays: 30,
    },
  })
  console.log('Membership Tiers seeded (Bronze, Silver, Gold, Platinum).')

  // 2. Users
  // Create Super Admin (Unique)
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@xclub.com' },
    update: {},
    create: {
      email: 'admin@xclub.com',
      passwordHash: 'hashed_admin_password', // In real app, hash this
      fullName: 'System Administrator',
      role: UserRole.SUPER_ADMIN,
      status: 'ACTIVE',
      avatarUrl: 'https://ui-avatars.com/api/?name=System+Admin&background=0D8ABC&color=fff'
    }
  })

  // Create Main User (user-123) for testing
  const mainUser = await prisma.user.upsert({
    where: { id: 'user-123' },
    update: {},
    create: {
      id: 'user-123',
      email: 'nguyenvana@gmail.com',
      passwordHash: 'hashed_password_123',
      fullName: 'Nguyễn Văn A',
      role: UserRole.STUDENT,
      status: 'ACTIVE',
      avatarUrl: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random'
    }
  })

  // Create Instructor User
  const mentorUser = await prisma.user.upsert({
    where: { email: 'mentor@xclub.com' },
    update: {},
    create: {
      email: 'mentor@xclub.com',
      passwordHash: 'hashed_password_mentor',
      fullName: 'Mentor X',
      role: UserRole.INSTRUCTOR,
      status: 'ACTIVE'
    }
  })
  console.log('Users seeded (Admin, Student, Instructor).')

  // 3. Subscription for Main User
  await prisma.subscription.upsert({
    where: { userId: mainUser.id },
    update: {},
    create: {
      userId: mainUser.id,
      tierId: bronzeTier.id,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      status: 'ACTIVE'
    }
  })
  console.log('Subscription seeded.')

  // 4. Group
  const group = await prisma.group.upsert({
    where: { id: 'group-01' },
    update: {},
    create: {
      id: 'group-01',
      name: 'Nhóm 01 - Khởi nghiệp',
      status: 'OPEN',
      currentMemberCount: 1
    }
  })

  // Add User to Group
  await prisma.groupMember.upsert({
    where: {
      groupId_userId: {
        groupId: group.id,
        userId: mainUser.id
      }
    },
    update: {},
    create: {
      groupId: group.id,
      userId: mainUser.id,
      roleInGroup: 'LEADER'
    }
  })
  console.log('Group and Membership seeded.')

  // 5. Meeting (meeting-123 matches frontend mock)
  const meetingStartTime = new Date();
  meetingStartTime.setHours(20, 30, 0, 0); // Today 20:30

  const meetingEndTime = new Date(meetingStartTime);
  meetingEndTime.setHours(22, 0, 0, 0); // Today 22:00

  await prisma.meeting.upsert({
    where: { id: 'meeting-123' },
    update: {
      startTime: meetingStartTime,
      endTime: meetingEndTime,
    },
    create: {
      id: 'meeting-123',
      groupId: group.id,
      title: 'Phiên họp Chiến lược Quý 4',
      startTime: meetingStartTime,
      endTime: meetingEndTime,
      weekNumber: 42,
      meetLink: 'https://meet.google.com/abc-defg-hij'
    }
  })
  console.log('Meeting seeded.')

  // 6. Tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Hoàn thành báo cáo tài chính',
        description: 'Tổng hợp số liệu Q3 và dự báo Q4',
        priority: TaskPriority.HIGH,
        status: TaskStatus.TODO,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        createdById: mainUser.id,
      },
      {
        title: 'Đọc sách "Từ tốt đến vĩ đại"',
        description: 'Chương 1-3',
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.IN_PROGRESS,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
        createdById: mainUser.id,
      }
    ],
    skipDuplicates: true
  })
  console.log('Tasks seeded.')

  // 7. Schedules
  await prisma.schedule.createMany({
    data: [
      {
        title: 'Họp Monthly Review',
        type: ScheduleType.ONLINE_MEETING,
        startTime: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
        endTime: new Date(new Date().setDate(new Date().getDate() + 1)),
        location: 'Zoom',
        createdById: mainUser.id,
      },
      {
        title: 'Workshop: Xây dựng thương hiệu cá nhân',
        type: ScheduleType.WORKSHOP,
        startTime: new Date(new Date().setDate(new Date().getDate() + 7)), // Next week
        endTime: new Date(new Date().setDate(new Date().getDate() + 7)),
        location: 'Offline - HCM',
        createdById: mainUser.id,
      }
    ],
    skipDuplicates: true
  })
  console.log('Schedules seeded.')

  console.log('Seeding completed successfully.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
