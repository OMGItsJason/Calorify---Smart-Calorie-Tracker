<script lang="ts">
	import Logo from '@/assets/logo/CalorifyNoLabel.png?enhanced';
	import * as Form from '@/components/ui/form';
	import * as Card from '@/components/ui/card';
	import { Input } from '@/components/ui/input';
	import { Button } from '@/components/ui/button';
	import { Separator } from '@/components/ui/separator';
	import { logInSchema } from '@/config/zodSchema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data;

	export const form = superForm(data.form, {
		validators: zodClient(logInSchema),
		async onResult({ result }) {
			if (result.type === 'error') {
				toast.error(result.error.message);
			} else if (result.type === 'success') {
				toast.success('Login successful!');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Toaster />
<Card.Root>
	<Card.Header class="flex items-center text-center font-sansSerif text-2xl">
		<Card.Title>
			<enhanced:img src={Logo} alt="Calorify" class="size-24" />
			LOG IN
		</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-3 md:space-y-5">
		<form method="post" use:enhance class="flex flex-col items-center justify-center">
			<Form.Field {form} name="email" class="w-80 md:w-96">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input type="email" placeholder="Email" {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password" class="w-80 md:w-96">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input
							type="password"
							placeholder="Password"
							{...props}
							bind:value={$formData.password}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="mb-3 flex w-full justify-end">
				<a href="/forgotPassword" class="font-sans text-sm hover:text-orange-600"
					>Forgot Password?</a
				>
			</div>
			<Form.Button
				formaction="?/logIn"
				class="w-full bg-blue-500 font-sans text-base hover:bg-blue-600"
			>
				Log In
			</Form.Button>
		</form>
		<Separator />
		<Button variant="outline" class="flex w-full items-center justify-center font-sans text-base">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="48"
				height="48"
				viewBox="0 0 48 48"
			>
				<path
					fill="#FFC107"
					d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
				></path><path
					fill="#FF3D00"
					d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
				></path><path
					fill="#4CAF50"
					d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
				></path><path
					fill="#1976D2"
					d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
				></path>
			</svg>
			Google
		</Button>
	</Card.Content>
	<Card.Footer class="flex justify-center gap-1">
		<p>Don't have an account?</p>
		<a href="/createAccount" class="text-orange-600 hover:underline">Sign Up</a>
	</Card.Footer>
</Card.Root>
