<script lang="ts">
	import { browser } from '$app/env';
	import NotificationPreferenceCard from '$components/NotificationPreferenceCard.svelte';
	import { db } from '$functions/db';
	import type { NotificationPreference } from '$models';
	import { liveQuery } from 'dexie';
	import { onDestroy } from 'svelte';

	let notificationPreferences: NotificationPreference[] = [];

	const savedNotificationPreferences$ = liveQuery(() =>
		browser ? db.notificationPreferences.toArray() : []
	);

	const subscription = savedNotificationPreferences$.subscribe((value) => {
		notificationPreferences = value;
	});

	$: count = notificationPreferences.length;

	onDestroy(() => {
		subscription.unsubscribe();
	});
</script>

{#if count}
	<div class="font-bold p-4 bg-gray-100 text-lg">
		{count} active notifications
	</div>
{/if}

<ol>
	{#each notificationPreferences as preference (preference.package)}
		<li class="mx-2 border-b border-gray-200 p-4">
			<NotificationPreferenceCard {preference} />
		</li>
	{/each}
</ol>
