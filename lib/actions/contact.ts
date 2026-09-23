"use server";

import { headers } from "next/headers";
import { contactSchema, type ContactFormState } from "@/lib/validations/contact";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

/**
 * sendContactMessage — Server Action for the contact form.
 *
 * Security checklist:
 *   ✓ Server-side Zod validation (independent of client)
 *   ✓ Honeypot field check
 *   ✓ Rate limiting per IP
 *   ✓ No sensitive error details returned to client
 *   ✓ API key never in client bundle (server-only)
 *   ✓ Safe error messages only
 *
 * Email provider configuration (Resend):
 *   Set these environment variables in .env.local / Vercel:
 *     RESEND_API_KEY   — Your Resend API key (required for email delivery)
 *     CONTACT_EMAIL    — Where to send contact form submissions
 *
 * If RESEND_API_KEY is not set, the action logs to console in development
 * and returns an error in production. It never fakes successful delivery.
 */
export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // ── 1. Rate limit check ──────────────────────────────────────
  const headerStore = await headers();
  const ip = getClientIP(headerStore);

  if (!checkRateLimit(ip)) {
    return {
      status: "error",
      message:
        "Too many messages sent. Please wait a few minutes before trying again.",
    };
  }

  // ── 2. Extract raw data ───────────────────────────────────────
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    _hp: formData.get("_hp") ?? "",
  };

  // ── 3. Server-side validation (authoritative) ─────────────────
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors as Partial<
      Record<string, string[]>
    >;

    // Honeypot triggered — silently succeed to not tip off bots
    if (fieldErrors._hp) {
      return { status: "success" };
    }

    return {
      status: "error",
      message: "Please fix the errors below and try again.",
      fieldErrors,
    };
  }

  const { name, email, subject, message } = parsed.data;

  // ── 4. Send email ─────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !toEmail) {
    // Development: log to console, don't pretend to send
    if (process.env.NODE_ENV === "development") {
      console.log("[Contact form — dev mode, email not configured]", {
        from: `${name} <${email}>`,
        subject,
        message,
      });
      // In development, return success so the UI flow can be tested
      return { status: "success" };
    }

    // Production without config: honest error
    return {
      status: "error",
      message:
        "The contact form is not fully configured yet. Please email me directly.",
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `.trim(),
    });

    if (error) {
      // Log the real error server-side, return safe message to client
      console.error("[Contact form] Resend error:", error);
      return {
        status: "error",
        message: "Failed to send your message. Please try again or email me directly.",
      };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[Contact form] Unexpected error:", err);
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again or email me directly.",
    };
  }
}
