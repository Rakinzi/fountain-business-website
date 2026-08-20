import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import './About.css';

const heroBgImage = './images/aboutus.jpg';

const overviewParagraphs = [
  'Fountain Business Solutions (Pvt) Ltd is a Zimbabwean-owned corporate consultancy firm focused on strengthening organisational performance through strategic business solutions.',
  'Our work is grounded in the belief that strong organisations are built on clear strategy, capable people, sound governance and effective systems. When these foundations are in place, businesses are better able to manage change, improve productivity, strengthen accountability and create value for owners, employees, customers and wider stakeholders.',
  'Our role is to help organisations build and strengthen these pillars through professional consulting, implementation, training, and advisory services.',
  'Through our integrated service model, we do more than provide consultancy. We work alongside our clients as trusted partners, offering insight, structure and implementation support that helps them solve immediate problems while preparing confidently for the future.',
];

const missionText = "To empower organisations through innovative business strategies, compliance-driven systems, effective workforce management, and modern corporate solutions that foster resilience, profitability, and sustainable growth.";
const visionText = "To become the leading and most trusted architect of corporate excellence, business sustainability, and regulatory compliance throughout Zimbabwe and the Southern African Development Community (SADC).";

const coreValuesList = [
  { name: 'Integrity' },
  { name: 'Excellence' },
  { name: 'Innovation' },
  { name: 'Collaboration' },
];

const About = ({ onFooterNavigate, onNavigateAboutSection }) => {
  const [activeOverlay, setActiveOverlay] = useState(null);

  const toggleOverlay = (cardName) => {
    setActiveOverlay(prev => (prev === cardName ? null : cardName));
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  // Scroll to section based on hash on mount and hash change
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        }
      }
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  // Observer for reveal sections
  useEffect(() => {
    const sections = document.querySelectorAll('.reveal-section');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return undefined;
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
      { threshold: 0.16, rootMargin: '0px 0px -70px 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <main>
        {/* HERO */}
        <section
          className="hero-300 reveal-section"
          style={{ backgroundImage: `url(${heroBgImage})` }}
        >
          <div className="hero-overlay-bw"></div>
          <div className="hero-content-left">
            <div className="hero-breadcrumb">
              <button className="breadcrumb-link" onClick={() => navigateTo('/')}>
                Home
              </button>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-link active">About Us</span>
            </div>
            <h1 className="hero-title">About Us</h1>
          </div>
        </section>

        {/* ===== OVERVIEW CARD – this is the "History" target ===== */}
        <section id="historySection" className="about-content-section reveal-section">
          <div className="about-bg-overlay"></div>
          <div className="container">
            <div className="about-content-card drop-card">
              <h2 className="block-reveal-title">
                <span className="block-word">Fountain</span>
                <span className="block-word">Business</span>
                <span className="block-word">Solutions</span>
              </h2>
              <span className="about-title-rule"></span>
              <div className="overview-text-full">
                {overviewParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== MISSION, VISION, CORE VALUES CARDS ===== */}
        <section className="mission-vision-values reveal-section">
          <div className="container">
            <div className="three-cards-grid compact">
              <div id="missionSection" className="info-card-compact hover-lift drop-card" onClick={() => toggleOverlay('mission')}>
                <div className="card-cover">
                  <img src="./images/mission.jpg" alt="Mission" />
                  <div className="card-overlay"></div>
                </div>
                <div className="card-content-inner">
                  <h3>Mission</h3>
                </div>
                <div className={`card-overlay-content ${activeOverlay === 'mission' ? 'show' : ''}`}>
                  <div className="overlay-inner">
                    <p>{missionText}</p>
                  </div>
                </div>
              </div>

              <div id="visionSection" className="info-card-compact hover-lift drop-card" onClick={() => toggleOverlay('vision')}>
                <div className="card-cover">
                  <img src="./images/vision.jpg" alt="Vision" />
                  <div className="card-overlay"></div>
                </div>
                <div className="card-content-inner">
                  <h3>Vision</h3>
                </div>
                <div className={`card-overlay-content ${activeOverlay === 'vision' ? 'show' : ''}`}>
                  <div className="overlay-inner">
                    <p>{visionText}</p>
                  </div>
                </div>
              </div>

              <div id="coreValuesSection" className="info-card-compact hover-lift drop-card" onClick={() => toggleOverlay('coreValues')}>
                <div className="card-cover">
                  <img src="./images/core.jpg" alt="Core Values" />
                  <div className="card-overlay"></div>
                </div>
                <div className="card-content-inner">
                  <h3>Core Values</h3>
                </div>
                <div className={`card-overlay-content ${activeOverlay === 'coreValues' ? 'show' : ''}`}>
                  <div className="overlay-inner">
                    <div className="core-values-list">
                      {coreValuesList.map((value) => (
                        <div key={value.name} className="core-value-item">
                          {value.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onFooterNavigate} />
    </div>
  );
};

export default About;