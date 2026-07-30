import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function createUser(input: {
  email: string;
  password: string;
  role: "CANDIDATE" | "RECRUITER";
}) {
  return prisma.user.create({ data: input });
}
