import { useEffect } from 'react';
import { profile } from '../data/portfolio';

function IconGlobe() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function IconBadge() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  );
}

function IconGithub() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 20.45h3.55V9H3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/>
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  // Close sidebar on escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onClose();
    }
  }

  return (
    <aside className={`sidebar${isOpen ? ' open' : ''}`} aria-label="Profile sidebar">
      {/* Avatar */}
      <div className="sidebar__avatar-wrap">
        <img src={profile.avatar} alt={`${profile.name} profile photo`} loading="eager" />
      </div>

      <h1 className="sidebar__name">{profile.name}</h1>
      <p className="sidebar__role">{profile.role}</p>
      <p className="sidebar__tagline">{profile.tagline}</p>

      {/* Meta */}
      <div className="sidebar__meta">
        <span className="sidebar__meta-item">
          <IconGlobe />
          {profile.location}
        </span>
        <span className="sidebar__meta-item">
          <IconBadge />
          {profile.availability}
        </span>
      </div>

      {/* Signature */}
      <div className="sidebar__signature-wrap" aria-label="Personal signature">
        <img
          src="/signature.png"
          alt="Arghya signature"
          className="sidebar__signature"
          loading="lazy"
        />
      </div>

      <div className="sidebar__divider" />

      {/* Footer */}
      <footer className="sidebar__footer">
        <div className="sidebar__social" aria-label="Social links">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__social-link"
            aria-label="GitHub profile"
          >
            <IconGithub />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__social-link"
            aria-label="LinkedIn profile"
          >
            <IconLinkedin />
          </a>
          <a
            href={profile.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__social-link"
            aria-label="Twitter profile"
          >
            <IconTwitter />
          </a>
        </div>
        <button
          className="btn-contact"
          onClick={() => scrollTo('contact')}
          aria-label="Jump to contact section"
        >
          <IconMail />
          Get in touch
        </button>
      </footer>
    </aside>
  );
}
