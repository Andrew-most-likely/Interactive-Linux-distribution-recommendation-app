import type { Item } from "../data/items";
import { itemIcons } from "../data/icons";
import { Icon } from "./Icon";

// Rendered inside dnd-kit's DragOverlay — the one visual copy that actually
// follows the pointer, so the source card can just sit dimmed in place
// instead of fighting for the same transform.
export function DragPreview({ item }: { item: Item }) {
  const icon = itemIcons[item.id];
  const tint = `${icon.color}1a`;

  return (
    <div className="item-card drag-preview">
      <span className="item-icon-badge" style={{ ["--icon-tint" as string]: tint }}>
        <Icon icon={icon} size={16} />
      </span>
      {item.label}
    </div>
  );
}
