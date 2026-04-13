import { z } from 'zod';

export const CreateMeetingSchema = z.object({
  title: z.string().min(3, 'Title is too short').max(100, 'Title is too long'),
  type: z.string().default('Meeting'),
  description: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  hostId: z.string(),
  meetingLink: z.string().url().optional(),
  participants: z.array(z.string().email()).optional(),
});

export type CreateMeetingInput = z.infer<typeof CreateMeetingSchema>;
