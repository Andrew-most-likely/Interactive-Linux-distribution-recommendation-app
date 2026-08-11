import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Item } from "../data/items";
import { getItemIcon, iconTint } from "../data/icons";
import { Icon } from "./Icon";

interface DraggableItemProps {
  item: Item;
  onAdd: (id: string) => void;
}

export function DraggableItem({ item, onAdd }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: item.id });

  const icon = getItemIcon(item.id);
  const isPhoto = icon.kind === "photo";

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} onClick={() => onAdd(item.id)}>
      <motion.div
        layout
        className={`item-card${isDragging ? " dragging" : ""}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -4, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Plus className="item-add-hint" size={13} strokeWidth={2.5} aria-hidden="true" />
        <span
          className={`item-icon-badge${isPhoto ? " has-photo" : ""}`}
          style={{ ["--icon-tint" as string]: iconTint(icon) }}
        >
          <Icon icon={icon} size={isPhoto ? 40 : 22} />
        </span>
        <span className="item-card-label">{item.label}</span>
      </motion.div>
    </div>
  );
}
