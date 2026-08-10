import type { DimensionScores } from "./dimensions";

export type Family =
  | "beginner-friendly"
  | "gaming"
  | "arch-based"
  | "debian-based"
  | "fedora-based"
  | "security-privacy";

export interface Distro {
  id: string;
  name: string;
  family: Family;
  attributes: DimensionScores; // 0-10 scale per dimension
}

// Attribute scores are a starting editorial judgment, not a scientific
// measurement. Refine over time, and ideally source what can be sourced
// (e.g. driverFreshness could eventually be informed by real release-cadence
// data rather than hand-picked numbers).
export const distros: Distro[] = [
  {
    id: "bazzite",
    name: "Bazzite",
    family: "gaming",
    attributes: { driverFreshness: 9, stability: 6, gamingPerf: 10, isolation: 3, easeOfUse: 7 },
  },
  {
    id: "nobara",
    name: "Nobara",
    family: "gaming",
    attributes: { driverFreshness: 9, stability: 6, gamingPerf: 9, isolation: 3, easeOfUse: 7 },
  },
  {
    id: "cachyos",
    name: "CachyOS",
    family: "arch-based",
    attributes: { driverFreshness: 9, stability: 5, gamingPerf: 9, isolation: 3, easeOfUse: 5 },
  },
  {
    id: "popos",
    name: "Pop!_OS",
    family: "beginner-friendly",
    attributes: { driverFreshness: 7, stability: 7, gamingPerf: 7, isolation: 4, easeOfUse: 8 },
  },
  {
    id: "mint",
    name: "Linux Mint",
    family: "beginner-friendly",
    attributes: { driverFreshness: 5, stability: 8, gamingPerf: 5, isolation: 4, easeOfUse: 9 },
  },
  {
    id: "fedora",
    name: "Fedora Workstation",
    family: "fedora-based",
    attributes: { driverFreshness: 8, stability: 7, gamingPerf: 6, isolation: 5, easeOfUse: 6 },
  },
  {
    id: "debian",
    name: "Debian",
    family: "debian-based",
    attributes: { driverFreshness: 3, stability: 9, gamingPerf: 3, isolation: 5, easeOfUse: 5 },
  },
  {
    id: "arch",
    name: "Arch Linux",
    family: "arch-based",
    attributes: { driverFreshness: 9, stability: 5, gamingPerf: 8, isolation: 4, easeOfUse: 3 },
  },
  {
    id: "qubes",
    name: "Qubes OS",
    family: "security-privacy",
    attributes: { driverFreshness: 4, stability: 6, gamingPerf: 1, isolation: 10, easeOfUse: 2 },
  },
  {
    id: "mxlinux",
    name: "MX Linux",
    family: "debian-based",
    attributes: { driverFreshness: 4, stability: 8, gamingPerf: 4, isolation: 4, easeOfUse: 7 },
  },
];
