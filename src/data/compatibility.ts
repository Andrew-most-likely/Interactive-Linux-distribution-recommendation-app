export interface CompatibilityNote {
  distroId: string;
  base: string;
  nvidia: string;
  strengths: string[];
  caveats: string[];
}

// General, well-known characteristics of each distro as of its current
// release line — not live-sourced data. Treat as a starting reference, the
// same spirit as the editorial scores in distros.ts: a reasonable baseline,
// not a substitute for checking a distro's own release notes before install.
export const compatibilityNotes: CompatibilityNote[] = [
  {
    distroId: "bazzite",
    base: "Fedora Atomic (immutable, image-based)",
    nvidia: "Dedicated NVIDIA image ships the proprietary driver preinstalled — no manual setup.",
    strengths: [
      "Steam, Proton, and GameMode configured out of the box",
      "Immutable base means a bad update rolls back instead of breaking the system",
      "Handles handheld PCs (Steam Deck-like devices) especially well",
    ],
    caveats: [
      "Immutable filesystem makes ad-hoc system tweaks and non-Flatpak software more involved",
      "Larger install size from the bundled gaming stack",
    ],
  },
  {
    distroId: "nobara",
    base: "Fedora (traditional, mutable filesystem)",
    nvidia: "Separate NVIDIA edition ISO includes the driver by default.",
    strengths: [
      "Patched kernel tuned for gaming responsiveness",
      "Strong Proton/anti-cheat compatibility out of the box",
      "Easier to hand-tweak than an immutable distro",
    ],
    caveats: [
      "Smaller maintainer team than Fedora proper — updates depend on one core contributor's cadence",
      "Being mutable, a bad update can still break the system, unlike Bazzite",
    ],
  },
  {
    distroId: "cachyos",
    base: "Arch Linux (rolling release)",
    nvidia: "Manual install via pacman, well-documented; proprietary driver packages are current within days of release.",
    strengths: [
      "CPU-optimized packages (x86-64-v3/v4) for measurable performance gains on modern hardware",
      "Very latest kernel and Mesa/driver versions, fast",
    ],
    caveats: [
      "Rolling release carries real breakage risk if updates are skipped for a long stretch",
      "Assumes comfort with Arch-style maintenance — smaller safety net than Ubuntu/Fedora-based options",
    ],
  },
  {
    distroId: "popos",
    base: "Ubuntu LTS",
    nvidia: "Dedicated NVIDIA ISO preloads the driver; hybrid graphics switching is handled well on laptops.",
    strengths: [
      "Best-in-class out-of-box NVIDIA laptop support among Ubuntu-based distros",
      "COSMIC (System76's own desktop) is fast and increasingly polished",
    ],
    caveats: [
      "COSMIC is still newer than GNOME/KDE and occasionally shows rough edges or missing settings",
      "Best hardware support is on System76 machines, though it runs fine elsewhere",
    ],
  },
  {
    distroId: "mint",
    base: "Ubuntu LTS",
    nvidia: "GUI Driver Manager installs proprietary drivers in a few clicks — no terminal required.",
    strengths: [
      "Cinnamon desktop is stable, familiar to Windows switchers, rarely breaks",
      "Very large community, easy to find answers to almost any problem",
    ],
    caveats: [
      "LTS base means kernel/Mesa versions lag — brand-new GPUs may need a manual kernel/driver backport",
      "Not aimed at bleeding-edge hardware support on day one",
    ],
  },
  {
    distroId: "fedora",
    base: "Fedora (semi-rolling, 6-month releases)",
    nvidia: "No proprietary driver by default — requires enabling RPM Fusion first, a well-documented extra step.",
    strengths: [
      "Upstream-first: new kernel, Mesa, and Wayland improvements land quickly",
      "SELinux enabled by default adds real hardening most distros skip",
    ],
    caveats: [
      "The RPM Fusion + driver setup step trips up newcomers expecting it preinstalled",
      "SELinux occasionally blocks unusual or manually-installed software until a policy exception is added",
    ],
  },
  {
    distroId: "debian",
    base: "Debian (stable branch)",
    nvidia: "Requires manually enabling the non-free repository, then installing the driver package.",
    strengths: [
      "Extremely stable — long uptimes, minimal surprise changes, ideal for servers/self-hosting",
      "Enormous package archive",
    ],
    caveats: [
      "Stable branch kernel and drivers can be a year or more behind — a real problem for new GPUs",
      "Gaming and latest-hardware support are secondary priorities; consider Debian testing instead if freshness matters",
    ],
  },
  {
    distroId: "arch",
    base: "Arch Linux (rolling release)",
    nvidia: "Manual pacman install; the ArchWiki's NVIDIA page is the standard reference and is kept current.",
    strengths: [
      "Always-current packages and kernel",
      "AUR gives access to an enormous range of software, including many gaming/anti-cheat workarounds",
      "The ArchWiki is one of the best Linux references in existence, useful even on other distros",
    ],
    caveats: [
      "Manual installation and ongoing maintenance are expected, though the archinstall script has lowered the bar",
      "Rolling updates occasionally require manual intervention (reading the news feed before upgrading matters)",
    ],
  },
  {
    distroId: "qubes",
    base: "Fedora-based dom0 with Xen virtualization",
    nvidia: "Not a realistic path — GPU passthrough is possible but heavy, and it isn't built for gaming performance.",
    strengths: [
      "Genuinely best-in-class compartmentalization: each app/task runs in its own disposable VM",
      "Strong track record in high-security and journalism/activism use cases",
    ],
    caveats: [
      "Requires a CPU with VT-d/IOMMU support and meaningfully more RAM than a typical desktop distro",
      "Virtualization overhead makes it a poor fit for gaming or GPU-heavy work",
      "Steep learning curve — this is a specialist tool, not a general daily driver",
    ],
  },
  {
    distroId: "mxlinux",
    base: "Debian stable, with backports",
    nvidia: "MX Driver Manager installs the proprietary driver through a simple GUI.",
    strengths: [
      "Runs well on older or lower-spec hardware thanks to the lightweight Xfce desktop",
      "MX Tools bundle genuinely useful GUI utilities not found in plain Debian",
    ],
    caveats: [
      "Backports help but still lag behind rolling distros for very new GPU generations",
      "Offers a non-systemd variant, which is unusual and worth knowing before relying on systemd-specific tooling",
    ],
  },
];
