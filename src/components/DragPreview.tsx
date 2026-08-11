import type { Item } from "../data/items";
import { getItemIcon, iconTint } from "../data/icons";
import { Icon } from "./Icon";

// Rendered inside dnd-kit's DragOverlay — the one visual copy that actually
// follows the pointer, so the source card can just sit dimmed in place
// instead of fighting for the same transform.
export function DragPreview({ item }: { item: Item }) {
  const icon = getItemIcon(item.id);
  const isPhoto = icon.kind === "photo";

  return (
    <div className="item-card drag-preview">
      <span
        className={`item-icon-badge${isPhoto ? " has-photo" : ""}`}
        style={{ ["--icon-tint" as string]: iconTint(icon) }}
      >
        <Icon icon={icon} size={isPhoto ? 34 : 16} />
      </span>
      {item.label}
    </div>
  );
}
