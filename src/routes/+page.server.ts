import type { Actions, PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { logInSchema } from '@/config/zodSchema';
import { error } from '@sveltejs/kit';

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

		if (!form.valid) {
			return fail(400, { form });
		}
	}
};
