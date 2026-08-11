import { dimensions, type DimensionId } from "../data/dimensions";
import { distros, type Distro } from "../data/distros";
import { items, type Item } from "../data/items";
import { gpuHardwareItem, type GpuVendor } from "../data/hardware";

export interface Tradeoff {
  itemLabel: string;
  text: string;
}

export interface DistroResult {
  distro: Distro;
  score: number;
  tradeoffs: Tradeoff[];
  incompatibleItems: string[];
}

// A distro is "weak" in a dimension relative to what's needed once its
// attribute score sits meaningfully below the item's requirement.
const WEAK_THRESHOLD = 4;
const CARES_THRESHOLD = 6;

// A distro is treated as flat-out incapable (not just weaker) when it's
// nearly bottomed-out on a dimension an item critically depends on, e.g.
// Qubes OS (gamingPerf: 1) can't meaningfully run a game that needs 9.
const HARD_INCOMPATIBLE_REQUIREMENT = 9;
const HARD_INCOMPATIBLE_ATTRIBUTE = 2;

// Fixed per-rank multipliers, independent of how many items are picked in
// total. Rank #1 always carries the same weight whether it's the only pick
// or the first of fifteen. Steeper than a simple linear taper so reordering
// in "Your setup" visibly moves the results; anything past rank 6 settles
// at a 1x floor.
const RANK_WEIGHTS = [3, 2.4, 1.9, 1.5, 1.2, 1.05];
const BASELINE_WEIGHT = 1;

function importanceForRank(index: number): number {
  return RANK_WEIGHTS[index] ?? BASELINE_WEIGHT;
}

export function scoreDistros(pickedItemIds: string[], gpuVendor: GpuVendor | null = null): DistroResult[] {
  const picked = pickedItemIds
    .map((id) => items.find((i) => i.id === id))
    .filter((i): i is Item => Boolean(i));
  // The hardware pick, if any, is always treated as top priority (it's
  // foundational, nothing else works well if the GPU doesn't) rather than
  // something the user manually ranks alongside their software picks.
  const pickedItems = gpuVendor ? [gpuHardwareItem(gpuVendor), ...picked] : picked;

  const results: DistroResult[] = distros.map((distro) => {
    let score = 0;
    const tradeoffs: Tradeoff[] = [];
    const incompatibleItems: string[] = [];

    pickedItems.forEach((item, index) => {
      // Rank 0 (top of "Your setup") counts most; weight tapers toward the
      // 1x baseline for lower-priority picks.
      const importance = importanceForRank(index);

      // An anti-cheat block is a fact about the game, not about any
      // particular distro: Vanguard/EAC refuses to run on Linux entirely,
      // so every distro is equally incompatible here, unlike a dimension
      // threshold that only some distros fail.
      if (item.linuxSupport === "anticheat-blocked") {
        incompatibleItems.push(item.label);
        return;
      }

      let itemIsIncompatible = false;

      for (const dim of dimensions) {
        const requirement = item.requirements[dim.id];
        if (!requirement) continue;

        const attribute = distro.attributes[dim.id] ?? 5;
        const normalized = (attribute - 5) / 5; // -1 .. 1
        score += requirement * normalized * importance;

        if (requirement >= HARD_INCOMPATIBLE_REQUIREMENT && attribute <= HARD_INCOMPATIBLE_ATTRIBUTE) {
          itemIsIncompatible = true;
        } else if (requirement >= CARES_THRESHOLD && attribute <= WEAK_THRESHOLD) {
          tradeoffs.push({
            itemLabel: item.label,
            text: dim.lowText
              .replace("{item}", item.label)
              .replace("{distro}", distro.name),
          });
        }
      }

      if (itemIsIncompatible) incompatibleItems.push(item.label);
    });

    return {
      distro,
      score: Math.round(score * 10) / 10,
      tradeoffs,
      incompatibleItems,
    };
  });

  return results.sort((a, b) => {
    if (a.incompatibleItems.length !== b.incompatibleItems.length) {
      return a.incompatibleItems.length - b.incompatibleItems.length;
    }
    if (a.score !== b.score) return b.score - a.score;
    // Ties (including the all-zero default view before anything is picked)
    // fall back to real-world popularity instead of array declaration order.
    return a.distro.popularityRank - b.distro.popularityRank;
  });
}

export function scoreRange(results: DistroResult[]): number {
  return Math.max(1, ...results.map((r) => Math.abs(r.score)));
}

export type { DimensionId };
