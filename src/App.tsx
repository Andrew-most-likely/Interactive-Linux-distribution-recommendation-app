import { useMemo, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Gamepad2, Briefcase, ShieldCheck } from "lucide-react";
import { DraggableItem } from "./components/DraggableItem";
import { DropZone } from "./components/DropZone";
import { ScorePanel } from "./components/ScorePanel";
import { TerminalPreview } from "./components/TerminalPreview";
import { items, type Category } from "./data/items";
import { scoreDistros } from "./lib/scoring";
import "./App.css";

const categories: { id: Category; label: string; Icon: typeof Gamepad2 }[] = [
  { id: "games", label: "Games", Icon: Gamepad2 },
  { id: "work", label: "Work", Icon: Briefcase },
  { id: "security", label: "Security", Icon: ShieldCheck },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("games");
  const [pickedIds, setPickedIds] = useState<string[]>([]);

  const pickedItems = useMemo(
    () => pickedIds.map((id) => items.find((i) => i.id === id)!).filter(Boolean),
    [pickedIds],
  );

  const results = useMemo(() => scoreDistros(pickedIds), [pickedIds]);

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (over?.id === "setup-dropzone") {
      setPickedIds((prev) =>
        prev.includes(active.id as string) ? prev : [...prev, active.id as string],
      );
    }
  }

  function handleRemove(id: string) {
    setPickedIds((prev) => prev.filter((p) => p !== id));
  }

  const poolItems = items.filter((i) => i.category === activeCategory);

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-copy">
          <span className="hero-eyebrow">$ phase-1 --mvp</span>
          <h1 className="hero-title">Steep</h1>
          <p className="hero-sub">
            Drag in the games, tools, and habits you actually run. Skip the survey — every pick
            re-scores all ten distros live, with the tradeoffs shown, not hidden.
          </p>
        </div>
        <TerminalPreview />
      </header>

      <nav className="tabs">
        {categories.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className={`tab${activeCategory === id ? " active" : ""}`}
          >
            {activeCategory === id && (
              <motion.span
                layoutId="tab-active-pill"
                className="tab-active-pill"
                transition={{ type: "spring", stiffness: 500, damping: 34 }}
              />
            )}
            <span className="tab-content">
              <Icon size={15} strokeWidth={2.25} />
              {label}
            </span>
          </button>
        ))}
      </nav>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="columns">
          <div>
            <p className="column-label">Available</p>
            <div className="item-list">
              {poolItems.map((item) => (
                <DraggableItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div>
            <p className="column-label">Your setup</p>
            <DropZone pickedItems={pickedItems} onRemove={handleRemove} />
          </div>
        </div>
      </DndContext>

      <section className="results-section">
        <p className="column-label">Live match</p>
        <ScorePanel results={results} />
      </section>

      <footer className="footer">
        <span className="footer-prompt">$</span>
        <p>No login, no tracking, no server — everything above runs in your browser.</p>
      </footer>
    </div>
  );
}
