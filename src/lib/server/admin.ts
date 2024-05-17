import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { VITE_FB_CLIENT_EMAIL, VITE_FB_PRIVATE_KEY, VITE_FB_PROJECT_ID } from '$env/static/private'
import pkg from 'firebase-admin';

// const privateKey = FB_PRIVATE_KEY.replace(/\\n/g, '\n');
// const privateKey = VITE_FB_PROJECT_ID.replace(/\\n/g, '\n');
// VITE_FB_PROJECT_ID: VITE_FB_PROJECT_ID.replace(/\\n/g, '\n');

// const base64PrivateKey = VITE_FB_PRIVATE_KEY; // Your Base64 encoded private key
// const privateKeyString = Buffer.from(base64PrivateKey, 'base64').toString('utf-8');
// const privateKeyObject = JSON.parse(privateKeyString);
// const firebasePrivateKey = privateKeyObject.private_key;

// const privateKey = Buffer.from(base64PrivateKey, 'base64').toString('utf-8');
// console.log(base64PrivateKey);
// console.log(privateKey);
// const privateKeyObject = JSON.parse(privateKey);
// const firebasePrivateKey = privateKeyObject.private_key;
try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: VITE_FB_PROJECT_ID,
      clientEmail: VITE_FB_CLIENT_EMAIL,
      privateKey: VITE_FB_PRIVATE_KEY,
    }),
  });
} catch (err) {
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase Admin Error: ', err.stack)
  }
}


export const adminDB = getFirestore();
export const adminAuth = getAuth();