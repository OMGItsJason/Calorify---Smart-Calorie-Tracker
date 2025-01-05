<script lang="ts">
	import SplashScreen from '@/components/container/splashScreen.svelte';
	import { onDestroy, onMount } from 'svelte';

	let splashTimer: number;
	let showSplash: boolean = true;

	onMount(() => {
		splashTimer = setInterval(() => {
			showSplash = false;
		}, 3500);

		onDestroy(() => {
			clearInterval(splashTimer);
		});
	});
</script>

{#if showSplash}
	<svelte:component this={SplashScreen} />
{:else}
	<h1>Form</h1>
{/if}
