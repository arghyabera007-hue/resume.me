import { useState, useEffect, useRef, useMemo } from 'react';
import './GlassSearchBar.css';

// All searchable components and items across the portfolio
const SEARCHABLE_ITEMS = [
  {
    id: 'hero',
    title: 'Hero Section',
    subtitle: 'Intro, tagline & call to action buttons',
    category: 'Component',
    keywords: ['hero', 'intro', 'header', 'alex rivera', 'home', 'top', 'overview'],
    badge: 'Section'
  },
  {
    id: 'about',
    title: 'About Me',
    subtitle: 'Background, philosophy & developer story',
    category: 'Component',
    keywords: ['about', 'bio', 'story', 'developer', 'philosophy', 'who am i'],
    badge: 'Section'
  },
  {
    id: 'skills',
    title: 'Skills Matrix',
    subtitle: 'Frontend, Backend, Cloud & DevOps tooling',
    category: 'Component',
    keywords: ['skills', 'tech stack', 'languages', 'frontend', 'backend', 'tools', 'technologies', 'react', 'typescript', 'node'],
    badge: 'Section'
  },
  {
    id: 'projects',
    title: 'Projects Showcase',
    subtitle: 'ShopFlow, ProjectFlow & Nexus AI with live links',
    category: 'Component',
    keywords: ['projects', 'portfolio', 'work', 'code', 'apps', 'showcase', 'shopflow', 'projectflow', 'nexus'],
    badge: 'Section'
  },
  {
    id: 'experience',
    title: 'Experience Timeline',
    subtitle: 'Meridian Labs, Spark Digital & career progression',
    category: 'Component',
    keywords: ['experience', 'work history', 'career', 'jobs', 'meridian labs', 'spark digital', 'senior full-stack developer'],
    badge: 'Section'
  },
  {
    id: 'education',
    title: 'Education',
    subtitle: 'B.Sc. Computer Science - UC Berkeley',
    category: 'Component',
    keywords: ['education', 'degree', 'university', 'berkeley', 'college', 'academics'],
    badge: 'Section'
  },
  {
    id: 'contact',
    title: 'Contact Form',
    subtitle: 'Direct messaging, inquiries & social links',
    category: 'Component',
    keywords: ['contact', 'email', 'message', 'reach out', 'hire', 'get in touch', 'social'],
    badge: 'Section'
  },
  // Sub-items for deep search
  {
    id: 'projects',
    title: 'ShopFlow E-Commerce',
    subtitle: 'Microservices, real-time inventory & Stripe payments',
    category: 'Project',
    keywords: ['shopflow', 'ecommerce', 'store', 'shop', 'stripe', 'inventory', 'postgresql'],
    badge: 'Project'
  },
  {
    id: 'projects',
    title: 'ProjectFlow Kanban',
    subtitle: 'Collaborative task management & WebSockets',
    category: 'Project',
    keywords: ['projectflow', 'kanban', 'task manager', 'websockets', 'team', 'real-time'],
    badge: 'Project'
  },
  {
    id: 'projects',
    title: 'Nexus AI Chat',
    subtitle: 'Multi-provider LLM interface with streaming',
    category: 'Project',
    keywords: ['nexus ai', 'ai', 'chat', 'llm', 'streaming', 'openai', 'fastapi'],
    badge: 'Project'
  },
  {
    id: 'skills',
    title: 'Frontend Tech Stack',
    subtitle: 'React, TypeScript, Next.js, Tailwind CSS, Vite',
    category: 'Skills',
    keywords: ['frontend', 'react', 'typescript', 'next.js', 'css', 'tailwind', 'vite', 'figma'],
    badge: 'Skill'
  },
  {
    id: 'skills',
    title: 'Backend & APIs',
    subtitle: 'Node.js, Express, Python, FastAPI, GraphQL, REST',
    category: 'Skills',
    keywords: ['backend', 'node.js', 'express', 'python', 'fastapi', 'graphql', 'rest apis'],
    badge: 'Skill'
  }
];

const DEFAULT_RECENT = [
  'Hero Section',
  'Projects Showcase',
  'Skills Matrix',
  'Contact Form'
];

