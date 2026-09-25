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
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_19rem] lg:gap-16">

              {/* ── Contact form ── */}
              <div className="flex flex-col gap-7">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    Send a message
                  </h2>
                  <p className="mt-1.5 text-[14px] text-muted-foreground">
                    Fill in the form and I&apos;ll get back to you.
                    All fields marked * are required.
                  </p>
                </div>
                <ContactForm />
              </div>

              {/* ── Sidebar ── */}
              <aside className="flex flex-col gap-6">
                {/* Contact methods */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Other ways to reach me
                  </h2>

                  <div className="flex flex-col gap-2.5">
                    {contactDetails.map(
                      ({ label, value, href, icon: Icon, external }) => {
                        const isPlaceholder = value.includes("[PLACEHOLDER");
                        if (isPlaceholder) return null;

                        return (
                          <a
                            key={label}
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            aria-label={
                              external ? `${label} (opens in new tab)` : label
                            }
                            className={cn(
                              "group flex items-center gap-3.5",
                              "rounded-xl border border-border/70 bg-card/80 p-3.5",
                              "hover:border-primary/30 hover:bg-accent/40",
                              "transition-all duration-200",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            )}
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                              <Icon size={15} aria-hidden="true" />
                            </span>
                            <div className="flex min-w-0 flex-col gap-0.5">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                {label}
                              </p>
                              <p className="truncate text-[13px] font-medium text-foreground">
                                {value}
                              </p>
                            </div>
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Location card */}
                <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-5">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-primary" aria-hidden="true" />
                    <span className="text-[13px] font-semibold text-foreground">
                      Location
                    </span>
                  </div>
                  <p className="text-[13px] text-muted-foreground">
                    {siteConfig.location}
                  </p>
                  <p className="text-[13px] text-muted-foreground">
                    {siteConfig.locationNote}
                  </p>
                </div>

                {/* Availability note */}
                <div className="flex flex-col gap-2 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
                  <p className="text-[13px] font-medium text-foreground">
                    {siteConfig.availabilityNote}
                  </p>
                  <p className="text-[12px] text-muted-foreground">
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