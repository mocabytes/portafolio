import { useRef, useEffect, useCallback } from "react";
import { TECH_DATA } from "@data/techData";
import { getTechIcon } from "@data/techIcons"; // <-- Cambiado a tus iconos locales
import "./TechCardGrid.css";

interface TechCardProps {
  id: string;
  name: string;
  color: string;
}

function TechCard({ id, name, color }: TechCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      const inner = innerRef.current;
      if (!card || !inner) {
        rafRef.current = null;
        return;
      }
      const rect = card.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);

      const rotateX = ((yPct - 50) / 50) * -5;
      const rotateY = ((xPct - 50) / 50) * 5;
      inner.style.setProperty("--rx", `${rotateX}deg`);
      inner.style.setProperty("--ry", `${rotateY}deg`);

      rafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;
    card.style.setProperty("--mx", "-9999px");
    card.style.setProperty("--my", "-9999px");
    inner.style.setProperty("--rx", "0deg");
    inner.style.setProperty("--ry", "0deg");
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener("mousemove", handleMouseMove, { passive: true });
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Consumimos directamente tu SVG local de techIcons.ts
  const svg = getTechIcon(id) || "";

  return (
    <div
      ref={cardRef}
      className="tech-card"
      style={
        {
          "--brand-color": color,
          "--mx": "-9999px",
          "--my": "-9999px",
        } as React.CSSProperties
      }
    >
      <div
        ref={innerRef}
        className="tech-card__inner"
        style={{ "--rx": "0deg", "--ry": "0deg" } as React.CSSProperties}
      >
        <div className="tech-card__spotlight" aria-hidden="true" />
        <div
          className="tech-card__icon"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <span className="tech-card__name">{name}</span>
      </div>
    </div>
  );
}

const CATEGORIES = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & Runtimes" },
  { id: "database", label: "Bases de Datos" },
  { id: "tools", label: "Herramientas & Sistemas" },
];

export default function TechCardGrid() {
  return (
    <div className="tech-container reveal-item">
      {CATEGORIES.map((cat) => {
        const filteredAndSortedTech = TECH_DATA.filter(
          (tech) => tech.category === cat.id,
        ).sort((a, b) => a.name.localeCompare(b.name));

        if (filteredAndSortedTech.length === 0) return null;

        return (
          <div key={cat.id} className="tech-category-section">
            <h3 className="tech-category-title">{cat.label}</h3>
            <div className="tech-card-grid">
              {filteredAndSortedTech.map((tech) => (
                <TechCard
                  key={tech.id}
                  id={tech.id}
                  name={tech.name}
                  color={tech.color}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
