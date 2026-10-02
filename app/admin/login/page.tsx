"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight } from 'lucide-react';
import { API_URL } from '../api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        router.push('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Could not connect to server. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 selection:bg-accent selection:text-white relative">
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none z-0">
        <filter id="noise-login"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-login)" />
      </svg>
      
      <div className="w-full max-w-md bg-panel rounded-2xl shadow-lg border border-border overflow-hidden relative z-10">
        
        <div className="p-8 md:p-10 flex flex-col items-center">
          <div className="mb-8">
             <img src="/logo.svg" alt="AT Smart Living" className="h-12 w-auto" />
          </div>
          
          <h1 className="text-3xl font-light text-foreground mb-2 text-center" style={{ fontFamily: 'var(--font-display)' }}>Admin Portal</h1>
          <p className="text-sm text-muted mb-8 text-center tracking-wide">Sign in to manage your website.</p>

          <form onSubmit={handleLogin} className="space-y-5 w-full">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all text-sm text-foreground"
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all text-sm text-foreground"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50/50 border border-red-100 rounded-lg text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-4 bg-accent hover:bg-accent-soft text-white rounded-xl transition-all font-medium text-sm tracking-wide disabled:opacity-70 shadow-md shadow-accent/20"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}
