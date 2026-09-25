"use client";

import { useActionState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  contactSchema,
  type ContactFormData,
  type ContactFormState,
} from "@/lib/validations/contact";
import { sendContactMessage } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

/**
 * ContactForm — Client Component.
 *
 * Uses React Hook Form for real-time client-side validation (UX).
 * Uses useActionState + Server Action for authoritative server validation.
 * Honeypot field hidden with CSS — not aria-hidden (bots still see it).
 */
export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState
  );

  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  // Move focus to success message when form succeeds
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
      reset();
    }
  }, [state.status, reset]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        role="alert"
        tabIndex={-1}
        className={cn(
          "flex flex-col items-center gap-4 rounded-2xl",
          "border border-emerald-500/20 bg-emerald-500/5 p-10 text-center",
          "focus-visible:outline-none"
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2
            size={24}
            className="text-emerald-600 dark:text-emerald-400"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-base font-semibold text-foreground">
            Message sent!
          </p>
          <p className="text-[14px] text-muted-foreground max-w-sm">
            Thank you for reaching out. I&apos;ll get back to you as soon as
            possible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {/* ── Honeypot ── */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label htmlFor="contact-hp">Leave this empty</label>
        <input
          id="contact-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("_hp")}
        />
      </div>

      {/* ── Server error banner ── */}
      {state.status === "error" && !state.fieldErrors && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4"
        >
          <AlertCircle
            size={16}
            className="mt-0.5 shrink-0 text-destructive"
            aria-hidden="true"
          />
          <p className="text-[13px] text-destructive">{state.message}</p>
        </div>
      )}

      {/* ── Name ── */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-name" required>
          Name
        </Label>
        <Input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          required
          aria-required="true"
          error={
            errors.name?.message ??
            (state.status === "error"
              ? state.fieldErrors?.name?.[0]
              : undefined)
          }
          {...register("name")}
        />
      </div>

      {/* ── Email ── */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-email" required>
          Email
        </Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          required
          aria-required="true"
          error={
            errors.email?.message ??
            (state.status === "error"
              ? state.fieldErrors?.email?.[0]
              : undefined)
          }
          {...register("email")}
        />
      </div>

      {/* ── Subject ── */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-subject" required>
          Subject
        </Label>
        <Input
          id="contact-subject"
          type="text"
          placeholder="What's this about?"
          required
          aria-required="true"
          error={
            errors.subject?.message ??
            (state.status === "error"
              ? state.fieldErrors?.subject?.[0]
              : undefined)
          }
          {...register("subject")}
        />
      </div>

      {/* ── Message ── */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message" required>
          Message
        </Label>
        <Textarea
          id="contact-message"
          placeholder="Tell me about your project, opportunity, or question..."
          className="min-h-[150px]"
          required
          aria-required="true"
          error={
            errors.message?.message ??
            (state.status === "error"
              ? state.fieldErrors?.message?.[0]
              : undefined)
          }
          {...register("message")}
        />
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className={cn(
          "inline-flex items-center justify-center gap-2 self-start",
          "h-11 px-6 rounded-full text-[13px] font-semibold",
          "bg-primary text-primary-foreground",
          "shadow-sm hover:shadow-md",
          "hover:bg-primary/90 hover:-translate-y-[1px]",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
      >
        {isPending && (
          <Loader2 size={15} className="animate-spin" aria-hidden="true" />
        )}
        {isPending ? "Sending..." : "Send message"}
      </button>

      {/* ── Validation summary ── */}
      {state.status === "error" && state.message && state.fieldErrors && (
        <p role="alert" className="text-[13px] text-destructive">
          {state.message}
        </p>
      )}
    </form>
  );
}