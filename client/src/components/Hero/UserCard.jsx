import React from 'react';
import { Link } from 'react-router-dom';

export default function UserCard() {
  return (
    <div className="sidebar-card user-card">
      <div className="user-info">
        <div>
          <span className="welcome-text">Welcome back,</span>
          <div className="name-tag">
            <h4>Shubham Hulawale</h4>
            <span className="badge-student">Student</span>
          </div>
          <p className="user-dept">TY IT, MES College</p>
        </div>
        <img src="https://via.placeholder.com/60" alt="Avatar" className="user-avatar" />
      </div>
      <Link to="/profile" className="view-profile-link">View Profile &rarr;</Link>
    </div>
  );
}