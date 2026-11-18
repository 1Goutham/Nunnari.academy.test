import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PartnerPage from "@/components/templates/PartnerPage";

export const metadata: Metadata = pageMeta({ title: "AI Training & MoU Partnerships for Colleges", description: "Bring industry-aligned AI programs, expert-led sessions, projects and internships to your campus. Nunnari Academy has engaged 85+ institutions.", path: "/partner/institutions" });
export default function InstitutionsPage() { return <PartnerPage id="institutions" />; }
