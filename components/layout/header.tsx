import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";
import { siteConfig } from "@/lib/site";

export const navItems = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Resume",   href: "/resume" },
  { label: "Contact",  href: "/contact" },
] as const;

/**
 * Keep this in sync with the flag in components/sections/hero-section.tsx.
 * When true, uses /public/images/profile.jpg for the logo badge instead
 * of the "TH" initials.
 */
const HAS_PROFILE_PHOTO = true;

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — Home`}
            className="group flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-lg"
          >
            {HAS_PROFILE_PHOTO ? (
              <span
                className={cn(
                  "relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full",
                  "ring-1 ring-border/80",
                  "shadow-sm transition-all duration-300 ease-out",
                  "group-hover:scale-105 group-hover:shadow-md"
                )}
              >
                <Image
                  src="/images/profile.jpg"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-8 w-8 items-center justify-center shrink-0 rounded-lg",
                  "bg-primary text-primary-foreground",
                  "text-[12px] font-medium tracking-tight select-none",
                  "shadow-sm transition-all duration-300 ease-out",
                  "group-hover:-rotate-6 group-hover:scale-105 group-hover:shadow-md"
                )}
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                TH
              </span>
            )}
            <span className="hidden sm:block text-[14px] font-medium tracking-tight text-foreground">
              Tamim Hossain
            </span>
          </Link>

          {/* Desktop nav */}
          <NavLinks items={[...navItems]} className="flex-1 justify-center" />

          {/* Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <ThemeToggle />

            <Link
              href="/contact"
              className={cn(
                "hidden md:inline-flex items-center justify-center ml-1",
                "h-8 px-4 rounded-full text-[12px] font-semibold",
                "bg-primary text-primary-foreground",
                "shadow-sm hover:shadow-md",
                "hover:bg-primary/90 hover:-translate-y-[1px]",
                "transition-all duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              Hire Me
            </Link>

            <MobileNav items={[...navItems]} />
          </div>
        </div>
      </Container>
    </header>
  );
}