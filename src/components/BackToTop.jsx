import { useState, useEffect } from 'react';

function IconArrowUp() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed]  = useState(false);

  // Show button after scrolling 300px
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleClick() {
    setPressed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setPressed(false), 600);
  }

  return (
    <button
      id="back-to-top-fab"
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}${pressed ? ' back-to-top--pressed' : ''}`}
      onClick={handleClick}
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <IconArrowUp />
      <span className="back-to-top__ripple" aria-hidden="true" />
    </button>
  );
}
