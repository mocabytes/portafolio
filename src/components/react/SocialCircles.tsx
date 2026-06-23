import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PERSONAL } from "@data/personal";
import { MailIcon, GitHubIcon, LinkedInIcon } from "./icons/StatusIcons.tsx";

const socialLinks: {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }> | null;
  external: boolean;
}[] = [
  {
    href: PERSONAL.social.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon,
    external: true,
  },
  {
    href: `mailto:${PERSONAL.email}`,
    label: "Email",
    icon: MailIcon,
    external: false,
  },
  {
    href: PERSONAL.social.github,
    label: "GitHub",
    icon: GitHubIcon,
    external: true,
  },
  {
    href: PERSONAL.cvPath,
    label: "CV",
    icon: null,
    external: false,
  },
];

const enterSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 22,
  mass: 0.8,
};

const idleFloat = {
  y: [0, -4, 0],
  transition: {
    y: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut" as const,
      repeatType: "mirror" as const,
    },
  },
};

export default function SocialCircles() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <div className="social-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="social-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
        )}
      </AnimatePresence>

      <div className="social-circles-wrapper">
        <AnimatePresence>
          {isOpen &&
            socialLinks.map((link, i) => {
              const Icon = link.icon;
              const extraProps = link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : link.href.startsWith("mailto")
                  ? {}
                  : { download: "" };

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="social-circle"
                  aria-label={link.label}
                  initial={{ scale: 0, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: -10 }}
                  whileHover={{
                    scale: 1.12,
                    borderColor: "var(--color-accent)",
                    color: "var(--color-text-primary)",
                  }}
                  whileTap={{ scale: 0.93 }}
                  transition={{
                    ...enterSpring,
                    delay: (socialLinks.length - 1 - i) * 0.04,
                  }}
                  onClick={() => setTimeout(close, 120)}
                  {...extraProps}
                >
                  {Icon ? (
                    <Icon size={20} />
                  ) : (
                    <span className="circle-text">CV</span>
                  )}
                </motion.a>
              );
            })}
        </AnimatePresence>
      </div>

      <motion.button
        className="social-trigger"
        onClick={toggle}
        aria-label={isOpen ? "Cerrar contactos" : "Abrir contactos"}
        aria-expanded={isOpen}
        animate={isOpen ? { rotate: 45, y: 0 } : idleFloat}
        whileHover={{
          scale: 1.12,
        }}
        whileTap={{ scale: 0.93 }}
        transition={
          isOpen
            ? { type: "spring", stiffness: 300, damping: 22 }
            : {
                rotate: { type: "spring", stiffness: 300, damping: 22 },
                y: { duration: 0.3, ease: "easeOut" },
              }
        }
      >
        <img
          src="/favicon.svg"
          alt=""
          aria-hidden="true"
          width="26"
          height="26"
        />
      </motion.button>

      <style>{`
        .social-container {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 60;
        }

        .social-backdrop {
          position: fixed;
          inset: 0;
          z-index: 59;
        }

        .social-circles-wrapper {
          position: absolute;
          bottom: calc(3rem + 0.75rem);
          left: 50%;
          width: 3rem;
          margin-left: -1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          z-index: 61;
        }

        .social-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: var(--color-bg-glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--color-border-default);
          color: var(--color-text-secondary);
        }

        .circle-text {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: inherit;
        }

        .social-trigger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: #ffffff;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 12px rgb(0 0 0 / 0.35);
          z-index: 62;
          position: relative;
        }

        .social-trigger img {
          display: block;
        }
      `}</style>
    </div>
  );
}
