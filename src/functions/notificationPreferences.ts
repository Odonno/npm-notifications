import type { NotificationPreference } from '$models';
import semverDiff from 'semver-diff';

export const shouldNotify = (
	notificationPreference: NotificationPreference,
	newVersion: string
) => {
	const { level, currentVersion } = notificationPreference;

	const diff = semverDiff(currentVersion, newVersion);

	if (level === 'patch') {
		return diff === 'major' || diff === 'minor' || diff === 'patch';
	}
	if (level === 'minor') {
		return diff === 'major' || diff === 'minor';
	}
	if (level === 'major') {
		return diff === 'major';
	}

	return false;
};
