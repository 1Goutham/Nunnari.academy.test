import type { NextConfig } from "next";

// Old static-site URLs → new routes (keeps shared links and search results working)
const legacy: Record<string, string> = {
  "/index.html": "/",
  "/explore.html": "/explore",
  "/programs.html": "/programs",
  "/recorded-programme.html": "/programs/genai-essentials",
  "/regular-programme.html": "/programs/ai-engineering",
  "/premium-programme.html": "/programs/advanced-genai-leadership",
  "/partner-institutions.html": "/partner/institutions",
  "/partner-corporates.html": "/partner/corporates",
  "/help.html": "/help",
  "/terms.html": "/terms",
  "/privacy.html": "/privacy",
  "/refund.html": "/refund",
  "/workshops": "/explore",
  "/courses": "/programs",
  // program pages took keyword URLs
  "/programs/recorded": "/programs/genai-essentials",
  "/programs/regular": "/programs/ai-engineering",
  "/programs/premium": "/programs/advanced-genai-leadership",
  // the programs were renamed (GenAI Essentials, AI Engineering, Advanced GenAI & Leadership)
  "/programs/ai-essentials": "/programs/genai-essentials",
  "/programs/applied-ai": "/programs/ai-engineering",
  "/programs/advanced-ai-leadership": "/programs/advanced-genai-leadership",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return Object.entries(legacy).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [{ source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }];
  },
};

export default nextConfig;
