<script lang="ts">
	import {
		areNotificationsSupported,
		requireNotificationsPermission
	} from '$functions/notifications';

	const notificationsSupported = areNotificationsSupported();
	let notificationsPermission = notificationsSupported ? Notification.permission : undefined;

	const onActivateNotificationsClicked = async () => {
		notificationsPermission = await requireNotificationsPermission();
	};
</script>

<div class="flex items-center justify-center">
	{#if notificationsSupported}
		{#if notificationsPermission === 'granted'}
			<div class="bg-green-400 text-green-50 w-fit px-6 py-2 rounded">Notifications activated</div>
		{:else}
			<button type="button" class="block" on:click={onActivateNotificationsClicked}>
				Activate notifications
			</button>
		{/if}
	{:else}
		<div class="bg-red-400 text-red-50 w-fit px-6 py-2 rounded">
			This browser does not support notifications
		</div>
	{/if}
</div>
