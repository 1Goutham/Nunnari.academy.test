import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ProgramPage from "@/components/templates/ProgramPage";

export const metadata: Metadata = pageMeta({ title: "AI Engineering: Generative & Agentic AI Course", description: "AI Engineering is a 4-week, instructor-led Generative AI and Agentic AI course for beginners and career switchers. Online or offline, in English and Tamil.", path: "/programs/ai-engineering" });

export default function RegularPage() {
  return <ProgramPage id="regular" />;
}
