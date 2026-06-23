export interface StatConfig {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  variant: "default" | "alt" | "cyan" | "red";
  duration?: number;
}

export interface PersonalInfo {
  name: string;
  fullName: string;
  email: string;
  location: string;
  cvPath: string;
  avatar: {
    hero: string;
    profile: string;
  };
  social: {
    github: string;
    linkedin: string;
  };
  availability: string;
  tagline: string;
  bio: string;
  terminalTitle: string;
  jobTitle: string;
}

export const PERSONAL: PersonalInfo = {
  name: "Maria",
  fullName: "Maria Serrano",
  email: "maserrano.dev@gmail.com",
  location: "Venezuela",
  cvPath: "/Maria_Desarrolladora_FullStack.pdf",
  avatar: {
    hero: "/avatar-img.svg",
    profile: "/avatar-profile-img.svg",
  },
  social: {
    github: "https://github.com/mocabytes",
    linkedin: "https://linkedin.com/in/macastillejo",
  },
  availability: "Disponible para nuevas oportunidades",
  tagline:
    "Desarrolladora Full Stack | Infraestructura de Redes | Estudiante de Ingeniería Informática",
  bio: "Soy estudiante de Ingeniería Informática con un perfil híbrido que integra la lógica del desarrollo Full Stack y la gestión de infraestructura de redes. Gracias a mi nivel de inglés C1 certificado, me enfoco en diseñar aplicaciones estructuradas, optimizar flujos operativos y resolver problemas complejos mediante soluciones basadas en datos.",
  terminalTitle: "/mocabyte — bash — 80×24",
  jobTitle: "Desarrolladora Full Stack",
};

export const STATS: StatConfig[] = [
  {
    target: 150,
    prefix: "+",
    label: "Dispositivos Reparados",
    variant: "default",
    duration: 2500,
  },
  {
    target: 3,
    prefix: "+",
    label: "Proyectos Desarrollados",
    variant: "alt",
    duration: 2500,
  },
  {
    target: 100,
    prefix: "+",
    label: "Commits realizados",
    variant: "cyan",
    duration: 2500,
  },
  {
    target: 90,
    prefix: "+",
    label: "Constribuciones",
    variant: "red",
    duration: 2500,
  },
];
