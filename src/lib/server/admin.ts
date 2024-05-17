import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { VITE_FB_CLIENT_EMAIL, VITE_FB_PRIVATE_KEY, VITE_FB_PROJECT_ID } from '$env/static/private';
import pkg from 'firebase-admin';

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: VITE_FB_PROJECT_ID,
			clientEmail: VITE_FB_CLIENT_EMAIL,
			privateKey: VITE_FB_PRIVATE_KEY
		})
	});
} catch (err) {
	if (!/already exists/u.test(err.message)) {
		console.error('Firebase Admin Error: ', err.stack);
	}
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
