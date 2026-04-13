import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  name: z.string().min(1),
  companyId: z.string().min(1),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
