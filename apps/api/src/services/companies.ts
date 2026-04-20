import { prisma } from '@repo/db';
import type { CreateCompanyInput } from '../schemas/companies.js';

export class CompanyService {
  async createCompany(data: CreateCompanyInput) {
    return prisma.company.create({
      data: {
        name: data.name,
        domain: data.domain ?? null,
      },
    });
  }

  async getCompanyById(id: string) {
    return prisma.company.findUnique({
      where: { id },
      include: {
        _count: {
          select: { users: true }
        }
      }
    });
  }

  async getAllCompanies() {
    return prisma.company.findMany();
  }
}

export const companyService = new CompanyService();
