import { dimensions, type DimensionId } from "../data/dimensions";
import { distros, type Distro } from "../data/distros";
import { items, type Item } from "../data/items";

export interface Tradeoff {
  itemLabel: string;
  text: string;
}

export interface DistroResult {
  distro: Distro;
  score: number;
  tradeoffs: Tradeoff[];
}

// A distro is "weak" in a dimension relative to what's needed once its
// attribute score sits meaningfully below the item's requirement.
const WEAK_THRESHOLD = 4;
const CARES_THRESHOLD = 6;

export function scoreDistros(pickedItemIds: string[]): DistroResult[] {
  const pickedItems = pickedItemIds
    .map((id) => items.find((i) => i.id === id))
    .filter((i): i is Item => Boolean(i));

  const results: DistroResult[] = distros.map((distro) => {
    let score = 0;
    const tradeoffs: Tradeoff[] = [];

    for (const item of pickedItems) {
      for (const dim of dimensions) {
        const requirement = item.requirements[dim.id];
        if (!requirement) continue;

        const attribute = distro.attributes[dim.id] ?? 5;
        const normalized = (attribute - 5) / 5; // -1 .. 1
        score += requirement * normalized;

        if (requirement >= CARES_THRESHOLD && attribute <= WEAK_THRESHOLD) {
          tradeoffs.push({
            itemLabel: item.label,
            text: dim.lowText
              .replace("{item}", item.label)
              .replace("{distro}", distro.name),
          });
        }
      }
    }

    return { distro, score: Math.round(score * 10) / 10, tradeoffs };
  });

  return results.sort((a, b) => b.score - a.score);
}

export function scoreRange(results: DistroResult[]): number {
  return Math.max(1, ...results.map((r) => Math.abs(r.score)));
}

export type { DimensionId };
