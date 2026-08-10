import { useMemo, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Gamepad2, Briefcase, ShieldCheck } from "lucide-react";
import { DraggableItem } from "./components/DraggableItem";
import { DropZone } from "./components/DropZone";
import { ScorePanel } from "./components/ScorePanel";
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
      <header className="masthead">
        <div>
          <h1 className="masthead-title">Steep</h1>
          <p className="masthead-sub">
            Drag in what you actually use. Every pick re-scores all ten distros live.
          </p>
        </div>
        <span className="masthead-tag">Phase 1 · MVP</span>
      </header>

      <DndContext onDragEnd={handleDragEnd}>
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
          </div>

          <aside className="results-panel">
            <p className="column-label">Live match</p>
            <ScorePanel results={results} />
          </aside>
        </div>
      </DndContext>

      <footer className="footer">
        <p>No login, no tracking, no server — everything above runs in your browser.</p>
      </footer>
    </div>
  );
}
