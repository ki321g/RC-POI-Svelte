import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived } from "svelte/store";

const firebaseConfig = {
    apiKey: "AIzaSyBtALtuQseiJh63tpynQ_M9vRBYg8861GY",
    authDomain: "rugbyclubpoi.firebaseapp.com",
    projectId: "rugbyclubpoi",
    storageBucket: "rugbyclubpoi.appspot.com",
    messagingSenderId: "506028655224",
    appId: "1:506028655224:web:49ca277292ae1bde25638d",
    measurementId: "G-RYEHGV3DWG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

/**
 * @returns a store with the current firebase user
 */
function userStore() {
    let unsubscribe: () => void;
  
    if (!auth || !globalThis.window) {
      console.warn('Auth is not initialized or not in browser');
      const { subscribe } = writable<User | null>(null);
      return {
        subscribe,
      }
    }
 
    /**
     * * Subscribe to the current user
     * */
const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
};
}
  
export const user = userStore();