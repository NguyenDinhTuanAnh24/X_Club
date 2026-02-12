
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Testing Prisma Connection...');
  
  try {
    // Check if membershipTier model exists on prisma instance
    if (!prisma.membershipTier) {
        console.error('❌ Error: prisma.membershipTier is undefined!');
        console.error('This means the Prisma Client has not been generated with the latest schema.');
        return;
    }
    
    console.log('✅ prisma.membershipTier exists.');

    // Try to fetch tiers
    const tiers = await prisma.membershipTier.findMany();
    console.log('✅ Successfully fetched tiers:', tiers);

  } catch (error) {
    console.error('❌ Error running query:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
