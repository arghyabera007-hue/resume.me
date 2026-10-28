import { profile } from '../data/portfolio';

export default function About() {
  return (
    <section id="about" className="section reveal" aria-labelledby="about-heading">
      <p className="section__label">About</p>
      <h2 id="about-heading" className="section__title">Who I am</h2>
      <div className="about__body">
        {profile.bio.map((para, i) => (
          <p key={i} className="about__p">{para}</p>
        ))}
      </div>
    </section>
  );
}
