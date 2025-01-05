import { z } from 'zod';

export const logInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4)
});

export type logInSchema = z.infer<typeof logInSchema>;
