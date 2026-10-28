// ── Portfolio Data ──────────────────────────────────────────────────────────
// Replace these placeholder values with your actual information.

export const profile = {
  name: 'Alex Rivera',
  role: 'Full-Stack Developer',
  tagline: 'Building thoughtful digital products with clean code and great UX.',
  location: 'San Francisco, CA',
  availability: 'Open to opportunities',
  email: 'alex@example.com',
  avatar: '/profile.jpg',
  bio: [
    'I\'m a full-stack developer with 5+ years of experience turning complex problems into elegant, user-focused solutions. I work across the entire stack — from designing REST APIs and databases to crafting polished, accessible interfaces.',
    'I care deeply about code quality, performance, and the people who use the software I build. When I\'m not shipping features, I\'m exploring new tools, contributing to open source, or writing about things I\'ve learned.',
  ],
  social: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    twitter: 'https://twitter.com/',
  },
};

export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'CSS / Tailwind', 'Vite', 'Figma'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'FastAPI', 'GraphQL', 'REST APIs'],
  },
  {
    category: 'Data & Cloud',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Vercel'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub Actions', 'Jest', 'Playwright', 'Linux', 'VS Code'],
  },
];

export const experience = [
  {
    id: 'exp-1',
    role: 'Senior Full-Stack Developer',
    company: 'Meridian Labs',
    period: '2022 — Present',
    description: [
      'Led architecture and delivery of a SaaS analytics platform used by 50k+ users.',
      'Reduced API response times by 60% through query optimisation and caching.',
      'Mentored a team of four junior developers and drove adoption of TypeScript across the codebase.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Frontend Developer',
    company: 'Spark Digital',
    period: '2020 — 2022',
    description: [
      'Built and maintained high-traffic consumer-facing React applications.',
      'Improved Core Web Vitals scores by 40% across three flagship products.',
      'Collaborated closely with design to ship a company-wide design system.',
    ],
  },
  {
    id: 'exp-3',
    role: 'Junior Developer',
    company: 'Freelance',
    period: '2019 — 2020',
    description: [
      'Delivered custom websites and web apps for small businesses and startups.',
      'Gained hands-on experience with the full project lifecycle, from scoping to deployment.',
    ],
  },
];

export const education = [
  {
    id: 'edu-1',
    degree: 'B.Sc. Computer Science',
    institution: 'University of California, Berkeley',
    period: '2015 — 2019',
    description: 'Graduated with honours. Focus on software engineering, algorithms, and distributed systems.',
  },
];

export const projects = [
  {
    id: 'proj-1',
    name: 'ShopFlow',
    description:
      'A full-featured e-commerce platform with real-time inventory, order tracking, and an admin analytics dashboard. Built for scale with a microservices architecture.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Stripe'],
    image: '/project-ecommerce.jpg',
    github: 'https://github.com/',
    live: 'https://example.com/',
  },
  {
    id: 'proj-2',
    name: 'ProjectFlow',
    description:
      'A collaborative project management tool featuring Kanban boards, real-time updates via WebSockets, and team role management.',
    tech: ['React', 'TypeScript', 'Express', 'Socket.io', 'MongoDB'],
    image: '/project-taskmanager.jpg',
    github: 'https://github.com/',
    live: null,
  },
  {
    id: 'proj-3',
    name: 'Nexus AI',
    description:
      'An AI chat interface that supports multiple LLM providers with streaming responses, conversation history, and model switching.',
    tech: ['Next.js', 'Python', 'FastAPI', 'OpenAI API', 'Redis'],
    image: '/project-aitools.jpg',
    github: 'https://github.com/',
    live: 'https://example.com/',
  },
];
