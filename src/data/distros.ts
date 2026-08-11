import type { DimensionScores } from "./dimensions";

export type Family =
  | "beginner-friendly"
  | "gaming"
  | "arch-based"
  | "debian-based"
  | "fedora-based"
  | "security-privacy"
  | "immutable"
  | "independent";

export interface Distro {
  id: string;
  name: string;
  family: Family;
  blurb: string; // why this distro exists / who it's actually for, in one line
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
    blurb:
      "Built specifically for gaming handhelds and living-room PCs — the most complete out-of-box experience here, even if CachyOS edges it on raw benchmarks.",
    attributes: { driverFreshness: 9, stability: 6, gamingPerf: 9, isolation: 3, easeOfUse: 8 },
  },
  {
    id: "nobara",
    name: "Nobara",
    family: "gaming",
    blurb:
      "Fedora with a gaming-tuned kernel and Proton/anti-cheat fixes pre-applied by its maintainer — less manual setup than vanilla Fedora for the same goal.",
    attributes: { driverFreshness: 9, stability: 6, gamingPerf: 9, isolation: 3, easeOfUse: 7 },
  },
  {
    id: "cachyos",
    name: "CachyOS",
    family: "arch-based",
    blurb:
      "Arch rebuilt with CPU-optimized (x86-64-v3/v4) packages — the raw performance ceiling of this list, at the cost of Bazzite's out-of-box polish.",
    attributes: { driverFreshness: 9, stability: 5, gamingPerf: 10, isolation: 3, easeOfUse: 5 },
  },
  {
    id: "popos",
    name: "Pop!_OS",
    family: "beginner-friendly",
    blurb:
      "System76's Ubuntu spin, built around its own COSMIC desktop and the best out-of-box NVIDIA laptop support in the Ubuntu family.",
    attributes: { driverFreshness: 7, stability: 7, gamingPerf: 7, isolation: 4, easeOfUse: 8 },
  },
  {
    id: "mint",
    name: "Linux Mint",
    family: "beginner-friendly",
    blurb:
      "The default recommendation for Windows switchers — Cinnamon feels immediately familiar and rarely breaks.",
    attributes: { driverFreshness: 5, stability: 8, gamingPerf: 5, isolation: 4, easeOfUse: 9 },
  },
  {
    id: "fedora",
    name: "Fedora Workstation",
    family: "fedora-based",
    blurb:
      "Red Hat's community distro — upstream-first and SELinux-hardened by default, effectively a preview of where Linux is heading next.",
    attributes: { driverFreshness: 8, stability: 7, gamingPerf: 6, isolation: 5, easeOfUse: 6 },
  },
  {
    id: "debian",
    name: "Debian",
    family: "debian-based",
    blurb:
      "The stability bedrock most other distros build on — glacially conservative by design, which is exactly the point for servers.",
    attributes: { driverFreshness: 3, stability: 9, gamingPerf: 3, isolation: 5, easeOfUse: 5 },
  },
  {
    id: "arch",
    name: "Arch Linux",
    family: "arch-based",
    blurb:
      "Minimal by philosophy — you build up from nothing, so nothing runs on your system that you didn't deliberately install.",
    attributes: { driverFreshness: 9, stability: 5, gamingPerf: 8, isolation: 4, easeOfUse: 3 },
  },
  {
    id: "qubes",
    name: "Qubes OS",
    family: "security-privacy",
    blurb:
      "Not a desktop OS in the usual sense — every task lives in its own disposable VM, built for people who assume compromise is inevitable.",
    attributes: { driverFreshness: 4, stability: 6, gamingPerf: 1, isolation: 10, easeOfUse: 2 },
  },
  {
    id: "mxlinux",
    name: "MX Linux",
    family: "debian-based",
    blurb:
      "Debian stable wrapped in a lightweight Xfce desktop and genuinely useful GUI tools — built to run well on modest hardware.",
    attributes: { driverFreshness: 4, stability: 8, gamingPerf: 4, isolation: 4, easeOfUse: 7 },
  },
  {
    id: "zorinos",
    name: "Zorin OS",
    family: "beginner-friendly",
    blurb:
      "Ubuntu styled to look and feel like Windows (or macOS) out of the box — aimed squarely at people switching over for the first time.",
    attributes: { driverFreshness: 5, stability: 8, gamingPerf: 5, isolation: 4, easeOfUse: 9 },
  },
  {
    id: "manjaro",
    name: "Manjaro",
    family: "arch-based",
    blurb:
      "Arch's rolling packages held back roughly two weeks for testing, with a graphical installer — a gentler on-ramp into the Arch world.",
    attributes: { driverFreshness: 8, stability: 6, gamingPerf: 7, isolation: 4, easeOfUse: 6 },
  },
  {
    id: "endeavouros",
    name: "EndeavourOS",
    family: "arch-based",
    blurb:
      "Vanilla Arch with a friendly installer and nothing else changed — the same ongoing maintenance philosophy as Arch, minus the manual install.",
    attributes: { driverFreshness: 9, stability: 5, gamingPerf: 8, isolation: 4, easeOfUse: 4 },
  },
  {
    id: "garuda",
    name: "Garuda Linux",
    family: "arch-based",
    blurb:
      "Arch with a gaming-tuned kernel, automatic BTRFS snapshots, and a maximalist out-of-box look — a rollback safety net without giving up rolling releases.",
    attributes: { driverFreshness: 9, stability: 5, gamingPerf: 9, isolation: 3, easeOfUse: 6 },
  },
  {
    id: "pikaos",
    name: "PikaOS",
    family: "gaming",
    blurb:
      "A gaming-focused spin on Debian testing running a mainline kernel — the freshness Debian normally doesn't offer, aimed squarely at gamers.",
    attributes: { driverFreshness: 8, stability: 6, gamingPerf: 8, isolation: 3, easeOfUse: 7 },
  },
  {
    id: "silverblue",
    name: "Fedora Silverblue",
    family: "immutable",
    blurb:
      "Fedora's atomic, image-based desktop — updates apply as a whole and roll back instantly if one of them breaks something.",
    attributes: { driverFreshness: 8, stability: 8, gamingPerf: 6, isolation: 6, easeOfUse: 5 },
  },
  {
    id: "tails",
    name: "Tails",
    family: "security-privacy",
    blurb:
      "Boots from USB, forces all traffic through Tor, and forgets everything on shutdown — built for anonymity in a single session, not as a daily driver.",
    attributes: { driverFreshness: 2, stability: 3, gamingPerf: 1, isolation: 10, easeOfUse: 3 },
  },
  {
    id: "antix",
    name: "antiX",
    family: "debian-based",
    blurb:
      "Debian stripped down further and freed from systemd entirely — built to keep genuinely old hardware usable.",
    attributes: { driverFreshness: 2, stability: 8, gamingPerf: 2, isolation: 3, easeOfUse: 4 },
  },
  {
    id: "ubuntu",
    name: "Ubuntu",
    family: "debian-based",
    blurb:
      "The distro that made desktop Linux mainstream — most tutorials, PPAs, and third-party .deb packages assume you're running this or something built on it.",
    attributes: { driverFreshness: 6, stability: 8, gamingPerf: 6, isolation: 4, easeOfUse: 8 },
  },
  {
    id: "opensuse",
    name: "openSUSE Tumbleweed",
    family: "independent",
    blurb:
      "openSUSE's rolling-release edition — YaST gives it best-in-class system configuration tooling that no other distro really matches.",
    attributes: { driverFreshness: 8, stability: 6, gamingPerf: 7, isolation: 4, easeOfUse: 6 },
  },
  {
    id: "nixos",
    name: "NixOS",
    family: "independent",
    blurb:
      "Your entire system is described in one declarative config file — a genuinely different model where 'it worked on my machine' actually travels with you.",
    attributes: { driverFreshness: 7, stability: 8, gamingPerf: 6, isolation: 5, easeOfUse: 2 },
  },
  {
    id: "voidlinux",
    name: "Void Linux",
    family: "independent",
    blurb:
      "An independent distro built around runit instead of systemd, with its own from-scratch package manager — for people who want something that isn't a derivative of anything.",
    attributes: { driverFreshness: 7, stability: 6, gamingPerf: 5, isolation: 3, easeOfUse: 3 },
  },
  {
    id: "gentoo",
    name: "Gentoo",
    family: "independent",
    blurb:
      "You compile virtually everything from source with your own chosen flags — the most control of any distro here, at the cost of install and update times measured in hours, not minutes.",
    attributes: { driverFreshness: 8, stability: 6, gamingPerf: 8, isolation: 4, easeOfUse: 1 },
  },
  {
    id: "kali",
    name: "Kali Linux",
    family: "security-privacy",
    blurb:
      "Debian repackaged with the penetration-testing toolkit pre-installed — built for security professionals running structured engagements, not general desktop use.",
    attributes: { driverFreshness: 6, stability: 5, gamingPerf: 3, isolation: 5, easeOfUse: 4 },
  },
  {
    id: "parrot",
    name: "Parrot OS",
    family: "security-privacy",
    blurb:
      "Debian-based like Kali, but built to double as a genuinely usable daily-driver desktop, with a lighter footprint and a broader privacy/anonymity toolkit.",
    attributes: { driverFreshness: 6, stability: 6, gamingPerf: 4, isolation: 6, easeOfUse: 5 },
  },
];
