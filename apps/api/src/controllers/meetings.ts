import type { Request, Response } from 'express';
import { meetingService } from '../services/meetings.js';
import { CreateMeetingSchema } from '../schemas/meetings.js';
import { ZodError } from 'zod';

export class MeetingController {
  
  async getMeetings(req: Request, res: Response): Promise<void> {
    try {
      // In a real app, userId would come from authentication middleware (e.g. req.user)
      const userId = req.query.userId as string;
      if (!userId) {
        res.status(400).json({ error: 'Missing userId parameter' });
        return;
      }
      
      const meetings = await meetingService.getMeetingsByUserId(userId);
      res.json({ data: meetings });
    } catch (error) {
      console.error('[MeetingController.getMeetings]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createMeeting(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const payload = CreateMeetingSchema.parse(req.body);
      
      const meeting = await meetingService.createMeeting(payload);
      res.status(201).json({ data: meeting });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation Error', issues: error.issues });
        return;
      }
      console.error('[MeetingController.createMeeting]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const meetingController = new MeetingController();
