import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IconSprite from "@/components/IconSprite";
import EnquiryProvider from "@/components/Enquiry";
import Effects from "@/components/Effects";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { organization, website } from "@/lib/schema";
import { inter, interExt, interTight, interTightExt } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "AI Courses in English & Tamil | Nunnari Academy", template: "%s | Nunnari Academy" },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", site: "@NunnariLabs" },
  formatDetection: { telephone: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const viewport: Viewport = { themeColor: "#FBFAFF", width: "device-width", initialScale: 1, viewportFit: "cover" };


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${interExt.variable} ${interTight.variable} ${interTightExt.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* reveal animations only when JS runs, so content is never hidden without it */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
        <JsonLd data={[organization, website]} />
      </head>
      <body>
        <IconSprite />
        <EnquiryProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </EnquiryProvider>
        <Effects />
      </body>
    </html>
  );
}
