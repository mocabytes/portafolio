export interface EducationInfo {
  degree: string;
  institution: string;
  address: string;
  yearRange: string;
  status: string;
  progress: {
    value: string;
    label: string;
    percentage: number;
  };
}

export const EDUCATION: EducationInfo = {
  degree: "Ingeniería en Informática",
  institution:
    "Universidad Nacional Experimental de las Telecomunicaciones e Informática (UNETI)",
  address: "Caracas, Venezuela",
  yearRange: "2024 — Presente",
  status: "En curso",
  progress: {
    value: "50%",
    label: "Completado",
    percentage: 50,
  },
};

const RING_RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function getProgressRingDash(): {
  circumference: number;
  offset: number;
} {
  const fill = CIRCUMFERENCE * (EDUCATION.progress.percentage / 100);
  const offset = CIRCUMFERENCE - fill;
  return {
    circumference: CIRCUMFERENCE,
    offset: Math.round(offset * 100) / 100,
  };
}
