import { z } from 'zod';

export const CreateBookingSchema = z.object({
  hostId: z.string().min(1),
  guestEmail: z.string().email(),
  startTime: z.string().datetime(), // Expects ISO string
  endTime: z.string().datetime(),   // Expects ISO string
});

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
