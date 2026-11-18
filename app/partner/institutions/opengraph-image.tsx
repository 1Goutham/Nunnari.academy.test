import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "AI training and MoU partnerships for colleges";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "For institutions", title: "Industry-ready AI for your students.", line: "Expert-led programs, projects and internships. 85+ institutions engaged." });
}
