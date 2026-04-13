import type { Request, Response } from 'express';
import { companyService } from '../services/companies.js';
import { CreateCompanySchema } from '../schemas/companies.js';
import { ZodError } from 'zod';

export class CompanyController {
  async createCompany(req: Request, res: Response): Promise<void> {
    try {
      const payload = CreateCompanySchema.parse(req.body);
      const company = await companyService.createCompany(payload);
      res.status(201).json({ data: company });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation Error', issues: error.issues });
        return;
      }
      console.error('[CompanyController.createCompany]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getCompany(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const company = await companyService.getCompanyById(id);
      
      if (!company) {
        res.status(404).json({ error: 'Company not found' });
        return;
      }
      
      res.json({ data: company });
    } catch (error) {
      console.error('[CompanyController.getCompany]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async listCompanies(req: Request, res: Response): Promise<void> {
    try {
      const companies = await companyService.getAllCompanies();
      res.json({ data: companies });
    } catch (error) {
      console.error('[CompanyController.listCompanies]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const companyController = new CompanyController();
