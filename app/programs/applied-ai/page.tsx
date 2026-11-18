import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ProgramPage from "@/components/templates/ProgramPage";

export const metadata: Metadata = pageMeta({ title: "Generative AI & Agentic AI Course", description: "Applied AI is a 12-week, instructor-led Generative AI and Agentic AI course for beginners and career switchers. Online or offline, in English and Tamil.", path: "/programs/applied-ai" });

export default function RegularPage() {
  return <ProgramPage id="regular" />;
}
