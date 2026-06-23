import { useState, useRef } from "react";
import { CONTACT_TEXT, MESSAGE_MAX, MESSAGE_MIN } from "@data/contact";
import type { FormStatus } from "@data/contact";
import ContactInfo from "./contact/ContactInfo.tsx";
import { SendIcon, CheckIcon, ErrorIcon } from "./icons/StatusIcons.tsx";
import "./ContactForm.css";

function validate({
  name,
  email,
  message,
}: {
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  message: FormDataEntryValue | null;
}): string | null {
  const { validation } = CONTACT_TEXT;
  if (
    !name?.toString().trim() ||
    !email?.toString().trim() ||
    !message?.toString().trim()
  ) {
    return validation.required;
  }
  const emailStr = email.toString();
  if (!emailStr.includes("@") || !emailStr.includes(".")) {
    return validation.invalidEmail;
  }
  const msgStr = message.toString().trim();
  if (msgStr.length < MESSAGE_MIN) {
    return validation.messageMin;
  }
  if (message.toString().length > MESSAGE_MAX) {
    return validation.messageMax(MESSAGE_MAX);
  }
  return null;
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const fields = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    };

    const validationError = validate(fields);
    if (validationError) {
      setErrorMsg(validationError);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || CONTACT_TEXT.errorDefault);
      }

      setStatus("success");
      form.reset();
      setCharCount(0);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : CONTACT_TEXT.errorDefault,
      );
      setStatus("error");
    }
  }

  function handleRetry() {
    setStatus("idle");
    setErrorMsg("");
    setCharCount(0);
  }

  const { form: t } = CONTACT_TEXT;
  const { nameField, emailField, messageField } = {
    nameField: t.fields.name,
    emailField: t.fields.email,
    messageField: t.fields.message,
  };
  const isDisabled = status === "loading";

  return (
    <section id="contacto" className="section-wrapper contact-section">
      <div className="section-heading reveal-item">
        <h2 className="title-block">
          <span className="bracket bracket--open" aria-hidden="true">
            &lt;
          </span>
          <span className="title-main">Contacto</span>
          <span className="bracket bracket--close" aria-hidden="true">
            /&gt;
          </span>
        </h2>
      </div>

      <div className="contact-grid stagger-children">
        {/* ── Left: Form ── */}
        <div className="contact-card stagger-1">
          <div className="contact-card-header">
            <h3 className="contact-card-title">{t.title}</h3>
            <p className="contact-card-desc">{t.description}</p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form"
            noValidate
          >
            <div className="form-field">
              <label htmlFor="contact-name" className="form-label">
                {nameField.label}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder={nameField.placeholder}
                className="form-input"
                required
                disabled={isDisabled}
                autoComplete="name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-email" className="form-label">
                {emailField.label}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder={emailField.placeholder}
                className="form-input"
                required
                disabled={isDisabled}
                autoComplete="email"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message" className="form-label">
                {messageField.label}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                maxLength={MESSAGE_MAX}
                placeholder={messageField.placeholder}
                className="form-textarea"
                required
                disabled={isDisabled}
                onChange={(e) => setCharCount(e.target.value.length)}
              />
              <span
                className={`form-counter${charCount >= MESSAGE_MAX ? " form-counter--full" : ""}`}
                aria-live="polite"
              >
                {charCount}/{MESSAGE_MAX}
              </span>
            </div>

            {status === "error" && (
              <div className="form-alert form-alert--error">
                <ErrorIcon size={16} className="form-alert-icon" />
                <span>{errorMsg}</span>
              </div>
            )}

            {status === "success" ? (
              <div className="form-success">
                <CheckIcon size={48} className="form-success-icon" />
                <span>{CONTACT_TEXT.success}</span>
                <button
                  type="button"
                  className="form-send-another"
                  onClick={handleRetry}
                >
                  {t.sendAnother}
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="form-submit"
                disabled={isDisabled}
              >
                {isDisabled ? (
                  <>
                    <span className="form-spinner" aria-hidden="true" />
                    {t.submitting}
                  </>
                ) : (
                  <>
                    <SendIcon size={16} className="form-submit-icon" />
                    {t.submit}
                  </>
                )}
              </button>
            )}
          </form>
        </div>

        {/* ── Right: Info ── */}
        <ContactInfo className="stagger-2" />
      </div>
    </section>
  );
}
