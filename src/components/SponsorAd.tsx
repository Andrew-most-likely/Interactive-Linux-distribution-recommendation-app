import { Heart } from "lucide-react";

const SPONSOR_URL = "https://github.com/sponsors/Andrew-most-likely";

export function SponsorAds() {
  return (
    <a
      href={SPONSOR_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="sponsor-ad"
      aria-label="Sponsor this project"
    >
      <Heart size={14} strokeWidth={1.75} />
      <span>Sponsor this project</span>
    </a>
  );
}
