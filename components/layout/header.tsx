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

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — Home`}
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex h-7 w-7 items-center justify-center shrink-0 rounded-md",
                "bg-foreground text-background",
                "text-[10px] font-bold tracking-tight select-none"
              )}
            >
              TH
            </span>
            <span className="hidden sm:block text-sm font-semibold text-foreground leading-none tracking-tight">
              Tamim Hossain
            </span>
          </Link>

          {/* Desktop nav */}
          <NavLinks items={[...navItems]} className="flex-1 justify-center" />

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <ThemeToggle />
            <Link
              href="/contact"
              className={cn(
                "hidden md:inline-flex items-center justify-center ml-1",
                "h-8 px-3.5 rounded-md text-xs font-semibold",
                "bg-primary text-primary-foreground",
                "hover:bg-primary/88",
                "transition-colors duration-[120ms]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
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
