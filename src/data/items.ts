import type { DimensionScores } from "./dimensions";

export type Category = "games" | "work" | "browsers" | "security" | "communication";

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

  // ---------- Work ----------
  { id: "vscode", label: "VS Code", category: "work", requirements: { easeOfUse: 6, stability: 4 } },
  { id: "homeserver", label: "Self-hosting / home server", category: "work", requirements: { stability: 9, easeOfUse: 3 } },
  { id: "blender", label: "Blender", category: "work", requirements: { gamingPerf: 6, driverFreshness: 7, easeOfUse: 4 } }, // Cycles GPU rendering needs current CUDA (NVIDIA) or HIP/ROCm (AMD); ROCm in particular tracks a narrow supported kernel/driver range
  { id: "browser", label: "Heavy browser multitasking", category: "work", requirements: { easeOfUse: 6, stability: 4 } },
  { id: "docker", label: "Docker / containers", category: "work", requirements: { stability: 7, easeOfUse: 4 } },
  { id: "jetbrains", label: "JetBrains IDEs", category: "work", requirements: { easeOfUse: 5, stability: 4 } },
  { id: "obs", label: "OBS Studio / streaming", category: "work", requirements: { gamingPerf: 4, driverFreshness: 5, easeOfUse: 5 } }, // NVENC/VAAPI hardware encode wants a reasonably current driver, but OBS still runs fine on software x264 encoding if not
  { id: "nodejs", label: "Node.js development", category: "work", requirements: { stability: 5, easeOfUse: 5 } },
  { id: "neovim", label: "Neovim / Vim", category: "work", requirements: { easeOfUse: 2, stability: 5 } }, // steep to configure, rock solid once set up
  { id: "git", label: "Git (command line)", category: "work", requirements: { easeOfUse: 2, stability: 4 } },
  { id: "python", label: "Python development", category: "work", requirements: { easeOfUse: 6, stability: 4 } }, // first-class citizen on nearly every distro
  { id: "kubernetes", label: "Kubernetes / kubectl", category: "work", requirements: { stability: 8, easeOfUse: 2 } },
  { id: "virtualbox", label: "VirtualBox", category: "work", requirements: { stability: 6, driverFreshness: 3, easeOfUse: 4 } }, // vboxdrv is a kernel module, not a GPU driver; DKMS rebuilds it automatically on most distros, but very new kernels can briefly outpace VirtualBox's official support
  { id: "libreoffice", label: "LibreOffice", category: "work", requirements: { easeOfUse: 7, stability: 4 } },
  { id: "notion", label: "Notion", category: "work", requirements: { easeOfUse: 6, stability: 3 } }, // Electron-wrapped, no true native Linux app
  { id: "figma", label: "Figma", category: "work", requirements: { easeOfUse: 7, stability: 3 } }, // browser-based, works anywhere
  { id: "nextcloud", label: "Nextcloud", category: "work", requirements: { stability: 8, easeOfUse: 4 } },
  { id: "plex", label: "Plex Media Server", category: "work", requirements: { stability: 8, driverFreshness: 5, easeOfUse: 5 } }, // hardware transcoding (VAAPI on Intel/AMD, NVENC on NVIDIA) needs current enough drivers to recognize the specific GPU generation; falls back to slower CPU transcoding otherwise
  { id: "nginx", label: "Nginx", category: "work", requirements: { stability: 7, easeOfUse: 3 } },

  // ---------- Browsers ----------
  { id: "firefox", label: "Firefox", category: "browsers", requirements: { easeOfUse: 8, stability: 4 } }, // Mozilla's own project, best-in-class native Linux support
  { id: "chrome", label: "Chrome", category: "browsers", requirements: { easeOfUse: 7, stability: 4 } }, // Google ships official .deb/.rpm builds, well-tested on nearly every distro
  { id: "brave", label: "Brave", category: "browsers", requirements: { easeOfUse: 7, isolation: 3 } }, // Chromium-based with built-in tracker/ad blocking, official Linux repos
  { id: "vivaldi", label: "Vivaldi", category: "browsers", requirements: { easeOfUse: 6, stability: 3 } }, // Chromium-based, official Linux builds, denser power-user UI than most
  { id: "librewolf", label: "LibreWolf", category: "browsers", requirements: { easeOfUse: 5, isolation: 5 } }, // hardened Firefox fork; distributed via Flatpak/AUR/manual repo rather than every distro's main repos
  { id: "opera", label: "Opera", category: "browsers", requirements: { easeOfUse: 7, stability: 3 } }, // Chromium-based, official .deb/.rpm builds, ships a built-in VPN feature

  // ---------- Security ----------
  { id: "sandboxing", label: "Strong sandboxing / isolation", category: "security", requirements: { isolation: 10, easeOfUse: 2 } },
  { id: "vpn", label: "VPN-heavy networking", category: "security", requirements: { isolation: 6, stability: 5 } },
  { id: "minimalattack", label: "Minimal attack surface, no GUI", category: "security", requirements: { isolation: 7, easeOfUse: 1 } },
  { id: "fde", label: "Full-disk encryption by default", category: "security", requirements: { isolation: 5, easeOfUse: 4 } },
  { id: "torbrowser", label: "Tor Browser", category: "security", requirements: { isolation: 8, easeOfUse: 3 } },
  { id: "flatpak", label: "Sandboxed apps (Flatpak)", category: "security", requirements: { isolation: 6, easeOfUse: 5 } },
  { id: "wireguard", label: "Self-hosted VPN (WireGuard)", category: "security", requirements: { isolation: 5, stability: 6, easeOfUse: 3 } },
  { id: "airgapped", label: "Air-gapped / offline use", category: "security", requirements: { isolation: 9, easeOfUse: 2 } },
  { id: "protonvpn", label: "Proton VPN", category: "security", requirements: { isolation: 5, easeOfUse: 6 } }, // polished official Linux client
  { id: "mullvad", label: "Mullvad VPN", category: "security", requirements: { isolation: 6, easeOfUse: 5 } },
  { id: "veracrypt", label: "VeraCrypt", category: "security", requirements: { isolation: 5, easeOfUse: 4 } }, // container-based, more manual than FDE
  { id: "bitwarden", label: "Bitwarden", category: "security", requirements: { isolation: 3, easeOfUse: 7 } },
  { id: "keepassxc", label: "KeePassXC", category: "security", requirements: { isolation: 4, easeOfUse: 5 } }, // local-only vault, more setup than a cloud manager
  { id: "yubikey", label: "YubiKey / hardware 2FA", category: "security", requirements: { isolation: 5, easeOfUse: 4 } }, // needs udev rules on some distros
  { id: "wireshark", label: "Wireshark", category: "security", requirements: { isolation: 4, easeOfUse: 3 } },
  { id: "nmap", label: "Nmap", category: "security", requirements: { isolation: 4, easeOfUse: 3 } },
  { id: "tailscale", label: "Tailscale", category: "security", requirements: { isolation: 4, stability: 5, easeOfUse: 7 } }, // near-zero-config mesh VPN
  { id: "gpg", label: "GPG / PGP encryption", category: "security", requirements: { isolation: 5, easeOfUse: 2 } }, // famously unfriendly UX
  { id: "luks", label: "LUKS disk encryption", category: "security", requirements: { isolation: 6, easeOfUse: 3 } }, // installer-integrated, but recovery is manual
  { id: "apparmor", label: "AppArmor profiles", category: "security", requirements: { isolation: 7, easeOfUse: 2 } }, // on by default on some distro families, manual on others

  // ---------- Communication ----------
  { id: "discord", label: "Discord", category: "communication", requirements: { easeOfUse: 7 } },
  { id: "slack", label: "Slack", category: "communication", requirements: { easeOfUse: 7, stability: 3 } },
  { id: "msteams", label: "Microsoft Teams", category: "communication", requirements: { easeOfUse: 5, stability: 4 } }, // the weakest of the bunch on Linux, PWA-only now
  { id: "zoom", label: "Zoom", category: "communication", requirements: { easeOfUse: 6, driverFreshness: 3, stability: 3 } }, // uses VAAPI hardware video decode/encode when available, but falls back to software cleanly, so driver freshness barely matters here
  { id: "googlemeet", label: "Google Meet", category: "communication", requirements: { easeOfUse: 8, stability: 3 } }, // browser-based, just works
  { id: "signal", label: "Signal", category: "communication", requirements: { easeOfUse: 7, isolation: 4 } }, // excellent native Linux app
  { id: "telegram", label: "Telegram", category: "communication", requirements: { easeOfUse: 8, isolation: 2 } }, // excellent native Linux app
  { id: "whatsapp", label: "WhatsApp", category: "communication", requirements: { easeOfUse: 7 } }, // web/Electron wrapper, no true native app
  { id: "matrixelement", label: "Matrix / Element", category: "communication", requirements: { easeOfUse: 5, isolation: 5 } },
  { id: "thunderbird", label: "Thunderbird (email)", category: "communication", requirements: { easeOfUse: 7, stability: 5 } }, // Mozilla project, first-class Linux support
  { id: "protonmail", label: "Proton Mail", category: "communication", requirements: { easeOfUse: 7, isolation: 4 } }, // desktop clients need Proton Mail Bridge
  { id: "mumble", label: "Mumble", category: "communication", requirements: { easeOfUse: 4, stability: 5 } },
  { id: "teamspeak", label: "TeamSpeak", category: "communication", requirements: { easeOfUse: 5, stability: 4 } },
  { id: "skype", label: "Skype", category: "communication", requirements: { easeOfUse: 5, stability: 3 } }, // legacy Electron app, historically flaky on Linux
  { id: "irc", label: "IRC (WeeChat / HexChat)", category: "communication", requirements: { easeOfUse: 2, stability: 5 } }, // terminal-native, rock solid, steep learning curve
  { id: "wireapp", label: "Wire", category: "communication", requirements: { easeOfUse: 6, isolation: 5 } },
  { id: "session", label: "Session messenger", category: "communication", requirements: { easeOfUse: 6, isolation: 6 } }, // onion-routed, more overhead
  { id: "rocketchat", label: "Rocket.Chat", category: "communication", requirements: { easeOfUse: 5, stability: 5 } },
  { id: "googlechat", label: "Google Chat", category: "communication", requirements: { easeOfUse: 7, stability: 3 } },
  { id: "messenger", label: "Facebook Messenger", category: "communication", requirements: { easeOfUse: 8 } },
];
