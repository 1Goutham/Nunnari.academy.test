import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Applied AI: a Generative AI and Agentic AI course";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Applied AI · 12 weeks · Instructor-led", title: "Generative AI & Agentic AI course.", line: "For beginners and career switchers. Online or offline." });
}
