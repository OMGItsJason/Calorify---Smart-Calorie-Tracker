import type { PageServerLoad } from './$types';
import { signUpSchema } from '$lib/config/zodSchema';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(signUpSchema));
	return {
		form: form
	};
};
