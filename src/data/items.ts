import type { DimensionScores } from "./dimensions";
import type { PackageManager } from "./distros";

export type Category = "games" | "work" | "browsers" | "security" | "communication";

// Real install guidance, not invented package names. `packages` only lists a
// manager when the name is genuinely the one shipped in that distro's own
// repos; `flatpak` is a verified Flathub app ID and is used as the universal
// fallback (works identically on every distro, including immutable ones like
// Silverblue/Bazzite where it's the recommended path anyway); `note` covers
// anything with no clean repo/Flathub story (vendor-only .deb/.rpm, web-only,
// unofficial wrappers) rather than guessing at a command that might not exist.
export interface PackageInstall {
  packages?: Partial<Record<PackageManager, string>>;
  flatpak?: string;
  note?: string;
}

// A real, checkable fact about how a game actually runs on Linux, not an
// invented number. driverFreshness requirements for games are derived from
// this rather than hand-picked: an anti-cheat block isn't a "low score",
// it's a hard, distro-independent wall (see HARD-BLOCKED handling in
// scoring.ts), and native titles simply don't stress the GPU driver stack
// the way a Proton/Wine translation layer does.
export type LinuxSupport =
  | "native" // ships an official Linux build; no translation layer involved
  | "proton-verified" // no native build, but well-tested and smooth through Proton
  | "proton-playable" // runs through Proton but more sensitive to Mesa/kernel freshness
  | "wine-workaround" // no Steam/Proton path at all; needs manual Wine/Lutris setup
  | "anticheat-blocked"; // kernel-level anti-cheat refuses to run on Linux, on any distro

export interface Item {
  id: string;
  label: string;
  category: Category;
  requirements: DimensionScores; // how much this item cares about each dimension, 0-10
  linuxSupport?: LinuxSupport; // set for games; drives the anti-cheat hard-block check
  install?: PackageInstall; // real per-distro install guidance; unset for profile-only picks (e.g. "Strong sandboxing")
  custom?: boolean; // user-typed via search, no verified Linux-support data
}

