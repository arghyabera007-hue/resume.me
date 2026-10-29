import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './GlassSearchBar.css';

// All searchable components and items across the portfolio
const SEARCHABLE_ITEMS = [
  {
    id: 'hero',
    title: 'Hero Section',
    subtitle: 'Intro, tagline & call to action buttons',
    category: 'Sections',
    iconType: 'home',
    keywords: ['hero', 'intro', 'header', 'arghya bera', 'arghya', 'home', 'top', 'overview'],
    badge: 'Section'
  },
  {
    id: 'about',
    title: 'About Me',
    subtitle: 'Background, philosophy & developer story',
    category: 'Sections',
    iconType: 'user',
    keywords: ['about', 'bio', 'story', 'developer', 'philosophy', 'who am i'],
    badge: 'Section'
  },
  {
    id: 'skills',
    title: 'Skills & Tech Stack',
    subtitle: 'Languages, Frontend, Backend, Databases & DevOps',
    category: 'Sections',
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
    title: 'Projects Showcase',
    subtitle: 'ShopFlow, ProjectFlow & Nexus AI with live links',
    category: 'Sections',
    iconType: 'layers',
    keywords: ['projects', 'portfolio', 'work', 'code', 'apps', 'showcase'],
    badge: 'Section'
  },
  {
    id: 'experience',
    title: 'Experience Timeline',
    subtitle: 'Meridian Labs, Spark Digital & career progression',
    category: 'Sections',
    iconType: 'briefcase',
    keywords: ['experience', 'work history', 'career', 'jobs', 'meridian labs', 'spark digital'],
    badge: 'Section'
  },
  {
    id: 'education',
    title: 'Education',
    subtitle: 'B.Sc. Computer Science - UC Berkeley',
    category: 'Sections',
    iconType: 'graduation',
    keywords: ['education', 'degree', 'university', 'berkeley', 'college', 'academics', 'cs'],
    badge: 'Section'
  },
  {
    id: 'contact',
    title: 'Contact Form',
    subtitle: "Direct messaging, inquiries & Let's Trade Ideas",
    category: 'Sections',
    iconType: 'mail',
    keywords: ['contact', 'email', 'message', 'reach out', 'hire', 'get in touch', 'trade ideas', 'collaborate', 'social'],
    badge: 'Section'
  },
  // Projects deep links
  {
    id: 'projects',
    title: 'ShopFlow E-Commerce',
    subtitle: 'Microservices, real-time inventory & Stripe payments',
    category: 'Projects',
    iconType: 'rocket',
    keywords: ['shopflow', 'ecommerce', 'store', 'shop', 'stripe', 'inventory', 'postgresql'],
    badge: 'Project'
  },
  {
    id: 'projects',
    title: 'ProjectFlow Kanban',
    subtitle: 'Collaborative task management & WebSockets',
    category: 'Projects',
    iconType: 'rocket',
    keywords: ['projectflow', 'kanban', 'task manager', 'websockets', 'team', 'real-time'],
    badge: 'Project'
  },
  {
    id: 'projects',
    title: 'Nexus AI Chat',
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
    subtitle: 'C, C++, Java, Python, JavaScript',
    category: 'Skills',
    iconType: 'code',
    keywords: ['languages', 'c', 'cpp', 'c++', 'java', 'python', 'javascript'],
    badge: 'Skill'
  },
  {
    id: 'skills',
    title: 'Frontend & UI Frameworks',
    subtitle: 'React, Vue.js, Tailwind CSS, HTML5, CSS3',
    category: 'Skills',
    iconType: 'code',
    keywords: ['frontend', 'react', 'vue', 'vuejs', 'tailwind', 'html5', 'css3'],
    badge: 'Skill'
  },
  {
    id: 'skills',
    title: 'Backend & Databases',
    subtitle: 'Node.js, MongoDB, MySQL',
    category: 'Skills',
    iconType: 'code',
    keywords: ['backend', 'databases', 'nodejs', 'node.js', 'mongodb', 'mysql'],
    badge: 'Skill'
  },
  {
    id: 'skills',
    title: 'Tools & DevOps',
    subtitle: 'Git, Docker, Figma',
    category: 'Skills',
    iconType: 'code',
    keywords: ['tools', 'devops', 'git', 'docker', 'figma'],
    badge: 'Skill'
  }
];

