import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1 style={{ fontSize: '4rem', color: '#6C5CE7', marginBottom: '10px' }}>404</h1>
      <h2 style={{ marginBottom: '20px' }}>Page Not Found</h2>
      <p style={{ color: '#636E72', marginBottom: '30px' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link 
        to="/" 
        style={{
          backgroundColor: '#6C5CE7',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600'
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}