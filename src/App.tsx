import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Intro, Work, Values, Background, References, Contact } from './components/sections';
import { CaseStudy } from './components/CaseStudy';
import CaseStudyEditor from './components/admin/CaseStudyEditor';
import AdminLogin from './components/admin/AdminLogin';
import NewProductStartup from './components/case-studies/NewProductStartup';
import { Toaster } from 'react-hot-toast';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import { ThemeProvider } from './contexts/ThemeContext';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import Modal from './components/Modal';

function MainLayout() {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleIntersection = useCallback((id: string) => {
    requestAnimationFrame(() => {
      setActiveTab(id);
    });
  }, []);

  useIntersectionObserver(handleIntersection);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      requestAnimationFrame(() => {
        setActiveTab(id);
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleCaseStudyClick = (id: string) => {
    setActiveCaseStudy(id);
  };

  const handleCaseStudyClose = () => {
    setActiveCaseStudy(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById('mobile-nav');
      const button = document.getElementById('mobile-menu-button');
      if (nav && !nav.contains(event.target as Node) && 
          button && !button.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex bg-white overflow-x-hidden">
      <button 
        id="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-sm"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div 
        id="mobile-nav"
        className={`
          fixed inset-y-0 left-0 w-64 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out z-40
          lg:relative lg:transform-none lg:shadow-none
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="fixed w-64 h-screen flex flex-col p-8">
          <Logo />
          <div className="flex-1">
            <Navigation 
              activeTab={activeTab} 
              onTabChange={scrollToSection}
            />
          </div>
        </div>
      </div>

      <main className="flex-1 relative w-full">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-[calc(100vh-80px)]">
            <section id="intro" className="min-h-[calc(100vh-80px)] flex items-start">
              <Intro />
            </section>
            <section id="work" className="min-h-[calc(100vh-80px)] flex items-center">
              <Work onCaseStudyClick={handleCaseStudyClick} />
            </section>
            <section id="values" className="min-h-[calc(100vh-80px)] flex items-center">
              <Values />
            </section>
            <section id="background" className="min-h-[calc(100vh-80px)] flex items-center">
              <Background />
            </section>
            <section id="references" className="min-h-[calc(100vh-80px)] flex items-center">
              <References />
            </section>
            <section id="contact" className="min-h-[calc(100vh-80px)] flex items-center">
              <Contact />
            </section>
          </div>
        </div>

        <Modal isOpen={activeCaseStudy !== null} onClose={handleCaseStudyClose}>
          {activeCaseStudy && (
            <CaseStudy 
              id={activeCaseStudy} 
              onClose={handleCaseStudyClose}
            />
          )}
        </Modal>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<CaseStudyEditor />} />
          <Route path="/case-studies/new-product-startup" element={<NewProductStartup />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </Router>
  );
}