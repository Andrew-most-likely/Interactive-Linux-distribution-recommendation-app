import { useDroppable } from "@dnd-kit/core";
import { AnimatePresence } from "framer-motion";
import type { Item } from "../data/items";
import { SetupChip } from "./SetupChip";

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
          <SetupChip key={item.id} item={item} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}
