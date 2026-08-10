import { motion } from "framer-motion";
import { MatchMeter } from "./MatchMeter";
import { scoreRange, type DistroResult } from "../lib/scoring";
import { distroIcons } from "../data/icons";
import { Icon } from "./Icon";

export function ScorePanel({ results }: { results: DistroResult[] }) {
  const range = scoreRange(results);
  const hasSignal = results.some((r) => r.score !== 0);

  return (
    <div className="results-list">
      {results.map((result, i) => {
        const percentage = 50 + (result.score / (range * 2)) * 50;
        const isBest = hasSignal && i === 0;

        return (
          <motion.div
            key={result.distro.id}
            layout
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className={`result-card${isBest ? " best" : ""}`}
          >
            <span className="result-rank">{String(i + 1).padStart(2, "0")}</span>
            <div className="result-body">
              <div className="result-top-row">
                <span className="result-name">
                  <Icon icon={distroIcons[result.distro.id]} />
                  {result.distro.name}
                  {isBest && <span className="best-badge">best match</span>}
                </span>
                <span className="result-score">{result.score.toFixed(1)}</span>
              </div>
              <MatchMeter percentage={percentage} />
              {result.tradeoffs.map((t, ti) => (
                <p key={ti} className="tradeoff">
                  {t.text}
                </p>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
