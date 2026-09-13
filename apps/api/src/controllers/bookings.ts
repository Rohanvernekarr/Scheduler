import type { Request, Response } from 'express';
import { bookingService } from '../services/bookings.js';
import { AvailableSlotsQuerySchema, CreateBookingSchema } from '../schemas/bookings.js';
import { ZodError } from 'zod';

export class BookingController {
  async getAvailableSlots(req: Request, res: Response): Promise<void> {
    try {
      const payload = AvailableSlotsQuerySchema.parse(req.query);
      const slots = await bookingService.getAvailableSlots(payload);
      res.json({ data: slots });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation Error', issues: error.issues });
        return;
      }
      console.error('[BookingController.getAvailableSlots]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const payload = CreateBookingSchema.parse(req.body);
      const booking = await bookingService.createBooking(payload);
      res.status(201).json({ data: booking });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Validation Error', issues: error.issues });
        return;
      }
      console.error('[BookingController.createBooking]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getHostBookings(req: Request, res: Response): Promise<void> {
    try {
      const hostId = req.params.hostId as string;
      const bookings = await bookingService.getBookingsByHost(hostId);
      res.json({ data: bookings });
    } catch (error) {
      console.error('[BookingController.getHostBookings]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async cancelBooking(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const booking = await bookingService.cancelBooking(id);
      res.json({ message: 'Booking cancelled', data: booking });
    } catch (error) {
      console.error('[BookingController.cancelBooking]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const bookingController = new BookingController();
