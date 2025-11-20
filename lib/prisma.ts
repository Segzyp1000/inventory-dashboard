import { PrismaClient } from "../app/generated/prisma/index.js"; // 👈 CORRECTED IMPORT PATH
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;