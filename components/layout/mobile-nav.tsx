"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  items: NavItem[];
}

/**
 * MobileNav — premium mobile navigation drawer
 * - Focus trap while open
 * - Closes on Escape, backdrop click, and link navigation
 * - Locks body scroll while open
 * - Respects prefers-reduced-motion via CSS
 */
export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on route change
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  // Focus trap
  useEffect(() => {
    if (!open || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", trap);
    first?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  return (
    <>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        className={cn(
          "relative inline-flex items-center justify-center",
          "h-9 w-9 rounded-full md:hidden",
          "text-muted-foreground",
          "hover:bg-accent hover:text-foreground",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <Menu
          size={19}
          aria-hidden="true"
          className={cn(
            "absolute transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "opacity-0 rotate-45 scale-75" : "opacity-100 rotate-0 scale-100"
          )}
        />
        <X
          size={19}
          aria-hidden="true"
          className={cn(
            "absolute transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-75"
          )}
        />
      </button>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/70 backdrop-blur-md md:hidden",
          "transition-opacity duration-300 ease-out",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
        onClick={close}
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[280px] md:hidden",
          "bg-background/95 backdrop-blur-xl border-l border-border/60",
          "flex flex-col",
          "shadow-2xl",
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-x-0" : "translate-x-full",
          !open && "invisible"
        )}
      >
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/60 px-5">
          <span className="text-[13px] font-semibold tracking-tight text-foreground">
            Menu
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full",
              "text-muted-foreground hover:bg-accent hover:text-foreground",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        {/* Links */}
        <nav
          aria-label="Mobile navigation"
          className="flex flex-1 flex-col gap-1 p-4"
        >
          {items.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                }}
                className={cn(
                  "flex items-center rounded-xl px-4 py-3",
                  "text-[14px] font-medium tracking-tight",
                  "transition-all duration-300 ease-out",
                  open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-3",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer branding */}
        <div className="shrink-0 border-t border-border/60 px-5 py-5">
          <p className="text-[12px] font-medium text-foreground">
            Md Tamim Hossain
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Full Stack Developer
          </p>
        </div>
      </div>
    </>
  );
}