export const items: Item[] = [
  // ---------- Games ----------
  // driverFreshness values below are derived from each title's real Linux
  // support status (see LinuxSupport), not invented per-game.
  { id: "cs2", label: "Counter-Strike 2", category: "games", linuxSupport: "proton-verified", requirements: { gamingPerf: 9, driverFreshness: 6, easeOfUse: 3 } }, // Steam Deck Verified; VAC works fine under Proton
  { id: "valorant", label: "Valorant", category: "games", linuxSupport: "anticheat-blocked", requirements: { gamingPerf: 8, easeOfUse: 2 } }, // Riot's Vanguard driver explicitly refuses to run on Linux/VMs
  { id: "bg3", label: "Baldur's Gate 3", category: "games", linuxSupport: "proton-verified", requirements: { gamingPerf: 6, driverFreshness: 6, easeOfUse: 4 } }, // Steam Deck Verified, no native client
  { id: "minecraft", label: "Minecraft", category: "games", linuxSupport: "native", requirements: { gamingPerf: 3, driverFreshness: 1, easeOfUse: 6 } }, // official Linux Java build from Mojang
  { id: "eldenring", label: "Elden Ring", category: "games", linuxSupport: "proton-verified", requirements: { gamingPerf: 8, driverFreshness: 6, easeOfUse: 4 } }, // Steam Deck Verified, no Linux-hostile anti-cheat
  { id: "apex", label: "Apex Legends", category: "games", linuxSupport: "anticheat-blocked", requirements: { gamingPerf: 8, easeOfUse: 2 } }, // Respawn disabled Linux/Proton support for this title specifically in 2021
  { id: "cyberpunk", label: "Cyberpunk 2077", category: "games", linuxSupport: "proton-verified", requirements: { gamingPerf: 9, driverFreshness: 7, easeOfUse: 4 } }, // Steam Deck Verified
  { id: "stardew", label: "Stardew Valley", category: "games", linuxSupport: "native", requirements: { gamingPerf: 2, driverFreshness: 1, easeOfUse: 7 } }, // ConcernedApe ships an official Linux build
  { id: "lol", label: "League of Legends", category: "games", linuxSupport: "anticheat-blocked", requirements: { gamingPerf: 5, easeOfUse: 3 } }, // Riot rolled Vanguard out to the League client in 2024, closing off Linux
  { id: "fortnite", label: "Fortnite", category: "games", linuxSupport: "anticheat-blocked", requirements: { gamingPerf: 8, easeOfUse: 3 } }, // Epic's anti-cheat config blocks Linux/Proton for this title
  { id: "gtav", label: "Grand Theft Auto V", category: "games", linuxSupport: "proton-verified", requirements: { gamingPerf: 6, driverFreshness: 5, easeOfUse: 6 } }, // one of the best-supported AAA titles under Proton, GTA Online included
  { id: "rdr2", label: "Red Dead Redemption 2", category: "games", linuxSupport: "proton-verified", requirements: { gamingPerf: 9, driverFreshness: 7, easeOfUse: 3 } }, // Steam Deck Verified
  { id: "skyrim", label: "Skyrim", category: "games", linuxSupport: "proton-verified", requirements: { gamingPerf: 4, driverFreshness: 3, easeOfUse: 6 } }, // old engine, excellent Proton support, mods add setup overhead
  { id: "terraria", label: "Terraria", category: "games", linuxSupport: "native", requirements: { gamingPerf: 1, driverFreshness: 1, easeOfUse: 8 } }, // official native Linux build
  { id: "wow", label: "World of Warcraft", category: "games", linuxSupport: "wine-workaround", requirements: { gamingPerf: 6, driverFreshness: 8, easeOfUse: 2, stability: 4 } }, // no native client and not distributed via Steam/Proton; runs through Lutris/Wine scripts, not officially supported by Blizzard on Linux
  { id: "hollowknight", label: "Hollow Knight", category: "games", linuxSupport: "native", requirements: { gamingPerf: 1, driverFreshness: 1, easeOfUse: 7 } }, // official native Linux build
  { id: "civ6", label: "Sid Meier's Civilization VI", category: "games", linuxSupport: "native", requirements: { gamingPerf: 3, driverFreshness: 2, easeOfUse: 6 } }, // Aspyr shipped an official native Linux port
  { id: "rocketleague", label: "Rocket League", category: "games", linuxSupport: "proton-playable", requirements: { gamingPerf: 6, driverFreshness: 7, easeOfUse: 4 } }, // lost its native Linux build when Epic acquired Psyonix in 2020; Proton-only since
  { id: "hades", label: "Hades", category: "games", linuxSupport: "native", requirements: { gamingPerf: 2, driverFreshness: 1, easeOfUse: 7 } }, // official native Linux build
  { id: "forzahorizon5", label: "Forza Horizon 5", category: "games", linuxSupport: "proton-playable", requirements: { gamingPerf: 8, driverFreshness: 8, easeOfUse: 4 } }, // no native Linux build, Xbox Play Anywhere title, generally good but less bulletproof than Steam Deck Verified titles
  { id: "dota2", label: "Dota 2", category: "games", linuxSupport: "native", requirements: { gamingPerf: 4, driverFreshness: 2, easeOfUse: 6 } }, // native Linux build since 2013, one of Valve's original SteamOS titles
  { id: "tf2", label: "Team Fortress 2", category: "games", linuxSupport: "native", requirements: { gamingPerf: 2, driverFreshness: 1, easeOfUse: 7 } }, // native Linux build since 2013
  { id: "portal2", label: "Portal 2", category: "games", linuxSupport: "native", requirements: { gamingPerf: 2, driverFreshness: 1, easeOfUse: 7 } }, // native Linux build, day-one SteamOS title
  { id: "l4d2", label: "Left 4 Dead 2", category: "games", linuxSupport: "native", requirements: { gamingPerf: 3, driverFreshness: 2, easeOfUse: 6 } }, // native Linux build via the Source engine
  { id: "nomanssky", label: "No Man's Sky", category: "games", linuxSupport: "proton-verified", requirements: { gamingPerf: 7, driverFreshness: 6, easeOfUse: 4 } }, // Steam Deck Verified, actively maintained Proton support from Hello Games
  { id: "hogwartslegacy", label: "Hogwarts Legacy", category: "games", linuxSupport: "proton-playable", requirements: { gamingPerf: 8, driverFreshness: 7, easeOfUse: 4 } }, // single-player only, no anti-cheat; Steam Deck rated Playable over minor UI issues rather than Verified
  { id: "destiny2", label: "Destiny 2", category: "games", linuxSupport: "anticheat-blocked", requirements: { gamingPerf: 7, easeOfUse: 2 } }, // Bungie's BattlEye configuration explicitly blocks Linux/Proton and Steam Deck since 2022
  { id: "helldivers2", label: "Helldivers 2", category: "games", linuxSupport: "proton-verified", requirements: { gamingPerf: 7, driverFreshness: 6, easeOfUse: 4 } }, // Steam Deck Verified, no kernel-level anti-cheat

  // ---------- Work ----------
  { id: "vscode", label: "VS Code", category: "work", requirements: { easeOfUse: 6, stability: 4 }, install: { flatpak: "com.visualstudio.code", note: "Or add Microsoft's own apt/dnf/zypper repo from code.visualstudio.com for the vendor build" } },
  { id: "homeserver", label: "Self-hosting / home server", category: "work", requirements: { stability: 9 } }, // stability is the only real signal here; a distro's desktop ease-of-use is irrelevant to headless server suitability
  { id: "blender", label: "Blender", category: "work", requirements: { gamingPerf: 6, driverFreshness: 7, easeOfUse: 4 }, install: { packages: { apt: "blender", dnf: "blender", pacman: "blender" }, flatpak: "org.blender.Blender" } }, // Cycles GPU rendering needs current CUDA (NVIDIA) or HIP/ROCm (AMD); ROCm in particular tracks a narrow supported kernel/driver range
  { id: "browser", label: "Heavy browser multitasking", category: "work", requirements: { easeOfUse: 6, stability: 4 } },
  { id: "docker", label: "Docker / containers", category: "work", requirements: { stability: 7, easeOfUse: 4 }, install: { packages: { pacman: "docker" }, note: "Debian/Ubuntu and Fedora need Docker's own apt/dnf repo from docs.docker.com for docker-ce; Arch ships it directly" } },
  { id: "jetbrains", label: "JetBrains IDEs", category: "work", requirements: { easeOfUse: 5, stability: 4 }, install: { flatpak: "com.jetbrains.Toolbox", note: "Toolbox manages installs of individual IDEs (IntelliJ, PyCharm, WebStorm, etc.)" } },
  { id: "obs", label: "OBS Studio / streaming", category: "work", requirements: { gamingPerf: 4, driverFreshness: 5, easeOfUse: 5 }, install: { packages: { apt: "obs-studio", dnf: "obs-studio", pacman: "obs-studio" }, flatpak: "com.obsproject.Studio", note: "Fedora needs RPM Fusion enabled first" } }, // NVENC/VAAPI hardware encode wants a reasonably current driver, but OBS still runs fine on software x264 encoding if not
  { id: "nodejs", label: "Node.js development", category: "work", requirements: { stability: 5, easeOfUse: 5 }, install: { packages: { apt: "nodejs", dnf: "nodejs", pacman: "nodejs" } } },
  { id: "neovim", label: "Neovim / Vim", category: "work", requirements: { stability: 5 }, install: { packages: { apt: "neovim", dnf: "neovim", pacman: "neovim" } } }, // terminal editor; a distro's desktop ease-of-use doesn't apply either way
  { id: "git", label: "Git (command line)", category: "work", requirements: { stability: 4 }, install: { packages: { apt: "git", dnf: "git", pacman: "git" } } }, // CLI tool; desktop ease-of-use is irrelevant either way
  { id: "python", label: "Python development", category: "work", requirements: { easeOfUse: 6, stability: 4 }, install: { packages: { apt: "python3", dnf: "python3", pacman: "python" } } }, // first-class citizen on nearly every distro
  { id: "kubernetes", label: "Kubernetes / kubectl", category: "work", requirements: { stability: 8, easeOfUse: 2 }, install: { packages: { pacman: "kubectl" }, note: "Debian/Ubuntu and Fedora need Kubernetes' own apt/dnf repo from kubernetes.io" } },
  { id: "virtualbox", label: "VirtualBox", category: "work", requirements: { stability: 6, driverFreshness: 3, easeOfUse: 4 }, install: { packages: { apt: "virtualbox", pacman: "virtualbox" }, note: "Fedora needs RPM Fusion enabled first (no default-repo package)" } }, // vboxdrv is a kernel module, not a GPU driver; DKMS rebuilds it automatically on most distros, but very new kernels can briefly outpace VirtualBox's official support
  { id: "libreoffice", label: "LibreOffice", category: "work", requirements: { easeOfUse: 7, stability: 4 }, install: { packages: { apt: "libreoffice", dnf: "libreoffice", pacman: "libreoffice-fresh" }, flatpak: "org.libreoffice.LibreOffice" } },
  { id: "notion", label: "Notion", category: "work", requirements: { easeOfUse: 6, stability: 3 }, install: { note: "No official Linux app; use the web app at notion.so or an unofficial Electron wrapper" } }, // Electron-wrapped, no true native Linux app
  { id: "figma", label: "Figma", category: "work", requirements: { easeOfUse: 7, stability: 3 }, install: { note: "Browser-based, no install needed (figma.com)" } }, // browser-based, works anywhere
  { id: "nextcloud", label: "Nextcloud", category: "work", requirements: { stability: 8, easeOfUse: 4 }, install: { flatpak: "com.nextcloud.desktopclient.nextcloud", note: "Desktop sync client; the server itself is typically run via Docker" } },
  { id: "plex", label: "Plex Media Server", category: "work", requirements: { stability: 8, driverFreshness: 5, easeOfUse: 5 }, install: { note: "Official .deb/.rpm from plex.tv/media-server-downloads (not in default repos)" } }, // hardware transcoding (VAAPI on Intel/AMD, NVENC on NVIDIA) needs current enough drivers to recognize the specific GPU generation; falls back to slower CPU transcoding otherwise
  { id: "nginx", label: "Nginx", category: "work", requirements: { stability: 7, easeOfUse: 3 }, install: { packages: { apt: "nginx", dnf: "nginx", pacman: "nginx" } } },
  { id: "gimp", label: "GIMP", category: "work", requirements: { easeOfUse: 4, stability: 4 }, install: { packages: { apt: "gimp", dnf: "gimp", pacman: "gimp" }, flatpak: "org.gimp.GIMP" } },
  { id: "inkscape", label: "Inkscape", category: "work", requirements: { easeOfUse: 5, stability: 4 }, install: { packages: { apt: "inkscape", dnf: "inkscape", pacman: "inkscape" }, flatpak: "org.inkscape.Inkscape" } },
  { id: "audacity", label: "Audacity", category: "work", requirements: { easeOfUse: 5, stability: 4 }, install: { packages: { apt: "audacity", dnf: "audacity", pacman: "audacity" }, flatpak: "org.audacityteam.Audacity" } },
  { id: "kdenlive", label: "Kdenlive", category: "work", requirements: { gamingPerf: 3, driverFreshness: 3, easeOfUse: 4, stability: 3 }, install: { packages: { apt: "kdenlive", dnf: "kdenlive", pacman: "kdenlive" }, flatpak: "org.kde.kdenlive" } },
  { id: "davinciresolve", label: "DaVinci Resolve", category: "work", requirements: { gamingPerf: 8, driverFreshness: 8, easeOfUse: 2 }, install: { note: "Official installer only from blackmagicdesign.com, no repo or Flatpak; the free version's dependency resolution is famously fussy outside Ubuntu-based distros" } }, // GPU-accelerated render pipeline wants current CUDA (NVIDIA) or ROCm (AMD), same class of requirement as Blender's Cycles
  { id: "ansible", label: "Ansible", category: "work", requirements: { stability: 5, easeOfUse: 5 }, install: { packages: { apt: "ansible", dnf: "ansible", pacman: "ansible" } } },
  { id: "terraform", label: "Terraform", category: "work", requirements: { stability: 6, easeOfUse: 4 }, install: { note: "Official releases only from developer.hashicorp.com/terraform/downloads; HashiCorp's 2023 license change pulled it from most distro repos" } },
  { id: "golang", label: "Go development", category: "work", requirements: { stability: 5, easeOfUse: 5 }, install: { packages: { apt: "golang-go", dnf: "golang", pacman: "go" } } },

  // ---------- Browsers ----------
  { id: "firefox", label: "Firefox", category: "browsers", requirements: { easeOfUse: 8, stability: 4 }, install: { packages: { apt: "firefox", dnf: "firefox", pacman: "firefox" }, flatpak: "org.mozilla.firefox" } }, // Mozilla's own project, best-in-class native Linux support
  { id: "chrome", label: "Chrome", category: "browsers", requirements: { easeOfUse: 7, stability: 4 }, install: { note: "Official .deb/.rpm from google.com/chrome (not in default repos; not on Flathub)" } }, // Google ships official .deb/.rpm builds, well-tested on nearly every distro
  { id: "brave", label: "Brave", category: "browsers", requirements: { easeOfUse: 7, isolation: 3 }, install: { flatpak: "com.brave.Browser", note: "Or Brave's own apt/dnf/pacman repo from brave.com/linux" } }, // Chromium-based with built-in tracker/ad blocking, official Linux repos
  { id: "vivaldi", label: "Vivaldi", category: "browsers", requirements: { easeOfUse: 6, stability: 3 }, install: { note: "Official .deb/.rpm repo from vivaldi.com/download (not in default repos)" } }, // Chromium-based, official Linux builds, denser power-user UI than most
  { id: "librewolf", label: "LibreWolf", category: "browsers", requirements: { easeOfUse: 5, isolation: 5 }, install: { flatpak: "io.gitlab.librewolf-community" } }, // hardened Firefox fork; distributed via Flatpak/AUR/manual repo rather than every distro's main repos
  { id: "opera", label: "Opera", category: "browsers", requirements: { easeOfUse: 7, stability: 3 }, install: { flatpak: "com.opera.Opera", note: "Or Opera's own apt/dnf repo from opera.com" } }, // Chromium-based, official .deb/.rpm builds, ships a built-in VPN feature
  { id: "chromium", label: "Chromium", category: "browsers", requirements: { easeOfUse: 7, stability: 4 }, install: { packages: { apt: "chromium", dnf: "chromium", pacman: "chromium" }, flatpak: "org.chromium.Chromium" } }, // the open-source upstream Chrome is built on; in nearly every distro's default repos, often the path of least resistance where Chrome itself needs a manual repo add
  { id: "gnomeweb", label: "GNOME Web (Epiphany)", category: "browsers", requirements: { easeOfUse: 6, stability: 4 }, install: { packages: { apt: "epiphany-browser", dnf: "epiphany", pacman: "epiphany" }, flatpak: "org.gnome.Epiphany" } }, // GNOME's own WebKit-based browser, ships by default on GNOME desktops like Fedora Workstation
  { id: "floorp", label: "Floorp", category: "browsers", requirements: { easeOfUse: 6, stability: 4 }, install: { flatpak: "one.ablaze.floorp" } }, // Firefox-based fork with extra customization, official Linux builds (AppImage/Flatpak/.deb)
  { id: "zenbrowser", label: "Zen Browser", category: "browsers", requirements: { easeOfUse: 6, stability: 3 }, install: { flatpak: "app.zen_browser.zen" } }, // Firefox-based, workspace/vertical-tab focused, distributed via Flatpak/AppImage; newer project, less battle-tested
  { id: "qutebrowser", label: "qutebrowser", category: "browsers", requirements: { easeOfUse: 2, stability: 4 }, install: { packages: { apt: "qutebrowser", dnf: "qutebrowser", pacman: "qutebrowser" }, flatpak: "org.qutebrowser.qutebrowser" } }, // keyboard-driven, vim-style browsing built on Python + QtWebEngine; popular with terminal-first Linux users, real learning curve
  { id: "msedge", label: "Microsoft Edge", category: "browsers", requirements: { easeOfUse: 7, stability: 4 }, install: { note: "Official .deb/.rpm from microsoft.com/edge (not in default repos)" } }, // Chromium-based, genuinely solid Linux support since 2020
  { id: "ungoogledchromium", label: "Ungoogled Chromium", category: "browsers", requirements: { easeOfUse: 5, isolation: 4 }, install: { note: "Community Flatpak/AUR builds only; no official vendor repo, since it's a community de-Googled fork" } },
  { id: "waterfox", label: "Waterfox", category: "browsers", requirements: { easeOfUse: 6, stability: 3 }, install: { note: "Official AppImage/tar builds from waterfox.net/download (not in default repos)" } },
  { id: "falkon", label: "Falkon", category: "browsers", requirements: { easeOfUse: 5, stability: 4 }, install: { packages: { apt: "falkon", dnf: "falkon", pacman: "falkon" }, flatpak: "org.kde.falkon" } }, // KDE's own QtWebEngine browser, ships by default on some Plasma spins
  { id: "konqueror", label: "Konqueror", category: "browsers", requirements: { easeOfUse: 3, stability: 4 }, install: { packages: { apt: "konqueror", dnf: "konqueror", pacman: "konqueror" } } }, // KDE's original browser/file-manager hybrid, still maintained though niche today
  { id: "minbrowser", label: "Min", category: "browsers", requirements: { easeOfUse: 6, stability: 3 }, install: { note: "Official AppImage/tar builds from minbrowser.org (not in default repos)" } }, // minimalist browser built around a distraction-free reading/browsing UI
  { id: "thorium", label: "Thorium", category: "browsers", requirements: { easeOfUse: 4, gamingPerf: 3, driverFreshness: 2 }, install: { note: "No repo; official builds are GitHub releases (.deb/.AppImage) from the Thorium project, not Flathub" } }, // performance-tuned Chromium fork with extra CPU optimizations, community project not Google

  // ---------- Security ----------
  { id: "sandboxing", label: "Strong sandboxing / isolation", category: "security", requirements: { isolation: 10, easeOfUse: 2 } },
  { id: "vpn", label: "VPN-heavy networking", category: "security", requirements: { isolation: 6, stability: 5 } },
  { id: "minimalattack", label: "Minimal attack surface, no GUI", category: "security", requirements: { isolation: 7, easeOfUse: 1 } },
  { id: "fde", label: "Full-disk encryption by default", category: "security", requirements: { isolation: 5, easeOfUse: 4 } },
  { id: "torbrowser", label: "Tor Browser", category: "security", requirements: { isolation: 8, easeOfUse: 3 }, install: { packages: { apt: "torbrowser-launcher" }, flatpak: "com.github.micahflee.torbrowser-launcher" } },
  { id: "flatpak", label: "Sandboxed apps (Flatpak)", category: "security", requirements: { isolation: 6, easeOfUse: 5 }, install: { packages: { apt: "flatpak", dnf: "flatpak", pacman: "flatpak" }, note: "Preinstalled by default on Fedora, Bazzite, and other rpm-ostree distros" } },
  { id: "wireguard", label: "Self-hosted VPN (WireGuard)", category: "security", requirements: { isolation: 5, stability: 6, easeOfUse: 3 }, install: { packages: { apt: "wireguard", dnf: "wireguard-tools", pacman: "wireguard-tools" } } },
  { id: "airgapped", label: "Air-gapped / offline use", category: "security", requirements: { isolation: 9, easeOfUse: 2 } },
  { id: "protonvpn", label: "Proton VPN", category: "security", requirements: { isolation: 5, easeOfUse: 6 }, install: { note: "Official apt/dnf/pacman repo from protonvpn.com/support/linux-vpn-tool" } }, // polished official Linux client
  { id: "mullvad", label: "Mullvad VPN", category: "security", requirements: { isolation: 6, easeOfUse: 5 }, install: { flatpak: "net.mullvad.MullvadVPN", note: "Or official .deb/.rpm from mullvad.net/download/app/linux" } },
  { id: "veracrypt", label: "VeraCrypt", category: "security", requirements: { isolation: 5, easeOfUse: 4 }, install: { note: "Official .deb/.rpm/PPA from veracrypt.fr/en/Downloads.html (not in most default repos)" } }, // container-based, more manual than FDE
  { id: "bitwarden", label: "Bitwarden", category: "security", requirements: { isolation: 3, easeOfUse: 7 }, install: { flatpak: "com.bitwarden.desktop" } },
  { id: "keepassxc", label: "KeePassXC", category: "security", requirements: { isolation: 4, easeOfUse: 5 }, install: { packages: { apt: "keepassxc", dnf: "keepassxc", pacman: "keepassxc" }, flatpak: "org.keepassxc.KeePassXC" } }, // local-only vault, more setup than a cloud manager
  { id: "yubikey", label: "YubiKey / hardware 2FA", category: "security", requirements: { isolation: 5, easeOfUse: 4 }, install: { packages: { apt: "yubikey-manager", dnf: "yubikey-manager", pacman: "yubikey-manager" } } }, // needs udev rules on some distros
  { id: "wireshark", label: "Wireshark", category: "security", requirements: { isolation: 4, easeOfUse: 3 }, install: { packages: { apt: "wireshark", dnf: "wireshark", pacman: "wireshark-qt" } } },
  { id: "nmap", label: "Nmap", category: "security", requirements: { isolation: 4, easeOfUse: 3 }, install: { packages: { apt: "nmap", dnf: "nmap", pacman: "nmap" } } },
  { id: "tailscale", label: "Tailscale", category: "security", requirements: { isolation: 4, stability: 5, easeOfUse: 7 }, install: { packages: { pacman: "tailscale" }, note: "Debian/Ubuntu and Fedora need Tailscale's own apt/dnf repo from tailscale.com/download/linux" } }, // near-zero-config mesh VPN
  { id: "gpg", label: "GPG / PGP encryption", category: "security", requirements: { isolation: 5, easeOfUse: 2 }, install: { packages: { apt: "gnupg", dnf: "gnupg2", pacman: "gnupg" } } }, // famously unfriendly UX
  { id: "luks", label: "LUKS disk encryption", category: "security", requirements: { isolation: 6, easeOfUse: 3 }, install: { packages: { apt: "cryptsetup", dnf: "cryptsetup", pacman: "cryptsetup" } } }, // installer-integrated, but recovery is manual
  { id: "apparmor", label: "AppArmor profiles", category: "security", requirements: { isolation: 7, easeOfUse: 2 }, install: { packages: { apt: "apparmor", pacman: "apparmor" }, note: "Enabled by default on Debian/Ubuntu; Fedora uses SELinux instead" } }, // on by default on some distro families, manual on others
  { id: "clamav", label: "ClamAV", category: "security", requirements: { isolation: 3, easeOfUse: 3 }, install: { packages: { apt: "clamav", dnf: "clamav", pacman: "clamav" } } },
  { id: "fail2ban", label: "Fail2ban", category: "security", requirements: { isolation: 5, stability: 5, easeOfUse: 3 }, install: { packages: { apt: "fail2ban", dnf: "fail2ban", pacman: "fail2ban" } } },
  { id: "ufw", label: "UFW firewall", category: "security", requirements: { isolation: 5, easeOfUse: 4 }, install: { packages: { apt: "ufw", pacman: "ufw" }, note: "Fedora favors firewalld instead; ufw isn't in Fedora's default repos" } },
  { id: "firejail", label: "Firejail", category: "security", requirements: { isolation: 7, easeOfUse: 3 }, install: { packages: { apt: "firejail", dnf: "firejail", pacman: "firejail" } } }, // per-app sandboxing via Linux namespaces, lighter-weight than a full container
  { id: "onepassword", label: "1Password", category: "security", requirements: { isolation: 3, easeOfUse: 7 }, install: { packages: { apt: "1password", dnf: "1password" }, note: "Arch only via the AUR, not the official repos" } }, // official Linux app since 2021 with system-wide unlock/autofill via a background agent
  { id: "onionshare", label: "OnionShare", category: "security", requirements: { isolation: 7, easeOfUse: 4 }, install: { flatpak: "org.onionshare.OnionShare" } }, // anonymous file sharing/hosting over Tor

  // ---------- Communication ----------
  { id: "discord", label: "Discord", category: "communication", requirements: { easeOfUse: 7 }, install: { flatpak: "com.discordapp.Discord", note: "Or official .deb from discord.com/download" } },
  { id: "slack", label: "Slack", category: "communication", requirements: { easeOfUse: 7, stability: 3 }, install: { note: "Official .deb/.rpm from slack.com/downloads/linux (not in default repos)" } },
  { id: "msteams", label: "Microsoft Teams", category: "communication", requirements: { easeOfUse: 5, stability: 4 }, install: { note: "No native Linux client since 2022; PWA via browser only at teams.microsoft.com" } }, // the weakest of the bunch on Linux, PWA-only now
  { id: "zoom", label: "Zoom", category: "communication", requirements: { easeOfUse: 6, driverFreshness: 3, stability: 3 }, install: { flatpak: "us.zoom.Zoom", note: "Or official .deb/.rpm from zoom.us/download" } }, // uses VAAPI hardware video decode/encode when available, but falls back to software cleanly, so driver freshness barely matters here
  { id: "googlemeet", label: "Google Meet", category: "communication", requirements: { easeOfUse: 8, stability: 3 }, install: { note: "Browser-based, no install needed (meet.google.com)" } }, // browser-based, just works
  { id: "signal", label: "Signal", category: "communication", requirements: { easeOfUse: 7, isolation: 4 }, install: { packages: { apt: "signal-desktop" }, flatpak: "org.signal.Signal" } }, // excellent native Linux app
  { id: "telegram", label: "Telegram", category: "communication", requirements: { easeOfUse: 8, isolation: 2 }, install: { packages: { apt: "telegram-desktop", dnf: "telegram-desktop", pacman: "telegram-desktop" }, flatpak: "org.telegram.desktop" } }, // excellent native Linux app
  { id: "whatsapp", label: "WhatsApp", category: "communication", requirements: { easeOfUse: 7 }, install: { note: "No official Linux app; use the web app at web.whatsapp.com or an unofficial Electron wrapper" } }, // web/Electron wrapper, no true native app
  { id: "matrixelement", label: "Matrix / Element", category: "communication", requirements: { easeOfUse: 5, isolation: 5 }, install: { flatpak: "im.riot.Riot" } },
  { id: "thunderbird", label: "Thunderbird (email)", category: "communication", requirements: { easeOfUse: 7, stability: 5 }, install: { packages: { apt: "thunderbird", dnf: "thunderbird", pacman: "thunderbird" }, flatpak: "org.mozilla.Thunderbird" } }, // Mozilla project, first-class Linux support
  { id: "protonmail", label: "Proton Mail", category: "communication", requirements: { easeOfUse: 7, isolation: 4 }, install: { note: "Official .deb/.rpm from proton.me/mail/bridge (desktop app needs Proton Mail Bridge for third-party clients)" } }, // desktop clients need Proton Mail Bridge
  { id: "mumble", label: "Mumble", category: "communication", requirements: { easeOfUse: 4, stability: 5 }, install: { packages: { apt: "mumble", dnf: "mumble", pacman: "mumble" } } },
  { id: "teamspeak", label: "TeamSpeak", category: "communication", requirements: { easeOfUse: 5, stability: 4 }, install: { note: "Official binary from teamspeak.com/en/downloads (not in default repos)" } },
  { id: "skype", label: "Skype", category: "communication", requirements: { easeOfUse: 5, stability: 3 }, install: { flatpak: "com.skype.Client" } }, // legacy Electron app, historically flaky on Linux
  { id: "irc", label: "IRC (WeeChat / HexChat)", category: "communication", requirements: { stability: 5 }, install: { packages: { apt: "weechat", dnf: "weechat", pacman: "weechat" } } }, // terminal-native; desktop ease-of-use doesn't apply either way
  { id: "wireapp", label: "Wire", category: "communication", requirements: { easeOfUse: 6, isolation: 5 }, install: { note: "Official .deb/AppImage from wire.com/en/download (not in default repos)" } },
  { id: "session", label: "Session messenger", category: "communication", requirements: { easeOfUse: 6, isolation: 6 }, install: { note: "Official .deb/AppImage from getsession.org/download (not in default repos)" } }, // onion-routed, more overhead
  { id: "rocketchat", label: "Rocket.Chat", category: "communication", requirements: { easeOfUse: 5, stability: 5 }, install: { note: "Official .deb/.rpm from rocket.chat/install (desktop client; server is typically run via Docker)" } },
  { id: "googlechat", label: "Google Chat", category: "communication", requirements: { easeOfUse: 7, stability: 3 }, install: { note: "Browser-based, no install needed (chat.google.com)" } },
  { id: "messenger", label: "Facebook Messenger", category: "communication", requirements: { easeOfUse: 8 }, install: { note: "No official Linux app; use the web app at messenger.com or an unofficial Electron wrapper" } },
  { id: "zulip", label: "Zulip", category: "communication", requirements: { easeOfUse: 6, stability: 4 }, install: { flatpak: "org.zulip.Zulip" } },
  { id: "jitsimeet", label: "Jitsi Meet", category: "communication", requirements: { easeOfUse: 8, stability: 3 }, install: { note: "Browser-based, no install needed (meet.jit.si)" } },
  { id: "viber", label: "Viber", category: "communication", requirements: { easeOfUse: 5, stability: 3 }, install: { flatpak: "com.viber.Viber" } },
  { id: "jami", label: "Jami", category: "communication", requirements: { easeOfUse: 4, isolation: 6 }, install: { packages: { apt: "jami", dnf: "jami" } } }, // decentralized/P2P messaging and calls, no central server
  { id: "webex", label: "Webex", category: "communication", requirements: { easeOfUse: 5, stability: 4 }, install: { note: "Official .deb from webex.com/downloads.html (not in default repos)" } },
];
