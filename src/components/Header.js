import React, { useEffect, useRef, useState } from 'react';
import { FaHome, FaInfoCircle, FaCogs, FaPhone, FaHistory, FaBullseye, FaEye, FaStar } from 'react-icons/fa';
import './Header.css';

const Header = ({
  currentPage = 'home',
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateContact,
  onNavigateAboutSection,
}) => {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fallbackNavigate = (path) => {
    window.location.href = path;
  };

  const navigate = (handler, fallbackPath) => {
    setIsDropdownOpen(false);
    if (handler) {
      handler();
      return;
    }
    fallbackNavigate(fallbackPath);
  };

  const handleAboutDropdownItem = (sectionId) => {
    setIsDropdownOpen(false);
    if (onNavigateAboutSection) {
      onNavigateAboutSection(sectionId);
      return;
    }
    fallbackNavigate(`/about#${sectionId}`);
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

          <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-trigger">
              <button
                type="button"
                onClick={() => navigate(onNavigateAbout, '/about')}
                className={`nav-btn about-main-btn ${currentPage === 'about' ? 'active' : ''}`}
              >
                <FaInfoCircle className="nav-icon" /> About Us
              </button>
              <button
                type="button"
                className={`dropdown-toggle ${isDropdownOpen ? 'open' : ''}`}
                onClick={() => setIsDropdownOpen((open) => !open)}
                aria-expanded={isDropdownOpen}
                aria-label="Toggle about menu"
              >
                v
              </button>
            </div>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button type="button" onClick={() => handleAboutDropdownItem('historySection')}>
                  <FaHistory className="nav-icon" /> History
                </button>
                <button type="button" onClick={() => handleAboutDropdownItem('missionSection')}>
                  <FaBullseye className="nav-icon" /> Mission
                </button>
                <button type="button" onClick={() => handleAboutDropdownItem('visionSection')}>
                  <FaEye className="nav-icon" /> Vision
                </button>
                <button type="button" onClick={() => handleAboutDropdownItem('coreValuesSection')}>
                  <FaStar className="nav-icon" /> Core Values
                </button>
              </div>
            )}
          </div>

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