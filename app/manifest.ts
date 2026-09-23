import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Md Tamim Hossain — Aspiring Full Stack Web Developer",
    short_name: "Tamim Hossain",
    description:
      "Portfolio of Md Tamim Hossain, Aspiring Full Stack Web Developer from Bangladesh.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    // Matches --primary in light mode (oklch 0.42 0.17 264 ≈ indigo-blue)
    theme_color: "#3b4bdb",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
