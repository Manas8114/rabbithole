import React, { useState } from 'react';
import { X, LogIn, UserPlus, Sparkles, Building, GraduationCap, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useModalBehavior } from '../hooks/useModalBehavior';

export function AuthModal({ isOpen, onClose }) {
  const dialogRef = useModalBehavior(isOpen, onClose);
  const { signInWithPassword, signUp, signInWithOAuth, isConfigured } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      if (mode === 'login') {
        const { error } = await signInWithPassword(email, password);
        if (error) throw error;
        onClose();
      } else {
        const { error } = await signUp(email, password, { name, role });
        if (error) throw error;
        setMessage('Registration successful! Please check your email to confirm.');
        setTimeout(onClose, 2000);
      }
    } catch (err) {
      setMessage(err.message || 'Authentication failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOAuth = async () => {
    try {
      await signInWithOAuth('google');
    } catch (err) {
      setMessage(err.message || 'OAuth sign-in failed.');
    }
  };

  return (
    <div
      ref={dialogRef}
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px' }}
      >
        <div className="modal-header">
          <div>
            <span className="mono-stamp" style={{ color: 'var(--brass-300)', display: 'block', marginBottom: '0.2rem' }}>
              COMMERCIAL AUTH GATEWAY
            </span>
            <h3 id="auth-modal-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
              {mode === 'login' ? 'Sign In to Passport' : 'Create Account'}
            </h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {!isConfigured && (
              <div style={{
                backgroundColor: 'var(--sage-50)',
                border: '1px dashed var(--sage-300)',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                fontSize: '0.75rem',
                color: 'var(--forest-700)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <Sparkles size={14} style={{ flexShrink: 0 }} />
                <span>Demo mode: Entering credentials logs you in locally. Connect Supabase in <code>.env</code> for live cloud auth.</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleOAuth}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', marginBottom: '1rem', justifyContent: 'center' }}
            >
              <Globe size={14} />
              <span>Continue with Google</span>
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--ink-500)', marginBottom: '1rem' }}>
              ── or with email & password ──
            </div>

            {mode === 'signup' && (
              <>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Account Role</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className={`btn btn-sm ${role === 'student' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setRole('student')}
                      style={{ justifyContent: 'center' }}
                    >
                      <GraduationCap size={14} />
                      <span>Student</span>
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${role === 'recruiter' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setRole('recruiter')}
                      style={{ justifyContent: 'center' }}
                    >
                      <Building size={14} />
                      <span>Recruiter</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {message && (
              <div style={{ fontSize: '0.8rem', color: 'var(--forest-800)', marginTop: '0.5rem' }}>
                {message}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
              disabled={submitting}
            >
              {mode === 'login' ? <LogIn size={14} /> : <UserPlus size={14} />}
              <span>{mode === 'login' ? 'Sign In' : 'Sign Up'}</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setMessage('');
                }}
                style={{ background: 'none', border: 'none', color: 'var(--forest-700)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
