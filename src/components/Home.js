import React, { useEffect, useState } from 'react';
import './Home.css';
import Footer from './Footer';

const Home = () => {
  const slidesData = [
    {
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600',
      heading: 'Executive Trainings',
      quote: '"Training is the bridge between aspiration and achievement, guiding potential into proficiency and transforming knowledge into action."',
    },
    {
      image: 'images/hero2.jpg',
      heading: 'Innovate & Transform',
      quote: '"Empowering businesses with forward-thinking strategies and transformative solutions."',
    },
    {
      image: 'images/hero3.jpg',
      heading: 'Strategic Partners',
      quote: '"Building sustainable success through trusted partnerships and shared vision."',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slidesData.length]);

  // Intersection Observer for reveal animations
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
      { threshold: 0.18, rootMargin: '0px 0px -80px 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  // ===== UPDATED SERVICES DATA with images =====
  const services = [
    {
      image: './images/hr.jpg',
      title: 'Human Resources Management',
      description:
        'People planning, recruitment support, performance systems, and employee engagement solutions built around your workplace culture.',
    },
    {
      image: './images/labour.jpg',
      title: 'Labour Relations',
      description:
        'Practical guidance for labour compliance, dispute resolution, workplace discipline, and healthy employer-employee relations.',
    },
    {
      image: './images/img1.jpg',
      title: 'Compliance & Governance',
      description:
        'Governance frameworks, policy development, ethics support, and regulatory alignment for stronger decision making.',
    },
    {
      image: './images/health.jpg',
      title: 'Health, Safety & Environment',
      description:
        'Risk assessments, HSE systems, safety training, and environmental management support for safer operations.',
    },
    {
      image: './images/business.jpg',
      title: 'Business Strategy',
      description:
        'Strategic planning, process improvement, change management, and organisational development for sustainable growth.',
    },
    {
      image: './images/brand.jpg',
      title: 'Branding & Development',
      description:
        'Market positioning, brand strategy, growth planning, partnerships, and business development roadmaps.',
    },
  ];

  const whyChoose = [
    {
      title: 'Local Expertise',
      description:
        'Zimbabwean-owned insight with standards that support ambitious, modern organisations.',
    },
    {
      title: 'Practical Solutions',
      description:
        'Clear recommendations, usable systems, and strategies your team can actually implement.',
    },
    {
      title: 'Trusted Partnership',
      description:
        'We work beside leaders from diagnosis through execution, not just at the presentation stage.',
    },
    {
      title: 'Measurable Results',
      description:
        'Our work is focused on efficiency, growth, compliance, and long-term operating value.',
    },
  ];

  const current = slidesData[currentSlide];
  const headingWords = current.heading.split(' ');

  return (
    <div className="homepage">
      <main>
        <section id="hero" className="hero">
          <div className="slideshow">
            {slidesData.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''} 
                  ${index === 1 ? 'scrapbook' : ''} 
                  ${index === 2 ? 'party' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            ))}
          </div>

          <div className="hero-overlay"></div>

          <div className="hero-content" key={currentSlide}>
            <h1>
              {headingWords.map((word, i) => (
                <span
                  key={i}
                  className="hero-block-word"
                  style={{ '--delay': `${0.2 + i * 0.12}s` }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="hero-quote">{current.quote}</p>

            <div className="hero-buttons">
              <button
                className="hero-btn primary"
                onClick={() => navigateTo('/services')}
              >
                Our Services
              </button>
              <button
                className="hero-btn secondary"
                onClick={() => navigateTo('/contact')}
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* About Section (unchanged) */}
        <section id="about" className="section about-section reveal-section">
          <div className="container">
            <div className="section-heading reveal-item">
              <span className="eyebrow">About us</span>
            </div>

            <div className="about-grid">
              <article className="about-card about-card-large reveal-item drop-card">
                <h3>Who We Are</h3>
                <p>
                  Fountain Business Solutions is a Zimbabwean-owned corporate consultancy firm helping
                  organisations improve performance through practical strategy, governance, people, and systems.
                </p>
                <p>
                  We partner with leaders to strengthen productivity, manage change, and build sustainable value
                  for owners, teams, customers, and stakeholders.
                </p>
              </article>

              <article className="about-card about-card-accent reveal-item drop-card">
                <h3>Corporate Promise</h3>
                <p>
                  Our promise is to deliver work of genuine value. We are committed to protecting our clients’
                  interests, strengthening their people systems, improving productivity, supporting compliance
                  and contributing to sustainable growth.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ===== UPDATED SERVICES SECTION ===== */}
        <section id="services" className="section services-section reveal-section">
          <div className="container">
            <div className="section-heading centered reveal-item">
              <span className="eyebrow">What we do</span>
            </div>

            {/* Scroll container – drops in on reveal */}
            <div className="services-scroll reveal-item drop-card">
              <div className="services-track">
                {/* First set */}
                {services.map((service, index) => (
                  <div
                    className="service-card-scroll"
                    key={index}
                    style={{ backgroundImage: `url(${service.image})` }}
                  >
                    <div className="service-card-overlay"></div>
                    <div className="service-card-content">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {services.map((service, index) => (
                  <div
                    className="service-card-scroll"
                    key={`dup-${index}`}
                    style={{ backgroundImage: `url(${service.image})` }}
                  >
                    <div className="service-card-overlay"></div>
                    <div className="service-card-content">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section (unchanged) */}
        <section className="section why-section reveal-section">
          <div className="container why-layout">
            <div className="section-heading reveal-item">
              <span className="eyebrow">Why choose us</span>
              <h2>Advisory work that stays close to execution.</h2>
              <p>
                We combine local context with disciplined delivery, so every recommendation has a practical path
                into the daily work of the business.
              </p>
            </div>

            <div className="why-grid">
              {whyChoose.map((item, index) => (
                <article className="why-card reveal-item drop-card" key={item.title}>
                  <span className="why-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={handleScroll} />
    </div>
  );
};

export default Home;