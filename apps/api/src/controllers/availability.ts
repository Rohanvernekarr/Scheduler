import type { Request, Response } from 'express';
import { availabilityService } from '../services/availability.js';
import { UpdateAvailabilitySchema } from '../schemas/availability.js';
import { ZodError } from 'zod';

export class AvailabilityController {
  async getAvailability(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as string;
      const availability = await availabilityService.getAvailabilityByUserId(userId);
      res.json({ data: availability });
    } catch (error) {
      console.error('[AvailabilityController.getAvailability]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateAvailability(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as string;
      const payload = UpdateAvailabilitySchema.parse(req.body);
      
      const result = await availabilityService.updateAvailability(userId, payload);
      res.json({ message: 'Availability updated successfully', data: result });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation Error', issues: error.issues });
        return;
      }
      console.error('[AvailabilityController.updateAvailability]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const availabilityController = new AvailabilityController();
