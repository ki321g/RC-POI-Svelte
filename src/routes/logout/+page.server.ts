export const load = async ({ cookies }) => {
    cookies.delete("RugbyClubPOI", { path: "/" });
  };

// import { goto } from '$app/navigation';

// export const load = async ({ cookies, url }) => {
// 	cookies.delete('RugbyClubPOI', { path: '/' });
// 	await goto(url.pathname, { replaceState: true });
// };
