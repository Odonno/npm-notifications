import { browser } from '$app/env';

export const areNotificationsSupported = () => {
	return browser && 'Notification' in window;
};

export const areNotificationsPermissionGranted = () => {
	return Notification.permission === 'granted';
};
