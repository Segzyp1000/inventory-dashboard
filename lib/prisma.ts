import { PrismaClient } from '@prisma/client' // <--- Use the standard package import

// Add prisma to the NodeJS global type to prevent multiple instances in development
declare global {
  var prisma: PrismaClient | undefined
}

// Use a global variable to store the Prisma client instance
export const prisma = global.prisma || new PrismaClient({
  log: ['query'], // Example: Log all database queries
})

// In production, we don't use the global variable
if (process.env.NODE_ENV !== 'production') global.prisma = prisma