import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import type { Item } from "../data/items";
import { itemIcons } from "../data/icons";
import { Icon } from "./Icon";

interface SetupChipProps {
  item: Item;
  onRemove: (id: string) => void;
}

export function SetupChip({ item, onRemove }: SetupChipProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`setup-chip${isDragging ? " dragging" : ""}`}
    >
      <span className="setup-chip-label">
        <Icon icon={itemIcons[item.id]} size={16} />
        {item.label}
      </span>
      <button
        aria-label={`Remove ${item.label}`}
        onClick={() => onRemove(item.id)}
        onPointerDown={(e) => e.stopPropagation()}
        className="chip-remove"
      >
        ×
      </button>
    </motion.div>
  );
}
