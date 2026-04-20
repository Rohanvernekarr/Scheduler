import { prisma, Prisma } from '@repo/db';
import type { UpdateAvailabilityInput } from '../schemas/availability.js';

export class AvailabilityService {
  /**
   * Updates availability for a specific user.
   * This clears existing availability for that user and sets new ones.
   */
  async updateAvailability(userId: string, data: UpdateAvailabilityInput) {
    // We use a transaction to ensure atomic update
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Delete all existing availability records for the user
      await tx.availability.deleteMany({
        where: { userId }
      });

      // 2. Create new records
      const records = await tx.availability.createMany({
        data: data.map(item => ({
          userId: userId,
          dayOfWeek: item.dayOfWeek,
          startTime: item.startTime,
          endTime: item.endTime,
        }))
      });

      return records;
    });
  }

  /**
   * Retrieves availability for a user
   */
  async getAvailabilityByUserId(userId: string) {
    return prisma.availability.findMany({
      where: { userId },
      orderBy: { dayOfWeek: 'asc' }
    });
  }
}

export const availabilityService = new AvailabilityService();
