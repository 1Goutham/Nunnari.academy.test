import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Nunnari Academy AI programs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "AI programs", title: "From first steps to leading AI.", line: "AI Essentials · Applied AI · Advanced AI & Leadership. 12 weeks each." });
}
