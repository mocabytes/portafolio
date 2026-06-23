import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const CONTACT_EMAIL =
  import.meta.env.CONTACT_EMAIL || "maserrano.dev@gmail.com";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    // Validación básica
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son obligatorios." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!email.includes("@") || !email.includes(".")) {
      return new Response(JSON.stringify({ error: "Email inválido." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Enviar email vía Resend
    const { error } = await resend.emails.send({
      from: "Portafolio <web@mariaserrano.tech>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nuevo mensaje de ${name} — maserrano.dev`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Nuevo mensaje — maserrano.dev</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f5f3ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f3ff;padding:40px 16px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(139,92,246,0.10);">
    
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%);padding:36px 40px 32px;">
                      <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#ddd6fe;text-transform:uppercase;letter-spacing:0.12em;">maserrano.dev</p>
                      <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#ffffff;line-height:1.2;letter-spacing:-0.02em;">
                        Hola, Maria 👋
                      </h1>
                      <p style="margin:0;font-size:14px;color:#ede9fe;line-height:1.5;">
                        Alguien dejó un mensaje en tu portafolio. Respóndelo mientras está fresco.
                      </p>
                    </td>
                  </tr>
    
                  <!-- Divider accent -->
                  <tr>
                    <td style="padding:0;">
                      <div style="height:3px;background:linear-gradient(90deg,#7c3aed,#c4b5fd,transparent);"></div>
                    </td>
                  </tr>
    
                  <!-- Body -->
                  <tr>
                    <td style="padding:36px 40px 28px;">
    
                      <!-- Sender info -->
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:28px;">
                        <tr>
                          <td style="padding-bottom:20px;border-bottom:1px solid #f3f4f6;">
                            <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:0.1em;">Nombre</p>
                            <p style="margin:0;font-size:16px;font-weight:600;color:#111827;">${name}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top:20px;">
                            <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:0.1em;">Email</p>
                            <a href="mailto:${email}" style="font-size:16px;color:#7c3aed;text-decoration:none;font-weight:500;">${email}</a>
                          </td>
                        </tr>
                      </table>
    
                      <!-- Message block -->
                      <p style="margin:0 0 10px;font-size:10px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:0.1em;">Mensaje</p>
                      <div style="border-left:3px solid #a78bfa;background:#faf5ff;border-radius:0 8px 8px 0;padding:18px 20px;">
                        <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;">${message}</p>
                      </div>
    
                      <!-- CTA -->
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:32px;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}?subject=Re: Tu mensaje en maserrano.dev"
                               style="display:inline-block;background:#7c3aed;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:13px 32px;border-radius:8px;letter-spacing:0.01em;">
                              Responder a ${name}
                            </a>
                          </td>
                        </tr>
                      </table>
    
                    </td>
                  </tr>
    
                  <!-- Footer -->
                  <tr>
                    <td style="background:#faf5ff;border-top:1px solid #ede9fe;padding:20px 40px;">
                      <p style="margin:0;font-size:12px;color:#a78bfa;text-align:center;line-height:1.5;">
                        Enviado desde el formulario de contacto de
                        <a href="https://maserrano.dev" style="color:#7c3aed;text-decoration:none;font-weight:600;">maserrano.dev</a>
                      </p>
                    </td>
                  </tr>
    
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({
          error: "Error al enviar el mensaje. Intenta de nuevo.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "¡Mensaje enviado! Te respondo tan pronto pueda.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(
      JSON.stringify({
        error: "Error inesperado. Intenta de nuevo más tarde.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
