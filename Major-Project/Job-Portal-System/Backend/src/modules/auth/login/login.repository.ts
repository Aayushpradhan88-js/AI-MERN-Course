import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function findUserForLogin(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: { candidateProfile: { select: { fullname: true } } },
  });
}
