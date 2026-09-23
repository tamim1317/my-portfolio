import { z } from "zod";

/**
 * Contact form schema — used on BOTH client and server.
 * Server validation is authoritative; client validation is UX-only.
 *
 * Honeypot field: _hp must be empty (bots fill it, humans don't see it).
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(200, "Email must be 200 characters or fewer")
    .trim(),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject must be 150 characters or fewer")
    .trim(),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message must be 2000 characters or fewer")
    .trim(),
  /** Honeypot — must be empty. Hidden from real users via CSS. */
  _hp: z.string().max(0, "Bot detected"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof ContactFormData, string[]>> };
