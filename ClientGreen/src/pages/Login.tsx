import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Button } from '../components/ui/button';
import { ShieldCheck } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        const userRole = userDoc.exists() ? userDoc.data()?.role : 'user';
        const destination = userRole === 'admin' ? '/portal/inquiries' : '/portal';
        navigate(destination);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          firstName,
          lastName,
          role: role,
          createdAt: new Date()
        });
        setSuccess('Account successfully created! Redirecting to dashboard...');
        setTimeout(() => {
          navigate(role === 'admin' ? '/portal/inquiries' : '/portal');
        }, 2000);
      }
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4 bg-background">
      <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl backdrop-blur-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-50 pointer-events-none">
          <ShieldCheck className="w-24 h-24 text-emerald-500/10" />
        </div>
        
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground text-center">Secure Authentication</h2>
          <p className="text-muted-foreground text-sm mt-2 text-center">
            {isLogin ? 'Access your enterprise systems' : 'Provision a new identity'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center relative z-10">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 text-sm p-3 rounded-lg mb-6 text-center relative z-10">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-background border border-border rounded-md h-10 px-3 text-sm text-foreground focus:outline-none focus:border-emerald-500/50" 
                    required 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-background border border-border rounded-md h-10 px-3 text-sm text-foreground focus:outline-none focus:border-emerald-500/50" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Access Level (Demo)</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`h-10 rounded-md text-sm font-medium border transition-colors ${role === 'user' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-600 dark:text-emerald-400' : 'bg-background border-border text-muted-foreground hover:text-foreground'}`}
                  >
                    Standard User
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`h-10 rounded-md text-sm font-medium border transition-colors ${role === 'admin' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-600 dark:text-emerald-400' : 'bg-background border-border text-muted-foreground hover:text-foreground'}`}
                  >
                    Administrator
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Corporate Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded-md h-10 px-3 text-sm text-foreground focus:outline-none focus:border-emerald-500/50" 
              required 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Passphrase</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-md h-10 px-3 text-sm text-foreground focus:outline-none focus:border-emerald-500/50" 
              required 
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full bg-emerald-500 text-black hover:bg-emerald-400 font-semibold h-12 shadow-[0_0_15px_rgba(16,185,129,0.2)] mt-6">
            {isLogin ? 'Authenticate' : 'Request Access'}
          </Button>
        </form>

        <div className="mt-6 text-center relative z-10">
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            {isLogin ? 'Need an account? Request Access' : 'Already have access? Authenticate'}
          </button>
        </div>
      </div>
    </div>
  );
}
