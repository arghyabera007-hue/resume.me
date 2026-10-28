import { profile } from '../data/portfolio';

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function Hero() {
  function scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="hero" className="hero reveal" aria-labelledby="hero-heading">
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
    </section>
  );
}
