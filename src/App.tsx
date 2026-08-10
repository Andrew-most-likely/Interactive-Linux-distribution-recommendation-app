import { useMemo, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { DraggableItem } from "./components/DraggableItem";
import { DropZone } from "./components/DropZone";
import { ScorePanel } from "./components/ScorePanel";
import { items, type Category } from "./data/items";
import { scoreDistros } from "./lib/scoring";
import "./App.css";

const categories: { id: Category; label: string }[] = [
  { id: "games", label: "Games" },
  { id: "work", label: "Work" },
  { id: "security", label: "Security" },
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
        <span className="hero-eyebrow">Phase 1 · MVP</span>
        <h1 className="hero-title">Steep</h1>
        <p className="hero-sub">Drag in what you actually use. Watch your match brew.</p>
      </header>

      <nav className="tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`tab${activeCategory === cat.id ? " active" : ""}`}
          >
            {cat.label}
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
    </div>
  );
}
