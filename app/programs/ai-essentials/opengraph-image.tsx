import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "AI Essentials: a self-paced AI course for school and college students";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "AI Essentials · 12 weeks · Self-paced", title: "AI course for school and college students.", line: "Build your understanding of AI, one step at a time." });
}
