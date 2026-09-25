"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only trust resolvedTheme once mounted on the client — on the server
  // (and during the very first client render, before hydration) we don't
  // yet know the visitor's saved preference, so rendering based on it
  // early causes a server/client mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        !mounted
          ? "Toggle theme"
          : isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      aria-pressed={mounted ? isDark : undefined}
      className={cn(
        "inline-flex items-center justify-center",
        "h-9 w-9 rounded-lg",
        "text-muted-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        "transition-colors duration-[150ms]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {/* Render a stable, theme-neutral icon until mounted to avoid
          any server/client markup mismatch. Once mounted, swap to
          the icon that reflects the actual resolved theme. */}
      {!mounted ? (
        <Sun size={18} aria-hidden="true" className="opacity-0" />
      ) : isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}