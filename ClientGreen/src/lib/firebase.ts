import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator } from 'firebase/firestore';
import firebaseConfigFile from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfigFile.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigFile.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigFile.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigFile.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigFile.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigFile.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || firebaseConfigFile.measurementId,
};

const app = initializeApp(firebaseConfig);
const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfigFile.firestoreDatabaseId || '(default)';

export const db = getFirestore(app, databaseId);
export const auth = getAuth(app);

// Enable IndexedDB persistence so Firestore can serve cached data when offline.
// This may fail in some environments (multiple tabs, unsupported browsers).
enableIndexedDbPersistence(db).catch((err: unknown) => {
  const code = (err as any)?.code;
  if (code === 'failed-precondition') {
    console.warn('Firestore persistence failed: multiple tabs open.');
  } else if (code === 'unimplemented') {
    console.warn('Firestore persistence is not available in this environment.');
  } else {
    console.error('Failed to enable IndexedDB persistence:', err);
  }
});

// Optional: connect to emulator when env var is provided (e.g., VITE_FIRESTORE_EMULATOR_HOST=localhost:8080)
const emulatorHost = import.meta.env.VITE_FIRESTORE_EMULATOR_HOST;
if (emulatorHost) {
  try {
    const [host, portStr] = (emulatorHost as string).split(':');
    const port = parseInt(portStr || '8080', 10) || 8080;
    connectFirestoreEmulator(db, host, port);
    console.info(`Connected Firestore to emulator at ${host}:${port}`);
  } catch (e) {
    console.warn('Failed to parse VITE_FIRESTORE_EMULATOR_HOST, skipping emulator connect.', e);
  }
}