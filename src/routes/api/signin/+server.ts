import { adminAuth } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { dev } from '$app/environment';
import { currentSession } from '$lib/stores.js';


export const POST: RequestHandler = async ({ request, cookies }) => {
    let unhashedPassword = '';
    const { idToken, email } = await request.json();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const decodedIdToken = await adminAuth.verifyIdToken(idToken);
    const existingUser = await RugbyClubPOIService.getLoggedInUser(email);
     console.log("INSIDE POST");
     console.log(existingUser);

    if (existingUser) {
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
            const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
            const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };

            cookies.set('__session', cookie, options);
    
            const session = existingUser;
            console.log("SESSION");
            console.log(session);
            currentSession.set(session);
            const userJson = JSON.stringify(session);
            cookies.set('RugbyClubPOI', userJson, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                    secure: !dev,
                               maxAge: 60 * 60 * 24 * 7 // one week
            });
            
            return json({ status: 'signedIn', user: existingUser});
           
        } else {
            throw error(401, 'Recent sign in required!');
        }   
    } else {
        return json({
            status: 400,
            error: 'User does not exist'
        });
    }   
};
export const DELETE: RequestHandler = async ({ cookies }) => {
    cookies.delete('__session', { path: '/' });
    cookies.delete('RugbyClubPOI', { path: '/' });
    return json({ status: 'signedOut' });
}