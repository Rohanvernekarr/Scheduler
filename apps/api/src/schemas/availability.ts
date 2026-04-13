import { z } from 'zod';

export const AvailabilitySchema = z.object({
  userId: z.string().min(1),
  dayOfWeek: z.number().min(0).max(6), // 0 = Sunday, 1 = Monday, etc.
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
});

export const UpdateAvailabilitySchema = z.array(AvailabilitySchema);

export type AvailabilityInput = z.infer<typeof AvailabilitySchema>;
export type UpdateAvailabilityInput = z.infer<typeof UpdateAvailabilitySchema>;
