export type NotificationLevel = 'major' | 'minor' | 'patch';

export type NotificationPreference = {
	package: string;
	currentVersion: string;
	level: NotificationLevel;
};

export const notificationLevels: NotificationLevel[] = ['major', 'minor', 'patch'];
