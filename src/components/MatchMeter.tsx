interface MatchMeterProps {
  percentage: number; // 0-100, clamped by caller
}

// A terminal-style horizontal meter, standing in for a generic progress bar
// or gauge — reads like a status line rather than decoration.
export function MatchMeter({ percentage }: MatchMeterProps) {
  const clamped = Math.max(0, Math.min(100, percentage));

  return (
    <div className="match-meter" aria-hidden="true">
      <div className="match-meter-track">
        <div className="match-meter-fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
