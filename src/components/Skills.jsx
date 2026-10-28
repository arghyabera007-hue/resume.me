import { skills } from '../data/portfolio';

function IconExternal() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function Skills() {
  const allSkills = skills.flatMap(group => group.items);

  return (
    <section id="skills" className="section reveal" aria-labelledby="skills-heading">
      <p className="section__label">Skills & Technologies</p>
      <h2 id="skills-heading" className="section__title">What I work with</h2>

      {/* Quick Access Technology Icon Bar */}
      <div className="skills__showcase" aria-label="Technology icons">
        {allSkills.map(skill => (
          <a
            key={skill.name}
            href={skill.url}
            target="_blank"
            rel="noreferrer"
            className="skills__showcase-link"
            title={skill.name}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              width="40"
              height="40"
              loading="lazy"
            />
          </a>
        ))}
      </div>

      {/* Categorized Detailed Skill Cards */}
      <div className="skills__groups">
        {skills.map(group => (
          <div key={group.category} className="skills__group">
            <h3 className="skills__group-label">{group.category}</h3>
            <div className="skills__grid" role="list" aria-label={`${group.category} technologies`}>
              {group.items.map(skill => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noreferrer"
                  className="skill-card"
                  role="listitem"
                  title={`Open ${skill.name} documentation`}
                >
                  <div className="skill-card__icon-wrap">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="skill-card__icon"
                      width="28"
                      height="28"
                      loading="lazy"
                    />
                  </div>
                  <span className="skill-card__name">{skill.name}</span>
                  <span className="skill-card__arrow" aria-hidden="true">
                    <IconExternal />
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
