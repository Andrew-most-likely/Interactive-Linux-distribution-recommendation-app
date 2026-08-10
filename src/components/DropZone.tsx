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
    <div
      ref={setNodeRef}
      style={{
        minHeight: "160px",
        padding: "16px",
        background: isOver ? "var(--sage-light)" : "var(--bg)",
        border: `2px dashed ${isOver ? "var(--matcha)" : "var(--sage)"}`,
        borderRadius: "var(--radius-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
    >
      {pickedItems.length === 0 && (
        <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          Drag items here to build your setup
        </span>
      )}
      {pickedItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 12px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            fontSize: "13px",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Icon icon={itemIcons[item.id]} size={16} />
            {item.label}
          </span>
          <button
            aria-label={`Remove ${item.label}`}
            onClick={() => onRemove(item.id)}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: "14px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
