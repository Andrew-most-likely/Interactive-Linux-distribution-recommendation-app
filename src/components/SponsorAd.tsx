import { Heart } from "lucide-react";

const SPONSOR_URL = "https://github.com/sponsors/Andrew-most-likely";

function SponsorBanner({ side }: { side: "left" | "right" }) {
  return (
    <a
      href={SPONSOR_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`sponsor-ad sponsor-ad-${side}`}
      aria-label="Sponsor this project on GitHub Sponsors"
    >
      <span className="sponsor-ad-label">Advertisement</span>
      <Heart size={26} strokeWidth={1.5} />
      <p className="sponsor-ad-title">Sponsor me</p>
      <p className="sponsor-ad-sub">Support this project on GitHub Sponsors</p>
      <span className="sponsor-ad-btn">Sponsor →</span>
    </a>
  );
}

export function SponsorAds() {
  return (
    <>
      <SponsorBanner side="left" />
      <SponsorBanner side="right" />
    </>
  );
}
