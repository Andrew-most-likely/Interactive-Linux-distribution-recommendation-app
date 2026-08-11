import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import { MousePointerClick } from "lucide-react";
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
        <div className="dropzone-empty">
          <MousePointerClick size={26} strokeWidth={1.5} />
          <span>Click or drag items here to build your setup</span>
        </div>
      )}
      <SortableContext items={pickedItems.map((i) => i.id)} strategy={verticalListSortingStrategy}>
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
      </SortableContext>
    </div>
  );
}
