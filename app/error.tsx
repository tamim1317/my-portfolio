"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * error.tsx — Route-level error boundary.
 * Shown when an unhandled error occurs inside a route segment.
 * Must be a Client Component (React error boundary requirement).
 */
export default function RouteError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to an error monitoring service when available
    console.error("[Route error]", error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex flex-col flex-1 min-h-[60vh] items-center justify-center"
    >
      <Container width="narrow">
        <div className="flex flex-col items-center text-center gap-6 py-20">
          <p
            className="text-8xl font-bold text-destructive/20 select-none"
            aria-hidden="true"
          >
            500
          </p>
          <div className="flex flex-col gap-2">
            <h1 className="text-display-lg text-foreground">
              Something went wrong
            </h1>
            <p className="text-body-md text-muted-foreground max-w-sm">
              An unexpected error occurred. If this keeps happening, please
              get in touch.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center h-10 px-5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center h-10 px-5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-accent transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Go home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
