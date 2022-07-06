<script lang="ts">
	import { browser } from '$app/env';
	import NotificationPreferenceCard from '$components/NotificationPreferenceCard.svelte';
	import { db } from '$functions/db';
	import {
		areNotificationsSupported,
		requireNotificationsPermission
	} from '$functions/notifications';
	import type { NotificationPreference } from '$models';
	import { liveQuery } from 'dexie';
	import { onDestroy } from 'svelte';

	let notificationPreferences: NotificationPreference[] = [];

	const notificationsSupported = areNotificationsSupported();
	let notificationsPermission = notificationsSupported ? Notification.permission : undefined;

	$: askNotificationPermission =
		notificationsPermission !== 'granted' &&
		notificationsPermission !== 'denied' &&
		notificationPreferences.length > 0;

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

	const onAskNotificationPermissionButtonClicked = async () => {
		notificationsPermission = await requireNotificationsPermission();
	};
</script>

{#if count}
	<div class="font-bold p-4 bg-gray-100 text-lg">
		{count} active notifications
	</div>
{/if}

{#if askNotificationPermission}
	<div class="w-full p-4 text-xs bg-yellow-600/60 text-gray-700">
		<div>
			You have active notifications but it seems you did not allow the permission to receive
			notifications.
		</div>

		<button
			type="button"
			class="mt-2 px-3 py-1.5 border border-gray-700 rounded hover:bg-yellow-600/80 active:bg-yellow-600"
			on:click={onAskNotificationPermissionButtonClicked}
		>
			Enable notifications
		</button>
	</div>
{/if}

<ol>
	{#each notificationPreferences as preference (preference.package)}
		<li class="mx-2 border-b border-gray-200 p-4">
			<NotificationPreferenceCard {preference} />
		</li>
	{/each}
</ol>
