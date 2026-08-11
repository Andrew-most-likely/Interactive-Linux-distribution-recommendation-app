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

// The real package manager each distro's base actually uses, so install
// commands can be resolved correctly instead of guessed. rpm-ostree and nix
// are declarative/image-based rather than imperative installers, and are
// handled with their own instructions in the checklist UI.
export type PackageManager =
  | "apt"
  | "dnf"
  | "pacman"
  | "zypper"
  | "xbps"
  | "emerge"
  | "eopkg"
  | "nix"
  | "rpm-ostree"
  | "manual";

export interface Distro {
  id: string;
  name: string;
  website: string;
  family: Family;
  packageManager: PackageManager;
  blurb: string; // why this distro exists / who it's actually for, in one line
  attributes: DimensionScores; // 0-10 scale per dimension
  popularityRank: number; // 1 = most widely used; breaks ties when scores match (including the zero-pick default view)
}

// Attribute scores are a starting editorial judgment, not a scientific
// measurement. Refine over time, and ideally source what can be sourced
// (e.g. driverFreshness could eventually be informed by real release-cadence
// data rather than hand-picked numbers).
export const distros: Distro[] = [
  {
    id: "bazzite",
    name: "Bazzite",
    website: "https://bazzite.gg",
    family: "gaming",
    packageManager: "rpm-ostree",
    blurb:
      "Built specifically for gaming handhelds and living-room PCs, the most complete out-of-box experience here, even if CachyOS edges it on raw benchmarks.",
    attributes: { driverFreshness: 9, stability: 6, gamingPerf: 9, isolation: 3, easeOfUse: 8 },
    popularityRank: 14,
  },
  {
    id: "nobara",
    name: "Nobara",
    website: "https://nobaraproject.org",
    family: "gaming",
    packageManager: "dnf",
    blurb:
      "Fedora with a gaming-tuned kernel and Proton/anti-cheat fixes pre-applied by its maintainer, less manual setup than vanilla Fedora for the same goal.",
    attributes: { driverFreshness: 9, stability: 6, gamingPerf: 9, isolation: 3, easeOfUse: 7 },
    popularityRank: 15,
  },
  {
    id: "cachyos",
    name: "CachyOS",
    website: "https://cachyos.org",
    family: "arch-based",
    packageManager: "pacman",
    blurb:
      "Arch rebuilt with CPU-optimized (x86-64-v3/v4) packages, the raw performance ceiling of this list, at the cost of Bazzite's out-of-box polish.",
    attributes: { driverFreshness: 9, stability: 5, gamingPerf: 10, isolation: 3, easeOfUse: 5 },
    popularityRank: 13,
  },
  {
    id: "popos",
    name: "Pop!_OS",
    website: "https://system76.com/pop",
    family: "beginner-friendly",
    packageManager: "apt",
    blurb:
      "System76's Ubuntu spin, built around its own COSMIC desktop and the best out-of-box NVIDIA laptop support in the Ubuntu family.",
    attributes: { driverFreshness: 7, stability: 7, gamingPerf: 7, isolation: 4, easeOfUse: 8 },
    popularityRank: 7,
  },
  {
    id: "mint",
    name: "Linux Mint",
    website: "https://linuxmint.com",
    family: "beginner-friendly",
    packageManager: "apt",
    blurb:
      "The default recommendation for Windows switchers, Cinnamon feels immediately familiar and rarely breaks.",
    attributes: { driverFreshness: 5, stability: 8, gamingPerf: 5, isolation: 4, easeOfUse: 9 },
    popularityRank: 2,
  },
  {
    id: "fedora",
    name: "Fedora Workstation",
    website: "https://fedoraproject.org",
    family: "fedora-based",
    packageManager: "dnf",
    blurb:
      "Red Hat's community distro, upstream-first and SELinux-hardened by default, effectively a preview of where Linux is heading next.",
    attributes: { driverFreshness: 8, stability: 7, gamingPerf: 6, isolation: 5, easeOfUse: 6 },
    popularityRank: 3,
  },
  {
    id: "debian",
    name: "Debian",
    website: "https://www.debian.org",
    family: "debian-based",
    packageManager: "apt",
    blurb:
      "The stability bedrock most other distros build on, glacially conservative by design, which is exactly the point for servers.",
    attributes: { driverFreshness: 3, stability: 9, gamingPerf: 3, isolation: 5, easeOfUse: 5 },
    popularityRank: 5,
  },
  {
    id: "arch",
    name: "Arch Linux",
    website: "https://archlinux.org",
    family: "arch-based",
    packageManager: "pacman",
    blurb:
      "Minimal by philosophy, you build up from nothing, so nothing runs on your system that you didn't deliberately install.",
    attributes: { driverFreshness: 9, stability: 5, gamingPerf: 8, isolation: 4, easeOfUse: 3 },
    popularityRank: 8,
  },
  {
    id: "qubes",
    name: "Qubes OS",
    website: "https://www.qubes-os.org",
    family: "security-privacy",
    packageManager: "dnf",
    blurb:
      "Not a desktop OS in the usual sense, every task lives in its own disposable VM, built for people who assume compromise is inevitable.",
    attributes: { driverFreshness: 4, stability: 6, gamingPerf: 1, isolation: 10, easeOfUse: 2 },
    popularityRank: 21,
  },
  {
    id: "mxlinux",
    name: "MX Linux",
    website: "https://mxlinux.org",
    family: "debian-based",
    packageManager: "apt",
    blurb:
      "Debian stable wrapped in a lightweight Xfce desktop and genuinely useful GUI tools, built to run well on modest hardware.",
    attributes: { driverFreshness: 4, stability: 8, gamingPerf: 4, isolation: 4, easeOfUse: 7 },
    popularityRank: 4,
  },
  {
    id: "zorinos",
    name: "Zorin OS",
    website: "https://zorin.com/os/",
    family: "beginner-friendly",
    packageManager: "apt",
    blurb:
      "Ubuntu styled to look and feel like Windows (or macOS) out of the box, aimed squarely at people switching over for the first time.",
    attributes: { driverFreshness: 5, stability: 8, gamingPerf: 5, isolation: 4, easeOfUse: 9 },
    popularityRank: 9,
  },
  {
    id: "manjaro",
    name: "Manjaro",
    website: "https://manjaro.org",
    family: "arch-based",
    packageManager: "pacman",
    blurb:
      "Arch's rolling packages held back roughly two weeks for testing, with a graphical installer, a gentler on-ramp into the Arch world.",
    attributes: { driverFreshness: 8, stability: 6, gamingPerf: 7, isolation: 4, easeOfUse: 6 },
    popularityRank: 6,
  },
  {
    id: "endeavouros",
    name: "EndeavourOS",
    website: "https://endeavouros.com",
    family: "arch-based",
    packageManager: "pacman",
    blurb:
      "Vanilla Arch with a friendly installer and nothing else changed, the same ongoing maintenance philosophy as Arch, minus the manual install.",
    attributes: { driverFreshness: 9, stability: 5, gamingPerf: 8, isolation: 4, easeOfUse: 4 },
    popularityRank: 10,
  },
  {
    id: "garuda",
    name: "Garuda Linux",
    website: "https://garudalinux.org",
    family: "arch-based",
    packageManager: "pacman",
    blurb:
      "Arch with a gaming-tuned kernel, automatic BTRFS snapshots, and a maximalist out-of-box look, a rollback safety net without giving up rolling releases.",
    attributes: { driverFreshness: 9, stability: 5, gamingPerf: 9, isolation: 3, easeOfUse: 6 },
    popularityRank: 12,
  },
  {
    id: "pikaos",
    name: "PikaOS",
    website: "https://pika-os.com",
    family: "gaming",
    packageManager: "apt",
    blurb:
      "A gaming-focused spin on Debian testing running a mainline kernel, the freshness Debian normally doesn't offer, aimed squarely at gamers.",
    attributes: { driverFreshness: 8, stability: 6, gamingPerf: 8, isolation: 3, easeOfUse: 7 },
    popularityRank: 25,
  },
  {
    id: "silverblue",
    name: "Fedora Silverblue",
    website: "https://fedoraproject.org/atomic-desktops/silverblue/",
    family: "immutable",
    packageManager: "rpm-ostree",
    blurb:
      "Fedora's atomic, image-based desktop, updates apply as a whole and roll back instantly if one of them breaks something.",
    attributes: { driverFreshness: 8, stability: 8, gamingPerf: 6, isolation: 6, easeOfUse: 5 },
    popularityRank: 23,
  },
  {
    id: "tails",
    name: "Tails",
    website: "https://tails.net",
    family: "security-privacy",
    packageManager: "apt",
    blurb:
      "Boots from USB, forces all traffic through Tor, and forgets everything on shutdown, built for anonymity in a single session, not as a daily driver.",
    attributes: { driverFreshness: 2, stability: 3, gamingPerf: 1, isolation: 10, easeOfUse: 3 },
    popularityRank: 24,
  },
  {
    id: "antix",
    name: "antiX",
    website: "https://antixlinux.com",
    family: "debian-based",
    packageManager: "apt",
    blurb:
      "Debian stripped down further and freed from systemd entirely, built to keep genuinely old hardware usable.",
    attributes: { driverFreshness: 2, stability: 8, gamingPerf: 2, isolation: 3, easeOfUse: 4 },
    popularityRank: 18,
  },
  {
    id: "ubuntu",
    name: "Ubuntu",
    website: "https://ubuntu.com",
    family: "debian-based",
    packageManager: "apt",
    blurb:
      "The distro that made desktop Linux mainstream, most tutorials, PPAs, and third-party .deb packages assume you're running this or something built on it.",
    attributes: { driverFreshness: 6, stability: 8, gamingPerf: 6, isolation: 4, easeOfUse: 8 },
    popularityRank: 1,
  },
  {
    id: "opensuse",
    name: "openSUSE Tumbleweed",
    website: "https://get.opensuse.org/tumbleweed/",
    family: "independent",
    packageManager: "zypper",
    blurb:
      "openSUSE's rolling-release edition, YaST gives it best-in-class system configuration tooling that no other distro really matches.",
    attributes: { driverFreshness: 8, stability: 6, gamingPerf: 7, isolation: 4, easeOfUse: 6 },
    popularityRank: 11,
  },
  {
    id: "nixos",
    name: "NixOS",
    website: "https://nixos.org",
    family: "independent",
    packageManager: "nix",
    blurb:
      "Your entire system is described in one declarative config file, a genuinely different model where 'it worked on my machine' actually travels with you.",
    attributes: { driverFreshness: 7, stability: 8, gamingPerf: 6, isolation: 5, easeOfUse: 2 },
    popularityRank: 17,
  },
  {
    id: "voidlinux",
    name: "Void Linux",
    website: "https://voidlinux.org",
    family: "independent",
    packageManager: "xbps",
    blurb:
      "An independent distro built around runit instead of systemd, with its own from-scratch package manager, for people who want something that isn't a derivative of anything.",
    attributes: { driverFreshness: 7, stability: 6, gamingPerf: 5, isolation: 3, easeOfUse: 3 },
    popularityRank: 20,
  },
  {
    id: "gentoo",
    name: "Gentoo",
    website: "https://www.gentoo.org",
    family: "independent",
    packageManager: "emerge",
    blurb:
      "You compile virtually everything from source with your own chosen flags, the most control of any distro here, at the cost of install and update times measured in hours, not minutes.",
    attributes: { driverFreshness: 8, stability: 6, gamingPerf: 8, isolation: 4, easeOfUse: 1 },
    popularityRank: 19,
  },
  {
    id: "kali",
    name: "Kali Linux",
    website: "https://www.kali.org",
    family: "security-privacy",
    packageManager: "apt",
    blurb:
      "Debian repackaged with the penetration-testing toolkit pre-installed, built for security professionals running structured engagements, not general desktop use.",
    attributes: { driverFreshness: 6, stability: 5, gamingPerf: 3, isolation: 5, easeOfUse: 4 },
    popularityRank: 16,
  },
  {
    id: "parrot",
    name: "Parrot OS",
    website: "https://parrotsec.org",
    family: "security-privacy",
    packageManager: "apt",
    blurb:
      "Debian-based like Kali, but built to double as a genuinely usable daily-driver desktop, with a lighter footprint and a broader privacy/anonymity toolkit.",
    attributes: { driverFreshness: 6, stability: 6, gamingPerf: 4, isolation: 6, easeOfUse: 5 },
    popularityRank: 22,
  },
  {
    id: "slackware",
    name: "Slackware",
    website: "http://www.slackware.com",
    family: "independent",
    packageManager: "manual",
    blurb:
      "The oldest actively-maintained Linux distro still around, no dependency resolver, no hand-holding, you configure everything by editing text files directly.",
    attributes: { driverFreshness: 3, stability: 8, gamingPerf: 3, isolation: 3, easeOfUse: 1 },
    popularityRank: 21.5,
  },
  {
    id: "solus",
    name: "Solus",
    website: "https://getsol.us",
    family: "independent",
    packageManager: "eopkg",
    blurb:
      "An independent distro built from scratch around its own Budgie desktop, not a derivative of anything, aimed at being polished and usable out of the box.",
    attributes: { driverFreshness: 6, stability: 6, gamingPerf: 5, isolation: 3, easeOfUse: 7 },
    popularityRank: 20.5,
  },
  {
    id: "elementary",
    name: "elementary OS",
    website: "https://elementary.io",
    family: "beginner-friendly",
    packageManager: "apt",
    blurb:
      "Ubuntu underneath a from-scratch, macOS-inspired desktop (Pantheon), one of the most deliberately designed-feeling Linux desktops available.",
    attributes: { driverFreshness: 5, stability: 7, gamingPerf: 5, isolation: 4, easeOfUse: 8 },
    popularityRank: 9.5,
  },
  {
    id: "deepin",
    name: "Deepin",
    website: "https://www.deepin.org",
    family: "independent",
    packageManager: "apt",
    blurb:
      "A visually distinctive, Qt-based desktop (DDE) built by a Chinese development team, one of the most graphically polished desktop environments in the Linux world.",
    attributes: { driverFreshness: 6, stability: 6, gamingPerf: 5, isolation: 3, easeOfUse: 7 },
    popularityRank: 13.5,
  },
  {
    id: "rockylinux",
    name: "Rocky Linux",
    website: "https://rockylinux.org",
    family: "independent",
    packageManager: "dnf",
    blurb:
      "A community-driven, binary-compatible rebuild of Red Hat Enterprise Linux, built to be the free RHEL successor after CentOS pivoted to a rolling model.",
    attributes: { driverFreshness: 3, stability: 9, gamingPerf: 2, isolation: 5, easeOfUse: 5 },
    popularityRank: 5.5,
  },
  {
    id: "kdeneon",
    name: "KDE Neon",
    website: "https://neon.kde.org",
    family: "debian-based",
    packageManager: "apt",
    blurb:
      "Ubuntu LTS as the base, but with the latest KDE Plasma always on top, for people who specifically want Plasma's newest release without switching distro families.",
    attributes: { driverFreshness: 6, stability: 6, gamingPerf: 6, isolation: 4, easeOfUse: 6 },
    popularityRank: 11.5,
  },
  {
    id: "kubuntu",
    name: "Kubuntu",
    website: "https://kubuntu.org",
    family: "debian-based",
    packageManager: "apt",
    blurb:
      "The official Ubuntu flavor built around KDE Plasma instead of GNOME, same Ubuntu base and driver story, just a different desktop by default.",
    attributes: { driverFreshness: 6, stability: 8, gamingPerf: 6, isolation: 4, easeOfUse: 7 },
    popularityRank: 6.5,
  },
  {
    id: "xubuntu",
    name: "Xubuntu",
    website: "https://xubuntu.org",
    family: "debian-based",
    packageManager: "apt",
    blurb:
      "The official Ubuntu flavor built around the lightweight Xfce desktop, for people who want Ubuntu's driver story without GNOME's resource footprint.",
    attributes: { driverFreshness: 6, stability: 8, gamingPerf: 5, isolation: 4, easeOfUse: 8 },
    popularityRank: 6.7,
  },
  {
    id: "lubuntu",
    name: "Lubuntu",
    website: "https://lubuntu.me",
    family: "debian-based",
    packageManager: "apt",
    blurb:
      "The official Ubuntu flavor built around the minimal LXQt desktop, the lightest of the Ubuntu family, aimed at older or lower-spec hardware.",
    attributes: { driverFreshness: 5, stability: 8, gamingPerf: 4, isolation: 4, easeOfUse: 7 },
    popularityRank: 6.8,
  },
  {
    id: "almalinux",
    name: "AlmaLinux",
    website: "https://almalinux.org",
    family: "independent",
    packageManager: "dnf",
    blurb:
      "Another binary-compatible RHEL rebuild, community-governed like Rocky Linux, chosen almost entirely on which project's governance model you trust more.",
    attributes: { driverFreshness: 3, stability: 9, gamingPerf: 2, isolation: 5, easeOfUse: 5 },
    popularityRank: 5.7,
  },
  {
    id: "artix",
    name: "Artix Linux",
    website: "https://artixlinux.org",
    family: "arch-based",
    packageManager: "pacman",
    blurb:
      "Arch Linux's packages and rolling release, but without systemd, for people who want Arch's freshness with a different init system underneath.",
    attributes: { driverFreshness: 9, stability: 5, gamingPerf: 8, isolation: 4, easeOfUse: 3 },
    popularityRank: 10.5,
  },
  {
    id: "q4os",
    name: "Q4OS",
    website: "https://q4os.org",
    family: "debian-based",
    packageManager: "apt",
    blurb:
      "Debian-based and extremely lightweight, built around the Trinity desktop, another solid option for keeping old hardware usable.",
    attributes: { driverFreshness: 4, stability: 8, gamingPerf: 3, isolation: 3, easeOfUse: 7 },
    popularityRank: 18.5,
  },
];
