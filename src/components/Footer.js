import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate, onOpenAbout }) => {
  const handleNavigate = (id) => {
    if (onNavigate) {
      onNavigate(id);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="footer reveal-section">
      <div className="container footer-main">
        {/* Brand column – now only the logo image, no text */}
        <div className="footer-brand reveal-item">
          <img
            src="/images/logo.png"   // ← CHANGE THIS TO YOUR LOGO FILE PATH
            alt="Fountain Business Solutions"
            className="footer-logo"
          />
        </div>

        <div className="footer-column footer-links reveal-item">
          <h3>Quick Links</h3>
          <button onClick={() => handleNavigate('hero')}>Home</button>
          <button onClick={onOpenAbout || (() => handleNavigate('about'))}>About Us</button>
          <button onClick={() => handleNavigate('services')}>Our Services</button>
          <button onClick={() => handleNavigate('footer')}>Contact Us</button>
        </div>

        <div className="footer-column footer-contact reveal-item">
          <h3>Contact</h3>
          <div className="footer-detail">
            <span className="footer-icon" aria-hidden="true">P</span>
            <div>
              <strong>Phone</strong>
              <p>0719020362</p>
              <p>0718505398</p>
              <p>0719712606</p>
            </div>
          </div>
          <div className="footer-detail">
            <span className="footer-icon" aria-hidden="true">@</span>
            <div>
              <strong>Email</strong>
              <p>info@fountain.co.zw</p>
            </div>
          </div>
          <div className="footer-detail">
            <span className="footer-icon" aria-hidden="true">W</span>
            <div>
              <strong>Website</strong>
              <p>www.fountain.co.zw</p>
            </div>
          </div>
        </div>

        <div className="footer-column footer-address reveal-item">
          <h3>Address</h3>
          <div>
            <strong>Harare Office</strong>
            <p>2 Charlecote Road</p>
            <p>Greystone Park</p>
            <p>Borrowdale</p>
            <p>Harare</p>
          </div>
          <div className="address-divider" />
          <div>
            <strong>Mutare Office</strong>
            <p>81 J. Tongogara Street</p>
            <p>Palmerston</p>
            <p>Mutare</p>
          </div>
        </div>
      </div>

      <div className="container footer-social reveal-item">
        <div className="footer-line" />
        <button className="partner-btn" type="button">Partner With Us Today</button>
      </div>

      <div className="footer-bottom reveal-item">
        <p>&copy; {new Date().getFullYear()} Fountain Business Solutions (Pvt) Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;