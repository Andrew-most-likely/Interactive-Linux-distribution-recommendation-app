import type { DimensionScores } from "./dimensions";

export type Category = "games" | "work" | "security" | "communication";

export interface Item {
  id: string;
  label: string;
  category: Category;
  requirements: DimensionScores; // how much this item cares about each dimension, 0-10
}

export const items: Item[] = [
  // ---------- Games ----------
  // Each item is reasoned individually from real-world Linux/Proton behavior
  // (native ports, anti-cheat friction, launcher quirks) rather than a
  // generic "genre" template.
  { id: "cs2", label: "Counter-Strike 2", category: "games", requirements: { gamingPerf: 9, driverFreshness: 8, easeOfUse: 3 } },
  { id: "valorant", label: "Valorant", category: "games", requirements: { gamingPerf: 8, driverFreshness: 8, easeOfUse: 2 } }, // Vanguard anti-cheat blocks Linux outright
  { id: "bg3", label: "Baldur's Gate 3", category: "games", requirements: { gamingPerf: 6, driverFreshness: 5, easeOfUse: 4 } },
  { id: "minecraft", label: "Minecraft", category: "games", requirements: { gamingPerf: 3, driverFreshness: 2, easeOfUse: 6 } }, // runs on the JVM, GPU load is modest
  { id: "eldenring", label: "Elden Ring", category: "games", requirements: { gamingPerf: 8, driverFreshness: 7, easeOfUse: 4 } },
  { id: "apex", label: "Apex Legends", category: "games", requirements: { gamingPerf: 8, driverFreshness: 8, easeOfUse: 2 } }, // EAC's kernel driver blocks Linux for this title specifically
  { id: "cyberpunk", label: "Cyberpunk 2077", category: "games", requirements: { gamingPerf: 9, driverFreshness: 9, easeOfUse: 4 } },
  { id: "stardew", label: "Stardew Valley", category: "games", requirements: { gamingPerf: 2, driverFreshness: 1, easeOfUse: 7 } },
  { id: "lol", label: "League of Legends", category: "games", requirements: { gamingPerf: 5, driverFreshness: 4, easeOfUse: 3 } }, // Riot's Vanguard rollout made this harder to run than it used to be
  { id: "fortnite", label: "Fortnite", category: "games", requirements: { gamingPerf: 8, driverFreshness: 8, easeOfUse: 3 } },
  { id: "gtav", label: "Grand Theft Auto V", category: "games", requirements: { gamingPerf: 6, driverFreshness: 5, easeOfUse: 6 } }, // one of the best-supported AAA titles under Proton
  { id: "rdr2", label: "Red Dead Redemption 2", category: "games", requirements: { gamingPerf: 9, driverFreshness: 9, easeOfUse: 3 } },
  { id: "skyrim", label: "Skyrim", category: "games", requirements: { gamingPerf: 4, driverFreshness: 3, easeOfUse: 6 } }, // old engine, runs everywhere, mods can add setup overhead
  { id: "terraria", label: "Terraria", category: "games", requirements: { gamingPerf: 1, driverFreshness: 1, easeOfUse: 8 } }, // has an official native Linux build
  { id: "wow", label: "World of Warcraft", category: "games", requirements: { gamingPerf: 6, driverFreshness: 5, easeOfUse: 3, stability: 4 } }, // Battle.net launcher friction on Linux
  { id: "hollowknight", label: "Hollow Knight", category: "games", requirements: { gamingPerf: 1, driverFreshness: 1, easeOfUse: 7 } }, // native Linux build
  { id: "civ6", label: "Sid Meier's Civilization VI", category: "games", requirements: { gamingPerf: 3, driverFreshness: 2, easeOfUse: 6 } }, // native Linux port
  { id: "rocketleague", label: "Rocket League", category: "games", requirements: { gamingPerf: 6, driverFreshness: 5, easeOfUse: 4 } }, // lost its native Linux build after the Epic acquisition
  { id: "hades", label: "Hades", category: "games", requirements: { gamingPerf: 2, driverFreshness: 1, easeOfUse: 7 } }, // native Linux build, excellent compatibility
  { id: "forzahorizon5", label: "Forza Horizon 5", category: "games", requirements: { gamingPerf: 8, driverFreshness: 9, easeOfUse: 4 } },

  // ---------- Work ----------
  { id: "vscode", label: "VS Code", category: "work", requirements: { easeOfUse: 6, stability: 4 } },
  { id: "homeserver", label: "Self-hosting / home server", category: "work", requirements: { stability: 9, easeOfUse: 3 } },
  { id: "blender", label: "Blender", category: "work", requirements: { gamingPerf: 6, driverFreshness: 7, easeOfUse: 4 } }, // GPU render kernels want current drivers
  { id: "browser", label: "Heavy browser multitasking", category: "work", requirements: { easeOfUse: 6, stability: 4 } },
  { id: "docker", label: "Docker / containers", category: "work", requirements: { stability: 7, easeOfUse: 4 } },
  { id: "jetbrains", label: "JetBrains IDEs", category: "work", requirements: { easeOfUse: 5, stability: 4 } },
  { id: "obs", label: "OBS Studio / streaming", category: "work", requirements: { gamingPerf: 4, driverFreshness: 5, easeOfUse: 5 } },
  { id: "nodejs", label: "Node.js development", category: "work", requirements: { stability: 5, easeOfUse: 5 } },
  { id: "neovim", label: "Neovim / Vim", category: "work", requirements: { easeOfUse: 2, stability: 5 } }, // steep to configure, rock solid once set up
  { id: "git", label: "Git (command line)", category: "work", requirements: { easeOfUse: 2, stability: 4 } },
  { id: "python", label: "Python development", category: "work", requirements: { easeOfUse: 6, stability: 4 } }, // first-class citizen on nearly every distro
  { id: "kubernetes", label: "Kubernetes / kubectl", category: "work", requirements: { stability: 8, easeOfUse: 2 } },
  { id: "virtualbox", label: "VirtualBox", category: "work", requirements: { stability: 6, driverFreshness: 3, easeOfUse: 4 } }, // kernel module compatibility varies by distro
  { id: "libreoffice", label: "LibreOffice", category: "work", requirements: { easeOfUse: 7, stability: 4 } },
  { id: "notion", label: "Notion", category: "work", requirements: { easeOfUse: 6, stability: 3 } }, // Electron-wrapped, no true native Linux app
  { id: "figma", label: "Figma", category: "work", requirements: { easeOfUse: 7, stability: 3 } }, // browser-based, works anywhere
  { id: "firefox", label: "Firefox", category: "work", requirements: { easeOfUse: 8, stability: 4 } }, // best-in-class native Linux support
  { id: "nextcloud", label: "Nextcloud", category: "work", requirements: { stability: 8, easeOfUse: 4 } },
  { id: "plex", label: "Plex Media Server", category: "work", requirements: { stability: 8, driverFreshness: 5, easeOfUse: 5 } }, // hardware transcoding wants fresh GPU drivers
  { id: "nginx", label: "Nginx", category: "work", requirements: { stability: 7, easeOfUse: 3 } },

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
  { id: "msteams", label: "Microsoft Teams", category: "communication", requirements: { easeOfUse: 5, stability: 4 } }, // the weakest of the bunch on Linux — PWA-only now
  { id: "zoom", label: "Zoom", category: "communication", requirements: { easeOfUse: 6, driverFreshness: 3, stability: 3 } },
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
