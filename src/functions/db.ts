import type { NotificationPreference } from '$models';
import Dexie, { type Table } from 'dexie';

class AppStorage extends Dexie {
	notificationPreferences!: Table<NotificationPreference>;

	constructor() {
		super('myDatabase');

		this.version(1).stores({
			notificationPreferences: '++package, currentVersion, level, description'
		});
	}
}

export const db = new AppStorage();
