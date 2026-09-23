"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import type { ComponentProps } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps extends ComponentProps<typeof motion.div> {
  /** Slide direction on entry. Defaults to "up" (y: 16px). */
  direction?: Direction;
  /** Delay in seconds. Defaults to 0. */
  delay?: number;
  /** Duration in seconds. Defaults to 0.4. */
  duration?: number;
  /** Only animate once (on first viewport entry). Defaults to true. */
  once?: boolean;
}

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 16 },
  down: { y: -16 },
  left: { x: 16 },
  right: { x: -16 },
  none: {},
};

/**
 * FadeIn — scroll-triggered entry animation wrapper.
 *
 * Principles:
 *   - Fade + subtle translate only. No scale, no bounce, no spin.
 *   - Short durations. Restrained easing.
 *   - Respects prefers-reduced-motion: falls back to opacity-only at 150ms.
 *   - viewport.once = true — fires once, not on every scroll pass.
 */
export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.4,
  once = true,
  ...props
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  // When reduced motion is preferred: fade only, very fast
  const initial = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, ...directionOffset[direction] };

  const animate = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: prefersReduced ? 0.15 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeInStagger — wraps children so they can stagger individually.
 * Use FadeInItem inside it.
 */
export function FadeInStagger({
  children,
  staggerDelay = 0.08,
  ...props
}: ComponentProps<typeof motion.div> & { staggerDelay?: number }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: prefersReduced ? 0 : staggerDelay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeInItem — child of FadeInStagger.
 */
export function FadeInItem({
  children,
  direction = "up",
  ...props
}: Omit<FadeInProps, "delay" | "once">) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: prefersReduced
          ? { opacity: 0 }
          : { opacity: 0, ...directionOffset[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: prefersReduced ? 0.15 : 0.4,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
