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
 * MobileNavTrigger + MobileNavMenu.
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

  // Close on route change — track previous pathname in a ref so the
  // effect only fires when the route actually changes, not on mount.
  // Using a ref-based previous value avoids calling setState directly
  // in an effect body (react-hooks/set-state-in-effect).
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  // Lock body scroll when open
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

  // Escape key closes menu
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

  // Focus trap inside menu
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
    // Move focus into menu when it opens
    first?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  return (
    <>
      {/* Trigger button — hamburger / close */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        className={cn(
          "inline-flex items-center justify-center",
          "h-9 w-9 rounded-lg md:hidden",
          "text-muted-foreground",
          "hover:bg-accent hover:text-accent-foreground",
          "transition-colors duration-[150ms]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        {open ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <Menu size={20} aria-hidden="true" />
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={close}
        />
      )}

      {/* Drawer */}
      <div
        ref={menuRef}
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 md:hidden",
          "bg-background border-l border-border",
          "flex flex-col",
          "shadow-xl",
          // Animation — controlled by translate + transition
          // prefers-reduced-motion disables this via globals.css
          "transition-transform duration-[250ms] ease-out",
          open ? "translate-x-0" : "translate-x-full",
          // Hidden from AT when closed
          !open && "invisible"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-border shrink-0">
          <span className="font-semibold text-sm text-foreground">
            Navigation
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            className={cn(
              "inline-flex items-center justify-center h-8 w-8 rounded-lg",
              "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              "transition-colors duration-[150ms]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="flex flex-col p-4 gap-1 flex-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg",
                  "text-sm font-medium",
                  "transition-colors duration-[150ms]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer hint */}
        <div className="px-6 py-4 border-t border-border shrink-0">
          <p className="text-xs text-muted-foreground">
            Md Tamim Hossain — Full Stack Developer
          </p>
        </div>
      </div>
    </>
  );
}
