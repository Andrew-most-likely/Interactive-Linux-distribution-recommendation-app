import { useDroppable } from "@dnd-kit/core";
import { AnimatePresence } from "framer-motion";
import type { Item } from "../data/items";
import { SetupChip } from "./SetupChip";

interface DropZoneProps {
  pickedItems: Item[];
  onRemove: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
}

export function DropZone({ pickedItems, onRemove, onMove }: DropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "setup-dropzone" });

  return (
    <div ref={setNodeRef} className={`dropzone${isOver ? " over" : ""}`}>
      {pickedItems.length === 0 && (
        <span className="dropzone-empty">Click or drag items here to build your setup</span>
      )}
      <AnimatePresence initial={false}>
        {pickedItems.map((item, index) => (
          <SetupChip
            key={item.id}
            item={item}
            rank={index + 1}
            isFirst={index === 0}
            isLast={index === pickedItems.length - 1}
            onRemove={onRemove}
            onMove={onMove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
