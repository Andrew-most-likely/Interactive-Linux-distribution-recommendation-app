import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { Gamepad2, Briefcase, ShieldCheck, MessageCircle } from "lucide-react";
import { Pool } from "./components/Pool";
import { DropZone } from "./components/DropZone";
import { ScorePanel } from "./components/ScorePanel";
import { DragPreview } from "./components/DragPreview";
import { HardwareSelect } from "./components/HardwareSelect";
import { items, type Category } from "./data/items";
import { distros } from "./data/distros";
import type { GpuVendor } from "./data/hardware";
import { scoreDistros } from "./lib/scoring";
import "./App.css";

const categories: { id: Category; label: string; Icon: typeof Gamepad2 }[] = [
  { id: "games", label: "Games", Icon: Gamepad2 },
  { id: "work", label: "Work", Icon: Briefcase },
  { id: "security", label: "Security", Icon: ShieldCheck },
  { id: "communication", label: "Communication", Icon: MessageCircle },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("games");
  const [pickedIds, setPickedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [gpuVendor, setGpuVendor] = useState<GpuVendor | null>(null);

  const pickedItems = useMemo(
    () => pickedIds.map((id) => items.find((i) => i.id === id)!).filter(Boolean),
    [pickedIds],
  );

  const activeItem = useMemo(() => items.find((i) => i.id === activeId) ?? null, [activeId]);

  const results = useMemo(() => scoreDistros(pickedIds, gpuVendor), [pickedIds, gpuVendor]);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    setActiveId(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    setPickedIds((prev) => {
      const isSetupItem = prev.includes(activeId);
      // "setup" if dropped on the container itself or on an existing setup
      // chip; "pool" if dropped on the pool container or a still-available
      // pool item — picked items never appear in the pool, so an id can't
      // be ambiguous between the two.
      const overIsSetup = overId === "setup-dropzone" || prev.includes(overId);

      if (isSetupItem) {
        if (overIsSetup) {
          const oldIndex = prev.indexOf(activeId);
          const newIndex = overId === "setup-dropzone" ? prev.length - 1 : prev.indexOf(overId);
          if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return prev;
          return arrayMove(prev, oldIndex, newIndex);
        }
        // dropped back onto the pool — remove it
        return prev.filter((id) => id !== activeId);
      }

      // dragging a fresh pool item — add it if dropped anywhere in setup
      if (overIsSetup) {
        return prev.includes(activeId) ? prev : [...prev, activeId];
      }
      return prev;
    });
  }

  function handleAdd(id: string) {
    setPickedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function handleRemove(id: string) {
    setPickedIds((prev) => prev.filter((p) => p !== id));
  }

  function handleMove(id: string, direction: "up" | "down") {
    setPickedIds((prev) => {
      const index = prev.indexOf(id);
      const target = direction === "up" ? index - 1 : index + 1;
      if (index === -1 || target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  const poolItems = items.filter(
    (i) => i.category === activeCategory && !pickedIds.includes(i.id),
  );

  return (
    <div className="page">
      <header className="masthead">
        <div className="masthead-content">
          <h1 className="masthead-title">Steep</h1>
          <p className="masthead-sub">
            Drag in what you actually use. Every pick re-scores all {distros.length} distros live.
          </p>
        </div>
        <div className="masthead-links">
          <Link to="/distros" className="masthead-link">
            Compatibility guide →
          </Link>
          <span className="masthead-tag">Phase 1 · MVP</span>
        </div>
      </header>

      <HardwareSelect value={gpuVendor} onChange={setGpuVendor} />

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
                <p className="column-label">Available — click or drag to add</p>
                <Pool items={poolItems} onAdd={handleAdd} />
              </div>

              <div>
                <p className="column-label">Your setup</p>
                <DropZone pickedItems={pickedItems} onRemove={handleRemove} onMove={handleMove} />
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
