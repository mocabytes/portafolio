export interface ContactText {
  form: {
    title: string;
    description: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    submit: string;
    submitting: string;
    sendAnother: string;
  };
  info: {
    contactTitle: string;
    availabilityTitle: string;
    cvTitle: string;
    cvDownload: string;
    socialTitle: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    messageMin: string;
    messageMax: (max: number) => string;
  };
  success: string;
  errorDefault: string;
}

export const MESSAGE_MAX = 1000;
export const MESSAGE_MIN = 10;

export const CONTACT_TEXT: ContactText = {
  form: {
    title: "¡Trabajemos juntos!",
    description: "Escríbeme y me pondré en contacto contigo lo antes posible.",
    fields: {
      name: {
        label: "Nombre y Apellido",
        placeholder: "Nombre completo",
      },
      email: {
        label: "Correo Electrónico",
        placeholder: "tu@correo.com",
      },
      message: {
        label: "Mensaje",
        placeholder: "¡Hola, Maria! Te escribo porque...",
      },
    },
    submit: "Enviar mensaje",
    submitting: "Enviando...",
    sendAnother: "Enviar otro mensaje",
  },
  info: {
    contactTitle: "Información de contacto",
    availabilityTitle: "Disponibilidad",
    cvTitle: "Curriculum",
    cvDownload: "Descargar CV",
    socialTitle: "Social",
  },
  validation: {
    required: "Todos los campos son obligatorios.",
    invalidEmail: "Ingresa un correo válido.",
    messageMin: "El mensaje debe tener como mínimo 10 carácteres.",
    messageMax: (max: number) =>
      `El mensaje no puede superar los ${max} caracteres.`,
  },
  success: "¡Mensaje enviado! Te responderé lo antes posible.",
  errorDefault:
    "Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.",
};

export const FORM_STATUS = ["idle", "loading", "success", "error"] as const;
export type FormStatus = (typeof FORM_STATUS)[number];
