// place files you want to import through the `$lib` alias in this folder.
import { writable } from 'svelte/store';
import type { Session, Club } from '$lib/types/rugby-club-poi-types';

// export const subTitle = writable<string>();
export const currentSession = writable<Session>();
export const latestClub = writable<Club>();
export const clubStore = writable<Club[]>([]);
export const imageNotification = writable('');
export const imageNotificationColor = writable('');
