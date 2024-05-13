import type { Session } from '$lib/types/rugby-club-poi-types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const cookieStr = cookies.get('RugbyClubPOI') as string;
	if (cookieStr) {
		const Session = JSON.parse(cookieStr) as Session;
		return {
			session: Session
		};
	}
};
