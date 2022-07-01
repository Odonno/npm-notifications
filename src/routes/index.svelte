<script lang="ts">
	// TODO : register/unregister for push notifications
	// TODO : handle push notifications using Service Worker
	// TODO : packages pagination
	// TODO : display watchlist

	import PackageCard from '$components/PackageCard.svelte';

	let search = '';

	let page = 1;
	let totalPages = 1;
	let displayedPackages: any[] = [];

	$: {
		page = 1;
		totalPages = 1;

		const from = page - 1;

		fetch(`https://registry.npmjs.org/-/v1/search?text=${search}&from=${from}`)
			.then((response) => response.json())
			.then((result) => {
				const { objects, total } = result;

				displayedPackages = objects.map((o: any) => o.package);
				totalPages = total;
			});
	}
</script>

<button type="button" class="block">Activate notifications</button>

<button type="button">Search packages</button>
<button type="button">Watchlist</button>

<div>
	<input type="search" bind:value={search} placeholder="Search packages" />
</div>

<ol>
	{#each displayedPackages as displayedPackage (displayedPackage.name)}
		<li class="m-4 shadow-md p-4">
			<PackageCard {displayedPackage} />
		</li>
	{/each}
</ol>
