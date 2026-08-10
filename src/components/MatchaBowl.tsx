interface MatchaBowlProps {
  id: string;
  percentage: number; // 0-100, clamped by caller
}

// A small chawan-style bowl. The "liquid" rises and gets a light foam
// texture near the top as percentage increases, standing in for a
// generic progress bar.
export function MatchaBowl({ id, percentage }: MatchaBowlProps) {
  const clamped = Math.max(0, Math.min(100, percentage));
  const clipId = `bowl-clip-${id}`;
  const gradientId = `bowl-gradient-${id}`;
  const bowlPath = "M12,18 Q12,68 50,70 Q88,68 88,18 Z";

  const liquidTop = 66 - (clamped / 100) * 44; // 66 = empty, 22 = full
  const showFoam = clamped > 55;

  return (
    <svg width="60" height="52" viewBox="0 0 100 80" aria-hidden="true" style={{ flexShrink: 0 }}>
      <defs>
        <clipPath id={clipId}>
          <path d={bowlPath} />
        </clipPath>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--matcha-light)" />
          <stop offset="100%" stopColor="var(--matcha-deep)" />
        </linearGradient>
      </defs>

      <path d={bowlPath} fill="var(--surface)" stroke="var(--sage)" strokeWidth="2.5" />

      <g clipPath={`url(#${clipId})`}>
        <rect
          x="0"
          y={liquidTop}
          width="100"
          height={80 - liquidTop}
          fill={`url(#${gradientId})`}
          style={{ transition: "y 0.5s var(--ease-out)" }}
        />
        {showFoam && (
          <g style={{ transition: "opacity 0.4s ease" }}>
            <circle cx="30" cy={liquidTop} r="4" fill="var(--sage-light)" opacity="0.85" />
            <circle cx="45" cy={liquidTop - 1} r="3" fill="var(--sage-light)" opacity="0.75" />
            <circle cx="60" cy={liquidTop} r="4.5" fill="var(--sage-light)" opacity="0.85" />
            <circle cx="72" cy={liquidTop - 1} r="3" fill="var(--sage-light)" opacity="0.65" />
          </g>
        )}
      </g>

      <path d={bowlPath} fill="none" stroke="var(--matcha-deep)" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}
