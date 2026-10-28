import { useState, useEffect, useRef, useMemo } from 'react';
import './GlassSearchBar.css';

// Minimal list of all components and items in the portfolio
const SEARCHABLE_ITEMS = [
  { id: 'hero', title: 'Hero', keywords: ['hero', 'intro', 'home', 'top', 'header', 'alex'] },
  { id: 'about', title: 'About', keywords: ['about', 'bio', 'story', 'philosophy', 'who am i'] },
  { id: 'experience', title: 'Experience', keywords: ['experience', 'work', 'history', 'career', 'jobs', 'meridian'] },
  { id: 'education', title: 'Education', keywords: ['education', 'degree', 'berkeley', 'college', 'academics'] },
  { id: 'skills', title: 'Skills', keywords: ['skills', 'tech', 'stack', 'react', 'typescript', 'node', 'tools'] },
  { id: 'projects', title: 'Projects', keywords: ['projects', 'work', 'apps', 'portfolio', 'showcase'] },
  { id: 'contact', title: 'Contact', keywords: ['contact', 'email', 'message', 'hire', 'get in touch'] },
  // Sub-items for direct jumping
  { id: 'projects', title: 'ShopFlow', keywords: ['shopflow', 'ecommerce', 'store', 'stripe', 'postgres'] },
  { id: 'projects', title: 'ProjectFlow', keywords: ['projectflow', 'kanban', 'task', 'manager', 'websockets'] },
  { id: 'projects', title: 'Nexus AI', keywords: ['nexus', 'ai', 'chat', 'llm', 'openai', 'fastapi'] },
];

const DEFAULT_RECENT = ['Projects', 'Skills', 'About', 'Contact'];

function IconSearch() {
  return (
    <svg className="liquid-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg className="liquid-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// History counter-clockwise clock icon exactly matching reference
function IconHistory() {
  return (
    <svg className="liquid-icon liquid-icon--history" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export default function GlassSearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('liquid_recent_searches');
      return saved ? JSON.parse(saved) : DEFAULT_RECENT;
    } catch {
      return DEFAULT_RECENT;
    }
  });

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      const recentObjects = [];
      recentSearches.forEach(title => {
        const found = SEARCHABLE_ITEMS.find(item => item.title.toLowerCase() === title.toLowerCase());
        if (found) recentObjects.push(found);
        else {
          recentObjects.push({ id: 'hero', title, keywords: [] });
        }
      });
      return recentObjects.slice(0, 4);
    }

    return SEARCHABLE_ITEMS.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(q));
      return matchTitle || matchKeywords;
    }).slice(0, 5);
  }, [query, recentSearches]);

  // Global shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeIndex = Math.min(selectedIndex, Math.max(0, filteredItems.length - 1));

  // Navigate to target component
  function navigateToItem(item) {
    if (!item) return;

    setRecentSearches(prev => {
      const updated = [item.title, ...prev.filter(t => t.toLowerCase() !== item.title.toLowerCase())].slice(0, 4);
      try {
        localStorage.setItem('liquid_recent_searches', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });

    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);

    const el = document.getElementById(item.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Subtle pulse to indicate arrived component
      el.classList.remove('component-highlight');
      void el.offsetWidth;
      el.classList.add('component-highlight');
      setTimeout(() => el.classList.remove('component-highlight'), 1800);
    }
  }

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
      inputRef.current?.blur();
    }
  }

  function handleClear(e) {
    e.stopPropagation();
    setQuery('');
    setSelectedIndex(0);
    inputRef.current?.focus();
  }

  return (
    <div className="liquid-search-anchor" ref={wrapperRef}>
      {/* Liquid Glass Outer Container */}
      <div className={`liquid-glass-card${isOpen ? ' is-open' : ''}`}>
        {/* Specular Liquid Sheen Highlight */}
        <div className="liquid-glass-card__gloss" aria-hidden="true" />

        {/* Glowing Search Bar */}
        <div
          className="liquid-search-box"
          onClick={() => {
            inputRef.current?.focus();
            setIsOpen(true);
          }}
        >
          <span className="liquid-search-box__icon">
            <IconSearch />
          </span>
          <input
            ref={inputRef}
            type="text"
            className="liquid-search-input"
            placeholder="Search..."
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
              setIsOpen(true);
            }}
            onKeyDown={handleInputKeyDown}
            aria-autocomplete="list"
            aria-expanded={isOpen}
          />
          {query ? (
            <button
              type="button"
              className="liquid-search-box__action"
              onClick={handleClear}
              aria-label="Clear query"
            >
              <IconClose />
            </button>
          ) : (
            <button
              type="button"
              className="liquid-search-box__action"
              onClick={e => {
                e.stopPropagation();
                setIsOpen(prev => !prev);
              }}
              aria-label="Toggle search dropdown"
            >
              <IconClose />
            </button>
          )}
        </div>

        {/* Nested Dropdown Panel matching reference */}
        {isOpen && (
          <div className="liquid-dropdown-panel animate-liquid-fade">
            <div className="liquid-dropdown-header">
              <span className="liquid-dropdown-header__title">
                {query.trim() ? 'Matching Components' : 'Recent Searches'}
              </span>
              <span className="liquid-dropdown-header__hint">opacity 0.7</span>
            </div>

            <div className="liquid-items-list" role="listbox">
              {filteredItems.length === 0 ? (
                <div className="liquid-no-match">No components found</div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <div
                      key={`${item.id}-${item.title}-${idx}`}
                      className={`liquid-item${isSelected ? ' is-selected' : ''}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => navigateToItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="liquid-item__left">
                        <IconHistory />
                        <span className="liquid-item__label">{item.title}</span>
                      </div>

                      {isSelected && (
                        <div className="liquid-item__right">
                          <IconHistory />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
