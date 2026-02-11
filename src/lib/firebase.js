// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let app, auth, db;

try {
    if (firebaseConfig.apiKey &&
        firebaseConfig.apiKey !== 'undefined' &&
        !firebaseConfig.apiKey.includes('NEXT_PUBLIC')) { // Basic sanity checks

        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
        auth = getAuth(app);
        db = getFirestore(app);
    } else {
        console.warn("Firebase API key missing or invalid, skipping initialization.");
        app = null;
        auth = null;
        db = null;
    }
} catch (error) {
    console.error("Firebase initialization failed:", error);
    app = null;
    auth = null;
    db = null;
}

export { auth, db };
