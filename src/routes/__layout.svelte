<script lang="ts">
	import { browser } from '$app/env';
	import Layout from '$components/Layout.svelte';
	import '../app.css';

	async function registerBackgroundTask() {
		if (!browser) {
			return;
		}

		const SECOND = 1000;
		const MINUTE = 60 * SECOND;
		const HOUR = 60 * MINUTE;
		const DAY = 24 * HOUR;

		try {
			const registration = await navigator.serviceWorker.ready;

			if ('periodicSync' in registration) {
				await (registration as any).periodicSync.register('notifications-background', {
					minInterval: DAY
				});
			} else {
				console.log('Periodic Sync could not be registered!');
			}
		} catch {
			console.log('Periodic Sync could not be registered!');
		}
	}

	registerBackgroundTask();
</script>

<svelte:head>
	<title>npm notifications</title>
</svelte:head>

<Layout>
	<slot />
</Layout>
