"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface NavLinksProps {
  items: NavItem[];
  className?: string;
}

export function NavLinks({ items, className }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className={cn("hidden md:flex items-center gap-1", className)}
    >
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative px-3 py-1.5 rounded-md",
              "text-sm font-medium",
              "transition-colors duration-[120ms]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "text-foreground bg-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
