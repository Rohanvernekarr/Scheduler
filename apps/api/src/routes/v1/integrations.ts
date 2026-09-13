import { Router } from 'express';
import { integrationController } from '../../controllers/integrations.js';

const integrationRouter: Router = Router();

integrationRouter.get('/', integrationController.list.bind(integrationController));
integrationRouter.get('/google/connect', integrationController.connectGoogle.bind(integrationController));
integrationRouter.get('/google/callback', integrationController.googleCallback.bind(integrationController));
integrationRouter.delete('/google', integrationController.disconnectGoogle.bind(integrationController));

export { integrationRouter };
