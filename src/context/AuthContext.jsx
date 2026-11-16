import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => (
    !isSupabaseConfigured || !supabase
      ? { id: 'demo-user-id', email: 'explorer@curiositypassport.org' }
      : null
  ));
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(() => isSupabaseConfigured && Boolean(supabase));

  const fetchProfile = useCallback(async (userId) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data);
        setRole(data.role || 'student');
      }
    } catch {
      // Offline fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signInWithOAuth = async (provider = 'google') => {
    if (!isSupabaseConfigured || !supabase) {
      alert('Supabase is not configured yet. Add your VITE_SUPABASE_URL in .env to enable live OAuth.');
      return { error: null };
    }
    return supabase.auth.signInWithOAuth({ provider });
  };

  const signInWithPassword = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      setUser({ id: 'demo-user-id', email });
      return { data: { user: { email } }, error: null };
    }
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email, password, metadata = {}) => {
    if (!isSupabaseConfigured || !supabase) {
      setUser({ id: 'demo-user-id', email });
      return { data: { user: { email } }, error: null };
    }
    return supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        loading,
        isConfigured: isSupabaseConfigured,
        signInWithOAuth,
        signInWithPassword,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth context
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
