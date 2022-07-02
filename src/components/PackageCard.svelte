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
			currentVersion: displayedPackage.version,
			level: notificationLevelSelected
		});
	};
</script>

<div>
	Name: {displayedPackage.name}
</div>
<div>
	Description: {displayedPackage.description}
</div>
<div>
	Version: {displayedPackage.version}
</div>

<div>
	<span>Notify me of {displayedPackage.name} on</span>
	<select bind:value={notificationLevelSelected}>
		{#each notificationLevels as notificationLevel}
			<option>{notificationLevel}</option>
		{/each}
	</select>
	<span>updates</span>

	<button
		type="button"
		class="disabled:bg-gray-400"
		on:click={onSaveNotificationPreferencesClicked}
		disabled={!canSave}
	>
		Ok
	</button>
</div>
