import { useEffect, useMemo, useRef, useState, type UIEvent } from "react";
import { Link } from "react-router-dom";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { Gamepad2, Briefcase, Globe, ShieldCheck, MessageCircle, HelpCircle } from "lucide-react";
import { Pool } from "./components/Pool";
import { DropZone } from "./components/DropZone";
import { ScorePanel } from "./components/ScorePanel";
import { DragPreview } from "./components/DragPreview";
import { HardwareSelect } from "./components/HardwareSelect";
import { FooterLinks } from "./components/FooterLinks";
import { SponsorAds } from "./components/SponsorAd";
import { Tour } from "./components/Tour";
import { items, type Category } from "./data/items";
import type { GpuVendor, FormFactor } from "./data/hardware";
import { scoreDistros } from "./lib/scoring";
import "./App.css";

const categories: { id: Category; label: string; shortLabel?: string; Icon: typeof Gamepad2 }[] = [
  { id: "games", label: "Games", Icon: Gamepad2 },
  { id: "work", label: "Work", Icon: Briefcase },
  { id: "browsers", label: "Browsers", Icon: Globe },
  { id: "security", label: "Security", Icon: ShieldCheck },
  { id: "communication", label: "Communication", shortLabel: "Comms", Icon: MessageCircle },
];

const shrinkableCategories = categories.filter((c) => c.shortLabel);
// Large enough that a page of items reliably overflows the grid's
// max-height and produces a scrollbar; otherwise there's nothing to
// scroll and the rest of a category can never be reached.
const POOL_PAGE_SIZE = 15;

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("games");
  const [pickedIds, setPickedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [gpuVendor, setGpuVendor] = useState<GpuVendor | null>(null);
  const [formFactor, setFormFactor] = useState<FormFactor | null>(null);
  const [poolVisibleCount, setPoolVisibleCount] = useState(POOL_PAGE_SIZE);
  const [abbreviated, setAbbreviated] = useState<Set<Category>>(new Set());
  const categoryTabsRef = useRef<HTMLElement>(null);
  const labelRefs = useRef<Partial<Record<Category, HTMLSpanElement | null>>>({});
  const probeRefs = useRef<Partial<Record<Category, HTMLSpanElement | null>>>({});

  const pickedItems = useMemo(
    () => pickedIds.map((id) => items.find((i) => i.id === id)!).filter(Boolean),
    [pickedIds],
  );

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<Category, number>> = {};
    for (const item of pickedItems) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    return counts;
  }, [pickedItems]);

  // Swap a category's label for its short form only once its tab has
  // actually shrunk too far to hold the full word, measured against a
  // same-font, unclipped probe span rather than a guessed pixel breakpoint,
  // so it tracks real font metrics and layout (sponsor ad toggling, hardware
  // filters, viewport width) instead of drifting out of sync with any of them.
  useEffect(() => {
    if (shrinkableCategories.length === 0) return;

    const check = () => {
      setAbbreviated((prev) => {
        const next = new Set<Category>();
        for (const { id } of shrinkableCategories) {
          const label = labelRefs.current[id];
          const probe = probeRefs.current[id];
          if (label && probe && probe.scrollWidth > label.clientWidth) {
            next.add(id);
          }
        }
        if (next.size === prev.size && [...next].every((id) => prev.has(id))) return prev;
        return next;
      });
    };

    check();
    const nav = categoryTabsRef.current;
    const ro = new ResizeObserver(check);
    if (nav) ro.observe(nav);
    return () => ro.disconnect();
  }, [categoryCounts]);

  // These don't run on Linux at all, on any distro, no matter how it's
  // configured, kernel-level anti-cheat refuses to start. Surfaced up
  // front so it isn't something you have to notice distro-by-distro.
  const blockedItems = useMemo(
    () => pickedItems.filter((i) => i.linuxSupport === "anticheat-blocked"),
    [pickedItems],
  );

  const activeItem = useMemo(() => items.find((i) => i.id === activeId) ?? null, [activeId]);

  const results = useMemo(
    () => scoreDistros(pickedIds, [], gpuVendor, formFactor),
    [pickedIds, gpuVendor, formFactor],
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

  const poolItemsAll = items.filter((i) => i.category === activeCategory && !pickedIds.includes(i.id));
  const poolItems = poolItemsAll.slice(0, poolVisibleCount);

  // A different category resets which page we're on; switching categories
  // is a new list, not a continuation of the old scroll position.
  useEffect(() => {
    setPoolVisibleCount(POOL_PAGE_SIZE);
  }, [activeCategory]);

  function handlePoolScroll(e: UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight < el.scrollHeight - 120) return;
    setPoolVisibleCount((prev) => Math.min(prev + POOL_PAGE_SIZE, poolItemsAll.length));
  }

  return (
    <div className="page">
      <header className="masthead" data-tour="masthead">
        <div className="masthead-content">
          <h1 className="masthead-title">
            ARL<span className="masthead-mark-dot">.</span>
            <span className="masthead-tagline">Always Recommend Linux</span>
          </h1>
        </div>
        <div className="masthead-links">
          <button
            type="button"
            className="masthead-help"
            aria-label="Replay tour"
            title="Replay tour"
            onClick={() => window.dispatchEvent(new Event("arl:start-tour"))}
          >
            <HelpCircle size={16} strokeWidth={2} />
          </button>
          <Link to="/distros" className="masthead-link">
            Compatibility guide →
          </Link>
        </div>
      </header>

      <div className="controls-row" data-tour="controls">
        <HardwareSelect
          gpuVendor={gpuVendor}
          onGpuChange={setGpuVendor}
          formFactor={formFactor}
          onFormFactorChange={setFormFactor}
        />
        <div className="control-group category-group">
          <span className="control-group-label">Category</span>
          <nav className="tabs category-tabs" ref={categoryTabsRef}>
            {categories.map(({ id, label, shortLabel, Icon }) => (
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
                  <span
                    className="tab-label"
                    ref={(el) => {
                      labelRefs.current[id] = el;
                    }}
                  >
                    {shortLabel && abbreviated.has(id) ? shortLabel : label}
                  </span>
                  {!!categoryCounts[id] && <span className="tab-count">{categoryCounts[id]}</span>}
                  {shortLabel && (
                    <span
                      className="tab-label-probe"
                      aria-hidden="true"
                      ref={(el) => {
                        probeRefs.current[id] = el;
                      }}
                    >
                      {label}
                    </span>
                  )}
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
              <div className="picker-column" data-tour="available">
                <div className="column-header">
                  <p className="column-label">Available</p>
                </div>
                <Pool items={poolItems} onAdd={handleAdd} onScroll={handlePoolScroll} />
              </div>

              <div className="picker-column" data-tour="setup">
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

          <aside className="results-panel" data-tour="results">
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

      <Tour />
    </div>
  );
}
