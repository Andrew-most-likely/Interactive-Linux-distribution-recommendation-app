import { useDroppable } from "@dnd-kit/core";
import { AnimatePresence, motion } from "framer-motion";
import type { Item } from "../data/items";
import { itemIcons } from "../data/icons";
import { Icon } from "./Icon";

interface DropZoneProps {
  pickedItems: Item[];
  onRemove: (id: string) => void;
}

export function DropZone({ pickedItems, onRemove }: DropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "setup-dropzone" });

  return (
    <div ref={setNodeRef} className={`dropzone${isOver ? " over" : ""}`}>
      {pickedItems.length === 0 && (
        <span className="dropzone-empty">Drag items here to build your setup</span>
      )}
      <AnimatePresence initial={false}>
        {pickedItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="setup-chip"
          >
            <span className="setup-chip-label">
              <Icon icon={itemIcons[item.id]} size={16} />
              {item.label}
            </span>
            <button
              aria-label={`Remove ${item.label}`}
              onClick={() => onRemove(item.id)}
              className="chip-remove"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
