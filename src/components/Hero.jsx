import { profile } from '../data/portfolio';
import { IconGithub, IconLinkedin, IconX } from './SocialIcons';

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function Hero() {
  function scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="hero" className="hero reveal" aria-labelledby="hero-heading">
      {/* Mobile hero avatar (visible when sidebar drawer is closed) */}
      <div className="hero__avatar-mobile">
        <img
          src={profile.avatar}
          alt={`${profile.name} profile photo`}
          loading="eager"
        />
      </div>

      <h2 id="hero-heading" className="hero__heading">
        Hi, I&apos;m {profile.name.split(' ')[0]}. I build{' '}
        <em>thoughtful</em> software.
      </h2>

      <p className="hero__desc">
        I&apos;m a passionate full-stack developer, currently pursuing my college degree in computer science. I love building real-world projects that solve meaningful problems, from web apps to AI-powered tools. I&apos;m constantly exploring the world of AI and ML integration. I enjoy turning complex ideas into clean, functional code. Whether it&apos;s a hackathon project or a personal portfolio build, I give it my best. I believe in learning by doing every project teaches me something new. I&apos;m comfortable working across the stack, from designing REST APIs to training deep learning models. Collaboration, curiosity, and consistency are the three things that drive me. I&apos;m always open to connecting with like-minded developers and contributors. Let&apos;s build something amazing together.
      </p>

      <div className="hero__actions">
        <button className="btn-primary" onClick={scrollToContact} id="hero-cta-contact">
          Let&apos;s work together
          <IconArrow />
        </button>
        <a
          href="#projects"
          className="btn-secondary"
          id="hero-cta-projects"
          onClick={e => {
            e.preventDefault();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          View my work
        </a>
      </div>

      <div className="hero__social" aria-label="Social profiles">
        <span className="hero__social-label">Connect:</span>
        <div className="hero__social-links">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social-link"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <IconGithub size={15} />
            <span>GitHub</span>
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social-link"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <IconLinkedin size={15} />
            <span>LinkedIn</span>
          </a>
          <a
            href={profile.social.x || profile.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social-link"
            aria-label="X (Twitter) profile"
            title="X (Twitter)"
          >
            <IconX size={14} />
            <span>X</span>
          </a>
        </div>
      </div>
    </section>
  );
}
