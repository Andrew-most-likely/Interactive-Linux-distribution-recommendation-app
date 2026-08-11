import { Link } from "react-router-dom";
import { distros } from "./data/distros";
import { compatibilityNotes } from "./data/compatibility";
import { distroIcons } from "./data/icons";
import { Icon } from "./components/Icon";
import "./App.css";

export function CompatibilityPage() {
  return (
    <div className="page">
      <header className="masthead">
        <div>
          <Link to="/" className="compat-back-link">
            ← Back to Steep
          </Link>
          <h1 className="masthead-title">Compatibility</h1>
          <p className="masthead-sub">
            What each distro actually ships with, where drivers come from, and the tradeoffs
            worth knowing before you install, not a scientific benchmark, just an honest
            starting reference.
          </p>
        </div>
      </header>

      <div className="compat-list">
        {distros.map((distro) => {
          const note = compatibilityNotes.find((n) => n.distroId === distro.id);
          if (!note) return null;

          return (
            <article key={distro.id} className="compat-card">
              <div className="compat-card-header">
                <Icon icon={distroIcons[distro.id]} size={22} />
                <div>
                  <h2 className="compat-card-title">
                    <a href={distro.website} target="_blank" rel="noopener noreferrer">
                      {distro.name}
                    </a>
                  </h2>
                  <p className="compat-card-base">{note.base}</p>
                </div>
              </div>

              <p className="compat-card-nvidia">
                <span className="compat-label">NVIDIA / drivers</span>
                {note.nvidia}
              </p>

              <div className="compat-card-columns">
                <div>
                  <p className="compat-label">Strengths</p>
                  <ul className="compat-list-items strengths">
                    {note.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="compat-label">Worth knowing</p>
                  <ul className="compat-list-items caveats">
                    {note.caveats.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <footer className="footer">
        <p>General guidance, not live-sourced data. Always check a distro's own release notes.</p>
      </footer>
    </div>
  );
}
