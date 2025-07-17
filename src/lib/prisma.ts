import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  // Use Turso for production
  if (process.env.DATABASE_URL?.includes("libsql://")) {
    // For libSQL/Turso, Prisma currently expects DATABASE_URL to be set correctly.
    // Remove the adapter usage and just instantiate PrismaClient.
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query"] : [],
    });
  }
  
  // Use local SQLite for development
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;