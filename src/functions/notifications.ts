import { browser } from '$app/env';

export const areNotificationsSupported = () => {
	return browser && 'Notification' in window;
};

export const areNotificationsPermissionGranted = () => {
	return Notification.permission === 'granted';
};

export const requireNotificationsPermission = () => {
	if (!areNotificationsSupported()) {
		console.log('This browser does not support notification.');
		return;
	}

	if (areNotificationsPermissionGranted()) {
		return;
	}

	if (Notification.permission !== 'denied') {
		return Notification.requestPermission();
	}
};
