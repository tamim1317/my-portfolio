"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const activeHref = items.find((item) => item.href === pathname)?.href;

  const updateIndicator = () => {
    if (!activeHref || !containerRef.current) {
      setIndicator(null);
      return;
    }

    const el = linkRefs.current.get(activeHref);
    if (!el) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    setIndicator({
      left: rect.left - containerRect.left,
      width: rect.width,
    });
  };

  useLayoutEffect(() => {
    updateIndicator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, items.length]);

  useEffect(() => {
    const onResize = () => updateIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <nav
      aria-label="Main navigation"
      ref={containerRef}
      className={cn(
        "relative hidden md:flex items-center gap-1",
        className
      )}
    >
      {/* Premium sliding indicator */}
      {indicator && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-0 h-full rounded-full",
            "bg-accent/90 shadow-sm",
            "transition-[left,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          )}
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        />
      )}

      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => {
              if (el) linkRefs.current.set(item.href, el);
            }}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative z-10 px-4 py-1.5 rounded-full",
              "text-[13px] font-medium tracking-[-0.01em]",
              "transition-all duration-200 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}