import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import type { Project, ProjectImage } from "@data/projects"
import "./ProjectLightbox.css"

type LightboxPhase = "idle" | "entering" | "open" | "exiting"

/**
 * Lightbox fullscreen para galería de imágenes de proyectos.
 *
 * Escucha eventos `open-lightbox` en window:
 *   detail: { projectId: string, imageIndex: number }
 */
export default function ProjectLightbox({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<ProjectImage[]>([])
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<LightboxPhase>("idle")
  const [direction, setDirection] = useState<-1 | 0 | 1>(0)
  const overlayRef = useRef<HTMLDivElement>(null)

  /* ── Abrir ─────────────────────────────────── */
  const handleOpen = useCallback((projectImages: ProjectImage[], startIndex = 0) => {
    setImages(projectImages)
    setIndex(startIndex)
    setDirection(0)
    setPhase("entering")
    setOpen(true)
    document.body.style.overflow = "hidden"
    // Preload all images
    projectImages.forEach((img) => {
      const preload = new Image()
      preload.src = img.src
    })
  }, [])

  /* ── Cerrar ─────────────────────────────────── */
  const handleClose = useCallback(() => {
    setPhase("exiting")
    setTimeout(() => {
      setOpen(false)
      setPhase("idle")
      document.body.style.overflow = ""
    }, 300)
  }, [])

  /* ── Navegar ────────────────────────────────── */
  const goTo = useCallback(
    (newIndex: number) => {
      if (newIndex === index || newIndex < 0 || newIndex >= images.length) return
      setDirection(newIndex > index ? 1 : -1)
      setIndex(newIndex)
      setTimeout(() => setDirection(0), 350)
    },
    [index, images.length],
  )

  const next = useCallback(() => goTo(index + 1), [index, goTo])
  const prev = useCallback(() => goTo(index - 1), [index, goTo])

  /* ── Click fuera de la imagen ───────────────── */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) handleClose()
  }

  /* ── Teclado ────────────────────────────────── */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, handleClose, prev, next])

  /* ── Escuchar eventos de apertura ───────────── */
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId: string; imageIndex?: number }>
      const { projectId, imageIndex = 0 } = customEvent.detail
      const project = projects.find((p) => p.id === projectId)
      if (project?.images.length) handleOpen(project.images, imageIndex)
    }
    window.addEventListener("open-lightbox", handler)
    return () => window.removeEventListener("open-lightbox", handler)
  }, [projects, handleOpen])

  /* ── Animación de entrada ───────────────────── */
  useEffect(() => {
    if (phase === "entering") {
      const timer = setTimeout(() => setPhase("open"), 400)
      return () => clearTimeout(timer)
    }
  }, [phase])

  if (!open) return null

  const current = images[index]
  const animClass =
    direction === 1 ? "slide-from-right" : direction === -1 ? "slide-from-left" : ""

  return createPortal(
    <div
      ref={overlayRef}
      className={`lightbox ${phase}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Galería de imágenes"
    >
      {/* ── Botón cerrar ── */}
      <button className="lightbox-close" onClick={handleClose} aria-label="Cerrar galería">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Contador ── */}
      <span className="lightbox-counter">
        {index + 1} / {images.length}
      </span>

      {/* ── Flechas ── */}
      {index > 0 && (
        <button className="lightbox-arrow lightbox-arrow--prev" onClick={prev} aria-label="Anterior">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      {index < images.length - 1 && (
        <button className="lightbox-arrow lightbox-arrow--next" onClick={next} aria-label="Siguiente">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* ── Imagen ── */}
      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        {current && (
          <img
            key={index}
            src={current.src}
            alt={current.alt}
            className={`lightbox-img ${animClass}`}
          />
        )}
      </div>

      {/* ── Thumbnails ── */}
      {images.length > 1 && (
        <div className="lightbox-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`lightbox-thumb ${i === index ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Imagen ${i + 1}`}
            >
              <img src={img.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  )
}
