import type { UIEvent } from "react";
import { useDroppable } from "@dnd-kit/core";
import { AnimatePresence } from "framer-motion";
import type { Item } from "../data/items";
import { DraggableItem } from "./DraggableItem";

interface PoolProps {
  items: Item[];
  onAdd: (id: string) => void;
  onScroll?: (e: UIEvent<HTMLDivElement>) => void;
}

export function Pool({ items, onAdd, onScroll }: PoolProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "pool-dropzone" });

  return (
    <div ref={setNodeRef} className={`item-list${isOver ? " over" : ""}`} onScroll={onScroll}>
      <AnimatePresence initial={false} mode="popLayout">
        {items.map((item) => (
          <DraggableItem key={item.id} item={item} onAdd={onAdd} />
        ))}
      </AnimatePresence>
    </div>
  );
}
