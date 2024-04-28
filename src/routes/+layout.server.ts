import type { LoggedInUser } from "$lib/types/rugby-club-poi-types";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {
  const cookieStr = cookies.get("RugbyClubPOI") as string;
  if (cookieStr) {
    const LoggedInUser = JSON.parse(cookieStr) as LoggedInUser;
    return {
      session: LoggedInUser
    };
  }
};