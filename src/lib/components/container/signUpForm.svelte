<script lang="ts">
	import Logo from '@/assets/logo/CalorifyNoLabel.png?enhanced';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Form from '@/components/ui/form';
	import * as Card from '@/components/ui/card';
	import * as Popover from '@/components/ui/popover';
	import * as Command from '@/components/ui/command';
	import { Input } from '@/components/ui/input';
	import { signUpSchema } from '@/config/zodSchema';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import toast, { Toaster } from 'svelte-french-toast';
	import { tick } from 'svelte';
	import { useId } from 'bits-ui';
	import { cn } from '@/utils.js';

	let { data } = $props();
	let genderCB = $state(false);

	export const form = superForm(data.form, {
		validators: zodClient(signUpSchema),
		async onResult({ result }) {
			if (result.type === 'error') {
				toast.error(result.error.message);
			} else if (result.type === 'success') {
				toast.success('Sign up successfully!');
			}
		}
	});

	const { form: formData, enhance } = form;

	const gender = [
		{ label: 'Male', value: 'Male' },
		{ label: 'Female', value: 'Female' },
		{ label: 'Rather Not Say', value: 'Rather Not Say' }
	];

	function closeAndFocusTrigger(triggerId: string) {
		genderCB = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	const triggerId = useId();
</script>

<div class="absolute top-1 w-96">
	<SuperDebug data={$formData} />
</div>
<Toaster />
<Card.Root>
	<Card.Header class="flex items-center text-center font-sansSerif text-2xl">
		<Card.Title>
			<enhanced:img src={Logo} alt="Calorify" class="size-24" />
			SIGN UP
		</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-3 md:space-y-5">
		<form method="post" use:enhance class="flex flex-col items-center justify-center">
			<Form.Field {form} name="firstName" class="w-80 md:w-96">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>First Name</Form.Label>
						<Input
							type="text"
							placeholder="First Name"
							{...props}
							bind:value={$formData.firstName}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="lastName" class="w-80 md:w-96">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Last Name</Form.Label>
						<Input type="text" placeholder="Last Name" {...props} bind:value={$formData.lastName} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="email" class="w-80 md:w-96">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input type="email" placeholder="Email" {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="gender" class="w-80 md:w-96">
				<Popover.Root bind:open={genderCB}>
					<Form.Control id={triggerId}>
						{#snippet children({ props })}
							<Form.Label>Gender</Form.Label>
							<Popover.Trigger
								role="combobox"
								{...props}
								class="flex w-full items-center justify-between rounded-md border p-2 text-start text-muted-foreground md:text-sm"
							>
								{gender.find((f) => f.value === $formData.gender)?.label ?? 'Select Gender'}
								<ChevronsUpDown class="size-4 opacity-50" />
							</Popover.Trigger>
							<input hidden value={$formData.gender} name={props.name} />
						{/snippet}
					</Form.Control>
					<Popover.Content class="p-0 md:w-96">
						<Command.Root class="w-full">
							<Command.Group>
								{#each gender as gen}
									<Command.Item
										value={gen.value}
										onSelect={() => {
											$formData.gender = gen.value;
											closeAndFocusTrigger(triggerId);
										}}
									>
										{gen.label}
										<Check class={cn(gen.value !== $formData.gender && 'text-transparent')} />
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
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
			<Form.Field {form} name="confirmPassword" class="w-80 md:w-96">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm Password</Form.Label>
						<Input
							type="password"
							placeholder="Confirm Password"
							{...props}
							bind:value={$formData.confirmPassword}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button
				formaction="?/logIn"
				class="mt-5 w-full bg-blue-500 font-sans text-base hover:bg-blue-600"
			>
				Log In
			</Form.Button>
		</form>
	</Card.Content>
	<Card.Footer class="flex justify-center gap-1">
		<p>Already have account?</p>
		<a href="/" class="text-orange-600 hover:underline">Log In</a>
	</Card.Footer>
</Card.Root>
