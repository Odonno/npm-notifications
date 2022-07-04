<script lang="ts">
	import { browser } from '$app/env';
	import SearchPackages from '$components/SearchPackages.svelte';
	import Watchlist from '$components/Watchlist.svelte';

	type PageTab = 'search' | 'watchlist';
	type DisplayModeLaunch = 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser tab';

	let selectedTab: PageTab = 'search';
	let displayModeLaunch: DisplayModeLaunch | undefined;
	let deferredPrompt: any;

	const onInstallAppButtonClicked = async () => {
		if (deferredPrompt !== undefined) {
			deferredPrompt.prompt();

			const { outcome } = await deferredPrompt.userChoice;

			if (outcome === 'accepted') {
				deferredPrompt = undefined;
			}
		}
	};

	const onSearchButtonClicked = () => {
		selectedTab = 'search';
	};

	const onWatchlistButtonClicked = () => {
		selectedTab = 'watchlist';
	};

	if (browser) {
		window.addEventListener('beforeinstallprompt', (e) => {
			deferredPrompt = e;
		});

		if (window.matchMedia('(display-mode: standalone)').matches) {
			displayModeLaunch = 'standalone';
		} else {
			displayModeLaunch = 'browser tab';
		}
	}
</script>

{#if displayModeLaunch === 'browser tab' && !!deferredPrompt}
	<div class="w-full p-2 text-xs bg-blue-600 text-blue-100 flex items-center justify-center">
		<div class="mr-1">
			This app is designed to run as a PWA. Please install it to use all of its features.
		</div>

		<button
			type="button"
			class="ml-1 px-3 py-1.5 border border-white rounded"
			on:click={onInstallAppButtonClicked}
		>
			Install app
		</button>
	</div>
{/if}

<nav class="mt-6 flex items-center justify-center">
	<button
		type="button"
		class="p-4 border-2 border-gray-100 disabled:border-none w-40"
		disabled={selectedTab === 'search'}
		on:click={onSearchButtonClicked}
	>
		Search packages
	</button>
	<button
		type="button"
		class="p-4 border-2 border-gray-100 disabled:border-none w-40"
		disabled={selectedTab === 'watchlist'}
		on:click={onWatchlistButtonClicked}
	>
		Watchlist
	</button>
</nav>

<div class="mt-4">
	{#if selectedTab === 'search'}
		<SearchPackages />
	{:else}
		<Watchlist />
	{/if}
</div>
