import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { Gamepad2, Briefcase, Globe, ShieldCheck, MessageCircle } from "lucide-react";
import { Pool } from "./components/Pool";
import { DropZone } from "./components/DropZone";
import { ScorePanel } from "./components/ScorePanel";
import { DragPreview } from "./components/DragPreview";
import { HardwareSelect } from "./components/HardwareSelect";
import { FooterLinks } from "./components/FooterLinks";
import { SponsorAds } from "./components/SponsorAd";
import { items, type Category, type Item } from "./data/items";
import { Plus } from "lucide-react";
import type { GpuVendor, FormFactor } from "./data/hardware";
import { scoreDistros } from "./lib/scoring";
import "./App.css";

const categories: { id: Category; label: string; Icon: typeof Gamepad2 }[] = [
  { id: "games", label: "Games", Icon: Gamepad2 },
  { id: "work", label: "Work", Icon: Briefcase },
  { id: "browsers", label: "Browsers", Icon: Globe },
  { id: "security", label: "Security", Icon: ShieldCheck },
  { id: "communication", label: "Communication", Icon: MessageCircle },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("games");
  const [pickedIds, setPickedIds] = useState<string[]>([]);
  const [customItems, setCustomItems] = useState<Item[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [gpuVendor, setGpuVendor] = useState<GpuVendor | null>(null);
  const [formFactor, setFormFactor] = useState<FormFactor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Curated items plus anything typed in through search that wasn't in the
  // list. Custom items get empty requirements (no scoring effect either
  // way) since we have no real way to verify Linux support for arbitrary
  // free-text without a backend — see SetupChip's "unverified" tag.
  const allItems = useMemo(() => [...items, ...customItems], [customItems]);

  const pickedItems = useMemo(
    () => pickedIds.map((id) => allItems.find((i) => i.id === id)!).filter(Boolean),
    [pickedIds, allItems],
  );

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<Category, number>> = {};
    for (const item of pickedItems) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    return counts;
  }, [pickedItems]);

  // These don't run on Linux at all, on any distro, no matter how it's
  // configured, kernel-level anti-cheat refuses to start. Surfaced up
  // front so it isn't something you have to notice distro-by-distro.
  const blockedItems = useMemo(
    () => pickedItems.filter((i) => i.linuxSupport === "anticheat-blocked"),
    [pickedItems],
  );

  const activeItem = useMemo(() => allItems.find((i) => i.id === activeId) ?? null, [activeId, allItems]);

  const results = useMemo(
    () => scoreDistros(pickedIds, customItems, gpuVendor, formFactor),
    [pickedIds, customItems, gpuVendor, formFactor],
  );

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
      // pool item: picked items never appear in the pool, so an id can't
      // be ambiguous between the two.
      const overIsSetup = overId === "setup-dropzone" || prev.includes(overId);

      if (isSetupItem) {
        if (overIsSetup) {
          const oldIndex = prev.indexOf(activeId);
          const newIndex = overId === "setup-dropzone" ? prev.length - 1 : prev.indexOf(overId);
          if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return prev;
          return arrayMove(prev, oldIndex, newIndex);
        }
        // dropped back onto the pool: remove it
        return prev.filter((id) => id !== activeId);
      }

      // dragging a fresh pool item: add it if dropped anywhere in setup
      if (overIsSetup) {
        return prev.includes(activeId) ? prev : [...prev, activeId];
      }
      return prev;
    });
  }

  function handleAdd(id: string) {
    setPickedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function handleAddCustom(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    const id = `custom-${activeCategory}-${trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    const customItem: Item = { id, label: trimmed, category: activeCategory, requirements: {}, custom: true };
    setCustomItems((prev) => [...prev, customItem]);
    setPickedIds((prev) => [...prev, id]);
    setSearchQuery("");
  }

  function handleRemove(id: string) {
    setPickedIds((prev) => prev.filter((p) => p !== id));
  }

  function handleClearAll() {
    setPickedIds([]);
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

  const poolItems = allItems.filter(
    (i) =>
      i.category === activeCategory &&
      !pickedIds.includes(i.id) &&
      i.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  return (
    <div className="page">
      <header className="masthead">
        <div className="masthead-content">
          <h1 className="masthead-title">
            ARL<span className="masthead-mark-dot">.</span>
            <span className="masthead-tagline">Always Recommend Linux</span>
          </h1>
        </div>
        <div className="masthead-links">
          <Link to="/distros" className="masthead-link">
            Compatibility guide →
          </Link>
        </div>
      </header>

      <div className="controls-row">
        <HardwareSelect
          gpuVendor={gpuVendor}
          onGpuChange={setGpuVendor}
          formFactor={formFactor}
          onFormFactorChange={setFormFactor}
        />
        <div className="control-group">
          <span className="control-group-label">Category</span>
          <nav className="tabs">
            {categories.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveCategory(id);
                  setSearchQuery("");
                }}
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
                  {!!categoryCounts[id] && <span className="tab-count">{categoryCounts[id]}</span>}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <SponsorAds />
      </div>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="workspace">
          <div className="picker">
            <div className="picker-columns">
              <div className="picker-column">
                <div className="column-header">
                  <p className="column-label">Available</p>
                  <input
                    type="text"
                    className="search-input"
                    aria-label={`Search ${categories.find((c) => c.id === activeCategory)?.label.toLowerCase()}`}
                    placeholder={`Search ${categories.find((c) => c.id === activeCategory)?.label.toLowerCase()}…`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {poolItems.length === 0 && searchQuery.trim() && (
                  <button
                    type="button"
                    className="add-custom-btn"
                    onClick={() => handleAddCustom(searchQuery)}
                  >
                    <Plus size={15} strokeWidth={2.5} />
                    Add "{searchQuery.trim()}" (unverified Linux support)
                  </button>
                )}
                <Pool items={poolItems} onAdd={handleAdd} />
              </div>

              <div className="picker-column">
                <div className="column-header">
                  <div className="column-label-row">
                    <p className="column-label">Your setup</p>
                    {pickedItems.length > 0 && (
                      <button type="button" className="clear-all-btn" onClick={handleClearAll}>
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
                <DropZone pickedItems={pickedItems} onRemove={handleRemove} onMove={handleMove} />
              </div>
            </div>
          </div>

          <aside className="results-panel">
            <div className="column-header">
              <p className="column-label">Live match</p>
            </div>
            {blockedItems.length > 0 && (
              <p className="blocked-banner">
                {blockedItems.map((i) => i.label).join(", ")}{" "}
                {blockedItems.length === 1 ? "doesn't" : "don't"} run on Linux at all, kernel-level
                anti-cheat blocks it on every distro below, not just some.
              </p>
            )}
            <ScorePanel results={results} pickedItems={pickedItems} />
          </aside>
        </div>

        <DragOverlay zIndex={9999} dropAnimation={null}>
          {activeItem && <DragPreview item={activeItem} />}
        </DragOverlay>
      </DndContext>

      <footer className="footer">
        <FooterLinks />
      </footer>
    </div>
  );
}
