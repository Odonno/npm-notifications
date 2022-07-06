<script lang="ts">
	import PackageCard from '$components/PackageCard.svelte';
	import { searchStore } from '$stores/search';

	const { value, displayedPackages, page, totalPackages } = searchStore;

	const itemsPerPage = 20;

	$: {
		page.set(1);
		totalPackages.set(0);

		const from = $page - 1;

		fetch(`https://registry.npmjs.org/-/v1/search?text=${$value}&from=${from}`)
			.then((response) => response.json())
			.then((result) => {
				const { objects, total } = result;

				displayedPackages.set(objects.map((o: any) => o.package));
				totalPackages.set(total);
			});
	}
</script>

<div class="p-2">
	<div class="m-2 mb-0">
		<input
			type="search"
			bind:value={$value}
			class="w-full p-2 bg-gray-100 h-[40px]"
			placeholder="Search packages"
			autocomplete="off"
		/>
	</div>
</div>

{#if $totalPackages}
	<div class="font-bold p-4 bg-gray-100 text-lg">
		{$totalPackages} packages found
		<!-- TODO : packages pagination -->
	</div>
{/if}

<ol>
	{#each $displayedPackages as displayedPackage (displayedPackage.name)}
		<li class="mx-2 border-b border-gray-200 p-4">
			<PackageCard {displayedPackage} />
		</li>
	{/each}
</ol>
