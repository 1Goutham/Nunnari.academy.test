import StickyCta from "@/components/StickyCta";

/** Both "Partner with us" pages share the floating callback card used on the programme pages. */
export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StickyCta />
    </>
  );
}
