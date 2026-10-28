import { experience, education } from '../data/portfolio';

function TimelineItem({ title, sub, period, description }) {
  return (
    <div className="timeline__item">
      <div className="timeline__header">
        <div>
          <p className="timeline__title">{title}</p>
          <p className="timeline__sub">{sub}</p>
        </div>
        <span className="timeline__period">{period}</span>
      </div>
      {Array.isArray(description) ? (
        <ul className="timeline__desc">
          {description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="timeline__desc">{description}</p>
      )}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section reveal" aria-labelledby="exp-heading">
      <p className="section__label">Experience</p>
      <h2 id="exp-heading" className="section__title">Where I&apos;ve worked</h2>
      <div className="timeline">
        {experience.map(item => (
          <TimelineItem
            key={item.id}
            title={item.role}
            sub={item.company}
            period={item.period}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="section reveal" aria-labelledby="edu-heading">
      <p className="section__label">Education</p>
      <h2 id="edu-heading" className="section__title">Where I studied</h2>
      <div className="timeline">
        {education.map(item => (
          <TimelineItem
            key={item.id}
            title={item.degree}
            sub={item.institution}
            period={item.period}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
