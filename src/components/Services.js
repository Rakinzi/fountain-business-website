import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './Services.css';

// Full service data – descriptions unchanged
const services = [
  {
    slug: 'human-resources-management',
    title: 'Human Resources Management',
    shortDesc: 'People planning, recruitment support, performance systems, employee engagement, and HR policies built around your workplace culture.',
    coverImage: '/images/hr.jpg',
    quote: '“Companies do not innovate – people do.”',
    subheading: 'Helping you to achieve results through people',
    focusAreas: ['Organizational Design', 'Culture Change', 'Talent Development'],
    longDesc: `
      <p>Our Human Resources services cover the full employee lifecycle, from workforce planning and recruitment to performance management, retention and succession planning. We assist clients in developing clear HR policies, employment contracts, staff handbooks, codes of conduct and organisational structures that create consistency and accountability across the business. We also support employee onboarding, talent development and engagement programmes that help organisations build motivated teams and strengthen productivity.</p>
      <p>Because people are central to business performance, we pay close attention to both compliance and culture. Our HR audits and advisory work help clients identify weaknesses, reduce risk and improve decision-making, while our training and workforce development support creates stronger leadership, better communication and more effective teams. The result is an HR function that serves not merely as administration, but as a valuable contributor to organisational growth and resilience.</p>
    `,
  },
  {
    slug: 'labour-relations',
    title: 'Labour Relations',
    shortDesc: 'Practical guidance for labour compliance, dispute resolution, workplace discipline, and healthy employer-employee relations.',
    coverImage: '/images/labour.jpg',
    quote: '“Fair workplaces build stable businesses.”',
    subheading: 'Strengthening employer‑employee relationships',
    focusAreas: ['Dispute Resolution', 'Compliance', 'Industrial Relations'],
    longDesc: `
      <p>Our labour relations advisory services help employers manage workplace matters with fairness, consistency and legal awareness. We provide support in disciplinary procedures, grievance handling, workplace investigations, collective bargaining matters and broader industrial relations strategy. Where disputes arise, we help clients prepare thoroughly, respond professionally and protect both operational stability and organisational reputation.</p>
      <p>We also guide organisations through compliance with labour legislation, National Employment Council requirements, conciliation processes, arbitration preparation and related employment law concerns. By addressing issues early and professionally, we help clients reduce conflict, avoid costly disruption and maintain productive working relationships that support business continuity and confidence among stakeholders.</p>
      <p>Our interventions reduce risk, minimise disruptions, and protect organisational reputation.</p>
    `,
  },
  {
    slug: 'compliance-governance',
    title: 'Compliance & Governance',
    shortDesc: 'Governance frameworks, policy development, ethics support, and regulatory alignment for stronger decision making.',
    coverImage: '/images/img1.jpg',
    quote: '“Good governance is the foundation of trust.”',
    subheading: 'Building accountable, transparent organisations',
    focusAreas: ['Risk Management', 'Policy Development', 'Ethics & Compliance'],
    longDesc: `
      <p>Our compliance and governance solutions are designed to help organisations operate with confidence, accountability and discipline. We support clients in developing governance frameworks, internal controls, policies, risk management processes and monitoring systems that improve oversight and strengthen decision-making. In doing so, we help businesses protect their reputation, meet their obligations and create a stable foundation for responsible growth.</p>
      <p>We also assist boards, leadership teams and operational managers to strengthen ethics, accountability and compliance culture across the organisation. Through audits, reviews and practical recommendations, we help clients identify weaknesses before they become major problems and implement systems that support transparency, sound governance and long-term sustainability.</p>
    `,
  },
  {
    slug: 'health-safety-environment',
    title: 'Health, Safety & Environment',
    shortDesc: 'Risk assessments, HSE systems, safety training, and environmental management support for safer operations.',
    coverImage: '/images/health.jpg',
    quote: '“A safe workplace is a productive workplace.”',
    subheading: 'Creating safer, healthier work environments',
    focusAreas: ['Risk Assessment', 'Safety Systems', 'Environmental Compliance'],
    longDesc: `
      <p>We support organisations in creating workplaces that are safe, healthy and properly managed. Our work includes the development of safety policies, risk assessments, hazard identification processes, incident investigation procedures and emergency preparedness plans. We also assist with compliance reviews and staff training so that safety becomes an active part of daily operations rather than a document kept on a shelf.</p>
      <p>A strong health, safety and environmental culture protects employees, reduces operational disruption and reinforces business credibility. By helping clients put practical systems in place, we contribute to safer working environments, improved employee wellbeing and stronger compliance with regulatory expectations. This ultimately supports productivity, stability and organisational reputation.</p>
      <p>We help organisations create safer and healthier work environments.</p>
    `,
  },
  {
    slug: 'business-strategy',
    title: 'Business Strategy',
    shortDesc: 'Strategic planning, process improvement, change management, and organisational development for sustainable growth.',
    coverImage: '/images/business.jpg',
    quote: '“Strategy without execution is only a dream.”',
    subheading: 'Turning vision into measurable results',
    focusAreas: ['Strategic Planning', 'Process Optimisation', 'Change Management'],
    longDesc: `
      <p>Our strategy and organisational development services help businesses define direction, improve structures and respond effectively to change. We work with leadership teams to develop strategic plans, review business models, improve internal processes and design transformation programmes that are realistic, coherent and aligned with organisational priorities. Where change is necessary, we help clients manage it in a way that protects momentum and builds internal support.</p>
      <p>By combining analysis with practical implementation support, we help organisations improve efficiency, strengthen accountability and prepare for future opportunities. Whether the objective is growth, restructuring, market expansion or performance improvement, our role is to provide the clarity, discipline and support required to turn strategy into meaningful results.</p>
    `,
  },
  {
    slug: 'branding-development',
    title: 'Branding & Development',
    shortDesc: 'Market positioning, brand strategy, growth planning, partnerships, and business development roadmaps.',
    coverImage: '/images/brand.jpg',
    quote: '“Your brand is the story you tell the world.”',
    subheading: 'Building brands that communicate credibility and purpose',
    focusAreas: ['Brand Positioning', 'Corporate Identity', 'Business Development'],
    longDesc: `
      <p>We help organisations build brands that communicate credibility, competence and purpose. Our branding and business development support includes corporate identity development, brand positioning, profile writing, presentation design and communication frameworks that allow businesses to present themselves with clarity and confidence. A strong brand does more than create visibility; it shapes how clients, partners, investors and employees perceive the business.</p>
      <p>Our aim is to help clients communicate their value in a way that attracts opportunity and strengthens reputation. By aligning brand message with business objectives, we support organisations in standing out in competitive markets, building trust with stakeholders and creating a professional image that encourages engagement and long-term business relationships.</p>
    `,
  },
];

