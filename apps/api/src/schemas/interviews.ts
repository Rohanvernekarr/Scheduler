import { z } from 'zod';

export const CreateInterviewSchema = z.object({
  candidateEmail: z.string().email(),
  interviewerId: z.string().min(1),
  scheduledAt: z.string().datetime(),
  meetingLink: z.string().url().optional(),
  feedback: z.string().optional(),
});

export type CreateInterviewInput = z.infer<typeof CreateInterviewSchema>;
