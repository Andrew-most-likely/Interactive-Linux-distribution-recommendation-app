import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Gamepad2, Briefcase, ShieldCheck } from "lucide-react";
import { Pool } from "./components/Pool";
import { DropZone } from "./components/DropZone";
import { ScorePanel } from "./components/ScorePanel";
import { DragPreview } from "./components/DragPreview";
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
  const [activeId, setActiveId] = useState<string | null>(null);

  const pickedItems = useMemo(
    () => pickedIds.map((id) => items.find((i) => i.id === id)!).filter(Boolean),
    [pickedIds],
  );

  const activeItem = useMemo(() => items.find((i) => i.id === activeId) ?? null, [activeId]);

  const results = useMemo(() => scoreDistros(pickedIds), [pickedIds]);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    setActiveId(null);
    if (!over) return;

    if (over.id === "setup-dropzone") {
      setPickedIds((prev) =>
        prev.includes(active.id as string) ? prev : [...prev, active.id as string],
      );
    } else if (over.id === "pool-dropzone") {
      setPickedIds((prev) => prev.filter((id) => id !== active.id));
    }
  }

  function handleRemove(id: string) {
    setPickedIds((prev) => prev.filter((p) => p !== id));
  }

  const poolItems = items.filter((i) => i.category === activeCategory);

  return (
    <div className="page">
      <header className="masthead">
        <div>
          <h1 className="masthead-title">Steep</h1>
          <p className="masthead-sub">
            Drag in what you actually use. Every pick re-scores all ten distros live.
          </p>
        </div>
        <div className="masthead-links">
          <Link to="/distros" className="masthead-link">
            Compatibility guide →
          </Link>
          <span className="masthead-tag">Phase 1 · MVP</span>
        </div>
      </header>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="workspace">
          <div className="picker">
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

            <div className="picker-columns">
              <div>
                <p className="column-label">Available</p>
                <Pool items={poolItems} />
              </div>

              <div>
                <p className="column-label">Your setup</p>
                <DropZone pickedItems={pickedItems} onRemove={handleRemove} />
              </div>
            </div>
          </div>

          <aside className="results-panel">
            <p className="column-label">Live match</p>
            <ScorePanel results={results} />
          </aside>
        </div>

        <DragOverlay zIndex={9999} dropAnimation={null}>
          {activeItem && <DragPreview item={activeItem} />}
        </DragOverlay>
      </DndContext>

      <footer className="footer">
        <p>No login, no tracking, no server — everything above runs in your browser.</p>
      </footer>
    </div>
  );
}
