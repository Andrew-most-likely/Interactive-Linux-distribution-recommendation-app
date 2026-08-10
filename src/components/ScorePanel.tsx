import { MatchaBowl } from "./MatchaBowl";
import { scoreRange, type DistroResult } from "../lib/scoring";
import { distroIcons } from "../data/icons";
import { Icon } from "./Icon";

export function ScorePanel({ results }: { results: DistroResult[] }) {
  const range = scoreRange(results);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {results.map((result) => {
        const percentage = 50 + (result.score / (range * 2)) * 50;
        return (
          <div key={result.distro.id} style={{ display: "flex", gap: "14px" }}>
            <MatchaBowl id={result.distro.id} percentage={percentage} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 500 }}>
                  <Icon icon={distroIcons[result.distro.id]} />
                  {result.distro.name}
                </span>
                <span style={{ color: "var(--text-muted)" }}>{result.score}</span>
              </div>
              {result.tradeoffs.map((t, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    margin: "2px 0 0",
                  }}
                >
                  {t.text}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
