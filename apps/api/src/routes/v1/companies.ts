import { Router } from 'express';
import { companyController } from '../../controllers/companies.js';

const companyRouter: Router = Router();

companyRouter.get('/', companyController.listCompanies.bind(companyController));
companyRouter.get('/:id', companyController.getCompany.bind(companyController));
companyRouter.post('/', companyController.createCompany.bind(companyController));

export { companyRouter };
