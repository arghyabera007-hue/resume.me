import { useState, useEffect } from 'react';

const SECTION_IDS = ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'contact'];

/**
 * Returns the ID of the section currently most visible in the viewport.
 * Uses IntersectionObserver for lightweight, paint-budget-free detection.
 */
export function useActiveSection() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const ratio = {};

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          ratio[entry.target.id] = entry.intersectionRatio;
        });
        const top = Object.entries(ratio).reduce(
          (best, [id, r]) => (r > best[1] ? [id, r] : best),
          ['hero', 0]
        );
        setActive(top[0]);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

/**
 * Adds the 'reveal' + 'visible' CSS classes to elements as they scroll
 * into view, enabling lightweight entrance animations.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip animation — make everything visible immediately
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
