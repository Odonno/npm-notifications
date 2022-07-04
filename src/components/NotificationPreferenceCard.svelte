<script lang="ts">
	import { db } from '$functions/db';
	import { notificationLevels, type NotificationLevel, type NotificationPreference } from '$models';

	export let preference: NotificationPreference;

	let notificationLevelSelected: NotificationLevel = preference.level;

	$: canSave = preference?.level !== notificationLevelSelected;

	const onSaveNotificationPreferencesClicked = () => {
		db.notificationPreferences.update(preference.package, {
			level: notificationLevelSelected
		});
	};

	const onRemoveNotificationButtonClicked = () => {
		db.notificationPreferences.delete(preference.package);
	};
</script>

<div class="font-bold text-lg">
	{preference.package}
</div>
<div class="text-sm text-gray-700">
	{preference.description}
</div>

<div class="mt-2 flex items-center">
	<div class="text-sm text-gray-600">
		{preference.currentVersion}
	</div>

	<div class="ml-2 text-gray-600">•</div>

	<div class="ml-2 text-sm">
		<span>Notify me of <b>{preference.package}</b> on</span>
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

<button
	class="mt-2 px-4 py-1.5 bg-red-600 text-red-100 text-sm rounded"
	on:click={onRemoveNotificationButtonClicked}
>
	Remove this notification
</button>
