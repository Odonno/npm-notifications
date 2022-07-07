import { writable } from 'svelte/store';

const displayedPackages = writable<any[]>([]);
const totalPackages = writable(0);

export const searchStore = {
	displayedPackages,
	totalPackages
};
