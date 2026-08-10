// The hero's signature element: a small mock terminal that shows what the
// product actually does, in the vocabulary its own audience already lives
// in, instead of an abstract illustration or stock hero art.
export function TerminalPreview() {
  const rows = [
    { rank: 1, name: "bazzite", score: 9.2, bars: 10 },
    { rank: 2, name: "cachyos", score: 8.7, bars: 9 },
    { rank: 3, name: "nobara", score: 8.1, bars: 8 },
  ];

  return (
    <div className="terminal">
      <div className="terminal-titlebar">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-titletext">steep — zsh</span>
      </div>
      <div className="terminal-body">
        <p className="terminal-line">
          <span className="terminal-prompt">$</span> steep --match cs2 discord bg3
        </p>
        <p className="terminal-line terminal-muted">scoring 10 distros against 3 picks…</p>
        <div className="terminal-rows">
          {rows.map((r) => (
            <div className="terminal-row" key={r.name}>
              <span className="terminal-rank">{r.rank}</span>
              <span className="terminal-name">{r.name}</span>
              <span className="terminal-bar">
                <span
                  className="terminal-bar-fill"
                  style={{ width: `${(r.bars / 10) * 100}%` }}
                />
              </span>
              <span className="terminal-score">{r.score.toFixed(1)}</span>
            </div>
          ))}
        </div>
        <p className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span className="terminal-cursor" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
