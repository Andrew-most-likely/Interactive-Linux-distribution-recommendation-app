import type { DimensionScores } from "./dimensions";

export type Category = "games" | "work" | "security";

export interface Item {
  id: string;
  label: string;
  category: Category;
  requirements: DimensionScores; // how much this item cares about each dimension, 0-10
}

export const items: Item[] = [
  // Games
  { id: "cs2", label: "Counter-Strike 2", category: "games", requirements: { gamingPerf: 9, driverFreshness: 8, easeOfUse: 3 } },
  { id: "valorant", label: "Valorant", category: "games", requirements: { gamingPerf: 8, driverFreshness: 8, easeOfUse: 2 } },
  { id: "bg3", label: "Baldur's Gate 3", category: "games", requirements: { gamingPerf: 6, driverFreshness: 5, easeOfUse: 4 } },
  { id: "minecraft", label: "Minecraft", category: "games", requirements: { gamingPerf: 3, driverFreshness: 2, easeOfUse: 6 } },

  // Work
  { id: "vscode", label: "VS Code", category: "work", requirements: { easeOfUse: 6, stability: 4 } },
  { id: "homeserver", label: "Self-hosting / home server", category: "work", requirements: { stability: 9, easeOfUse: 3 } },
  { id: "discord", label: "Discord", category: "work", requirements: { easeOfUse: 7 } },
  { id: "blender", label: "Blender", category: "work", requirements: { gamingPerf: 6, driverFreshness: 7, easeOfUse: 4 } },
  { id: "browser", label: "Heavy browser multitasking", category: "work", requirements: { easeOfUse: 6, stability: 4 } },

  // Security
  { id: "sandboxing", label: "Strong sandboxing / isolation", category: "security", requirements: { isolation: 10, easeOfUse: 2 } },
  { id: "vpn", label: "VPN-heavy networking", category: "security", requirements: { isolation: 6, stability: 5 } },
  { id: "minimalattack", label: "Minimal attack surface, no GUI", category: "security", requirements: { isolation: 7, easeOfUse: 1 } },
  { id: "fde", label: "Full-disk encryption by default", category: "security", requirements: { isolation: 5, easeOfUse: 4 } },
];
