// A small illustrated scene of a chawan (matcha bowl) mid-whisk, standing in
// for the "steeping" metaphor the whole app is built around. Hand-drawn as
// flat SVG shapes rather than a stock icon, so the brand has an actual face.
export function HeroArt() {
  return (
    <svg
      viewBox="0 0 420 420"
      className="hero-art"
      role="img"
      aria-label="Illustration of a matcha bowl and whisk"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="46%" r="55%">
          <stop offset="0%" stopColor="var(--gold-light)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--gold-light)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bowlBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--clay-light)" />
          <stop offset="100%" stopColor="var(--clay-deep)" />
        </linearGradient>
        <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--matcha-light)" />
          <stop offset="100%" stopColor="var(--matcha-deep)" />
        </linearGradient>
        <linearGradient id="whiskWood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--wood-light)" />
          <stop offset="100%" stopColor="var(--wood)" />
        </linearGradient>
      </defs>

      <circle cx="210" cy="196" r="190" fill="url(#glow)" />

      {/* floating leaves */}
      <g opacity="0.55">
        <ellipse cx="72" cy="90" rx="13" ry="7" fill="var(--matcha-light)" transform="rotate(-25 72 90)" />
        <ellipse cx="352" cy="300" rx="15" ry="8" fill="var(--sage)" transform="rotate(18 352 300)" />
      </g>

      {/* rising steam */}
      <g fill="none" stroke="var(--sage)" strokeWidth="4" strokeLinecap="round" opacity="0.55">
        <path className="steam steam-1" d="M172,118 C160,96 184,80 172,58" />
        <path className="steam steam-2" d="M204,110 C192,88 216,74 204,50" />
        <path className="steam steam-3" d="M236,120 C224,98 248,84 236,62" />
      </g>

      {/* bowl shadow */}
      <ellipse cx="212" cy="338" rx="112" ry="14" fill="var(--matcha-deep)" opacity="0.14" />

      {/* bowl body */}
      <path d="M92,158 Q86,286 212,326 Q338,286 332,158 Z" fill="url(#bowlBody)" />
      <path
        d="M92,158 Q86,286 212,326 Q338,286 332,158 Z"
        fill="none"
        stroke="var(--clay-deep)"
        strokeOpacity="0.35"
        strokeWidth="2"
      />

      {/* liquid rim */}
      <ellipse cx="212" cy="160" rx="120" ry="30" fill="url(#liquid)" />
      <ellipse cx="212" cy="160" rx="120" ry="30" fill="none" stroke="var(--matcha-deep)" strokeOpacity="0.3" strokeWidth="2" />
      <ellipse cx="176" cy="150" rx="34" ry="9" fill="#ffffff" opacity="0.22" />

      {/* whisk */}
      <g strokeLinecap="round">
        <line x1="366" y1="46" x2="292" y2="120" stroke="url(#whiskWood)" strokeWidth="10" />
        <g stroke="var(--wood-light)" strokeWidth="3.5" fill="none" opacity="0.9">
          <path d="M292,120 C270,132 262,150 268,168" />
          <path d="M292,120 C278,138 274,158 284,176" />
          <path d="M292,120 C290,142 292,162 304,178" />
          <path d="M292,120 C302,140 308,158 322,172" />
          <path d="M292,120 C312,134 322,150 330,164" />
        </g>
      </g>
    </svg>
  );
}
