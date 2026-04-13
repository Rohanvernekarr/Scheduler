import { z } from 'zod';

export const CreateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  hostId: z.string().min(1),
  meetingLink: z.string().url().optional(),
  participants: z.array(z.string().email()).optional(),
});

export type CreateEventInput = z.infer<typeof CreateEventSchema>;
