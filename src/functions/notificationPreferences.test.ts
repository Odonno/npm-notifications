import type { NotificationPreference } from '$models';
import { describe, expect, it } from 'vitest';
import { shouldNotify } from './notificationPreferences';

describe('shouldNotify', () => {
	describe('on major updates', () => {
		const notificationPreference: NotificationPreference = {
			package: 'test',
			currentVersion: '1.0.0',
			level: 'major'
		};

		it('should be true if the new version is a major release', () => {
			const newVersion = '2.0.0';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(true);
		});

		it('should be false if the new version is a minor release', () => {
			const newVersion = '1.2.0';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(false);
		});

		it('should be false if the new version is a patch release', () => {
			const newVersion = '1.0.2';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(false);
		});

		it('should be false if the new version is the same', () => {
			const newVersion = '1.0.0';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(false);
		});
	});

	describe('on minor updates', () => {
		const notificationPreference: NotificationPreference = {
			package: 'test',
			currentVersion: '1.0.0',
			level: 'minor'
		};

		it('should be true if the new version is a major release', () => {
			const newVersion = '2.0.0';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(true);
		});

		it('should be true if the new version is a minor release', () => {
			const newVersion = '1.2.0';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(true);
		});

		it('should be false if the new version is a patch release', () => {
			const newVersion = '1.0.2';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(false);
		});

		it('should be false if the new version is the same', () => {
			const newVersion = '1.0.0';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(false);
		});
	});

	describe('on patch updates', () => {
		const notificationPreference: NotificationPreference = {
			package: 'test',
			currentVersion: '1.0.0',
			level: 'patch'
		};

		it('should be true if the new version is a major release', () => {
			const newVersion = '2.0.0';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(true);
		});

		it('should be true if the new version is a minor release', () => {
			const newVersion = '1.2.0';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(true);
		});

		it('should be true if the new version is a patch release', () => {
			const newVersion = '1.0.2';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(true);
		});

		it('should be false if the new version is the same', () => {
			const newVersion = '1.0.0';

			const result = shouldNotify(notificationPreference, newVersion);

			expect(result).toBe(false);
		});
	});
});
