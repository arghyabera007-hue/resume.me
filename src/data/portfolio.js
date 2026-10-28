// ── Portfolio Data ──────────────────────────────────────────────────────────
// Replace these placeholder values with your actual information.

export const profile = {
  name: 'Arghya Bera',
  role: 'Full-Stack Developer',
  tagline: 'Building thoughtful digital products with clean code and great UX.',
  location: 'San Francisco, CA',
  availability: 'Open to opportunities',
  email: 'arghyabera007@gmail.com',
  avatar: '/profile.jpg',
  bio: [
    "I'm a passionate full-stack developer, currently pursuing my college degree in computer science. I love building real-world projects that solve meaningful problems, from web apps to AI-powered tools. I'm constantly exploring the world of AI and ML integration. I enjoy turning complex ideas into clean, functional code. Whether it's a hackathon project or a personal portfolio build, I give it my best.",
    "I believe in learning by doing — every project teaches me something new. I'm comfortable working across the stack, from designing REST APIs to training deep learning models. Collaboration, curiosity, and consistency are the three things that drive me. I'm always open to connecting with like-minded developers and contributors. Let's build something amazing together.",
  ],
  social: {
    github: 'https://github.com/arghyabera007-hue',
    linkedin: 'https://www.linkedin.com/in/arghya-bera-02538a31b',
    x: 'https://x.com/ArghyaBera007',
    twitter: 'https://x.com/ArghyaBera007',
  },
};

export const skills = [
  {
    category: 'Programming Languages',
    items: [
      {
        name: 'C',
        url: 'https://www.cprogramming.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg',
      },
      {
        name: 'C++',
        url: 'https://www.w3schools.com/cpp/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
      },
      {
        name: 'Java',
        url: 'https://www.java.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
      },
      {
        name: 'Python',
        url: 'https://www.python.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
      },
      {
        name: 'JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
      },
    ],
  },
  {
    category: 'Frontend & UI',
    items: [
      {
        name: 'React',
        url: 'https://reactjs.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
      },
      {
        name: 'Vue.js',
        url: 'https://vuejs.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg',
      },
      {
        name: 'Tailwind CSS',
        url: 'https://tailwindcss.com/',
        icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
      },
      {
        name: 'HTML5',
        url: 'https://www.w3.org/html/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
      },
      {
        name: 'CSS3',
        url: 'https://www.w3schools.com/css/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
      },
    ],
  },
  {
    category: 'Backend & Databases',
    items: [
      {
        name: 'Node.js',
        url: 'https://nodejs.org/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
      },
      {
        name: 'MongoDB',
        url: 'https://www.mongodb.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg',
      },
      {
        name: 'MySQL',
        url: 'https://www.mysql.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
      },
    ],
  },
  {
    category: 'Tools & DevOps',
    items: [
      {
        name: 'Git',
        url: 'https://git-scm.com/',
        icon: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',
      },
      {
        name: 'Docker',
        url: 'https://www.docker.com/',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg',
      },
      {
        name: 'Figma',
        url: 'https://www.figma.com/',
        icon: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg',
      },
    ],
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
    github: 'https://github.com/arghyabera007-hue',
    live: 'https://example.com/',
  },
  {
    id: 'proj-2',
    name: 'ProjectFlow',
    description:
      'A collaborative project management tool featuring Kanban boards, real-time updates via WebSockets, and team role management.',
    tech: ['React', 'TypeScript', 'Express', 'Socket.io', 'MongoDB'],
    image: '/project-taskmanager.jpg',
    github: 'https://github.com/arghyabera007-hue',
    live: null,
  },
  {
    id: 'proj-3',
    name: 'Nexus AI',
    description:
      'An AI chat interface that supports multiple LLM providers with streaming responses, conversation history, and model switching.',
    tech: ['Next.js', 'Python', 'FastAPI', 'OpenAI API', 'Redis'],
    image: '/project-aitools.jpg',
    github: 'https://github.com/arghyabera007-hue',
    live: 'https://example.com/',
  },
];
