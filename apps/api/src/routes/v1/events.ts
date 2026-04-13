import { Router } from 'express';
import { eventController } from '../../controllers/events.js';

const eventRouter: Router = Router();

eventRouter.post('/', eventController.createEvent.bind(eventController));
eventRouter.get('/host/:hostId', eventController.getHostEvents.bind(eventController));

export { eventRouter };
