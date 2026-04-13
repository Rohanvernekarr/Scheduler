import type { Request, Response } from 'express';
import { interviewService } from '../services/interviews.js';
import { CreateInterviewSchema } from '../schemas/interviews.js';
import { ZodError } from 'zod';

export class InterviewController {
  async createInterview(req: Request, res: Response): Promise<void> {
    try {
      const payload = CreateInterviewSchema.parse(req.body);
      const interview = await interviewService.createInterview(payload);
      res.status(201).json({ data: interview });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation Error', issues: error.issues });
        return;
      }
      console.error('[InterviewController.createInterview]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getInterviewerInterviews(req: Request, res: Response): Promise<void> {
    try {
      const interviewerId = req.params.interviewerId as string;
      const interviews = await interviewService.getInterviewsByInterviewer(interviewerId);
      res.json({ data: interviews });
    } catch (error) {
      console.error('[InterviewController.getInterviewerInterviews]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async setFeedback(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { feedback } = req.body;
      
      if (!feedback) {
        res.status(400).json({ error: 'Feedback is required' });
        return;
      }

      const interview = await interviewService.updateFeedback(id, feedback);
      res.json({ data: interview });
    } catch (error) {
      console.error('[InterviewController.setFeedback]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const interviewController = new InterviewController();
