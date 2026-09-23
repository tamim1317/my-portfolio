/**
 * lib/rate-limit.ts — Simple in-memory rate limiter.
 *
 * Strategy: per-IP sliding window.
 * For single-instance deployments (Vercel serverless) this resets
 * per cold start — sufficient for a personal portfolio contact form.
 *
 * For production at scale, swap the store to Upstash Redis:
 *   import { Ratelimit } from "@upstash/ratelimit";
 *   import { Redis } from "@upstash/redis";
 *
 * Environment variables:
 *   RATE_LIMIT_MAX      Max requests per window (default: 3)
 *   RATE_LIMIT_WINDOW   Window in seconds (default: 600 = 10 minutes)
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

function getConfig() {
  return {
    max: parseInt(process.env.RATE_LIMIT_MAX ?? "3", 10),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW ?? "600", 10) * 1000,
  };
}

/** Returns true if the IP is within the allowed rate, false if exceeded. */
export function checkRateLimit(ip: string): boolean {
  const { max, windowMs } = getConfig();
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) {
    return false;
  }

  entry.count += 1;
  return true;
}

/** Extract the client IP from Next.js request headers. */
export function getClientIP(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
