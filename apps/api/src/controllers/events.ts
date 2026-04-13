import type { Request, Response } from 'express';
import { eventService } from '../services/events.js';
import { CreateEventSchema } from '../schemas/events.js';
import { ZodError } from 'zod';

export class EventController {
  async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const payload = CreateEventSchema.parse(req.body);
      const event = await eventService.createEvent(payload);
      res.status(201).json({ data: event });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation Error', issues: error.issues });
        return;
      }
      console.error('[EventController.createEvent]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getHostEvents(req: Request, res: Response): Promise<void> {
    try {
      const hostId = req.params.hostId as string;
      const events = await eventService.getEventsByHost(hostId);
      res.json({ data: events });
    } catch (error) {
      console.error('[EventController.getHostEvents]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const eventController = new EventController();
