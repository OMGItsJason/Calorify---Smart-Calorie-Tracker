import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { logInSchema } from '@/config/zodSchema';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(logInSchema));
	return {
		form
	};
};

export const actions: Actions = {
	logIn: async (event) => {
		const form = await superValidate(event, zod(logInSchema));
		const { email, password } = form.data;
	}
};