function IconSearch() {
  return (
    <svg className="glass-icon glass-icon--search" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg className="glass-icon glass-icon--close" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconHistory() {
  return (
    <svg className="glass-icon glass-icon--history" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function IconReturn() {
  return (
    <svg className="glass-icon glass-icon--return" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg className="glass-icon glass-icon--compass" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

export default function GlassSearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('glass_recent_searches');
      return saved ? JSON.parse(saved) : DEFAULT_RECENT;
    } catch {
      return DEFAULT_RECENT;
    }
  });

  const cardRef = useRef(null);
  const inputRef = useRef(null);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // If empty query, show recent searches matched against our items
      const recentObjects = [];
      recentSearches.forEach(title => {
        const found = SEARCHABLE_ITEMS.find(item => item.title.toLowerCase() === title.toLowerCase());
        if (found) recentObjects.push(found);
        else {
          recentObjects.push({
            id: 'hero',
            title,
            subtitle: 'Recent component search',
            category: 'Recent',
            badge: 'Recent'
          });
        }
      });
      return recentObjects.slice(0, 5);
    }

    return SEARCHABLE_ITEMS.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    }).slice(0, 6);
  }, [query, recentSearches]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K / Slash key listener
  useEffect(() => {
    function handleGlobalKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Safe active index bounded by filteredItems
  const activeIndex = Math.min(selectedIndex, Math.max(0, filteredItems.length - 1));

  // Navigate to component
  function navigateToItem(item) {
    if (!item) return;

    // Save to recents
    setRecentSearches(prev => {
      const updated = [item.title, ...prev.filter(t => t.toLowerCase() !== item.title.toLowerCase())].slice(0, 5);
      try {
        localStorage.setItem('glass_recent_searches', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });

    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);

    const targetElement = document.getElementById(item.id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Add temporary highlight effect to visually confirm destination
      targetElement.classList.remove('component-highlight');
      // Trigger reflow
      void targetElement.offsetWidth;
      targetElement.classList.add('component-highlight');
      setTimeout(() => {
        targetElement.classList.remove('component-highlight');
      }, 2000);
    }
  }

  // Keyboard navigation within dropdown
  function handleInputKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        navigateToItem(filteredItems[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  }

  function handleClear(e) {
    e.stopPropagation();
    setQuery('');
    setSelectedIndex(0);
    inputRef.current?.focus();
  }

  return (
    <div className="glass-search-wrapper" ref={cardRef}>
      {/* Top right floating trigger button */}
      {!isOpen && (
        <button
          className="glass-search-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Search components"
          title="Search components (Ctrl + K)"
        >
          <IconSearch />
          <span className="glass-search-trigger__text">Search components...</span>
          <kbd className="glass-search-trigger__kbd">⌘K</kbd>
        </button>
      )}

      {/* Expanded Glass Card Modal */}
      {isOpen && (
        <div className="glass-card-container animate-glass-in" role="dialog" aria-modal="true" aria-label="Component search">
          {/* Glass Card Outer Frame */}
          <div className="glass-card">
            {/* Specular sheen reflection */}
            <div className="glass-card__sheen" aria-hidden="true" />

            {/* Glowing Search Input Bar */}
            <div className="glass-search-input-box">
              <IconSearch />
              <input
                ref={inputRef}
                type="text"
                className="glass-search-input"
                placeholder="Search..."
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                aria-autocomplete="list"
                aria-expanded="true"
              />
              {query ? (
                <button
                  type="button"
                  className="glass-search-action-btn"
                  onClick={handleClear}
                  aria-label="Clear query"
                >
                  <IconClose />
                </button>
              ) : (
                <button
                  type="button"
                  className="glass-search-action-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close search"
                >
                  <IconClose />
                </button>
              )}
            </div>

            {/* Inner Results / Recent Searches Panel */}
            <div className="glass-dropdown-panel">
              {/* Header inside the panel */}
              <div className="glass-panel-header">
                <span className="glass-panel-header__title">
                  {query.trim() ? 'Matching Components' : 'Recent Searches'}
                </span>
                <span className="glass-panel-header__hint">
                  {query.trim() ? `${filteredItems.length} found` : 'opacity 0.7'}
                </span>
              </div>

              {/* Items List */}
              <div className="glass-results-list" role="listbox">
                {filteredItems.length === 0 ? (
                  <div className="glass-no-results">
                    No components matching &quot;{query}&quot;
                  </div>
                ) : (
                  filteredItems.map((item, idx) => {
                    const isSelected = idx === activeIndex;
                    return (
                      <div
                        key={`${item.id}-${item.title}-${idx}`}
                        className={`glass-item${isSelected ? ' is-selected' : ''}`}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => navigateToItem(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        <div className="glass-item__left">
                          <span className="glass-item__icon-wrap">
                            {!query.trim() ? <IconHistory /> : <IconCompass />}
                          </span>
                          <span className="glass-item__title">{item.title}</span>
                        </div>

                        {isSelected ? (
                          <div className="glass-item__right">
                            <span className="glass-item__badge">{item.badge}</span>
                            <span className="glass-item__repeat-icon" title="Navigate">
                              <IconReturn />
                            </span>
                          </div>
                        ) : (
                          <div className="glass-item__right">
                            <span className="glass-item__badge-faint">{item.badge}</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
