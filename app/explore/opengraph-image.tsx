import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Free AI workshops, webinars and community";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Workshops & community", title: "Learn live. Watch anytime.", line: "Free AI workshops and webinars, with recordings and summaries." });
}
