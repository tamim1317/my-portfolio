import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact-form";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Md Tamim Hossain — open to remote full stack development opportunities and project collaborations.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

const contactDetails = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: siteConfig.social.github.replace("https://", ""),
    href: siteConfig.social.github,
    icon: GitHubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    value: siteConfig.social.linkedin.replace("https://", ""),
    href: siteConfig.social.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Get in touch"
          title="Contact"
          description="Open to remote junior and full-stack opportunities, collaborations, and interesting projects. I'll respond as quickly as I can."
        />

        <div className="section-padding-sm">
          <Container width="default">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_20rem]">

              {/* ── Contact form ── */}
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Send a message
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fill in the form and I&apos;ll get back to you.
                    All fields marked * are required.
                  </p>
                </div>
                <ContactForm />
              </div>

              {/* ── Contact info sidebar ── */}
              <aside className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Other ways to reach me
                  </h2>
                  <div className="flex flex-col gap-3">
                    {contactDetails.map(({ label, value, href, icon: Icon, external }) => {
                      const isPlaceholder = value.includes("[PLACEHOLDER");
                      if (isPlaceholder) return null;
                      return (
                        <a
                          key={label}
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          aria-label={external ? `${label} (opens in new tab)` : label}
                          className={cn(
                            "flex items-center gap-3",
                            "rounded-lg border border-border bg-card p-3",
                            "hover:border-primary/20 hover:bg-accent/50",
                            "transition-colors duration-[150ms]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          )}
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon size={15} aria-hidden="true" />
                          </span>
                          <div className="flex flex-col gap-0.5 min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                              {label}
                            </p>
                            <p className="text-sm text-foreground truncate">
                              {value}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-primary" aria-hidden="true" />
                    <span className="text-sm font-semibold text-foreground">Location</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.location}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.locationNote}
                  </p>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex flex-col gap-2">
                  <p className="text-sm font-medium text-foreground">
                    {siteConfig.availabilityNote}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {siteConfig.responseTime}
                  </p>
                </div>
              </aside>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
