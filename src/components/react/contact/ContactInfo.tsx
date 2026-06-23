import { useState, useCallback } from "react";
import { PERSONAL } from "@data/personal";
import { CONTACT_TEXT } from "@data/contact";
import {
  MailIcon,
  MapPinIcon,
  GitHubIcon,
  LinkedInIcon,
  DownloadIcon,
  CopyIcon,
  CheckmarkIcon,
} from "../icons/StatusIcons.tsx";

export default function ContactInfo({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silently
    }
  }, []);

  const { info } = CONTACT_TEXT;

  return (
    <div className={`contact-info ${className ?? ""}`}>
      <div className="info-card">
        <h4 className="info-card-title">{info.contactTitle}</h4>
        <ul className="info-list">
          <li className="info-item">
            <MailIcon />
            <span className="email-row">
              <span>{PERSONAL.email}</span>
              <button
                type="button"
                className="copy-btn"
                onClick={handleCopyEmail}
                aria-label={copied ? "Copiado" : "Copiar email al portapapeles"}
              >
                {copied ? <CheckmarkIcon /> : <CopyIcon />}
              </button>
            </span>
          </li>
          <li className="info-item">
            <MapPinIcon />
            <span>{PERSONAL.location}</span>
          </li>
        </ul>
      </div>

      <div className="info-card">
        <h4 className="info-card-title">{info.availabilityTitle}</h4>
        <p className="info-availability">
          <span className="availability-dot" aria-hidden="true" />
          {PERSONAL.availability}
        </p>
      </div>

      <div className="info-card">
        <h4 className="info-card-title">{info.cvTitle}</h4>
        <a href={PERSONAL.cvPath} className="cv-download-link" download>
          <DownloadIcon />
          {info.cvDownload}
        </a>
      </div>

      <div className="info-card">
        <h4 className="info-card-title">{info.socialTitle}</h4>
        <div className="info-social">
          <a
            href={PERSONAL.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href={PERSONAL.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
