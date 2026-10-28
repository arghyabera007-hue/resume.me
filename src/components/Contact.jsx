import { useState } from 'react';
import { profile } from '../data/portfolio';

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Name is required.';
  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.message.trim()) errors.message = 'Message is required.';
  return errors;
}

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  function handleChange(e) {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('sending');
    try {
      // Using mailto: as a simple, dependency-free contact mechanism.
      // Replace this with your preferred email service (e.g. EmailJS, Formspree) when ready.
      const subject = encodeURIComponent(fields.subject || `Portfolio contact from ${fields.name}`);
      const body = encodeURIComponent(
        `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      setFields({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section reveal" aria-labelledby="contact-heading">
      <p className="section__label">Contact</p>
      <h2 id="contact-heading" className="section__title">Let&apos;s talk</h2>
      <p className="contact__intro">
        Have a project in mind, want to collaborate, or just say hello? Fill in the
        form below and I&apos;ll get back to you as soon as possible.
      </p>

      {status === 'success' && (
        <div className="form-status form-status--success" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Your email client should open. If not, email me directly at {profile.email}.
        </div>
      )}

      {status === 'error' && (
        <div className="form-status form-status--error" role="alert">
          Something went wrong. Please email me directly at {profile.email}.
        </div>
      )}

      <form
        className="contact__form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact form"
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact-name" className="form-label">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className={`form-input${errors.name ? ' error' : ''}`}
              placeholder="Your name"
              value={fields.name}
              onChange={handleChange}
              autoComplete="name"
              aria-required="true"
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name && (
              <span id="contact-name-error" className="form-error" role="alert">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="contact-email" className="form-label">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              className={`form-input${errors.email ? ' error' : ''}`}
              placeholder="your@email.com"
              value={fields.email}
              onChange={handleChange}
              autoComplete="email"
              aria-required="true"
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email && (
              <span id="contact-email-error" className="form-error" role="alert">{errors.email}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contact-subject" className="form-label">Subject <span style={{color:'var(--clr-text-faint)',fontWeight:400}}>(optional)</span></label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            className="form-input"
            placeholder="What's this about?"
            value={fields.subject}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-message" className="form-label">Message</label>
          <textarea
            id="contact-message"
            name="message"
            className={`form-textarea${errors.message ? ' error' : ''}`}
            placeholder="Tell me about your project or idea…"
            value={fields.message}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
          />
          {errors.message && (
            <span id="contact-message-error" className="form-error" role="alert">{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={status === 'sending'}
          id="contact-submit"
        >
          {status === 'sending' ? 'Opening mail…' : 'Send message'}
        </button>
      </form>
    </section>
  );
}
