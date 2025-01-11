<script lang="ts">
	import SplashScreen from '@/components/container/splashScreen.svelte';
	import { onDestroy, onMount } from 'svelte';
	import Form from '@/components/container/logInForm.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let splashTimer: number;
	let showSplash: boolean = $state(true);

	onMount(() => {
		splashTimer = setInterval(() => {
			showSplash = false;
		}, 3500);
	});

	onDestroy(() => {
		clearInterval(splashTimer);
	});
</script>

{#if showSplash}
	<SplashScreen />
{:else}
	<div
		class="bg-custom-gradient flex h-svh w-svw items-center justify-center px-5 md:space-x-24 md:px-16"
	>
		<div class="hidden md:block">
			<p class="font-sansSerif text-9xl tracking-wide">Calorify Where Health Meets Simplicity.</p>
		</div>
		<Form {data} />
	</div>
{/if}
