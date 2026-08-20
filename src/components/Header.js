import React from 'react';
import { FaHome, FaInfoCircle, FaCogs, FaPhone } from 'react-icons/fa';
import './Header.css';

const Header = ({
  currentPage = 'home',
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateContact,
}) => {
  const fallbackNavigate = (path) => {
    window.location.href = path;
  };

  const navigate = (handler, fallbackPath) => {
    if (handler) {
      handler();
      return;
    }
    fallbackNavigate(fallbackPath);
  };

  return (
    <header className="header">
      <div className="header-shell">
        <button
          className="brand"
          onClick={() => navigate(onNavigateHome, '/')}
          aria-label="Go to home"
          type="button"
        >
          {/* Replace the old brand mark and text with your logo image */}
          <img
            src="/images/logo.png"   /* ← CHANGE THIS TO YOUR ACTUAL LOGO PATH */
            alt="Fountain Business Solutions"
            className="brand-logo"
          />
        </button>

        <nav className="navbar" aria-label="Main navigation">
          <button
            type="button"
            onClick={() => navigate(onNavigateHome, '/')}
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
          >
            <FaHome className="nav-icon" /> Home
          </button>

          <button
            type="button"
            onClick={() => navigate(onNavigateAbout, '/about')}
            className={`nav-btn ${currentPage === 'about' ? 'active' : ''}`}
          >
            <FaInfoCircle className="nav-icon" /> About Us
          </button>

          <button
            type="button"
            onClick={() => navigate(onNavigateServices, '/services')}
            className={`nav-btn ${currentPage === 'services' ? 'active' : ''}`}
          >
            <FaCogs className="nav-icon" /> Our Services
          </button>

          <button
            type="button"
            onClick={() => navigate(onNavigateContact, '/contact')}
            className={`nav-btn ${currentPage === 'contact' ? 'active' : ''}`}
          >
            <FaPhone className="nav-icon" /> Contact Us
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;