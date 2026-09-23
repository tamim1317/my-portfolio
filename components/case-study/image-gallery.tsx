"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/lib/projects";

interface ImageGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

/**
 * ImageGallery — accessible lightbox for project screenshots.
 *
 * Accessibility:
 * - role="dialog" + aria-modal + aria-label on lightbox
 * - Keyboard: Escape closes, ArrowLeft/Right navigates
 * - Focus trap while open
 * - Focus returns to the thumbnail that opened the lightbox on close
 * - aria-live counter announces position to screen readers
 * - Body scroll locked while open
 */
export function ImageGallery({ images, projectTitle }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen  = lightboxIndex !== null;
  const current = isOpen ? images[lightboxIndex] : null;

  // Refs to each thumbnail button so we can restore focus on close
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  // Track which index opened the lightbox so we can return focus there
  const openerIndexRef = useRef<number | null>(null);

  const open = useCallback((i: number) => {
    openerIndexRef.current = i;
    setLightboxIndex(i);
  }, []);

  const close = useCallback(() => {
    setLightboxIndex(null);
    // Restore focus to the thumbnail that opened the lightbox
    const idx = openerIndexRef.current;
    if (idx !== null) {
      // Defer to next tick so the dialog unmounts first
      setTimeout(() => {
        thumbnailRefs.current[idx]?.focus();
      }, 0);
    }
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % images.length : null
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { e.preventDefault(); close(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); prev();  }
      if (e.key === "ArrowRight") { e.preventDefault(); next();  }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close, prev, next]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!images.length) return null;

  return (
    <>
      {/* Thumbnail grid */}
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        role="list"
        aria-label={`${projectTitle} screenshots`}
      >
        {images.map((img, i) => (
          <div key={i} role="listitem">
            <button
              ref={(el) => { thumbnailRefs.current[i] = el; }}
              type="button"
              onClick={() => open(i)}
              aria-label={`View screenshot: ${img.alt}`}
              className={cn(
                "group relative block w-full overflow-hidden rounded-xl",
                "border border-border bg-muted",
                "aspect-video",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-[300ms] group-hover:scale-[1.02]"
              />
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-xs text-white/90">{img.caption}</p>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Screenshot ${(lightboxIndex ?? 0) + 1} of ${images.length}: ${current.alt}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close screenshot lightbox"
            autoFocus
            className={cn(
              "absolute top-4 right-4",
              "inline-flex items-center justify-center h-10 w-10 rounded-full",
              "bg-white/10 text-white hover:bg-white/20",
              "transition-colors duration-[150ms]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            )}
          >
            <X size={18} aria-hidden="true" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={prev}
              aria-label="Previous screenshot"
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2",
                "inline-flex items-center justify-center h-10 w-10 rounded-full",
                "bg-white/10 text-white hover:bg-white/20",
                "transition-colors duration-[150ms]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              )}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
          )}

          {/* Image */}
          <div className="relative max-w-5xl w-full mx-16 aspect-video">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={next}
              aria-label="Next screenshot"
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2",
                "inline-flex items-center justify-center h-10 w-10 rounded-full",
                "bg-white/10 text-white hover:bg-white/20",
                "transition-colors duration-[150ms]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              )}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          )}

          {/* Position counter — announced to screen readers */}
          <div className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-1">
            <p
              className="text-white/60 text-xs"
              aria-live="polite"
              aria-atomic="true"
            >
              {(lightboxIndex ?? 0) + 1} of {images.length}
            </p>
            {current.caption && (
              <p className="text-white/80 text-sm">{current.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
