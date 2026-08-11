import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Copy, Check, Terminal, ClipboardCopy } from "lucide-react";
import { MatchMeter } from "./MatchMeter";
import { scoreRange, ratingOutOf10, type DistroResult } from "../lib/scoring";
import { resolveInstall } from "../lib/installGuide";
import { distroIcons } from "../data/icons";
import { Icon } from "./Icon";
import type { Item } from "../data/items";

const VISIBLE_DEFAULT = 5;

function CopyableCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button type="button" className="install-command" onClick={handleCopy} title="Copy command">
      <code>{command}</code>
      {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} strokeWidth={2} />}
    </button>
  );
}

function CopyAllButton({ rows }: { rows: { item: Item; resolved: ReturnType<typeof resolveInstall> }[] }) {
  const [copied, setCopied] = useState(false);
  const commandRows = rows.filter((r) => r.resolved.command);
  if (commandRows.length === 0) return null;

  async function handleCopyAll() {
    const script = commandRows.map(({ item, resolved }) => `# ${item.label}\n${resolved.command}`).join("\n");
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button type="button" className="install-copy-all" onClick={handleCopyAll}>
      {copied ? <Check size={12} strokeWidth={2.5} /> : <ClipboardCopy size={12} strokeWidth={2} />}
      {copied ? "Copied script" : `Copy all ${commandRows.length} command${commandRows.length === 1 ? "" : "s"}`}
    </button>
  );
}

function InstallChecklist({ items, packageManager }: { items: Item[]; packageManager: DistroResult["distro"]["packageManager"] }) {
  const rows = items
    .map((item) => ({ item, resolved: resolveInstall(item, packageManager) }))
    .filter(({ resolved }) => resolved.command || resolved.note);

  if (rows.length === 0) return null;

  return (
    <div className="install-checklist">
      <CopyAllButton rows={rows} />
      {rows.map(({ item, resolved }) => (
        <div key={item.id} className="install-row">
          <span className="install-row-label">{item.label}</span>
          {resolved.command && <CopyableCommand command={resolved.command} />}
          {resolved.note && <p className="install-row-note">{resolved.note}</p>}
        </div>
      ))}
    </div>
  );
}

export function ScorePanel({ results, pickedItems }: { results: DistroResult[]; pickedItems: Item[] }) {
  const [showAll, setShowAll] = useState(false);
  const [openInstallId, setOpenInstallId] = useState<string | null>(null);
  const range = scoreRange(results);
  const hasSignal = results.some((r) => r.score !== 0);
  const visible = showAll ? results : results.slice(0, VISIBLE_DEFAULT);
  const hiddenCount = results.length - VISIBLE_DEFAULT;

  return (
    <div className="results-list">
      {visible.map((result, i) => {
        const percentage = 50 + (result.score / (range * 2)) * 50;
        const isIncompatible = result.incompatibleItems.length > 0;
        const isBest = hasSignal && i === 0 && !isIncompatible;
        const installOpen = openInstallId === result.distro.id;

        return (
          <motion.div
            key={result.distro.id}
            layout
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className={`result-card${isBest ? " best" : ""}${isIncompatible ? " incompatible" : ""}`}
          >
            <span className="result-rank">{String(i + 1).padStart(2, "0")}</span>
            <div className="result-body">
              <div className="result-top-row">
                <span className="result-name">
                  <a
                    href={result.distro.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="result-name-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon icon={distroIcons[result.distro.id]} size={24} />
                    {result.distro.name}
                  </a>
                  {isBest && <span className="best-badge">best match</span>}
                  {isIncompatible && <span className="incompatible-badge">won't run everything</span>}
                </span>
                <span className="result-score">{ratingOutOf10(result.score, results).toFixed(1)}</span>
              </div>
              <MatchMeter percentage={percentage} />
              <p className="distro-blurb">{result.distro.blurb}</p>
              {isIncompatible && (
                <p className="incompatible-note">
                  Won't run: {result.incompatibleItems.join(", ")}
                </p>
              )}
              {result.tradeoffs.map((t, ti) => (
                <p key={ti} className="tradeoff">
                  {t.text}
                </p>
              ))}
              {pickedItems.length > 0 && (
                <>
                  <button
                    type="button"
                    className="install-toggle"
                    onClick={() => setOpenInstallId(installOpen ? null : result.distro.id)}
                  >
                    <Terminal size={12} strokeWidth={2.25} />
                    Install commands
                    <ChevronDown size={13} strokeWidth={2.25} className={`install-chevron${installOpen ? " open" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {installOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <InstallChecklist items={pickedItems} packageManager={result.distro.packageManager} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.div>
        );
      })}
      {hiddenCount > 0 && (
        <button type="button" className="results-toggle" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show fewer" : `Show ${hiddenCount} more distro${hiddenCount === 1 ? "" : "s"}`}
        </button>
      )}
    </div>
  );
}
