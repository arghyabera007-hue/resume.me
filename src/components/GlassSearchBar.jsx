import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './GlassSearchBar.css';

// All searchable components and items across the portfolio
const SEARCHABLE_ITEMS = [
  {
    id: 'hero',
    title: 'Home',
    fullTitle: 'Hero Section',
    subtitle: 'Intro, tagline & call to action buttons',
    category: 'Navigation',
    shortcut: 'H',
    iconType: 'home',
    keywords: ['hero', 'intro', 'header', 'arghya bera', 'arghya', 'home', 'top', 'overview'],
    badge: 'Section'
  },
  {
    id: 'about',
    title: 'About',
    fullTitle: 'About Me',
    subtitle: 'Background, philosophy & developer story',
    category: 'Navigation',
    shortcut: 'A',
    iconType: 'user',
    keywords: ['about', 'bio', 'story', 'developer', 'philosophy', 'who am i'],
    badge: 'Section'
  },
  {
    id: 'skills',
    title: 'Skills',
    fullTitle: 'Skills & Tech Stack',
    subtitle: 'Languages, Frontend, Backend, Databases & DevOps',
    category: 'Navigation',
    shortcut: 'S',
    iconType: 'code',
    keywords: [
      'skills', 'tech stack', 'languages', 'frontend', 'backend', 'tools', 'technologies',
      'c', 'c++', 'cpp', 'java', 'python', 'javascript', 'html5', 'css3', 'git', 'figma',
      'docker', 'mongodb', 'mysql', 'nodejs', 'react', 'tailwind', 'vue'
    ],
    badge: 'Section'
  },
  {
    id: 'projects',
    title: 'Projects',
    fullTitle: 'Projects Showcase',
    subtitle: 'ShopFlow, ProjectFlow & Nexus AI with live links',
    category: 'Navigation',
    shortcut: 'P',
    iconType: 'layers',
    keywords: ['projects', 'portfolio', 'work', 'code', 'apps', 'showcase'],
    badge: 'Section'
  },
  {
    id: 'experience',
    title: 'Experience',
    fullTitle: 'Experience Timeline',
    subtitle: 'Meridian Labs, Spark Digital & career progression',
    category: 'Navigation',
    shortcut: 'E',
    iconType: 'briefcase',
    keywords: ['experience', 'work history', 'career', 'jobs', 'meridian labs', 'spark digital'],
    badge: 'Section'
  },
  {
    id: 'education',
    title: 'Education',
    fullTitle: 'Education',
    subtitle: 'B.Sc. Computer Science - UC Berkeley',
    category: 'Navigation',
    shortcut: 'D',
    iconType: 'graduation',
    keywords: ['education', 'degree', 'university', 'berkeley', 'college', 'academics', 'cs'],
    badge: 'Section'
  },
  {
    id: 'contact',
    title: 'Contact',
    fullTitle: 'Contact Form',
    subtitle: "Direct messaging, inquiries & Let's Trade Ideas",
    category: 'Navigation',
    shortcut: 'C',
    iconType: 'mail',
    keywords: ['contact', 'email', 'message', 'reach out', 'hire', 'get in touch', 'trade ideas', 'collaborate', 'social'],
    badge: 'Section'
  },
  // Projects deep links
  {
    id: 'projects',
    title: 'ShopFlow E-Commerce',
    fullTitle: 'ShopFlow E-Commerce',
    subtitle: 'Microservices, real-time inventory & Stripe payments',
    category: 'Projects',
    iconType: 'rocket',
    keywords: ['shopflow', 'ecommerce', 'store', 'shop', 'stripe', 'inventory', 'postgresql'],
    badge: 'Project'
  },
  {
    id: 'projects',
    title: 'ProjectFlow Kanban',
    fullTitle: 'ProjectFlow Kanban',
    subtitle: 'Collaborative task management & WebSockets',
    category: 'Projects',
    iconType: 'rocket',
    keywords: ['projectflow', 'kanban', 'task manager', 'websockets', 'team', 'real-time'],
    badge: 'Project'
  },
  {
    id: 'projects',
    title: 'Nexus AI Chat',
    fullTitle: 'Nexus AI Chat',
    subtitle: 'Multi-provider LLM interface with streaming',
    category: 'Projects',
    iconType: 'rocket',
    keywords: ['nexus ai', 'ai', 'chat', 'llm', 'streaming', 'openai', 'fastapi'],
    badge: 'Project'
  },
  // Skills deep links
  {
    id: 'skills',
    title: 'Programming Languages',
    fullTitle: 'Programming Languages',
    subtitle: 'C, C++, Java, Python, JavaScript',
    category: 'Skills',
    iconType: 'code',
    keywords: ['languages', 'c', 'cpp', 'c++', 'java', 'python', 'javascript'],
    badge: 'Skill'
  },
  {
    id: 'skills',
    title: 'Frontend & UI Frameworks',
    fullTitle: 'Frontend & UI Frameworks',
    subtitle: 'React, Vue.js, Tailwind CSS, HTML5, CSS3',
    category: 'Skills',
    iconType: 'code',
    keywords: ['frontend', 'react', 'vue', 'vuejs', 'tailwind', 'html5', 'css3'],
    badge: 'Skill'
  },
  {
    id: 'skills',
    title: 'Backend & Databases',
    fullTitle: 'Backend & Databases',
    subtitle: 'Node.js, MongoDB, MySQL',
    category: 'Skills',
    iconType: 'code',
    keywords: ['backend', 'databases', 'nodejs', 'node.js', 'mongodb', 'mysql'],
    badge: 'Skill'
  },
  {
    id: 'skills',
    title: 'Tools & DevOps',
    fullTitle: 'Tools & DevOps',
    subtitle: 'Git, Docker, Figma',
    category: 'Skills',
    iconType: 'code',
    keywords: ['tools', 'devops', 'git', 'docker', 'figma'],
    badge: 'Skill'
  }
];

