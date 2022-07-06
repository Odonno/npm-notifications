import { writable } from 'svelte/store';

const value = writable('');
const displayedPackages = writable<any[]>([]);
const totalPackages = writable(0);

export const searchStore = {
	value,
	displayedPackages,
	totalPackages
};
