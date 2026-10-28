import { skills } from '../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="section reveal" aria-labelledby="skills-heading">
      <p className="section__label">Skills</p>
      <h2 id="skills-heading" className="section__title">What I work with</h2>
      <div className="skills__groups">
        {skills.map(group => (
          <div key={group.category} className="skills__group">
            <p className="skills__group-label">{group.category}</p>
            <ul className="skills__tags" aria-label={`${group.category} skills`}>
              {group.items.map(skill => (
                <li key={skill}>
                  <span className="skill-tag">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
