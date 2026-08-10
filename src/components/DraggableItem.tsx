import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Item } from "../data/items";
import { itemIcons } from "../data/icons";
import { Icon } from "./Icon";

export function DraggableItem({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: item.id });

  const icon = itemIcons[item.id];
  const tint = `${icon.color}1a`; // ~10% opacity tinted badge behind the icon

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`item-card${isDragging ? " dragging" : ""}`}
      style={{ transform: CSS.Translate.toString(transform) }}
    >
      <span className="item-icon-badge" style={{ ["--icon-tint" as string]: tint }}>
        <Icon icon={icon} size={16} />
      </span>
      {item.label}
    </div>
  );
}
