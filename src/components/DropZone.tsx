import { useDroppable } from "@dnd-kit/core";
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
      {pickedItems.map((item) => (
        <div key={item.id} className="setup-chip">
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
        </div>
      ))}
    </div>
  );
}
