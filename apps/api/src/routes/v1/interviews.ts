import { Router } from 'express';
import { interviewController } from '../../controllers/interviews.js';

const interviewRouter: Router = Router();

interviewRouter.post('/', interviewController.createInterview.bind(interviewController));
interviewRouter.get('/interviewer/:interviewerId', interviewController.getInterviewerInterviews.bind(interviewController));
interviewRouter.patch('/:id/feedback', interviewController.setFeedback.bind(interviewController));

export { interviewRouter };
