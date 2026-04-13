import { z } from 'zod';

export const CreateCompanySchema = z.object({
  name: z.string().min(1),
  domain: z.string().optional(),
});

export type CreateCompanyInput = z.infer<typeof CreateCompanySchema>;
