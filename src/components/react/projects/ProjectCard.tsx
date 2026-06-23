import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { Project, ProjectStatus } from "@data/projects";
import { getTechIcon } from "@data/techIcons";
import {
  ExternalLinkIcon,
  GalleryGridIcon,
} from "../icons/StatusIcons.tsx";

const MAX_LINES = 3;

function truncateAtLines(el: HTMLElement, text: string, lineHeight: number, maxLines: number, suffix: string): string | null {
  const maxH = lineHeight * maxLines;

  el.textContent = text + suffix;
  if (el.scrollHeight <= maxH) return null;

  let lo = 0;
  let hi = text.length;

  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2);
    el.textContent = text.slice(0, mid) + suffix;
    if (el.scrollHeight <= maxH) {
      lo = mid;
    } else {
      hi = mid - 1;
    }
  }

  // Walk back to word boundary
  while (lo > 0 && /\S/.test(text[lo - 1] ?? "")) {
    lo--;
  }

  return lo > 0 ? text.slice(0, lo).trimEnd() : text.slice(0, 1);
}

const STATUS_CONFIG: Record<ProjectStatus, { label: string; dot: string; glow: string }> = {
  deployed: {
    label: "Produccion",
    dot: "var(--color-success)",
    glow: "var(--color-success-muted)",
  },
  development: {
    label: "Desarrollo",
    dot: "var(--color-warning)",
    glow: "var(--color-warning-muted)",
  },
};

function GitHubProjectIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [truncatedText, setTruncatedText] = useState<string | null>(null);

  // Measure exact truncation point (hidden element, no flicker)
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const compute = () => {
      const lh = parseFloat(getComputedStyle(el).lineHeight);
      const result = truncateAtLines(
        el,
        project.description,
        lh,
        MAX_LINES,
        "\u2026Ver más",
      );
      setTruncatedText(result);
    };

    compute();

    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [project.description]);

  const handleImageClick = useCallback(() => {
    if (project.images.length === 0) return;
    window.dispatchEvent(
      new CustomEvent("open-lightbox", {
        detail: { projectId: project.id, imageIndex: 0 },
      }),
    );
  }, [project.id, project.images.length]);

  const status = STATUS_CONFIG[project.status];
  const accent = project.accentColor || "#8b5cf6";
  const mainImage = project.images[0];
  const hasGallery = project.images.length > 1;

  return (
    <article
      ref={cardRef}
      className="gallery-card"
      style={{
        "--card-accent": accent,
        "--card-accent-muted": `${accent}1a`,
        "--card-index": index,
      } as React.CSSProperties}
    >
      {/* ── Image 16:9 ── */}
      <div
        className="gallery-card__media"
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        aria-label={`Ver galería de ${project.title}`}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleImageClick();
          }
        }}
      >
        {mainImage ? (
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="gallery-card__img"
            loading={index === 0 ? "eager" : "lazy"}
          />
        ) : (
          <div className="gallery-card__img--placeholder" aria-hidden="true" />
        )}

        {/* Status badge */}
        <span
          className="gallery-card__status"
          style={{ "--status-dot": status.dot, "--status-glow": status.glow } as React.CSSProperties}
        >
          <span className="gallery-card__status-dot" aria-hidden="true" />
          {status.label}
        </span>

        {/* Gallery indicator */}
        {hasGallery && (
          <span className="gallery-card__gallery-badge" aria-hidden="true">
            <GalleryGridIcon />
            {project.images.length}
          </span>
        )}

        {/* Hover gradient */}
        <div className="gallery-card__media-overlay" aria-hidden="true" />
      </div>

      {/* ── Body ── */}
      <div className="gallery-card__body">
        <h3 className="gallery-card__title">{project.title}</h3>

        {/* Offscreen measure clone (same width, invisible) */}
        <p
          ref={measureRef}
          className="gallery-card__desc gallery-card__desc--measure"
          aria-hidden="true"
        />

        <p className="gallery-card__desc">
          {expanded
            ? (
              <>
                {project.description}{" "}
                <button
                  type="button"
                  className="gallery-card__inline-expand"
                  onClick={() => setExpanded(false)}
                >
                  Ver menos
                </button>
              </>
            )
            : truncatedText !== null
            ? (
              <>
                {truncatedText}
                {"\u2026 "}
                <button
                  type="button"
                  className="gallery-card__inline-expand"
                  onClick={() => setExpanded(true)}
                >
                  Ver más
                </button>
              </>
            )
            : (
              project.description
            )}
        </p>

        {/* Tech pills */}
        <div className="gallery-card__tech">
          {project.techStack.map((tech) => {
            const svg = getTechIcon(tech);
            return (
              <span className="gallery-card__pill" key={tech}>
                {svg && (
                  <span
                    className="gallery-card__pill-icon"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                )}
                {tech}
              </span>
            );
          })}
        </div>

        {/* Actions */}
        <div className="gallery-card__actions">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              className="gallery-card__btn gallery-card__btn--demo"
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--btn-accent": accent } as React.CSSProperties}
            >
              <ExternalLinkIcon />
              Demo
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              className="gallery-card__btn gallery-card__btn--code"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubProjectIcon />
              Código
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
