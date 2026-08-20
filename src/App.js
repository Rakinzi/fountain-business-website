import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Home from './components/Home';
import { ServicesList, ServiceDetail } from './components/Services';
import Footer from './components/Footer';

// Helper: scroll to element (same as original)
const scrollToTarget = (targetId) => {
  window.setTimeout(() => {
    const element = document.getElementById(targetId);
    if (!element) return;
    if (element.tagName === 'DETAILS') element.open = true;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
};

// Inner component that has access to navigate and location
const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle "popstate" (back/forward buttons) – React Router does this automatically,
  // but we keep the scroll restoration on hash changes.
  useEffect(() => {
    // Scroll to top on route change (except when a hash is present)
    if (location.hash) {
      const hashTarget = location.hash.replace('#', '');
      scrollToTarget(hashTarget);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  // Navigation functions (used by Header and Footer)
  const navigateToPage = (page, hashTarget = '') => {
    let path = '';
    switch (page) {
      case 'home': path = '/'; break;
      case 'about': path = '/about'; break;
      case 'services': path = '/services'; break;
      case 'contact': path = '/contact'; break;
      default: path = '/';
    }
    if (hashTarget) path = `${path}#${hashTarget}`;
    navigate(path);
  };

  const navigateToAboutSection = (sectionId) => {
    navigateToPage('about', sectionId);
  };

  const handleFooterNavigate = (id) => {
    if (id === 'hero') {
      navigateToPage('home', 'hero');
    } else if (id === 'services') {
      navigateToPage('home', 'services');
    } else if (id === 'about') {
      navigateToPage('about');
    } else if (id === 'footer') {
      navigateToPage('contact');
    } else {
      scrollToTarget(id);
    }
  };

  // Determine current page name for the Header (simple path matching)
  let currentPage = 'home';
  if (location.pathname === '/about') currentPage = 'about';
  else if (location.pathname === '/services') currentPage = 'services';
  else if (location.pathname === '/contact') currentPage = 'contact';
  else if (location.pathname.startsWith('/services/')) currentPage = 'services'; // detail pages still highlight Services

  return (
    <>
      <Header
        currentPage={currentPage}
        onNavigateHome={() => navigateToPage('home')}
        onNavigateAbout={() => navigateToPage('about')}
        onNavigateServices={() => navigateToPage('services')}
        onNavigateContact={() => navigateToPage('contact')}
        onNavigateAboutSection={navigateToAboutSection}
      />
      <Routes>
        <Route path="/" element={<Home onFooterNavigate={handleFooterNavigate} />} />
        <Route path="/about" element={<About onNavigateHome={() => navigateToPage('home')} onFooterNavigate={handleFooterNavigate} />} />
        <Route path="/services" element={<ServicesList onFooterNavigate={handleFooterNavigate} />} />
        <Route path="/services/:slug" element={<ServiceDetail onFooterNavigate={handleFooterNavigate} />} />
        <Route path="/contact" element={<Contact onFooterNavigate={handleFooterNavigate} />} />
      </Routes>
    </>
  );
};

// Main App component – wrapped with BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;