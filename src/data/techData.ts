export interface TechItem {
  id: string;
  name: string;
  color: string;
  category: "frontend" | "backend" | "database" | "tools";
}

export const TECH_DATA: TechItem[] = [
  // --- FRONTEND ---
  {
    id: "javascript",
    name: "JavaScript",
    color: "#F7DF1E",
    category: "frontend",
  },
  {
    id: "typescript",
    name: "TypeScript",
    color: "#3178C6",
    category: "frontend",
  },
  { id: "react", name: "React", color: "#61DAFB", category: "frontend" },
  { id: "nextjs", name: "Next.js", color: "#000000", category: "frontend" },
  { id: "astro", name: "Astro", color: "#FF5D01", category: "frontend" },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    color: "#38B2AC",
    category: "frontend",
  },
  { id: "ajax", name: "AJAX", color: "#005A9C", category: "frontend" },
  {
    id: "bootstrap",
    name: "Bootstrap",
    color: "#7952B3",
    category: "frontend",
  },

  // --- BACKEND ---
  { id: "php", name: "PHP", color: "#777BB4", category: "backend" },
  { id: "laravel", name: "Laravel", color: "#FF2D20", category: "backend" },
  { id: "nodejs", name: "Node.js", color: "#339933", category: "backend" },
  { id: "python", name: "Python", color: "#3776AB", category: "backend" },

  // --- BASES DE DATOS ---
  { id: "mysql", name: "MySQL", color: "#4479A1", category: "database" },
  {
    id: "postgresql",
    name: "PostgreSQL",
    color: "#336791",
    category: "database",
  },

  // --- HERRAMIENTAS Y ENTORNO ---
  { id: "git", name: "Git", color: "#F05032", category: "tools" },
  { id: "github", name: "GitHub", color: "#181717", category: "tools" },
  { id: "vite", name: "Vite", color: "#646CFF", category: "tools" },
  { id: "linux", name: "Linux", color: "#FCC624", category: "tools" },
  { id: "vercel", name: "Vercel", color: "#000000", category: "tools" },
];
