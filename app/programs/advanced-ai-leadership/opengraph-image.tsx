import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Advanced AI & Leadership program for experienced professionals";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Advanced AI & Leadership · 12 weeks", title: "Lead the next wave of AI innovation.", line: "For experienced professionals, technical leaders and the C-suite." });
}
