import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { SkipLink } from "@/components/layout/skip-link";
import { siteConfig } from "@/lib/site";

/* ============================================================
   FONTS
   ============================================================ */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ============================================================
   ROOT METADATA
   ============================================================ */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000"
  ),
  title: {
    default: siteConfig.metaTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.metaDescription,
  keywords: [
    "full stack developer",
    "web developer",
    "Bangladesh",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Node.js",
    "remote developer",
    "junior developer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    // creator: "@yourtwitterhandle",  — add when you have one
  },
  // Note: canonical is NOT set here in the root layout.
  // Each page sets its own canonical via alternates.canonical.
  // This avoids every page inheriting the home page URL as its canonical.
};

/* ============================================================
   ANTI-FOUC SCRIPT
   ============================================================ */
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'dark' || stored === 'light' ? stored
              : stored === 'system' || !stored ? (prefersDark ? 'dark' : 'light')
              : 'light';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`.trim();

/* ============================================================
   STRUCTURED DATA — Person + WebSite
   ============================================================ */
function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    description: siteConfig.metaDescription,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BD",
      addressRegion: "Bangladesh",
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
    ].filter((url) => url && !url.includes("[PLACEHOLDER")),
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Full Stack Web Development",
      "JavaScript",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      "Personal developer portfolio of Md Tamim Hossain, Full Stack Web Developer.",
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

/* ============================================================
   ROOT LAYOUT
   ============================================================ */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
        <JsonLd />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ThemeProvider defaultTheme="system">
          <SkipLink />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
