import { dimensions, type DimensionId } from "../data/dimensions";
import { distros, type Distro } from "../data/distros";
import { items, type Item } from "../data/items";
import { gpuHardwareItem, formFactorHardwareItem, type GpuVendor, type FormFactor } from "../data/hardware";

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

// Hardware picks get their own modest, fixed weight rather than the top of
// RANK_WEIGHTS. They used to be prepended ahead of every software pick,
// which combined with a distro that happens to be strong on exactly the
// hardware item's dimensions (e.g. Bazzite on the handheld profile) let a
// single hardware pick overwhelm everything else you actually chose.
const HARDWARE_WEIGHT = 1.4;

export function scoreDistros(
  pickedItemIds: string[],
  customItems: Item[] = [],
  gpuVendor: GpuVendor | null = null,
  formFactor: FormFactor | null = null,
): DistroResult[] {
  const allItems = customItems.length ? [...items, ...customItems] : items;
  const picked = pickedItemIds
    .map((id) => allItems.find((i) => i.id === id))
    .filter((i): i is Item => Boolean(i));
  const hardwareItems = [
    gpuVendor ? gpuHardwareItem(gpuVendor) : null,
    formFactor ? formFactorHardwareItem(formFactor) : null,
  ].filter((i): i is Item => Boolean(i));

  const results: DistroResult[] = distros.map((distro) => {
    let score = 0;
    const tradeoffs: Tradeoff[] = [];
    const incompatibleItems: string[] = [];

    const scoreItem = (item: Item, importance: number) => {
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
    };

    hardwareItems.forEach((item) => scoreItem(item, HARDWARE_WEIGHT));
    picked.forEach((item, index) => scoreItem(item, importanceForRank(index)));

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

// The raw score is an unbounded sum of weighted dimension contributions, not
// a meaningful number on its own. Rescale it to a 0-10 "rating" relative to
// the worst/best distro in the current result set, so the displayed number
// always reads the same way regardless of how many items are picked.
export function ratingOutOf10(score: number, results: DistroResult[]): number {
  const scores = results.map((r) => r.score);
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  // A tie at 0 means nothing picked has distinguished any distro yet (the
  // pre-input state), so the meter should read empty rather than full; a
  // tie above 0 is a genuine plateau where every distro matches equally well.
  if (max === min) return min === 0 ? 0 : 10;
  return ((score - min) / (max - min)) * 10;
}

export type { DimensionId };
