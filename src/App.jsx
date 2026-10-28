import { useState, useCallback } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import { Experience, Education } from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import { useActiveSection, useRevealOnScroll } from './hooks/useScrollObserver';

function IconMenu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
    </svg>
  );
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

export default function App() {
  const activeSection = useActiveSection();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useRevealOnScroll();

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);

  return (
    <>
      {/* Mobile nav toggle */}
      <button
        className="mobile-nav-toggle"
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={sidebarOpen}
        aria-controls="sidebar"
        id="mobile-menu-btn"
      >
        {sidebarOpen ? <IconX /> : <IconMenu />}
      </button>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <div className="layout">
        <Sidebar
          activeSection={activeSection}
          isOpen={sidebarOpen}
          onClose={closeSidebar}
        />

        <main className="main-content" id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>

      <BackToTop />
    </>
  );
}
