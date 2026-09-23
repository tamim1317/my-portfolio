import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="flex flex-col flex-1 min-h-[60vh] items-center justify-center"
      >
        <Container width="narrow">
          <div className="flex flex-col items-center text-center gap-6 py-20">
            <p
              className="text-8xl font-bold text-primary/20 select-none"
              aria-hidden="true"
            >
              404
            </p>
            <div className="flex flex-col gap-2">
              <h1 className="text-display-lg text-foreground">
                Page not found
              </h1>
              <p className="text-body-md text-muted-foreground max-w-sm">
                The page you&apos;re looking for doesn&apos;t exist or has
                been moved.
              </p>
            </div>
            <nav aria-label="Recovery navigation" className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center h-10 px-5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Go home
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center h-10 px-5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-accent transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-10 px-5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
              >
                Contact
              </Link>
            </nav>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
