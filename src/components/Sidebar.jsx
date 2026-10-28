import { useEffect } from 'react';
import { profile } from '../data/portfolio';
import { IconGithub, IconLinkedin, IconX } from './SocialIcons';

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
            title="GitHub"
          >
            <IconGithub size={16} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__social-link"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <IconLinkedin size={16} />
          </a>
          <a
            href={profile.social.x || profile.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__social-link"
            aria-label="X (Twitter) profile"
            title="X (Twitter)"
          >
            <IconX size={15} />
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
