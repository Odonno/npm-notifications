<script lang="ts">
	import { browser } from '$app/env';
	import { db } from '$functions/db';
	import { notificationLevels, type NotificationLevel, type NotificationPreference } from '$models';
	import { liveQuery } from 'dexie';
	import { onDestroy } from 'svelte';

	export let displayedPackage: any;

	let preference: NotificationPreference | undefined;
	let notificationLevelSelected: NotificationLevel = 'patch';

	const savedNotificationPreference$ = liveQuery(() =>
		browser ? db.notificationPreferences.get(displayedPackage.name) : undefined
	);

	const subscription = savedNotificationPreference$.subscribe((value) => {
		preference = value;

		if (preference) {
			notificationLevelSelected = preference.level;
		}
	});

	$: canSave = preference?.level !== notificationLevelSelected;

	onDestroy(() => {
		subscription.unsubscribe();
	});

	const onSaveNotificationPreferencesClicked = () => {
		db.notificationPreferences.put({
			package: displayedPackage.name,
			description: displayedPackage.description,
			currentVersion: displayedPackage.version,
			level: notificationLevelSelected
		});
	};
</script>

<div class="font-bold text-lg">
	{displayedPackage.name}
</div>
<div class="text-sm text-gray-700">
	{displayedPackage.description}
</div>

<div class="mt-2 flex items-center">
	<div class="text-sm text-gray-600">
		{displayedPackage.version}
	</div>

	<div class="ml-2 text-gray-600">•</div>

	<div class="ml-2 text-sm">
		<span>Notify me of <b>{displayedPackage.name}</b> on</span>
		<select bind:value={notificationLevelSelected}>
			{#each notificationLevels as notificationLevel}
				<option>{notificationLevel}</option>
			{/each}
		</select>
		<span>updates</span>

		<button
			type="button"
			class="ml-2 disabled:bg-gray-400 bg-black text-white px-2 py-1 rounded"
			on:click={onSaveNotificationPreferencesClicked}
			disabled={!canSave}
		>
			Ok
		</button>
	</div>
</div>
