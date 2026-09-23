import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { siteConfig, isConfigured } from "@/lib/site";
import { Container } from "./container";
import { Separator } from "@/components/ui/separator";

const footerNav = [
  {
    label: "Work",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Resume",   href: siteConfig.resumeUrl },
    ],
  },
  {
    label: "Connect",
    links: [
      { label: "About",   href: "/about"   },
      { label: "Contact", href: "/contact" },
      ...(isConfigured(siteConfig.social.github)
        ? [{ label: "GitHub",   href: siteConfig.social.github,   external: true }]
        : []),
      ...(isConfigured(siteConfig.social.linkedin)
        ? [{ label: "LinkedIn", href: siteConfig.social.linkedin, external: true }]
        : []),
    ],
  },
] as const;

type SocialIcon = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean | "true" | "false" }>;
};

function buildSocialIcons(): SocialIcon[] {
  const icons: SocialIcon[] = [];
  if (isConfigured(siteConfig.social.github))   icons.push({ label: "GitHub",   href: siteConfig.social.github,   icon: GitHubIcon   });
  if (isConfigured(siteConfig.social.linkedin)) icons.push({ label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedInIcon });
  if (isConfigured(siteConfig.email))           icons.push({ label: "Email",    href: `mailto:${siteConfig.email}`, icon: Mail        });
  return icons;
}

const currentYear = new Date().getFullYear();

export function Footer() {
  const socialIcons = buildSocialIcons();

  return (
    <footer className="border-t border-border" role="contentinfo">
      <Container>
        <div className="py-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — Home`}
              className="inline-flex items-center gap-2 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
            >
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background text-[10px] font-bold select-none"
              >
                TH
              </span>
              <span className="text-sm font-semibold text-foreground tracking-tight">
                {siteConfig.shortName} Hossain
              </span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              {siteConfig.role} from {siteConfig.location}.
              Building thoughtful digital experiences with React and Next.js.
            </p>
            {socialIcons.length > 0 && (
              <div className="flex items-center gap-1" role="list">
                {socialIcons.map(({ label, href, icon: Icon }) => (
                  <div key={label} role="listitem">
                    <a
                      href={href}
                      aria-label={`${label} (opens in new tab)`}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cn(
                        "inline-flex items-center justify-center h-8 w-8 rounded-md",
                        "text-muted-foreground hover:text-foreground hover:bg-accent",
                        "transition-colors duration-[120ms]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                    >
                      <Icon size={14} aria-hidden="true" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nav columns */}
          {footerNav.map((group) => (
            <div key={group.label} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {group.label}
              </p>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
                        "transition-colors duration-[120ms]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
                      )}
                    >
                      {link.label}
                      {"external" in link && link.external && (
                        <ExternalLink size={10} aria-hidden="true" className="opacity-40" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        <div className="py-5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </Container>
    </footer>
  );
}
