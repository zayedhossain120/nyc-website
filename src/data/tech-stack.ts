export const TECH_CATEGORIES = [
  "Design & Frontend",
  "Mobile & Backend",
  "Database & Cloud",
  "DevOps & Tools",
] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

export interface TechItem {
  name: string;
  category: TechCategory;
  description: string;
  /** Tailwind text color for the two-letter badge. */
  color: string;
}

export const TECH_STACK: TechItem[] = [
  // Design & Frontend
  { name: "Figma", category: "Design & Frontend", description: "UI/UX design & token systems", color: "text-pink-400" },
  { name: "Framer Motion", category: "Design & Frontend", description: "Complex React animation & gestures", color: "text-purple-400" },
  { name: "Webflow", category: "Design & Frontend", description: "Visual CMS & low-code engines", color: "text-blue-400" },
  { name: "Wix", category: "Design & Frontend", description: "Rapid web publishing & e-commerce", color: "text-amber-400" },
  { name: "HTML5", category: "Design & Frontend", description: "Semantic standard web markup", color: "text-orange-400" },
  { name: "CSS3", category: "Design & Frontend", description: "Modern Flexbox, Grid & animations", color: "text-blue-400" },
  { name: "Tailwind CSS", category: "Design & Frontend", description: "Utility-first CSS & design tokens", color: "text-cyan-400" },
  { name: "Bootstrap", category: "Design & Frontend", description: "Responsive UI grid components", color: "text-purple-400" },
  { name: "JavaScript", category: "Design & Frontend", description: "ES6+ modern dynamic engine", color: "text-yellow-400" },
  { name: "TypeScript", category: "Design & Frontend", description: "Strict end-to-end type safety", color: "text-blue-400" },
  { name: "React", category: "Design & Frontend", description: "Component-based UI architecture", color: "text-cyan-400" },
  { name: "Next.js", category: "Design & Frontend", description: "React 19 & App Router server engine", color: "text-white" },

  // Mobile & Backend
  { name: "Expo", category: "Mobile & Backend", description: "React Native mobile deployment", color: "text-indigo-400" },
  { name: "React Native", category: "Mobile & Backend", description: "Cross-platform iOS & Android apps", color: "text-cyan-400" },
  { name: "Node.js", category: "Mobile & Backend", description: "High-throughput asynchronous server", color: "text-emerald-400" },
  { name: "Express.js", category: "Mobile & Backend", description: "Lightweight REST API middleware", color: "text-slate-300" },
  { name: "NestJS", category: "Mobile & Backend", description: "Enterprise scalable Node framework", color: "text-rose-400" },
  { name: "Prisma", category: "Mobile & Backend", description: "Next-gen type-safe database ORM", color: "text-teal-400" },
  { name: "GraphQL", category: "Mobile & Backend", description: "Query API layer & subscriptions", color: "text-pink-400" },

  // Database & Cloud
  { name: "MongoDB", category: "Database & Cloud", description: "Flexible NoSQL document database", color: "text-emerald-400" },
  { name: "PostgreSQL", category: "Database & Cloud", description: "Enterprise relational SQL engine", color: "text-blue-400" },
  { name: "Firebase", category: "Database & Cloud", description: "Realtime database & Google Cloud auth", color: "text-amber-400" },
  { name: "Cloud Hosting", category: "Database & Cloud", description: "Elastic serverless & edge deployments", color: "text-purple-400" },
  { name: "Shared Hosting", category: "Database & Cloud", description: "High-performance VPS & shared cPanel", color: "text-indigo-400" },

  // DevOps & Tools
  { name: "Docker", category: "DevOps & Tools", description: "Containerized microservices", color: "text-cyan-400" },
  { name: "GitHub", category: "DevOps & Tools", description: "Version control & CI/CD pipelines", color: "text-white" },
  { name: "VS Code", category: "DevOps & Tools", description: "Advanced IDE & extension ecosystem", color: "text-blue-400" },
];
