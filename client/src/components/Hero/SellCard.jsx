import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTag } from 'react-icons/fa';

export default function SellCard() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-card sell-banner-card">
      <div className="sell-card-content">
        <h4>Do you want to sell something?</h4>
        <p>List your product and start selling to your peers.</p>
        <button className="btn-sell-now" onClick={() => navigate('/sell')}>Sell Now</button>
      </div>
      <div className="sell-card-icon">
        <FaTag />
      </div>
    </div>
  );
}