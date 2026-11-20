import type { IconName } from "@/components/Icon";

type Quote = { quote: string; name: string; role: string; org: string };
export type Partner = {
  key: "institutions" | "corporates";
  pill: string;
  title: [string, string];
  lead: string;
  cta: string;
  art: string;
  offers: { icon: IconName; title: string; text: string }[];
  // what we offer: the formats we run with the partner (titles only)
  formats: { icon: IconName; title: string }[];
  formatsTitle: [string, string];
  logosTitle: [string, string];
  logos: { src?: string; name: string; short?: string }[];
  logoKind?: "wide";        // wide wordmarks (600x200) rather than square crests
  stats: [number, string, string][]; // value, suffix, label
  charts: "institutions" | "corporates";
  quotes: Quote[];
  closing: [string, string];
};

export const partners: Record<Partner["key"], Partner> = {
  institutions: {
    key: "institutions",
    pill: "Partner with us · Institutions",
    title: ["Are your students ready for the industry,", "or just the classroom?"],
    lead: "We bridge academic knowledge and industry expectations with expert-led programs and hands-on experience.",
    cta: "Become a Partner",
    art: "institutions",
    offers: [
      { icon: "cap", title: "Industry-aligned learning", text: "Programs built around what the industry expects from graduates today." },
      { icon: "users", title: "Expert-led programs", text: "Industry experts bring real projects and practical experience to campus." },
      { icon: "briefcase", title: "Real-world opportunities", text: "Projects, internships and careers through meaningful industry collaborations." },
    ],
    formatsTitle: ["Ways we work with", "your institution."],
    formats: [
      { icon: "cap", title: "1-credit semester program" },
      { icon: "layers", title: "Value-added course" },
      { icon: "briefcase", title: "Placement training" },
      { icon: "code", title: "Workshops & hackathons" },
      { icon: "bulb", title: "Research collaboration" },
      { icon: "uni", title: "Center of excellence" },
    ],
    logosTitle: ["Trusted by", "leading institutions."],
    logos: [
      { src: "/assets/partners/cit-color.webp", name: "Coimbatore Institute of Technology" },
      { src: "/assets/partners/psg-color.webp", name: "PSG College of Technology" },
      { src: "/assets/partners/sns-color.webp", name: "SNS College of Engineering" },
      { src: "/assets/partners/kpriet-color.webp", name: "KPR Institute of Engineering and Technology" },
      { src: "/assets/partners/sri-krishna-color.webp", name: "Sri Krishna Institutions" },
      { src: "/assets/partners/dr-ngp-institute-of-technology-ink.png", name: "Dr. N.G.P. Institute of Technology" },
      { src: "/assets/partners/kprcas-ink.png", name: "KPR College of Arts, Science and Research" },
      { src: "/assets/partners/sona-college-of-technology-ink.png", name: "Sona College of Technology" },
    ],
    stats: [[10000, "+", "Students impacted"], [85, "+", "Institutions engaged"], [200, "+", "Industry experts & sessions"], [500, "+", "Projects & internships"]],
    charts: "institutions",
    quotes: [
      { quote: "Nunnari Academy has brought real industry exposure to our students. The hands-on learning and expert sessions have added immense value.", name: "Dr. R. Prakash", role: "Professor & Head, Department of CSE", org: "PSG College of Technology" },
      { quote: "The collaboration has enriched our students with practical AI skills and real-world projects. It truly bridges academia and industry.", name: "Dr. Meena S.", role: "Dean – Academics", org: "Kumaraguru College of Technology" },
      { quote: "Their industry-led programmes have created new opportunities for our students. Their commitment to practical learning is commendable.", name: "Dr. V. Ramesh", role: "Principal", org: "KPR Institute of Engineering and Technology" },
    ],
    closing: ["Is your institution ready for the", "next leap in AI?"],
  },
  corporates: {
    key: "corporates",
    pill: "Partner with us · Corporates",
    title: ["Equip your teams for", "what’s next with AI."],
    lead: "Practical, industry-ready AI training led by our experts, with custom programs designed for real business impact.",
    cta: "Partner With Us",
    art: "corporates",
    offers: [
      { icon: "book", title: "Custom learning paths", text: "Training designed around your teams, tools and business goals." },
      { icon: "users", title: "Experienced practitioners", text: "AI experts who help teams adapt, apply and innovate with AI." },
      { icon: "wrench", title: "Hands-on workshops", text: "Teams learn by doing, with exercises they take straight back to work." },
      { icon: "building", title: "Real business use cases", text: "Grounded in real business problems, so learning turns into results." },
    ],
    formatsTitle: ["Ways we work with", "your teams."],
    formats: [
      { icon: "crown", title: "Leadership enablement sessions" },
      { icon: "cpu", title: "Engineering development training" },
    ],
    logosTitle: ["Partners in building", "AI-ready teams."],
    // the companies Nunnari Labs works with (from the Nunnari Labs site's client strip)
    logos: [
      { name: "Landcom", src: "/assets/clients/landcom.webp" },
      { name: "ARB Corporation", src: "/assets/clients/arb.webp" },
      { name: "Martin Group", src: "/assets/clients/martin-group.webp" },
      { name: "Forge Innovation & Ventures", src: "/assets/clients/forge.webp" },
    ],
    logoKind: "wide",
    stats: [[5000, "+", "Professionals trained"], [100, "+", "Organisations partnered"], [200, "+", "Training sessions"], [95, "%", "Participant satisfaction"]],
    charts: "corporates",
    quotes: [
      { quote: "The training was practical, engaging and directly applicable. Our teams now feel more confident using AI in their projects.", name: "Arjun Kumar", role: "Engineering Manager", org: "Zoho" },
      { quote: "The customised programme helped our teams quickly adopt AI tools and improve productivity across functions.", name: "Priya Sharma", role: "Head of Learning & Development", org: "Tata Consultancy Services" },
      { quote: "The hands-on approach and real-world use cases made the training highly effective — one of the best programmes we’ve done.", name: "Rahul Menon", role: "Senior Director", org: "Infosys" },
    ],
    closing: ["Ready to upskill", "your team with AI?"],
  },
};
