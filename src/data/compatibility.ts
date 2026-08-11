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
  {
    distroId: "zorinos",
    base: "Ubuntu LTS",
    nvidia: "GUI Driver Manager (the same tooling used by Mint/Ubuntu) installs the proprietary driver in a few clicks.",
    strengths: [
      "Ships a Windows-like layout by default, with a macOS-like option too — genuinely the easiest transition for switchers",
      "Zorin Appearance app makes desktop customization approachable without editing config files",
    ],
    caveats: [
      "The most useful layout options are gated behind the paid Zorin OS Pro edition",
      "LTS base means the same driver/kernel lag as Mint on very new hardware",
    ],
  },
  {
    distroId: "manjaro",
    base: "Arch Linux, with updates held back roughly two weeks for testing",
    nvidia: "Manjaro's own driver manager (mhwd) detects and installs the proprietary driver automatically — easier than Arch's manual pacman process.",
    strengths: [
      "Graphical installer and curated defaults make Arch's package base far more approachable",
      "Multiple desktop editions (KDE, GNOME, Xfce) officially maintained",
    ],
    caveats: [
      "The delay between Arch and Manjaro repos has caused real AUR-compatibility breakage in the past — a well-known community criticism",
      "Not as bleeding-edge as CachyOS, EndeavourOS, or Arch itself, despite still being a rolling release",
    ],
  },
  {
    distroId: "endeavouros",
    base: "Arch Linux, essentially unmodified",
    nvidia: "Manual pacman install, identical to vanilla Arch — the ArchWiki's NVIDIA page applies directly.",
    strengths: [
      "Closest thing to 'Arch with a working installer' — no held-back packages, no custom repo layer",
      "Welcome app links straight to the ArchWiki and community resources instead of reinventing documentation",
    ],
    caveats: [
      "All of Arch's ongoing maintenance expectations apply post-install — this only simplifies day one",
      "Smaller team than Manjaro, so less independent tooling if something goes wrong",
    ],
  },
  {
    distroId: "garuda",
    base: "Arch Linux, BTRFS by default",
    nvidia: "Manual pacman install; Garuda's kernel choices are usually current within days of a new driver release.",
    strengths: [
      "Automatic BTRFS snapshots via Timeshift mean a bad update is a one-command rollback — an unusual safety net for a rolling release",
      "Ships with performance and gaming tweaks pre-applied out of the box",
    ],
    caveats: [
      "The default desktop is heavily themed and animation-heavy — striking, but it costs some resources and isn't to everyone's taste",
      "Larger and more opinionated install than EndeavourOS if you'd rather start closer to vanilla Arch",
    ],
  },
  {
    distroId: "pikaos",
    base: "Debian testing/unstable, with a mainline kernel",
    nvidia: "Recent proprietary driver ships close to release; PikaOS explicitly targets gaming freshness rather than Debian's usual conservatism.",
    strengths: [
      "Gaming-focused patches and a current kernel on top of Debian's package base — a combination Debian itself doesn't offer",
      "Actively maintained by a small, gaming-focused team with quick driver turnaround",
    ],
    caveats: [
      "Much younger and smaller project than the other distros here — less community track record",
      "Debian testing/unstable as a base carries more real breakage risk than Debian stable",
    ],
  },
  {
    distroId: "silverblue",
    base: "Fedora, atomic/image-based (rpm-ostree) instead of traditional package management",
    nvidia: "No proprietary driver by default; installing it means layering an RPM Fusion package onto the image, slower to apply than a normal dnf install.",
    strengths: [
      "Updates apply as a whole image and are trivially rollback-able if one breaks something",
      "Flatpak-first application model keeps the base system clean and avoids dependency conflicts",
    ],
    caveats: [
      "Installing traditional packages requires rpm-ostree layering or a toolbox container — a real mental-model shift from apt/dnf",
      "Smaller software compatibility surface for anything that assumes a mutable filesystem",
    ],
  },
  {
    distroId: "tails",
    base: "Debian, customized into a live-only (amnesic) system",
    nvidia: "Not applicable — Tails isn't meant to be installed persistently or used for GPU-dependent work.",
    strengths: [
      "Forces all network traffic through Tor by default, with no persistent trace left after shutdown",
      "Purpose-built and audited specifically for anonymity — this is Tails' entire reason to exist",
    ],
    caveats: [
      "Explicitly not a daily-driver OS — no persistent software installs, no gaming, no general productivity use",
      "Old, conservative kernel means poor support for very recent hardware",
    ],
  },
  {
    distroId: "antix",
    base: "Debian stable, without systemd",
    nvidia: "Manual driver install via Debian's non-free repository, same as Debian itself — less GUI hand-holding than MX Linux.",
    strengths: [
      "Extremely light resource footprint — a realistic option for genuinely old or low-spec machines",
      "Uses SysVinit/runit instead of systemd, a deliberate choice for people who want to avoid it",
    ],
    caveats: [
      "The no-systemd approach means some modern tooling and tutorials (which assume systemd) don't directly apply",
      "Sparse, dated-looking desktop by default — function over polish",
    ],
  },
  {
    distroId: "ubuntu",
    base: "Debian unstable, with its own 6-month/LTS release cadence",
    nvidia: "Ubuntu's installer can offer to install the proprietary NVIDIA driver directly — no third-party repo needed.",
    strengths: [
      "Largest community and documentation base of any distro — almost every problem has already been solved somewhere",
      "Regular non-LTS releases (every 6 months) keep hardware support fresher than pure Debian if you don't stick to LTS",
    ],
    caveats: [
      "LTS releases prioritize stability over cutting-edge hardware support, a milder version of Debian's tradeoff",
      "Canonical's own choices (Snap packages, occasional telemetry prompts) are a point of ongoing community friction",
    ],
  },
  {
    distroId: "opensuse",
    base: "openSUSE (independent, RPM-based), rolling release",
    nvidia: "NVIDIA's official repo is one zypper command away; the community wiki keeps exact steps current per release.",
    strengths: [
      "YaST is a genuinely unique, comprehensive system-configuration tool — network, users, services, and partitions in one place",
      "Rolling release with a built-in snapshot/rollback system (Btrfs + Snapper) more mature than most distros' equivalent",
    ],
    caveats: [
      "Smaller gaming-specific community than the Arch-based options, despite comparable technical freshness",
      "YaST's depth is also a learning curve if you're used to simpler package managers",
    ],
  },
  {
    distroId: "nixos",
    base: "Independent — Nix package manager and a declarative config model",
    nvidia: "Enable the proprietary driver with one line in configuration.nix; the tradeoff is learning Nix's declarative syntax to get there.",
    strengths: [
      "Every generation of your system config is kept and instantly bootable — a bad change is a reboot away from undone",
      "Reproducible builds mean your exact system config can be version-controlled and rebuilt identically elsewhere",
    ],
    caveats: [
      "The Nix language and declarative model is a real learning curve unlike anything else on this list",
      "Software assuming a traditional filesystem layout (some proprietary installers, certain games) sometimes needs workarounds",
    ],
  },
  {
    distroId: "voidlinux",
    base: "Independent — its own xbps package manager, runit instead of systemd",
    nvidia: "Manual driver install via xbps; a smaller community means fewer step-by-step guides than Arch or Debian derivatives.",
    strengths: [
      "Genuinely independent — not based on Debian, Arch, or Fedora, with its own package format and init system from the ground up",
      "Rolling release that's historically been unusually stable for a rolling distro",
    ],
    caveats: [
      "Much smaller community and package repo than Arch/Debian-based options — expect to build more from source",
      "runit instead of systemd means some mainstream tooling and guides don't directly apply",
    ],
  },
  {
    distroId: "gentoo",
    base: "Independent — source-based, built with Portage",
    nvidia: "Manual driver build via Portage with USE flags; expect a real compile time, not a quick package install.",
    strengths: [
      "Portage's USE flags give genuinely granular control over what gets built into every package, not just which packages are installed",
      "Compiling with CPU-specific optimizations can match or beat CachyOS's performance approach, taken to its logical extreme",
    ],
    caveats: [
      "Compile times are real — installing or updating major packages can take hours on modest hardware",
      "By far the steepest learning curve and highest maintenance burden of any distro on this list",
    ],
  },
  {
    distroId: "kali",
    base: "Debian testing, with the penetration-testing toolkit layered on",
    nvidia: "Manual driver install via Debian's non-free repo, same process as Debian itself.",
    strengths: [
      "Hundreds of penetration-testing and forensics tools pre-installed and pre-configured — the industry-standard toolkit distro",
      "Purpose-built live-boot and forensics modes for engagement work",
    ],
    caveats: [
      "Explicitly not designed as a daily-driver desktop OS — running it that way is common but discouraged even by its own maintainers",
      "Its older reputation for running as root by default (since changed) still shapes how people talk about it",
    ],
  },
  {
    distroId: "parrot",
    base: "Debian stable/testing, with security and privacy tooling layered on",
    nvidia: "Manual driver install via Debian's non-free repo, similar process to Kali/Debian.",
    strengths: [
      "Lighter resource footprint than Kali, genuinely usable as a daily driver rather than just a toolkit boot",
      "Ships anonymity/privacy tooling (AnonSurf, Tor integration) alongside the standard pentest toolkit — wider scope than Kali",
    ],
    caveats: [
      "Smaller community and slower security-tool updates than Kali, which has Offensive Security's backing",
      "Being usable as a daily driver cuts both ways — more attack surface than a single-purpose live-boot tool like Kali or Tails",
    ],
  },
  {
    distroId: "slackware",
    base: "Independent — no package dependency resolver by design",
    nvidia: "Manual driver install, no package manager dependency resolution to lean on — you track every file yourself.",
    strengths: [
      "Genuinely the most stable, least-changed base of any distro here — what worked a decade ago still works",
      "BSD-style init and a Unix-purist philosophy that predates and outlasted most distro trends",
    ],
    caveats: [
      "No automatic dependency resolution — installing software you didn't compile yourself means finding or building packages manually",
      "Extremely steep learning curve, arguably steeper than Gentoo for newcomers",
    ],
  },
  {
    distroId: "solus",
    base: "Independent, built around its own Budgie desktop",
    nvidia: "Solus's own package manager (eopkg) has straightforward proprietary driver packages, though the driver-testing surface is much smaller than Ubuntu/Fedora's.",
    strengths: [
      "Budgie desktop is original to Solus and tightly integrated, not bolted on",
      "Curated software selection avoids the sprawl of some rolling distros",
    ],
    caveats: [
      "Smaller team and community than the major distros — slower response to new hardware and edge-case bugs",
      "Semi-rolling release model is less battle-tested than Arch's or Debian's approaches",
    ],
  },
  {
    distroId: "elementary",
    base: "Ubuntu LTS, with the from-scratch Pantheon desktop",
    nvidia: "Same driver path as Ubuntu underneath, though Pantheon's conventions occasionally lag behind NVIDIA-specific Wayland fixes landing in GNOME/KDE first.",
    strengths: [
      "Pantheon desktop is cohesive and consistent in a way few other DEs manage — feels like one designed product, not assembled parts",
      "AppCenter models pay-what-you-want app distribution, a genuinely different take on a Linux software store",
    ],
    caveats: [
      "Smaller app ecosystem tailored specifically for Pantheon; some GNOME/KDE apps look visually out of place",
      "Releases are less frequent than Ubuntu itself, so it can lag behind on very new hardware support",
    ],
  },
  {
    distroId: "deepin",
    base: "Independent, built around the Qt-based Deepin Desktop Environment (DDE)",
    nvidia: "Ships its own driver management tooling; functional but historically less consistently tested than Ubuntu/Fedora's mainstream paths.",
    strengths: [
      "DDE is genuinely unique — animated, cohesive, and unlike any other Linux desktop",
      "Ships a large set of custom in-house applications rather than relying entirely on upstream GNOME/KDE apps",
    ],
    caveats: [
      "Historical privacy concerns around telemetry and cloud-connected features have made some users cautious — worth reviewing before installing",
      "Smaller international community and slower English-language support than the major Western-maintained distros",
    ],
  },
  {
    distroId: "rockylinux",
    base: "Binary-compatible rebuild of Red Hat Enterprise Linux",
    nvidia: "Manual driver install via third-party repos (ELRepo/EPEL); not a distro built with desktop GPU use as a priority.",
    strengths: [
      "Binary-compatible with RHEL, so it inherits Red Hat's enterprise-grade stability and long support lifecycles",
      "Free and community-governed, explicitly filling the gap CentOS left behind",
    ],
    caveats: [
      "Built for servers and enterprise workloads first — desktop use is possible but genuinely secondary to its actual purpose",
      "Conservative package versions mean it's a poor fit for anything needing current hardware/driver support",
    ],
  },
  {
    distroId: "kdeneon",
    base: "Ubuntu LTS, with the latest KDE Plasma always layered on top",
    nvidia: "Same driver path as Ubuntu underneath — the LTS base handles NVIDIA the same way Ubuntu does.",
    strengths: [
      "Always ships the newest stable KDE Plasma release, faster than most distros that bundle Plasma with their own release cadence",
      "Ubuntu LTS base underneath means broad hardware and software compatibility",
    ],
    caveats: [
      "Mixing a stable Ubuntu base with a bleeding-edge desktop occasionally produces version-mismatch quirks",
      "Effectively a single-purpose distro — if you don't specifically want latest-KDE-on-Ubuntu, there's little else differentiating it",
    ],
  },
];
