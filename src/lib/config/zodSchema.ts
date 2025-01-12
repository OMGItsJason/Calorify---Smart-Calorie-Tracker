import { z } from 'zod';

export const logInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4)
});

export const signUpSchema = z
	.object({
		firstName: z.string().min(2),
		lastName: z.string().min(2),
		email: z.string().email(),
		gender: z.string(),
		password: z.string().min(4),
		confirmPassword: z.string().min(4)
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords do not match'
	});

export type logInSchema = z.infer<typeof logInSchema>;
export type signUpSchema = z.infer<typeof signUpSchema>;
