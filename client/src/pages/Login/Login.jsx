// src/pages/Login/Login.jsx
import React, { useState, useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, register, handleGoogleLogin } = useContext(AuthContext);
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('OTHER');
  const [year, setYear] = useState('FY');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isSignUp) {
        await register({ name, email, password, department, year });
      } else {
        await login({ email, password });
      }
      navigate('/');
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.response?.data?.message || err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    try {
      await handleGoogleLogin(credentialResponse);
      navigate('/');
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google sign-in failed on server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Background Decor Elements */}
      <div style={styles.bgBlobTopLeft} />
      <div style={styles.bgDotsTopRight} />

      {/* Main Centered Wrapper */}
      <div style={styles.contentWrapper}>
        {/* Brand Header */}
        <div style={styles.brandContainer}>
          <div style={styles.brandMainName}>CampusX</div>
          <div style={styles.brandSubName}>Market</div>
        </div>

        {/* Welcome Section */}
        <div style={styles.headerSection}>
          <h1 style={styles.welcomeTitle}>
            {isSignUp ? 'Create Account' : 'Welcome Back!'} <span role="img" aria-label="wave">👋</span>
          </h1>
          <p style={styles.welcomeSub}>
            {isSignUp ? 'Join CampusX Market with your college ID' : 'Login to continue to CampusX Market'}
          </p>
        </div>

        {/* Card Container */}
        <div style={styles.formCard}>
          {/* Toggle Tabs */}
          <div style={styles.tabContainer}>
            <button 
              type="button"
              style={{ 
                ...styles.tabButton, 
                borderBottom: !isSignUp ? '2px solid #6366f1' : '2px solid transparent', 
                color: !isSignUp ? '#6366f1' : '#9ca3af' 
              }}
              onClick={() => { setIsSignUp(false); setError(''); }}
            >
              👤 Login
            </button>
            <button 
              type="button"
              style={{ 
                ...styles.tabButton, 
                borderBottom: isSignUp ? '2px solid #6366f1' : '2px solid transparent', 
                color: isSignUp ? '#6366f1' : '#9ca3af' 
              }}
              onClick={() => { setIsSignUp(true); setError(''); }}
            >
              👤 Sign Up
            </button>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            {isSignUp && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  style={styles.input} 
                />
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>College Email</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputFieldIcon}>✉️</span>
                <input 
                  type="email" 
                  placeholder="Enter your college email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  style={{ ...styles.input, paddingLeft: '38px' }} 
                />
              </div>
              <span style={styles.inputHint}>Use your college email (e.g. name@student.mes.ac.in)</span>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputFieldIcon}>🔒</span>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  style={{ ...styles.input, paddingLeft: '38px', paddingRight: '40px' }} 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.passwordEyeBtn}
                  tabIndex="-1"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {!isSignUp && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <a href="#forgot" style={styles.forgotLink}>Forgot Password?</a>
                </div>
              )}
            </div>

            {isSignUp && (
              <div style={styles.rowGroup}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Department</label>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} style={styles.input}>
                    <option value="OTHER">Other</option>
                    <option value="CS">Computer Science</option>
                    <option value="IT">Information Tech</option>
                    <option value="ECE">Electronics</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Year</label>
                  <select value={year} onChange={(e) => setYear(e.target.value)} style={styles.input}>
                    <option value="FY">First Year</option>
                    <option value="SY">Second Year</option>
                    <option value="TY">Third Year</option>
                    <option value="BTECH">Final Year</option>
                  </select>
                </div>
              </div>
            )}

            <button type="submit" style={styles.submitButton} disabled={loading}>
              {loading ? 'Please wait...' : (isSignUp ? 'Sign Up →' : 'Login →')}
            </button>
          </form>

          <div style={styles.dividerContainer}>
            <span style={styles.dividerLine} />
            <span style={styles.dividerText}>OR</span>
            <span style={styles.dividerLine} />
          </div>

          <div style={styles.googleButtonWrapper}>
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={() => setError('Google Sign-In failed.')}
              useOneTap={false}
              shape="pill"
              theme="outline"
            />
          </div>

          <div style={styles.switchModeTextContainer}>
            <span style={styles.switchText}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            </span>
            <button 
              type="button" 
              style={styles.switchModeBtn}
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            >
              {isSignUp ? 'Login here' : 'Sign up here'}
            </button>
          </div>
        </div>

        {/* Footer Security Notice */}
        <div style={styles.footerSecurity}>
          <span style={styles.footerShield}>🛡️</span>
          <span style={styles.footerText}>
            Only verified college students can join.<br />
            Your safety and privacy are our priority.
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#f8f9fc',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    boxSizing: 'border-box',
    position: 'relative',
    overflowX: 'hidden',
  },
  bgBlobTopLeft: {
    position: 'absolute',
    top: '-80px',
    left: '-80px',
    width: '260px',
    height: '260px',
    backgroundColor: '#f0eefd',
    borderRadius: '50%',
    zIndex: 0,
    filter: 'blur(40px)',
  },
  bgDotsTopRight: {
    position: 'absolute',
    top: '40px',
    right: '40px',
    width: '100px',
    height: '60px',
    backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)',
    backgroundSize: '12px 12px',
    zIndex: 0,
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '480px',
  },
  brandContainer: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  brandMainName: {
    fontSize: '1.6rem',
    fontWeight: '900',
    color: '#111827',
    lineHeight: '1',
    letterSpacing: '-0.5px',
  },
  brandSubName: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#6366f1',
    letterSpacing: '2px',
    marginTop: '4px',
    textTransform: 'uppercase',
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  welcomeTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#111827',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  welcomeSub: {
    color: '#6b7280',
    fontSize: '0.92rem',
    marginTop: '6px',
  },
  formCard: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: '32px 36px',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(99, 102, 241, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02)',
    boxSizing: 'border-box',
    border: '1px solid #f1f2f6',
  },
  tabContainer: {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '22px',
  },
  tabButton: {
    flex: 1,
    padding: '10px',
    background: 'none',
    border: 'none',
    fontWeight: '700',
    fontSize: '0.92rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '0.85rem',
    border: '1px solid #fecaca',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputFieldIcon: {
    position: 'absolute',
    left: '14px',
    fontSize: '0.95rem',
    color: '#9ca3af',
    pointerEvents: 'none',
  },
  passwordEyeBtn: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowGroup: {
    display: 'flex',
    gap: '12px',
  },
  label: {
    fontSize: '0.82rem',
    fontWeight: '700',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#1f2937',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  inputHint: {
    fontSize: '0.72rem',
    color: '#9ca3af',
  },
  forgotLink: {
    fontSize: '0.8rem',
    color: '#6366f1',
    textDecoration: 'none',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    color: '#ffffff',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    fontWeight: '700',
    fontSize: '0.95rem',
    cursor: 'pointer',
    marginTop: '6px',
    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
    transition: 'background-color 0.2s',
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    padding: '0 12px',
    fontSize: '0.72rem',
    color: '#9ca3af',
    fontWeight: '700',
  },
  googleButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  switchModeTextContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    fontSize: '0.85rem',
  },
  switchText: {
    color: '#6b7280',
  },
  switchModeBtn: {
    background: 'none',
    border: 'none',
    color: '#6366f1',
    fontWeight: '700',
    cursor: 'pointer',
    padding: 0,
    marginLeft: '4px',
    fontSize: '0.85rem',
  },
  footerSecurity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '28px',
    textAlign: 'center',
  },
  footerShield: {
    fontSize: '1.4rem',
  },
  footerText: {
    fontSize: '0.78rem',
    color: '#6b7280',
    lineHeight: '1.4',
  },
};