// ----- Service Listing Component -----
export const ServicesList = ({ onFooterNavigate }) => {
  const navigate = useNavigate();

  // Intersection observer for reveal animations (cards + footer)
  useEffect(() => {
    // 1. Observe service cards – now using correct selector
    const cardSections = document.querySelectorAll('.services-section.reveal-section');
    const footerSection = document.querySelector('#footer.reveal-section');

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      cardSections.forEach((el) => el.classList.add('is-visible'));
      if (footerSection) footerSection.classList.add('is-visible');
      return undefined;
    }

    // Observer for cards
    const cardObserver = new IntersectionObserver(handleIntersect, {
      threshold: 0.18,
      rootMargin: '0px 0px -80px 0px',
    });
    cardSections.forEach((section) => cardObserver.observe(section));

    // Observer for footer (separate, with gentler threshold)
    let footerObserver = null;
    if (footerSection) {
      footerObserver = new IntersectionObserver(handleIntersect, {
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px',
      });
      footerObserver.observe(footerSection);
    }

    return () => {
      cardObserver.disconnect();
      if (footerObserver) footerObserver.disconnect();
    };
  }, []);

  // Navigation helpers
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleFooterNavigate = (id) => {
    if (id) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      navigate('/');
    }
  };

  const handleOpenAbout = () => {
    navigate('/about');
  };

  return (
    <>
      <section
        className="services-hero"
        style={{
          backgroundImage: 'url(./images/hero3.jpg)',
        }}
      >
        <div className="hero-overlay-bw"></div>
        <div className="hero-content-left">
          <div className="hero-breadcrumb">
            <button className="breadcrumb-link" onClick={() => navigateTo('/')}>
              Home
            </button>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-link active">Our Services</span>
          </div>
          <h1 className="hero-title">Our Services</h1>
        </div>
      </section>

      <section className="section services-section reveal-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card drop-card" key={service.slug}>
                <div className="card-cover">
                  <img src={service.coverImage} alt={service.title} />
                </div>
                <div className="card-content">
                  <h3>{service.title}</h3>
                  <p>{service.shortDesc}</p>
                  <Link to={`/services/${service.slug}`} className="read-more-link">
                    read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={handleFooterNavigate} onOpenAbout={handleOpenAbout} />
    </>
  );
};

// ----- Service Detail Component -----
export const ServiceDetail = ({ onFooterNavigate }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.slug === slug);

  useEffect(() => {
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);

  // Same observer setup for footer on detail page
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

  if (!service) return null;

  const handleFooterNavigate = (id) => {
    if (id) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      navigate('/');
    }
  };

  const handleOpenAbout = () => {
    navigate('/about');
  };

  return (
    <div className="service-detail-page">
      <div className="detail-content-wrapper">
        <div className="detail-back">
          <button onClick={() => navigate('/services')} className="back-btn">
            ← Back to Services
          </button>
        </div>

        <section
          className="detail-hero"
          style={{ backgroundImage: `url(${service.coverImage})` }}
        >
          <div className="hero-overlay-bw"></div>
        </section>

        <div className="detail-card-container">
          <div className="detail-card">
            <h1>{service.title}</h1>
            <div className="detail-quote">{service.quote}</div>

            <div className="service-detail-two-columns">
              <div className="service-detail-left">
                <div className="detail-subheading">{service.subheading}</div>
                <div className="detail-content" dangerouslySetInnerHTML={{ __html: service.longDesc }} />
              </div>

              <div className="service-detail-right">
                <div className="focus-diagram">
                  <div className="focus-diagram-header">
                    <span className="focus-icon-large">◉</span>
                    <span className="focus-title">Key Focus Areas</span>
                  </div>
                  <div className="focus-diagram-items">
                    {service.focusAreas.map((area, idx) => (
                      <div key={idx} className="focus-diagram-item">
                        <span className="focus-bullet">◉</span>
                        <span className="focus-name">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer onNavigate={handleFooterNavigate} onOpenAbout={handleOpenAbout} />
    </div>
  );
};

// Default export
const Services = () => null;
export default Services;