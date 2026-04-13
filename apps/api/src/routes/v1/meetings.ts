import { Router } from 'express';
import { meetingController } from '../../controllers/meetings.js';

const meetingRouter: Router = Router();

// Map route paths to controller methods
meetingRouter.get('/', meetingController.getMeetings.bind(meetingController));
meetingRouter.post('/', meetingController.createMeeting.bind(meetingController));

export { meetingRouter };
