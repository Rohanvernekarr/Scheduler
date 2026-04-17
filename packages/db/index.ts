import pkg from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export * from '@prisma/client';

// Safe extraction of PrismaClient from the package
const PrismaClient = (pkg as any).PrismaClient || pkg;

const globalForPrisma = globalThis as unknown as {
  prisma: any;
};

const connectionString = process.env.DATABASE_URL || 'postgresql://dummy';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
