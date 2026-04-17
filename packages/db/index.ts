import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export * from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: typeof PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL || 'postgresql://dummy';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
  (globalForPrisma.prisma as any) ??
  new (PrismaClient as any)({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma as any;
}
