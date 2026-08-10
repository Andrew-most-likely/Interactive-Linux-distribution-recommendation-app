import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import type { Item } from "../data/items";
import { itemIcons } from "../data/icons";
import { Icon } from "./Icon";

export function DraggableItem({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: item.id });

  const icon = itemIcons[item.id];
  const tint = `${icon.color}1a`; // ~10% opacity tinted badge behind the icon

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <motion.div
        className={`item-card${isDragging ? " dragging" : ""}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3, scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="item-icon-badge" style={{ ["--icon-tint" as string]: tint }}>
          <Icon icon={icon} size={16} />
        </span>
        {item.label}
      </motion.div>
    </div>
  );
}
