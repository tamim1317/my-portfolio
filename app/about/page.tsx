import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Md Tamim Hossain — Aspiring Full Stack Web Developer from Bangladesh. Mathematics Honours student, self-taught developer, open to remote opportunities.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="About me"
          title="Developer. Mathematician. Lifelong learner."
          description="I build accessible, thoughtful web applications and care deeply about the quality of the code behind them."
        />

        {/* Reuse the home page About section — same component, no duplication */}
        <AboutSection />
        <SkillsSection />

        {/* CTA strip */}
        <Section spacing="sm" background="muted" className="border-t border-border">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl border border-border bg-card px-6 py-6 shadow-card">
              <p className="text-display-lg text-foreground">
                Want to see what I&apos;ve built?
              </p>
              <div className="flex items-center gap-3">
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl text-sm font-medium border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    View projects
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Get in touch
                  </Link>
                </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
