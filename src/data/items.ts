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
  { id: "eldenring", label: "Elden Ring", category: "games", requirements: { gamingPerf: 8, driverFreshness: 7, easeOfUse: 4 } },
  { id: "apex", label: "Apex Legends", category: "games", requirements: { gamingPerf: 8, driverFreshness: 8, easeOfUse: 2 } },
  { id: "cyberpunk", label: "Cyberpunk 2077", category: "games", requirements: { gamingPerf: 9, driverFreshness: 9, easeOfUse: 4 } },
  { id: "stardew", label: "Stardew Valley", category: "games", requirements: { gamingPerf: 2, driverFreshness: 1, easeOfUse: 7 } },
  { id: "lol", label: "League of Legends", category: "games", requirements: { gamingPerf: 5, driverFreshness: 4, easeOfUse: 3 } },

  // Work
  { id: "vscode", label: "VS Code", category: "work", requirements: { easeOfUse: 6, stability: 4 } },
  { id: "homeserver", label: "Self-hosting / home server", category: "work", requirements: { stability: 9, easeOfUse: 3 } },
  { id: "discord", label: "Discord", category: "work", requirements: { easeOfUse: 7 } },
  { id: "blender", label: "Blender", category: "work", requirements: { gamingPerf: 6, driverFreshness: 7, easeOfUse: 4 } },
  { id: "browser", label: "Heavy browser multitasking", category: "work", requirements: { easeOfUse: 6, stability: 4 } },
  { id: "docker", label: "Docker / containers", category: "work", requirements: { stability: 7, easeOfUse: 4 } },
  { id: "jetbrains", label: "JetBrains IDEs", category: "work", requirements: { easeOfUse: 5, stability: 4 } },
  { id: "obs", label: "OBS Studio / streaming", category: "work", requirements: { gamingPerf: 4, driverFreshness: 5, easeOfUse: 5 } },
  { id: "nodejs", label: "Node.js development", category: "work", requirements: { stability: 5, easeOfUse: 5 } },

  // Security
  { id: "sandboxing", label: "Strong sandboxing / isolation", category: "security", requirements: { isolation: 10, easeOfUse: 2 } },
  { id: "vpn", label: "VPN-heavy networking", category: "security", requirements: { isolation: 6, stability: 5 } },
  { id: "minimalattack", label: "Minimal attack surface, no GUI", category: "security", requirements: { isolation: 7, easeOfUse: 1 } },
  { id: "fde", label: "Full-disk encryption by default", category: "security", requirements: { isolation: 5, easeOfUse: 4 } },
  { id: "torbrowser", label: "Tor Browser", category: "security", requirements: { isolation: 8, easeOfUse: 3 } },
  { id: "flatpak", label: "Sandboxed apps (Flatpak)", category: "security", requirements: { isolation: 6, easeOfUse: 5 } },
  { id: "wireguard", label: "Self-hosted VPN (WireGuard)", category: "security", requirements: { isolation: 5, stability: 6, easeOfUse: 3 } },
  { id: "airgapped", label: "Air-gapped / offline use", category: "security", requirements: { isolation: 9, easeOfUse: 2 } },
];
