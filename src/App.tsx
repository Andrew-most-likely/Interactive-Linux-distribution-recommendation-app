import { useMemo, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { DraggableItem } from "./components/DraggableItem";
import { DropZone } from "./components/DropZone";
import { ScorePanel } from "./components/ScorePanel";
import { items, type Category } from "./data/items";
import { scoreDistros } from "./lib/scoring";

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
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }}>
      <header style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "var(--matcha-deep)",
            margin: "0 0 8px",
          }}
        >
          Steep
        </h1>
        <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "15px" }}>
          Drag in what you actually use. Watch your match brew.
        </p>
      </header>

      <nav style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1px solid var(--border)",
              background: activeCategory === cat.id ? "var(--matcha)" : "var(--surface)",
              color: activeCategory === cat.id ? "#fff" : "var(--text)",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <DndContext onDragEnd={handleDragEnd}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          <div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "10px" }}>
              Available
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {poolItems.map((item) => (
                <DraggableItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "10px" }}>
              Your setup
            </p>
            <DropZone pickedItems={pickedItems} onRemove={handleRemove} />
          </div>
        </div>
      </DndContext>

      <section>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>
          Live match
        </p>
        <ScorePanel results={results} />
      </section>
    </div>
  );
}
