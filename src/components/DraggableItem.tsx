import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import type { Item } from "../data/items";
import { getItemIcon, iconTint } from "../data/icons";
import { Icon } from "./Icon";

export function DraggableItem({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: item.id });

  const icon = getItemIcon(item.id);
  const isPhoto = icon.kind === "photo";

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <motion.div
        layout
        className={`item-card${isDragging ? " dragging" : ""}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -3, scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className={`item-icon-badge${isPhoto ? " has-photo" : ""}`}
          style={{ ["--icon-tint" as string]: iconTint(icon) }}
        >
          <Icon icon={icon} size={isPhoto ? 34 : 16} />
        </span>
        {item.label}
      </motion.div>
    </div>
  );
}
