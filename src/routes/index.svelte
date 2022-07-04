<script lang="ts">
	// TODO : install app button (no notifications otherwise due to periodic sync only working on PWA mode)

	import SearchPackages from '$components/SearchPackages.svelte';
	import Watchlist from '$components/Watchlist.svelte';

	type PageTab = 'search' | 'watchlist';

	let selectedTab: PageTab = 'search';

	const onSearchButtonClicked = () => {
		selectedTab = 'search';
	};

	const onWatchlistButtonClicked = () => {
		selectedTab = 'watchlist';
	};
</script>

<section>
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
</section>
