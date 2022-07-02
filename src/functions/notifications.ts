export const areNotificationsSupported = () => {
	return 'Notification' in window;
};

export const areNotificationsPermissionGranted = () => {
	return Notification.permission === 'granted';
};

export const createNotification = (title: string) => {
	return new Notification(title);
};
