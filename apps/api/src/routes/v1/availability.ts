import { Router } from 'express';
import { availabilityController } from '../../controllers/availability.js';

const availabilityRouter: Router = Router();

availabilityRouter.get('/:userId', availabilityController.getAvailability.bind(availabilityController));
availabilityRouter.put('/:userId', availabilityController.updateAvailability.bind(availabilityController));

export { availabilityRouter };
