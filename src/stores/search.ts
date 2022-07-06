import { writable } from 'svelte/store';

const value = writable('');
const displayedPackages = writable<any[]>([]);
const page = writable(1);
const totalPackages = writable(0);

export const searchStore = {
	value,
	displayedPackages,
	page,
	totalPackages
};
