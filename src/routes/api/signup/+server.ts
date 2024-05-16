import { adminAuth } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';

export const POST: RequestHandler = async ({ request, cookies }) => {

    const { idToken, newUser } = await request.json();

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const decodedIdToken = await adminAuth.verifyIdToken(idToken);

    console.log(decodedIdToken);
    console.log(newUser);
     const createdUser = await RugbyClubPOIService.signup(newUser);
     console.log(createdUser);

    if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
        const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
        const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };

        cookies.set('RugbyClubPOI', cookie, options);
        // cookies.set('__session', cookie, options);

        return json({ status: 'signedIn' });
    } else {
        throw error(401, 'Recent sign in required!');
    }


};

export const DELETE: RequestHandler = async ({ cookies }) => {
    // cookies.delete('__session', { path: '/' });
    cookies.delete('RugbyClubPOI', { path: '/' });
    return json({ status: 'signedOut' });
}