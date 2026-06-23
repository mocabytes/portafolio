export interface ProjectImage {
  src: string;
  alt: string;
}

export type ProjectStatus = "deployed" | "development";

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  longDescription?: string;
  accentColor?: string;
  techStack: string[];
  images: ProjectImage[];
  demoUrl?: string;
  codeUrl?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "medu",
    title: "Medu - Sistema de Gestión de Inventario Clínico",
    status: "development",
    description:
      "Sistema de nivel comercial para clínicas y farmacias bajo la arquitectura MVC para la optimización de inventarios y alertas automatizadas.",
    longDescription:
      "Un sistema de gestión de inventario clínico diseñado para farmacias y clínicas. Cuenta con un control de acceso basado en roles (RBAC) para perfiles administrativos y farmacéuticos, interfaces reactivas mediante búsquedas dinámicas con AJAX y tareas automatizadas en segundo plano (Cron Jobs) para el control y alertas de vencimiento de lotes de medicinas.",
    accentColor: "#078C5B",
    techStack: ["php", "laravel", "mysql", "javascript", "ajax", "tailwindcss"],
    images: [
      {
        src: "/images/medu/landing-fullscreen.webp",
        alt: "Página principal de Medu",
      },
      {
        src: "/images/medu/login-fullscreen.webp",
        alt: "Página de login",
      },
      {
        src: "/images/medu/medicinas-fullscreen.webp",
        alt: "Página de productos y gestión de lotes",
      },
      {
        src: "/images/medu/modal-crear-medicina.webp",
        alt: "Formulario de registro de medicamentos e insumos",
      },
      {
        src: "/images/medu/modal-registrar-movimiento.webp",
        alt: "Dashboard de administración con métricas de stock",
      },
      {
        src: "/images/medu/proveedores-fullscreen.webp",
        alt: "Página de gestión de proveedores",
      },
      {
        src: "/images/medu/register-fullscreen.webp",
        alt: "Página de registro de usuarios del sistema",
      },
      {
        src: "/images/medu/userfullscreen.webp",
        alt: "Panel de control de usuario y perfil administrativo",
      },
    ],
    demoUrl: "https://medu.vercel.app/",
    codeUrl: "https://github.com/mocabyte/medu",
    featured: true,
  },
  {
    id: "manoscreativas",
    title: "Manos Creativas - Tienda de Artesanías",
    status: "development",
    description:
      "Tienda en línea de productos artesanales que conecta a artesanos de distintas regiones con personas interesadas en adquirir piezas únicas hechas a mano.",
    longDescription:
      "Tienda en línea de productos artesanales que conecta a artesanos de distintas regiones con personas interesadas en adquirir piezas únicas hechas a mano. El proyecto está desarrollado con Flask y utiliza Reflow para la gestión del catálogo y carrito de compras.",
    accentColor: "#5F1BF2",
    techStack: ["python", "bootstrap"],
    images: [
      {
        src: "coming-soon.webp",
        alt: "Página principal de Oid Mortales",
      },
    ],
    demoUrl: "https://manoscreativas.vercel.app/",
    codeUrl: "https://github.com/mocabytes/Manos-Creativas",
  },
  {
    id: "test",
    title: "Título - Proyecto de Prueba",
    status: "deployed",
    description:
      "loremp ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    accentColor: "#26BF21",
    techStack: ["astro", "react", "typescript"],
    images: [
      {
        src: "coming-soon.webp",
        alt: "Vista principal de este portfolio",
      },
    ],
    demoUrl: "https://mocabytes-test.app", // Reemplazar por tu URL de producción cuando la tengas
    codeUrl: "https://github.com/mocabytes/portfolio", // Actualizado a tu usuario de GitHub
  },
];
