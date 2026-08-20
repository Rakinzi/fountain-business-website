import React, { useEffect, useState } from 'react';
import './Contact.css';
import Footer from './Footer';

const Icon = ({ type }) => {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2.4',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  const paths = {
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    office: (
      <>
        <rect x="7" y="3" width="10" height="18" rx="1.5" />
        <path d="M10 7h.01M14 7h.01M10 11h.01M14 11h.01M10 15h.01M14 15h.01M5 21h14" />
      </>
    ),
    location: (
      <>
        <path d="M12 3 3.5 20h17L12 3Z" />
        <path d="M12 10v4" />
        <path d="M12 17h.01" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.8a2 2 0 0 1-.45 2.11L8.05 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.31 1.84.53 2.8.66A2 2 0 0 1 22 16.92Z" />
    ),
  };

  return <svg className="contact-svg-icon" {...commonProps}>{paths[type]}</svg>;
};

const Contact = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });

  // Word reveal animation for hero heading
  useEffect(() => {
    const revealWords = document.querySelectorAll('.reveal-word');
    revealWords.forEach((word, index) => {
      setTimeout(() => {
        word.classList.add('animated');
      }, index * 300);
    });
  }, []);

  // Fade‑up for contact cards on scroll
  useEffect(() => {
    const cards = document.querySelectorAll('.contact-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // Observer for footer reveal
  useEffect(() => {
    const footerSection = document.querySelector('#footer.reveal-section');
    if (!footerSection) return;
    if (!('IntersectionObserver' in window)) {
      footerSection.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(footerSection);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (notification.show) setNotification({ show: false, message: '', type: 'info' });
  };

  const showNotification = (message, type = 'info', duration = 5000) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'info' }), duration);
  };

  // ----- MAILTO SUBMISSION (no backend) -----
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      showNotification('Please fill all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    // Build mailto URL
    const recipient = 'info@fountain.co.zw';
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Clear form and show success
    setFormData({ name: '', email: '', subject: '', message: '' });
    showNotification('Your email client has been opened. Please send the message.', 'success');
  };

  const handleFooterNavigate = (id) => {
    if (id === 'hero') {
      window.location.href = '/';
    } else if (id === 'services') {
      window.location.href = '/services';
    } else if (id === 'about') {
      window.location.href = '/about';
    } else if (id === 'footer') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else if (onNavigateHome) {
      onNavigateHome();
    }
  };

  const handleOpenAbout = () => {
    window.location.href = '/about';
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const contactInfo = {
    harare: {
      title: 'Harare Office',
      address: '2 Charlecote Road, Greystone Park, Borrowdale, Harare',
      phone: ['0719020362', '0718505398', '0719712606'],
      email: 'info@fountain.co.zw',
      website: 'www.fountain.co.zw',
    },
    mutare: {
      title: 'Mutare Office',
      address: '81 J. Tongogara Street, Palmerston, Mutare',
    },
  };

  return (
    <div className="contact-page">
      {notification.show && (
        <div className={`notification ${notification.type} show`}>
          <span className="notification-icon">
            {notification.type === 'success' ? 'OK' : notification.type === 'error' ? '!' : 'i'}
          </span>
          <span>{notification.message}</span>
          <button
            className="notification-close"
            onClick={() => setNotification({ show: false, message: '', type: 'info' })}
            type="button"
          >
            ×
          </button>
        </div>
      )}

      <main>
        {/* HERO */}
        <section
          className="contact-hero"
          style={{
            backgroundImage: `url('./images/contact.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="hero-overlay"></div>
          <div className="contact-hero-grid">
            <div className="contact-hero-copy">
              <div className="hero-breadcrumb">
                <button className="breadcrumb-link" onClick={() => navigateTo('/')}>
                  Home
                </button>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-link active">Contact Us</span>
              </div>
              <h1 className="reveal-title">
                {'Contact Us'.split(' ').map((word, i) => (
                  <span key={i} className="reveal-word">{word}</span>
                ))}
              </h1>
            </div>
            <div className="contact-hero-image-wrap"></div>
          </div>
        </section>

        {/* Contact info cards */}
        <section className="contact-info-section">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-card contact-detail-card">
                <div className="contact-icon"><Icon type="email" /></div>
                <h3>Email</h3>
                <a href={`mailto:${contactInfo.harare.email}`}>{contactInfo.harare.email}</a>
              </div>

              <div className="contact-card contact-detail-card">
                <div className="contact-icon"><Icon type="office" /></div>
                <h3>Harare Address</h3>
                <p>{contactInfo.harare.address}</p>
              </div>

              <div className="contact-card contact-detail-card">
                <div className="contact-icon"><Icon type="location" /></div>
                <h3>{contactInfo.mutare.title}</h3>
                <p>{contactInfo.mutare.address}</p>
              </div>

              <div className="contact-card contact-detail-card">
                <div className="contact-icon"><Icon type="phone" /></div>
                <h3>Phone Number</h3>
                <div className="phone-list">
                  {contactInfo.harare.phone.map((num) => (
                    <a key={num} href={`tel:${num}`}>{num}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP + FORM – half in, half out */}
        <section className="contact-map-form-section">
          <div className="container">
            <div className="map-form-stage">
              <iframe
                title="Fountain Business Solutions Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.0!2d31.0500!3d-17.8252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a2c0c0c0c0c1%3A0x0!2zMTfCsDQ5JzMwLjgiUyAzMcKwMDInMjAuMCJF!5e0!3m2!1sen!2szw!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />

              <div className="contact-form-container map-form-card">
                <h2><Icon type="email" /> Send Message</h2>
                <form onSubmit={handleSubmit}>
                  {/* All fields stacked vertically – no form-row */}
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={handleFooterNavigate} onOpenAbout={handleOpenAbout} />
    </div>
  );
};

export default Contact;