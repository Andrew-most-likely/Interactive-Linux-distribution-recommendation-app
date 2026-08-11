import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, GripVertical } from "lucide-react";
import type { Item } from "../data/items";
import { getItemIcon, iconTint } from "../data/icons";
import { Icon } from "./Icon";

interface SetupChipProps {
  item: Item;
  rank: number;
  isFirst: boolean;
  isLast: boolean;
  onRemove: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
}

export function SetupChip({ item, rank, isFirst, isLast, onRemove, onMove }: SetupChipProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`setup-chip${isDragging ? " dragging" : ""}`}
    >
      <span
        className="chip-grip"
        {...listeners}
        {...attributes}
        aria-label={`Drag to reorder ${item.label}`}
      >
        <GripVertical size={14} strokeWidth={2} />
      </span>
      <span className="setup-chip-label">
        <span className="setup-chip-rank" title="Importance rank — higher on the list counts more">
          {rank}
        </span>
        <span
          className="setup-chip-icon"
          style={{ ["--icon-tint" as string]: iconTint(getItemIcon(item.id)) }}
        >
          <Icon icon={getItemIcon(item.id)} size={20} />
        </span>
        {item.label}
      </span>
      <span className="setup-chip-controls">
        <button
          aria-label={`Move ${item.label} up in importance`}
          onClick={() => onMove(item.id, "up")}
          onPointerDown={(e) => e.stopPropagation()}
          disabled={isFirst}
          className="chip-move"
        >
          <ChevronUp size={13} strokeWidth={2.5} />
        </button>
        <button
          aria-label={`Move ${item.label} down in importance`}
          onClick={() => onMove(item.id, "down")}
          onPointerDown={(e) => e.stopPropagation()}
          disabled={isLast}
          className="chip-move"
        >
          <ChevronDown size={13} strokeWidth={2.5} />
        </button>
        <button
          aria-label={`Remove ${item.label}`}
          onClick={() => onRemove(item.id)}
          onPointerDown={(e) => e.stopPropagation()}
          className="chip-remove"
        >
          ×
        </button>
      </span>
    </motion.div>
  );
}
