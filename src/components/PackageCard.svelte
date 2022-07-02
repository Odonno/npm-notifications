<script lang="ts">
	export let displayedPackage: any;

	// TODO : check if preferences already saved

	let notificationLevelSelected = 'patch';

	const notificationLevels = ['major', 'minor', 'patch'];

	const onSaveNotificationPreferencesClicked = () => {
		// TODO : save notification preferences in local storage
	};
</script>

<div>
	Name: {displayedPackage.name}
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

	<button type="button" on:click={onSaveNotificationPreferencesClicked}>Ok</button>
</div>
