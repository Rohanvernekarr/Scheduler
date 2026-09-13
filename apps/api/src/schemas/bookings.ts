import { z } from 'zod';

export const CreateBookingSchema = z.object({
  hostId: z.string().min(1),
  guestName: z.string().min(1).max(120),
  guestEmail: z.string().email(),
  title: z.string().min(1).max(160).optional(),
  timeZone: z.string().min(1).max(80).optional(),
  startTime: z.string().datetime(), // Expects ISO string
  endTime: z.string().datetime(),   // Expects ISO string
});

export const AvailableSlotsQuerySchema = z.object({
  hostId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected date in YYYY-MM-DD format'),
  timeZone: z.string().min(1).max(80).default('UTC'),
  duration: z.coerce.number().int().min(15).max(240).default(30),
});

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
export type AvailableSlotsQueryInput = z.infer<typeof AvailableSlotsQuerySchema>;
