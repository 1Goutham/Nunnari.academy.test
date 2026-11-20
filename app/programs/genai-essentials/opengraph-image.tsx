import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "GenAI Essentials: a self-paced AI course for school and college students";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "GenAI Essentials · 4 weeks · Self-paced", title: "AI course for school and college students.", line: "Build your understanding of AI, one step at a time." });
}
