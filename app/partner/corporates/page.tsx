import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PartnerPage from "@/components/templates/PartnerPage";

export const metadata: Metadata = pageMeta({ title: "Corporate AI Training for Teams", description: "Practical AI training for teams: custom learning paths, hands-on workshops and real business use cases, led by practitioners. 5,000+ professionals trained.", path: "/partner/corporates" });
export default function CorporatesPage() { return <PartnerPage id="corporates" />; }
