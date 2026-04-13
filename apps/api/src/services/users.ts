import { prisma } from 'db';
import type { CreateUserInput } from '../schemas/users.js';

export class UserService {
  /**
   * Retrieves a user by their ID, including company and availability
   */
  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        company: true,
        availabilities: true,
      },
    });
  }

  /**
   * Retrieves all users within a specific tenant/company
   */
  async getUsersByCompanyId(companyId: string) {
    return prisma.user.findMany({
      where: { companyId },
    });
  }

  /**
   * Retrieves a user by their username
   */
  async getUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
      include: {
        availabilities: true,
      },
    });
  }

  /**
   * Creates a new user in the database
   */
  async createUser(data: CreateUserInput) {
    return prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        name: data.name,
        companyId: data.companyId,
      },
    });
  }
}

export const userService = new UserService();
