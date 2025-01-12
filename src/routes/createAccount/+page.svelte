<script lang="ts">
	import Form from '@/components/container/signUpForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div
	class="bg-custom-gradient flex h-svh w-svw items-center justify-center px-5 md:space-x-24 md:px-16"
>
	<div class="hidden md:block">
		<p class="font-sansSerif text-9xl tracking-wide">Your Fitness Journey Begins Here.</p>
	</div>
	<Form {data} />
</div>
