import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface UserProfile { role: 'admin' | 'user'; firstName: string; lastName: string; }

interface AuthContextType { user: User | null; profile: UserProfile | null; loading: boolean; signOut: () => Promise<void>; }

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as Partial<UserProfile> & { role?: string };
            setProfile({
              role: data.role === 'admin' ? 'admin' : 'user',
              firstName: data.firstName ?? '',
              lastName: data.lastName ?? '',
            });
          } else {
            const fallbackName = currentUser.displayName?.trim() || currentUser.email?.split('@')[0] || 'User';
            const firstName = fallbackName.split(' ')[0];
            const lastName = fallbackName.split(' ').slice(1).join(' ');
            const fallbackProfile: UserProfile = { role: 'user', firstName, lastName };

            await setDoc(docRef, {
              email: currentUser.email,
              firstName,
              lastName,
              role: 'user',
              createdAt: new Date(),
            }, { merge: true });

            setProfile(fallbackProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // If Firestore failed (likely offline), provide a best-effort fallback profile
          const fallbackName = currentUser.displayName?.trim() || currentUser.email?.split('@')[0] || 'User';
          const firstName = fallbackName.split(' ')[0];
          const lastName = fallbackName.split(' ').slice(1).join(' ');
          const fallbackProfile: UserProfile = { role: 'user', firstName, lastName };

          if (!navigator.onLine) {
            console.warn('Offline: using fallback profile until connection is restored.');
            setProfile(fallbackProfile);
          } else {
            // Unknown error while online — clear profile so UI can handle it gracefully
            setProfile(null);
          }
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } finally {
      setUser(null);
      setProfile(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);