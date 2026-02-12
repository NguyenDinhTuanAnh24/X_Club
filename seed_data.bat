@echo off
echo Seeding data...
npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" prisma/seed.ts
echo Done.
pause
