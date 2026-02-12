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

// Validate that all required environment variables are present
const isFirebaseConfigValid = () => {
    const requiredVars = [
        'apiKey',
        'authDomain',
        'projectId',
        'storageBucket',
        'messagingSenderId',
        'appId'
    ];

    for (const varName of requiredVars) {
        const value = firebaseConfig[varName];
        if (!value || value === 'undefined' || value.includes('NEXT_PUBLIC')) {
            return false;
        }
    }
    return true;
};

// Initialize Firebase
let app = null;
let auth = null;
let db = null;

// Only initialize Firebase if we have valid configuration
// This prevents build errors when environment variables aren't set (e.g., during Vercel build)
if (typeof window !== 'undefined' || process.env.NODE_ENV === 'development') {
    // Client-side or development: try to initialize
    if (isFirebaseConfigValid()) {
        try {
            app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
            auth = getAuth(app);
            db = getFirestore(app);
        } catch (error) {
            console.error("Firebase initialization failed:", error);
        }
    } else {
        console.warn("Firebase environment variables are not configured. Authentication features will be disabled.");
    }
} else {
    // Server-side build: skip initialization to prevent build errors
    console.log("Skipping Firebase initialization during build process.");
}

export { auth, db };
