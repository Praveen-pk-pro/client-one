import { ExperienceItem, Project, Testimonial } from "./types";

const safeJsonParse = <T>(jsonString: string | undefined, fallback: T): T => {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Failed to parse environment variable JSON:", error);
    return fallback;
  }
};

export const USER_NAME = (import.meta as any).env.VITE_USER_NAME || "Jayakrishnan";
export const USER_ROLE = (import.meta as any).env.VITE_USER_ROLE || "STUDENT WEB DESIGNER";
export const USER_EMAIL = (import.meta as any).env.VITE_USER_EMAIL || "Vjaikrishna525@gmail.com";
export const USER_PHONE = (import.meta as any).env.VITE_USER_PHONE || "+91 9499189426";
export const USER_LINKEDIN = (import.meta as any).env.VITE_USER_LINKEDIN || "https://www.linkedin.com/in/praveen-kumar-06ace/";
export const USER_GITHUB = (import.meta as any).env.VITE_USER_GITHUB || "https://github.com/Praveen-pk-pro/";

// For simple comma-separated skills list
const rawSkills = (import.meta as any).env.VITE_SKILLS;
export const SKILLS: string[] = rawSkills 
  ? rawSkills.split(',').map((s: string) => s.trim())
  : ["HTML", "Python", "Java-oops", "C", "DS", "DBMS"];

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export const TECH_ICONS = [
  { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
];

export const PROJECTS: Project[] = safeJsonParse<Project[]>((import.meta as any).env.VITE_PROJECTS_JSON, [
  {
    id: 1,
    title: "E-Commerce Analytics Dashboard",
    description: "A high-performance analytics platform processing over 1M+ data points in real-time. Built to assist marketing teams in visualizing customer trends with sub-second latency.",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    image: "/images/project-1.jpg",
    video: "https://joy1.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4",
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "AI-Powered Task Manager",
    description: "Smart task management application utilizing NLP to automatically categorize and prioritize user tasks. Features offline-first architecture for seamless mobile usage.",
    tags: ["Next.js", "OpenAI API", "Tailwind", "PostgreSQL"],
    image: "/images/project-2.jpg",
    link: "#",
    github: "#"
  },
  {
    id: 3,
    title: "FinTech Banking Portal",
    description: "Secure and scalable banking interface designed for high-frequency trading users. Implemented bank-grade security protocols and optimized rendering for complex financial charts.",
    tags: ["Vue.js", "Python", "Django", "WebSockets"],
    image: "/images/project-3.jpg",
    link: "#",
    github: "#"
  },
  {
    id: 4,
    title: "Healthcare Patient System",
    description: "HIPAA-compliant patient management system streamlining doctor-patient communication. Reduced appointment scheduling time by 40% through intuitive UX design.",
    tags: ["React Native", "Firebase", "Redux", "Express"],
    image: "/images/project-4.jpg",
    link: "#",
    github: "#"
  }
]);

export const EXPERIENCE: ExperienceItem[] = safeJsonParse<ExperienceItem[]>((import.meta as any).env.VITE_EXPERIENCE_JSON, [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "TechFlow Solutions",
    period: "2021 - Present",
    description: "Leading the frontend team in migrating legacy monoliths to micro-frontends. Improved site performance scores by 35% and established a comprehensive design system used across 5 products."
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Innovate Digital",
    period: "2019 - 2021",
    description: "Developed and maintained full-stack web applications for enterprise clients. Mentored junior developers and implemented CI/CD pipelines that reduced deployment time by 50%."
  },
  {
    id: 3,
    role: "Web Developer Intern",
    company: "StartUp Inc.",
    period: "2018 - 2019",
    description: "Collaborated with design teams to implement pixel-perfect UIs. Optimized database queries which resulted in a 20% faster page load time for the main dashboard."
  }
]);

export const TESTIMONIALS: Testimonial[] = safeJsonParse<Testimonial[]>((import.meta as any).env.VITE_TESTIMONIALS_JSON, [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechFlow Solutions",
    text: "Jayakrishnan is one of those rare developers who truly understands the product vision. His code is clean, reliable, and he always delivers ahead of schedule.",
    avatar: "/images/avatar-1.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "Innovate Digital",
    text: "I was constantly impressed by Jayakrishnan's ability to solve complex technical challenges with simple, elegant solutions. A true asset to any engineering team.",
    avatar: "/images/avatar-2.jpg"
  }
]);