<script lang="ts">
	import PackageCard from '$components/PackageCard.svelte';
	import { searchStore } from '$stores/search';
	import { page } from '$app/stores';

	$: pageParam = $page.url.searchParams.get('page');
	$: currentPage = pageParam ? parseInt(pageParam) : 1;

	const { value, displayedPackages, totalPackages } = searchStore;

	const itemsPerPage = 20;

	$: totalPages = Math.ceil($totalPackages / itemsPerPage);

	const firstPagination = 1;
	$: previousPagination = currentPage > 1 ? [currentPage - 1] : [];
	$: nextPagination = currentPage < totalPages ? [currentPage + 1] : [];
	$: lastPagination = totalPages > 0 ? [totalPages] : [];

	$: displayedPagination = Array.from(
		new Set([
			firstPagination,
			...previousPagination,
			currentPage,
			...nextPagination,
			...lastPagination
		])
	);

	$: {
		const from = (currentPage - 1) * itemsPerPage;

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
	<div class="font-bold p-4 bg-gray-100 text-base">
		{$totalPackages} packages found
	</div>
{/if}

{#if displayedPagination.length > 1}
	<nav class="flex items-center justify-end p-4">
		{#each displayedPagination as pagination}
			<a
				href={`/?page=${pagination}`}
				sveltekit:noscroll
				class="mx-1 px-2 py-1 border"
				class:font-bold={currentPage === pagination}>{pagination}</a
			>
		{/each}
	</nav>
{/if}

<ol>
	{#each $displayedPackages as displayedPackage (displayedPackage.name)}
		<li class="mx-2 border-b border-gray-200 p-4">
			<PackageCard {displayedPackage} />
		</li>
	{/each}
</ol>

{#if displayedPagination.length > 1}
	<nav class="flex items-center justify-end p-4">
		{#each displayedPagination as pagination}
			<a
				href={`/?page=${pagination}`}
				sveltekit:noscroll
				class="mx-1 px-2 py-1 border"
				class:font-bold={currentPage === pagination}>{pagination}</a
			>
		{/each}
	</nav>
{/if}