const DEFAULT_RECENT = [
  'Home',
  'Projects',
  'Skills',
  'Contact'
];

/* ── Uniform 16x16 Crisp SVG Icons ─────────────────────────────────────────── */
function IconSearch() {
  return (
    <svg className="palette-icon palette-icon--search" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg className="palette-icon palette-icon--close" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconHistory() {
  return (
    <svg className="palette-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg className="palette-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg className="palette-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg className="palette-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg className="palette-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg className="palette-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function IconGraduation() {
  return (
    <svg className="palette-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="palette-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconRocket() {
  return (
    <svg className="palette-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
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
  const listRef = useRef(null);

  // Grouped results matching the reference screenshots layout
  const groupedResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      const groups = [];

      // 1. Recent Searches (if any)
      if (recentSearches.length > 0) {
        const recentItems = [];
        recentSearches.forEach(title => {
          const found = SEARCHABLE_ITEMS.find(
            item => item.title.toLowerCase() === title.toLowerCase() ||
                    item.fullTitle?.toLowerCase() === title.toLowerCase()
          );
          if (found) {
            recentItems.push({ ...found, isRecentItem: true });
          } else {
            recentItems.push({
              id: 'hero',
              title,
              fullTitle: title,
              subtitle: 'Recent search',
              category: 'Recent Searches',
              iconType: 'history',
              isRecentItem: true
            });
          }
        });
        groups.push({
          group: 'Recent Searches',
          items: recentItems.slice(0, 4)
        });
      }

      // 2. Navigation items (Home, About, Skills, Projects, Experience, Education, Contact)
      const navItems = SEARCHABLE_ITEMS.filter(item => item.category === 'Navigation');
      groups.push({
        group: 'Navigation',
        items: navItems
      });

      // 3. Projects Showcase items
      const projectItems = SEARCHABLE_ITEMS.filter(item => item.category === 'Projects');
      groups.push({
        group: 'Projects',
        items: projectItems
      });

      return groups;
    }

    // Filtered items matching active query
    const matched = SEARCHABLE_ITEMS.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchFullTitle = item.fullTitle?.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(q));
      return matchTitle || matchFullTitle || matchSubtitle || matchCategory || matchKeywords;
    });

    // Group matching results by category in logical order
    const categoryOrder = ['Navigation', 'Projects', 'Skills'];
    const groupsMap = new Map();

    matched.forEach(item => {
      const cat = item.category || 'Results';
      if (!groupsMap.has(cat)) {
        groupsMap.set(cat, []);
      }
      groupsMap.get(cat).push(item);
    });

    const groups = [];
    categoryOrder.forEach(cat => {
      if (groupsMap.has(cat)) {
        groups.push({
          group: cat,
          items: groupsMap.get(cat)
        });
        groupsMap.delete(cat);
      }
    });

    // Any remaining categories
    groupsMap.forEach((items, groupName) => {
      groups.push({
        group: groupName,
        items
      });
    });

    return groups;
  }, [query, recentSearches]);

  // Flattened items for keyboard arrow navigation
  const flatItems = useMemo(() => {
    return groupedResults.flatMap(g => g.items);
  }, [groupedResults]);

  const activeIndex = Math.min(selectedIndex, Math.max(0, flatItems.length - 1));

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  // Auto-scroll selected item into view smoothly
  useEffect(() => {
    if (!isOpen) return;
    const selectedEl = listRef.current?.querySelector('.palette-item.is-selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, isOpen]);

  // Global shortcut (Cmd+K / Ctrl+K) listener
  useEffect(() => {
    function handleGlobalKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, closeModal]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        closeModal();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeModal]);

  // Navigate to item and scroll smoothly
  function navigateToItem(item) {
    if (!item) return;

    // Save to recents in localStorage
    setRecentSearches(prev => {
      const updated = [item.title, ...prev.filter(t => t.toLowerCase() !== item.title.toLowerCase())].slice(0, 4);
      try {
        localStorage.setItem('glass_recent_searches', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });

    closeModal();

    const targetElement = document.getElementById(item.id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Add temporary highlight effect
      targetElement.classList.remove('component-highlight');
      void targetElement.offsetWidth;
      targetElement.classList.add('component-highlight');
      setTimeout(() => {
        targetElement.classList.remove('component-highlight');
      }, 2000);
    }
  }

  // Keyboard navigation within list
  function handleInputKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, flatItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + flatItems.length) % Math.max(1, flatItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatItems[activeIndex]) {
        navigateToItem(flatItems[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    }
  }

  function handleClear(e) {
    e.stopPropagation();
    setQuery('');
    setSelectedIndex(0);
    inputRef.current?.focus();
  }

  function renderItemIcon(item) {
    if (item.isRecentItem) return <IconHistory />;
    switch (item.iconType) {
      case 'home':
        return <IconHome />;
      case 'user':
        return <IconUser />;
      case 'layers':
        return <IconLayers />;
      case 'code':
        return <IconCode />;
      case 'briefcase':
        return <IconBriefcase />;
      case 'graduation':
        return <IconGraduation />;
      case 'mail':
        return <IconMail />;
      case 'rocket':
        return <IconRocket />;
      case 'history':
        return <IconHistory />;
      default:
        return <IconCode />;
    }
  }

  let runningIndex = 0;

  return (
    <div className="glass-search-wrapper">
      {/* Top right floating trigger button */}
      {!isOpen && (
        <button
          className="glass-search-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Search"
          title="Search (⌘K)"
        >
          <IconSearch />
          <span className="glass-search-trigger__text">Search...</span>
          <kbd className="glass-search-trigger__kbd">⌘K</kbd>
        </button>
      )}

      {/* Dimmed backdrop when palette is open */}
      {isOpen && (
        <div
          className="palette-backdrop"
          onClick={closeModal}
          aria-hidden="true"
        />
      )}

      {/* Command Palette Modal (Clean single container design) */}
      {isOpen && (
        <div
          className="palette-container animate-palette-in"
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-label="Search command palette"
        >
          <div className="palette-modal">
            {/* Top Search Input Box */}
            <div className="palette-header">
              <div className="palette-input-wrap">
                <IconSearch />
                <input
                  ref={inputRef}
                  type="text"
                  className="palette-input"
                  placeholder="Search components, skills, projects..."
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  aria-autocomplete="list"
                  aria-expanded="true"
                  spellCheck="false"
                />
                {query ? (
                  <button
                    type="button"
                    className="palette-action-btn"
                    onClick={handleClear}
                    aria-label="Clear search"
                  >
                    <IconClose />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="palette-action-btn"
                    onClick={closeModal}
                    aria-label="Close search"
                  >
                    <IconClose />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Results & Groups Area */}
            <div className="palette-list" ref={listRef} role="listbox">
              {groupedResults.length === 0 ? (
                <div className="palette-empty">
                  No components matching &quot;{query}&quot;
                </div>
              ) : (
                groupedResults.map((groupObj, gIdx) => (
                  <div key={groupObj.group} className="palette-group">
                    {gIdx > 0 && <div className="palette-divider" />}
                    <div className="palette-group-title">
                      {groupObj.group}
                    </div>

                    <div className="palette-group-items">
                      {groupObj.items.map(item => {
                        const itemIndex = runningIndex++;
                        const isSelected = itemIndex === activeIndex;

                        return (
                          <div
                            key={`${item.id}-${item.title}-${itemIndex}`}
                            className={`palette-item${isSelected ? ' is-selected' : ''}`}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => navigateToItem(item)}
                            onMouseEnter={() => setSelectedIndex(itemIndex)}
                          >
                            <div className="palette-item__left">
                              <span className="palette-item__icon">
                                {renderItemIcon(item)}
                              </span>
                              <div className="palette-item__info">
                                <span className="palette-item__title">{item.title}</span>
                                {item.subtitle && (
                                  <span className="palette-item__subtitle">{item.subtitle}</span>
                                )}
                              </div>
                            </div>

                            <div className="palette-item__right">
                              {item.shortcut ? (
                                <span className="palette-item__shortcut" aria-label={`Shortcut: ${item.shortcut}`}>
                                  {item.shortcut}
                                </span>
                              ) : item.badge ? (
                                <span className="palette-item__badge">{item.badge}</span>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with Subtle Author Branding & Keyboard Hints */}
            <div className="palette-footer">
              <span className="palette-footer__brand">Arghya Bera</span>
              <div className="palette-footer__hints">
                <span className="palette-footer__hint">
                  <span className="palette-footer__hint-label">Navigate</span>
                  <kbd className="palette-kbd">↑</kbd>
                  <kbd className="palette-kbd">↓</kbd>
                </span>
                <span className="palette-footer__hint">
                  <span className="palette-footer__hint-label">Go to section</span>
                  <kbd className="palette-kbd">↵</kbd>
                </span>
                <span className="palette-footer__hint">
                  <span className="palette-footer__hint-label">Exit</span>
                  <kbd className="palette-kbd">Esc</kbd>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
