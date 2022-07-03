<script lang="ts">
	// TODO : install app button (no notifications otherwise due to periodic sync only working on PWA mode)

	import SearchPackages from '$components/SearchPackages.svelte';
	import {
		areNotificationsPermissionGranted,
		areNotificationsSupported
	} from '$functions/notifications';

	type PageTab = 'search' | 'watchlist';

	let selectedTab: PageTab = 'search';

	const notificationsSupported = areNotificationsSupported();
	let notificationsPermission = notificationsSupported ? Notification.permission : undefined;

	const onActivateNotificationsClicked = () => {
		if (!notificationsSupported) {
			console.log('This browser does not support notification.');
			return;
		}

		if (areNotificationsPermissionGranted()) {
			return;
		}

		if (Notification.permission !== 'denied') {
			Notification.requestPermission((permission) => {
				notificationsPermission = permission;
			});
		}
	};

	const onSearchButtonClicked = () => {
		selectedTab = 'search';
	};

	const onWatchlistButtonClicked = () => {
		selectedTab = 'watchlist';
	};
</script>

<section>
	<div class="flex items-center justify-center mt-4">
		{#if notificationsSupported}
			{#if notificationsPermission === 'granted'}
				<div class="bg-green-400 text-green-50 w-fit px-6 py-2 rounded">
					Notifications activated
				</div>
			{:else}
				<button type="button" class="block" on:click={onActivateNotificationsClicked}>
					Activate notifications
				</button>
			{/if}
		{:else}
			<div class="bg-red-400 text-red-50 w-fit px-6 py-2 rounded">
				This browser does not support notifications
			</div>
		{/if}
	</div>

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
			<!-- TODO : display watchlist -->
			<div>TODO</div>
		{/if}
	</div>
</section>
