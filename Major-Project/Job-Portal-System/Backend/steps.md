step1: pnpm init

step2: pnpm add express dotenv cors cookie-parser bcryptjs jsonwebtoken zod @prisma/client

step3: pnpm add -D typescript ts-node-dev @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken @types/cookie-parser prisma

step4: pnpm tsc --init

step5: pnpm prisma init 

step6: pnpm add @prisma/client@5.22.0

step7: pnpm add -D @prisma@5.22.0

step8: connect supabase connection url 

step9: pnpm prisma generate

step10: pnpm prisma migrate dev --name init