/* ── Crisp SVG Icons ────────────────────────────────────────────────────────── */
function IconSearch() {
  return (
    <svg className="glass-icon glass-icon--search" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg className="glass-icon glass-icon--close" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg className="glass-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg className="glass-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg className="glass-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg className="glass-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg className="glass-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function IconGraduation() {
  return (
    <svg className="glass-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="glass-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconRocket() {
  return (
    <svg className="glass-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

  const cardRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Grouped results without Recent Searches section
  const groupedResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      // Clean default groups: Sections, Projects, Skills
      const sections = SEARCHABLE_ITEMS.filter(item => item.category === 'Sections');
      const projects = SEARCHABLE_ITEMS.filter(item => item.category === 'Projects');
      const skills = SEARCHABLE_ITEMS.filter(item => item.category === 'Skills');

      return [
        { group: 'Sections', items: sections },
        { group: 'Projects', items: projects },
        { group: 'Skills', items: skills }
      ];
    }

    // Filtered items matching active search query
    const matched = SEARCHABLE_ITEMS.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle?.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    });

    const categoryOrder = ['Sections', 'Projects', 'Skills'];
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

    groupsMap.forEach((items, groupName) => {
      groups.push({
        group: groupName,
        items
      });
    });

    return groups;
  }, [query]);

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
    const selectedEl = listRef.current?.querySelector('.glass-item.is-selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, isOpen]);

  // Global shortcut (Cmd+K / Ctrl+K) listener & Escape listener
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

  // Navigate to item and scroll smoothly with pulse highlight
  function navigateToItem(item) {
    if (!item) return;

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
      default:
        return <IconCode />;
    }
  }

  let runningIndex = 0;

  return (
    <div className="glass-search-wrapper">
      {/* Top right floating trigger button (Frosted Glass Pill) */}
      {!isOpen && (
        <button
          className="glass-search-trigger glass"
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
          className="glass-search-backdrop"
          onClick={closeModal}
          aria-hidden="true"
        />
      )}

      {/* Command Palette Modal (Frosted Glass Outer Container) */}
      {isOpen && (
        <div
          className="glass-card-container animate-glass-in"
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-label="Search command palette"
        >
          <div className="glass-card glass">
            {/* Top Search Input Box (Translucent with soft illuminated border) */}
            <div className="glass-search-input-box">
              <IconSearch />
              <input
                ref={inputRef}
                type="text"
                className="glass-search-input"
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
                  className="glass-action-btn"
                  onClick={handleClear}
                  aria-label="Clear search"
                >
                  <IconClose />
                </button>
              ) : (
                <button
                  type="button"
                  className="glass-action-btn"
                  onClick={closeModal}
                  aria-label="Close search"
                >
                  <IconClose />
                </button>
              )}
            </div>

            {/* Results Inner Glass Panel (Translucent surface) */}
            <div className="glass-dropdown-panel">
              <div className="glass-results-list" ref={listRef} role="listbox">
                {groupedResults.length === 0 ? (
                  <div className="glass-no-results">
                    No components matching &quot;{query}&quot;
                  </div>
                ) : (
                  groupedResults.map((groupObj, gIdx) => (
                    <div key={groupObj.group} className="glass-group">
                      {gIdx > 0 && <div className="glass-divider" />}
                      <div className="glass-group-title">
                        {groupObj.group}
                      </div>

                      <div className="glass-group-items">
                        {groupObj.items.map(item => {
                          const itemIndex = runningIndex++;
                          const isSelected = itemIndex === activeIndex;

                          return (
                            <div
                              key={`${item.id}-${item.title}-${itemIndex}`}
                              className={`glass-item${isSelected ? ' is-selected' : ''}`}
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => navigateToItem(item)}
                              onMouseEnter={() => setSelectedIndex(itemIndex)}
                            >
                              <div className="glass-item__left">
                                <span className="glass-item__icon-wrap">
                                  {renderItemIcon(item)}
                                </span>
                                <div className="glass-item__info">
                                  <span className="glass-item__title">{item.title}</span>
                                  {item.subtitle && (
                                    <span className="glass-item__subtitle">{item.subtitle}</span>
                                  )}
                                </div>
                              </div>

                              <div className="glass-item__right">
                                {item.badge && (
                                  <span className="glass-item__badge">{item.badge}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Balanced Footer with ONLY Exit Esc control */}
              <div className="glass-palette-footer">
                <button
                  type="button"
                  className="glass-footer-exit-btn"
                  onClick={closeModal}
                  aria-label="Exit search palette"
                >
                  <span>Exit</span>
                  <kbd className="glass-kbd">Esc</kbd>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
