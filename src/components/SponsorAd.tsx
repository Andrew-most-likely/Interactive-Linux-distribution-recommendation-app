import { Heart } from "lucide-react";

const SPONSOR_URL = "https://github.com/sponsors/Andrew-most-likely";

export function SponsorAds() {
  return (
    <nav className="tabs sponsor-tabs">
      <a
        href={SPONSOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="tab sponsor-tab"
        aria-label="Sponsor this project"
      >
        <span className="tab-content">
          <Heart size={14} strokeWidth={1.75} />
          Sponsor this project
        </span>
      </a>
    </nav>
  );
}
