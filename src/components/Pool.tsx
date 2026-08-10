import { useDroppable } from "@dnd-kit/core";
import type { Item } from "../data/items";
import { DraggableItem } from "./DraggableItem";

export function Pool({ items }: { items: Item[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: "pool-dropzone" });

  return (
    <div ref={setNodeRef} className={`item-list${isOver ? " over" : ""}`}>
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </div>
  );
}
