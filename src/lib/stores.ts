// place files you want to import through the `$lib` alias in this folder.
import { writable } from "svelte/store";
import type { LoggedInUser } from "$lib/types/rugby-club-poi-types";


// export const subTitle = writable<string>();
export const currentLoggedInUser = writable<LoggedInUser>();