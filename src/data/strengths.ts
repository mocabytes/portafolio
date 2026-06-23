export interface StrengthCard {
  column: "hire" | "differentiate";
  title: string;
  description: string;
  icon: string;
}

export const STRENGTH_COLUMNS = [
  {
    id: "hire",
    heading: "¿Por qué contratarme?",
  },
  {
    id: "differentiate",
    heading: "¿Qué me diferencia?",
  },
] as const;

export const STRENGTHS: StrengthCard[] = [
  // =============================================
  // ¿POR QUÉ CONTRATARME?
  // =============================================
  {
    column: "hire",
    title: "Sinergía en sistemas y desarrollo",
    description:
      "Tengo la versatilidad para moverme fluidamente entre el desarrollo de software full-stack y la infraestructura de redes o soporte técnico de sistemas.",
    icon: "multitool",
  },
  {
    column: "hire",
    title: "Criterio estético y estructural",
    description:
      "Mi formación en diseño aporta una perspectiva única para estructurar código limpio y construir interfaces visualmente impecables, lógicas y funcionales.",
    icon: "detail",
  },
  {
    column: "hire",
    title: "Gestión y resolución proactiva",
    description:
      "Mi experiencia previa en coordinación me permite comunicarme con claridad, absorber responsabilidades bajo presión y liderar soluciones dentro del equipo.",
    icon: "comfort",
  },

  // =============================================
  // ¿QUÉ ME DIFERENCIA?
  // =============================================
  {
    column: "differentiate",
    title: "Autonomía técnica global",
    description:
      "Con un nivel de inglés avanzado (C1) y formación bajo estándares internacionales, consumo documentación compleja y soluciono problemas de forma autodidacta.",
    icon: "critical",
  },
  {
    column: "differentiate",
    title: "Desarrollo eficiente",
    description:
      "Optimizo mis tiempos mediante prompt engineering avanzado para acelerar el desarrollo, modelado y refactorización, manteniendo el control arquitectónico absoluto.",
    icon: "ai",
  },
  {
    column: "differentiate",
    title: "Lógica de negocio robusta",
    description:
      "Me enfoco en construir arquitecturas estables en el backend y bases de datos relacionales, garantizando que los sistemas sean rápidos, seguros y escalables.",
    icon: "adapt",
  },
];
