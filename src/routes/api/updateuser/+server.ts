import { adminAuth } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RugbyClubPOIService } from '$lib/services/rugby-club-poi-service';
import bcrypt from 'bcrypt';
import { dev } from '$app/environment';
import { currentSession } from '$lib/stores.js';

let createdUser: any;
export const POST: RequestHandler = async ({ request, cookies }) => {
    let unhashedPassword = '';
    const { newUser } = await request.json();
    const existingUser = await RugbyClubPOIService.getLoggedInUser(newUser.email);

    if (newUser.password === "HASHED_PASSWORD") {
        newUser.password = existingUser.password
        createdUser = await RugbyClubPOIService.updateUser(newUser);
        return json({ status: 200, user: newUser});
    } else {
        unhashedPassword = newUser.password;
    
        // Hash the password before storing it
        const saltRounds = 10;
        newUser.password = await bcrypt.hash(newUser.password, saltRounds);	 
        
        createdUser = await RugbyClubPOIService.updateUser(newUser);
        return json({ status: 200, user: newUser});
    }

    

};
