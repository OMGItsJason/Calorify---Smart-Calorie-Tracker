import { z } from 'zod';

export const logInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4)
});

export const signUpSchema = z.object({
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	gender: z.string(),
	email: z.string().email(),
	password: z.string().min(4),
	confirmPassword: z.string().min(4)
});

export type logInSchema = z.infer<typeof logInSchema>;
