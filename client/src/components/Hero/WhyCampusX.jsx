import React from 'react';
import { FaGraduationCap, FaShieldAlt, FaTag, FaUsers } from 'react-icons/fa';

export default function WhyCampusX() {
  return (
    <div className="sidebar-card why-card">
      <h4>Why CampusX?</h4>
      <ul>
        <li><FaGraduationCap className="icon" /> Students only marketplace</li>
        <li><FaShieldAlt className="icon" /> Safe & secure</li>
        <li><FaTag className="icon" /> Great deals</li>
        <li><FaUsers className="icon" /> Connect with peers</li>
      </ul>
    </div>
  );
}