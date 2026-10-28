import { projects } from '../data/portfolio';

function IconGithub() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
    </svg>
  );
}

function IconExternalLink() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card" aria-labelledby={`proj-name-${project.id}`}>
      <div className="project-card__thumb">
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading="lazy"
        />
      </div>
      <div className="project-card__body">
        <h3 id={`proj-name-${project.id}`} className="project-card__name">{project.name}</h3>
        <p className="project-card__desc">{project.description}</p>
        <ul className="project-card__tech" aria-label="Technologies used">
          {project.tech.map(t => (
            <li key={t}><span className="project-card__tech-tag">{t}</span></li>
          ))}
        </ul>
        <div className="project-card__links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label={`${project.name} GitHub repository`}
            >
              <IconGithub /> Source
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label={`${project.name} live demo`}
            >
              <IconExternalLink /> Live demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section reveal" aria-labelledby="projects-heading">
      <p className="section__label">Projects</p>
      <h2 id="projects-heading" className="section__title">Things I&apos;ve built</h2>
      <div className="projects__grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
