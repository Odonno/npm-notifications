<script lang="ts">
	import PackageCard from '$components/PackageCard.svelte';

	let search = '';

	const itemsPerPage = 20;

	let page = 1;
	let totalItems = 1;
	let displayedPackages: any[] = [];

	$: {
		page = 1;
		totalItems = 1;

		const from = page - 1;

		fetch(`https://registry.npmjs.org/-/v1/search?text=${search}&from=${from}`)
			.then((response) => response.json())
			.then((result) => {
				const { objects, total } = result;

				displayedPackages = objects.map((o: any) => o.package);
				totalItems = total;
			});
	}
</script>

<div class="p-2">
	<div class="m-2 mb-0">
		<input
			type="search"
			bind:value={search}
			class="w-full p-2 bg-gray-100 h-[40px]"
			placeholder="Search packages"
			autocomplete="off"
		/>
	</div>
</div>

{#if totalItems}
	<div class="font-bold p-4 bg-gray-100 text-lg">
		{totalItems} packages found
		<!-- TODO : packages pagination -->
	</div>
{/if}

<ol>
	{#each displayedPackages as displayedPackage (displayedPackage.name)}
		<li class="mx-2 border-b border-gray-200 p-4">
			<PackageCard {displayedPackage} />
		</li>
	{/each}
</ol>
