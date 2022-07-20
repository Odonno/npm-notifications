<script lang="ts">
	import PackageCard from '$components/PackageCard.svelte';
	import { searchStore } from '$stores/search';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/env';

	$: pageParam = $page.url.searchParams.get('page');
	$: currentPage = pageParam ? parseInt(pageParam) : 1;

	$: searchParam = $page.url.searchParams.get('search');
	$: search = searchParam ? searchParam : '';

	const { displayedPackages, totalPackages } = searchStore;

	const itemsPerPage = 20;

	let value = '';
	let searchInput: HTMLInputElement | undefined;

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
		if (browser) {
			const from = (currentPage - 1) * itemsPerPage;

			fetch(`https://registry.npmjs.org/-/v1/search?text=${search}&from=${from}`)
				.then((response) => response.json())
				.then((result) => {
					const { objects, total } = result;

					displayedPackages.set(objects.map((o: any) => o.package));
					totalPackages.set(total);
				});
		}
	}

	onMount(() => {
		value = search;

		if (searchInput) {
			searchInput.focus();
		}
	});

	const onSearchInput = async () => {
		const url = value ? `?search=${value}` : '/';
		await goto(url, { replaceState: true });

		if (searchInput) {
			searchInput.focus();
		}
	};
</script>

<div class="p-2">
	<div class="m-2 mb-0">
		<input
			type="search"
			bind:value
			class="w-full p-2 bg-gray-100 h-[40px]"
			placeholder="Search packages"
			autocomplete="off"
			on:input={onSearchInput}
			bind:this={searchInput}
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
				href={`/?search=${value}&page=${pagination}`}
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
				href={`/?search=${value}&page=${pagination}`}
				sveltekit:noscroll
				class="mx-1 px-2 py-1 border"
				class:font-bold={currentPage === pagination}>{pagination}</a
			>
		{/each}
	</nav>
{/if}
