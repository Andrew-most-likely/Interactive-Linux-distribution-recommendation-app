import type { LucideIcon } from "lucide-react";
import {
  siCounterstrike,
  siValorant,
  siDiscord,
  siBlender,
  siLeagueoflegends,
  siDocker,
  siJetbrains,
  siObsstudio,
  siNodedotjs,
  siTorbrowser,
  siFlatpak,
  siWireguard,
  siFortnite,
  siUndertale,
} from "simple-icons";
import {
  Code2,
  Server,
  Globe,
  ShieldCheck,
  Terminal,
  Lock,
  Network,
  WifiOff,
  Swords,
  Crosshair,
  Blocks,
  Compass,
  Sparkles,
  Rocket,
  Database,
  Cloud,
  FileText,
  Paintbrush,
  KeyRound,
  MessageCircle,
  Video,
  Mail,
  Package,
} from "lucide-react";

import bg3Cover from "../assets/games/bg3.jpg";
import eldenringCover from "../assets/games/eldenring.jpg";
import apexCover from "../assets/games/apex.jpg";
import cyberpunkCover from "../assets/games/cyberpunk.jpg";
import stardewCover from "../assets/games/stardew.jpg";
import minecraftLogo from "../assets/games/minecraft-logo.svg";

import bazziteLogo from "../assets/distros/bazzite.svg";
import nobaraLogo from "../assets/distros/nobara.png";
import cachyosLogo from "../assets/distros/cachyos.svg";
import poposLogo from "../assets/distros/popos.svg";
import mintLogo from "../assets/distros/mint.svg";
import fedoraLogo from "../assets/distros/fedora.svg";
import debianLogo from "../assets/distros/debian.png";
import archLogo from "../assets/distros/arch.png";
import qubesLogo from "../assets/distros/qubes.png";
import mxlinuxLogo from "../assets/distros/mxlinux.svg";

export type IconDef =
  | { kind: "brand"; path: string; color: string; title: string }
  | { kind: "lucide"; Component: LucideIcon; color: string }
  | { kind: "photo"; src: string; alt: string; fit?: "cover" | "contain" };

function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function brand(icon: { path: string; hex: string; title: string }): IconDef {
  // Some brand marks (Counter-Strike, Nobara, MX Linux) ship as pure black,
  // which disappears against this app's dark surfaces — lighten those so
  // they stay legible instead of vanishing.
  const isNearBlack = relativeLuminance(icon.hex) < 60;
  const color = isNearBlack ? "#d6d5d2" : `#${icon.hex}`;
  return { kind: "brand", path: icon.path, color, title: icon.title };
}

function lucide(Component: LucideIcon, color: string): IconDef {
  return { kind: "lucide", Component, color };
}

function photo(src: string, alt: string, fit: "cover" | "contain" = "cover"): IconDef {
  return { kind: "photo", src, alt, fit };
}

// ~10% opacity tinted badge background behind vector icons; photos fill the
// badge themselves, so they get no tint.
export function iconTint(icon: IconDef): string | undefined {
  return icon.kind === "photo" ? undefined : `${icon.color}1a`;
}

// Shared icons for the item clusters that don't have a real logo/cover art —
// grouping by archetype instead of one icon per item keeps ~300+ entries
// visually distinct without hand-picking bespoke art for each.
const shooterIcon = lucide(Crosshair, "#b85c5c");
const partyOnlineIcon = lucide(Compass, "#7a8fae");
const aaaIcon = lucide(Swords, "#a67c52");
const sandboxSurvivalIcon = lucide(Blocks, "#5b8731");
const mmoIcon = lucide(Compass, "#8a6fae");
const indieIcon = lucide(Sparkles, "#c9ac6f");
const strategyIcon = lucide(ShieldCheck, "#7c93a8");
const racingSimIcon = lucide(Rocket, "#c9a227");

const editorTerminalIcon = lucide(Code2, "#6a93b0");
const infraCloudIcon = lucide(Cloud, "#7a9bc4");
const productivityIcon = lucide(FileText, "#b89b6a");
const creativeIcon = lucide(Paintbrush, "#c17c56");
const dbToolIcon = lucide(Database, "#5c8f7a");

const vpnNetworkIcon = lucide(Network, "#5c9fe0");
const isolationIcon = lucide(ShieldCheck, "#7c93a8");
const encryptionIcon = lucide(Lock, "#a39c86");
const authIcon = lucide(KeyRound, "#d8c9a3");
const pentestIcon = lucide(Terminal, "#d8d3c2");

const chatIcon = lucide(MessageCircle, "#c17c56");
const videoCallIcon = lucide(Video, "#4a90d9");
const emailIcon = lucide(Mail, "#8b95a3");

// Generic catch-all so a missing/typo'd id renders something instead of
// crashing — see getItemIcon().
const fallbackIcon = lucide(Package, "#8b95a3");

export const itemIcons: Record<string, IconDef> = {
  // Games. CS2, Valorant, LoL, Fortnite, and Undertale have real brand logos
  // from simple-icons. The originally-curated set has real cover art. The
  // rest are grouped into archetype clusters sharing a generic icon.
  cs2: brand(siCounterstrike),
  valorant: brand(siValorant),
  bg3: photo(bg3Cover, "Baldur's Gate 3"),
  minecraft: photo(minecraftLogo, "Minecraft", "contain"),
  eldenring: photo(eldenringCover, "Elden Ring"),
  apex: photo(apexCover, "Apex Legends"),
  cyberpunk: photo(cyberpunkCover, "Cyberpunk 2077"),
  stardew: photo(stardewCover, "Stardew Valley"),
  lol: brand(siLeagueoflegends),
  fortnite: brand(siFortnite),
  undertale: brand(siUndertale),

  // Competitive / anti-cheat shooters
  r6siege: shooterIcon,
  overwatch2: shooterIcon,
  codwarzone: shooterIcon,
  pubg: shooterIcon,
  destiny2: shooterIcon,
  tarkov: shooterIcon,
  rust: shooterIcon,
  tf2: shooterIcon,
  thefinals: shooterIcon,
  dota2: partyOnlineIcon,
  rocketleague: partyOnlineIcon,
  amongus: partyOnlineIcon,
  fallguys: partyOnlineIcon,

  // AAA single-player
  rdr2: aaaIcon,
  horizonzd: aaaIcon,
  godofwar: aaaIcon,
  hogwarts: aaaIcon,
  starfield: aaaIcon,
  skyrim: aaaIcon,
  fallout4: aaaIcon,
  fallout76: aaaIcon,
  witcher3: aaaIcon,
  darksouls3: aaaIcon,
  sekiro: aaaIcon,
  doometernal: aaaIcon,
  hlalyx: aaaIcon,
  portal2: aaaIcon,
  control: aaaIcon,
  deathstranding: aaaIcon,
  ghostoftsushima: aaaIcon,
  spiderman: aaaIcon,
  re4remake: aaaIcon,
  alanwake2: aaaIcon,
  jedisurvivor: aaaIcon,
  acvalhalla: aaaIcon,
  farcry6: aaaIcon,
  metroexodus: aaaIcon,
  gtav: aaaIcon,

  // Sandbox / builder / survival
  terraria: sandboxSurvivalIcon,
  factorio: sandboxSurvivalIcon,
  satisfactory: sandboxSurvivalIcon,
  valheim: sandboxSurvivalIcon,
  rimworld: sandboxSurvivalIcon,
  nomanssky: sandboxSurvivalIcon,
  subnautica: sandboxSurvivalIcon,
  dontstarve: sandboxSurvivalIcon,
  seaofthieves: sandboxSurvivalIcon,
  arkascended: sandboxSurvivalIcon,
  "7dtd": sandboxSurvivalIcon,
  palworld: sandboxSurvivalIcon,
  deeprockgalactic: sandboxSurvivalIcon,
  corekeeper: sandboxSurvivalIcon,

  // MMOs
  wow: mmoIcon,
  ffxiv: mmoIcon,
  gw2: mmoIcon,
  poe2: mmoIcon,
  osrs: mmoIcon,
  lostark: mmoIcon,
  newworld: mmoIcon,
  diablo4: mmoIcon,

  // Indie / light
  hollowknight: indieIcon,
  celeste: indieIcon,
  hades: indieIcon,
  hades2: indieIcon,
  vampiresurvivors: indieIcon,
  cuphead: indieIcon,
  slaythespire: indieIcon,
  balatro: indieIcon,
  davethediver: indieIcon,
  riskofrain2: indieIcon,
  entergungeon: indieIcon,
  deadcells: indieIcon,

  // Strategy
  civ6: strategyIcon,
  totalwarwh3: strategyIcon,
  xcom2: strategyIcon,
  aoe4: strategyIcon,
  ck3: strategyIcon,
  stellaris: strategyIcon,
  hoi4: strategyIcon,
  sc2: strategyIcon,

  // Racing / sports / simulation
  forzahorizon5: racingSimIcon,
  granturismo7: racingSimIcon,
  f124: racingSimIcon,
  nba2k24: racingSimIcon,
  sims4: racingSimIcon,
  citiesskylines2: racingSimIcon,
  msfs: racingSimIcon,
  ets2: racingSimIcon,
  beatsaber: racingSimIcon,

  // ---------- Work ----------
  vscode: lucide(Code2, "#007acc"), // VS Code isn't in simple-icons either; this is their brand blue
  homeserver: lucide(Server, "#b89b6a"),
  blender: brand(siBlender),
  browser: lucide(Globe, "#4a90d9"),
  docker: brand(siDocker),
  jetbrains: brand(siJetbrains),
  obs: brand(siObsstudio),
  nodejs: brand(siNodedotjs),

  // Editors / terminals / languages
  neovim: editorTerminalIcon,
  sublimetext: editorTerminalIcon,
  androidstudio: editorTerminalIcon,
  eclipse: editorTerminalIcon,
  emacs: editorTerminalIcon,
  helix: editorTerminalIcon,
  zededitor: editorTerminalIcon,
  warpterminal: editorTerminalIcon,
  alacritty: editorTerminalIcon,
  kitty: editorTerminalIcon,
  wezterm: editorTerminalIcon,
  zellij: editorTerminalIcon,
  tmux: editorTerminalIcon,
  fishshell: editorTerminalIcon,
  zsh: editorTerminalIcon,
  python: editorTerminalIcon,
  rustlang: editorTerminalIcon,
  golang: editorTerminalIcon,
  java: editorTerminalIcon,
  dotnet: editorTerminalIcon,
  php: editorTerminalIcon,
  rubyonrails: editorTerminalIcon,

  // Databases / API tooling
  postman: dbToolIcon,
  insomnia: dbToolIcon,
  githubdesktop: dbToolIcon,
  gitkraken: dbToolIcon,
  git: dbToolIcon,
  dbeaver: dbToolIcon,
  tableplus: dbToolIcon,
  pgadmin: dbToolIcon,
  mongodbcompass: dbToolIcon,
  mysqlworkbench: dbToolIcon,
  redisserver: dbToolIcon,
  elasticsearch: dbToolIcon,
  kafka: dbToolIcon,
  rabbitmq: dbToolIcon,

  // Cloud / DevOps / self-hosted infra
  kubernetes: infraCloudIcon,
  terraform: infraCloudIcon,
  ansible: infraCloudIcon,
  awscli: infraCloudIcon,
  gcloudsdk: infraCloudIcon,
  azurecli: infraCloudIcon,
  vagrant: infraCloudIcon,
  virtualbox: infraCloudIcon,
  vmware: infraCloudIcon,
  qemukvm: infraCloudIcon,
  podman: infraCloudIcon,
  jenkins: infraCloudIcon,
  nginx: infraCloudIcon,
  caddyserver: infraCloudIcon,
  snapcraft: infraCloudIcon,
  nextcloud: infraCloudIcon,
  plex: infraCloudIcon,
  jellyfin: infraCloudIcon,
  homeassistant: infraCloudIcon,
  pihole: infraCloudIcon,
  portainer: infraCloudIcon,
  proxmox: infraCloudIcon,
  truenas: infraCloudIcon,
  immich: infraCloudIcon,
  syncthing: infraCloudIcon,
  grafana: infraCloudIcon,
  prometheus: infraCloudIcon,
  sentry: infraCloudIcon,

  // Productivity / office / PM
  libreoffice: productivityIcon,
  msoffice365: productivityIcon,
  googleworkspace: productivityIcon,
  notion: productivityIcon,
  obsidian: productivityIcon,
  todoist: productivityIcon,
  trello: productivityIcon,
  zotero: productivityIcon,
  onlyoffice: productivityIcon,
  wpsoffice: productivityIcon,
  calibre: productivityIcon,
  anki: productivityIcon,
  jiraweb: productivityIcon,
  confluenceweb: productivityIcon,
  linearapp: productivityIcon,
  miro: productivityIcon,
  drawio: productivityIcon,

  // Creative / design / engineering
  gimp: creativeIcon,
  inkscape: creativeIcon,
  krita: creativeIcon,
  davinciresolve: creativeIcon,
  audacity: creativeIcon,
  kdenlive: creativeIcon,
  figma: creativeIcon,
  unity: creativeIcon,
  unrealengine: creativeIcon,
  godot: creativeIcon,
  freecad: creativeIcon,
  openscad: creativeIcon,
  kicad: creativeIcon,

  // Browsers
  firefox: lucide(Globe, "#4a90d9"),
  chrome: lucide(Globe, "#4a90d9"),
  brave: lucide(Globe, "#4a90d9"),
  vivaldi: lucide(Globe, "#4a90d9"),

  // ---------- Security ----------
  sandboxing: lucide(ShieldCheck, "#7c93a8"),
  vpn: lucide(Network, "#5c9fe0"),
  minimalattack: lucide(Terminal, "#d8d3c2"),
  fde: lucide(Lock, "#a39c86"),
  torbrowser: brand(siTorbrowser),
  flatpak: brand(siFlatpak),
  wireguard: brand(siWireguard),
  airgapped: lucide(WifiOff, "#8b95a3"),

  // VPN / proxy / network privacy
  protonvpn: vpnNetworkIcon,
  mullvad: vpnNetworkIcon,
  nordvpn: vpnNetworkIcon,
  openvpn: vpnNetworkIcon,
  tailscale: vpnNetworkIcon,
  i2p: vpnNetworkIcon,
  shadowsocks: vpnNetworkIcon,
  dnscryptproxy: vpnNetworkIcon,
  torsocks: vpnNetworkIcon,
  proxychains: vpnNetworkIcon,
  stunnel: vpnNetworkIcon,
  dnsovertls: vpnNetworkIcon,
  pfsense: vpnNetworkIcon,
  opnsense: vpnNetworkIcon,

  // Sandboxing / isolation / hardening
  firejail: isolationIcon,
  apparmor: isolationIcon,
  selinux: isolationIcon,
  bubblewrap: isolationIcon,
  qubesvms: isolationIcon,
  virtualmachines: isolationIcon,
  grsecurity: isolationIcon,
  seccomp: isolationIcon,
  sshhardening: isolationIcon,
  bastille: isolationIcon,
  anonsurf: isolationIcon,

  // Encryption / storage / backup
  veracrypt: encryptionIcon,
  luks: encryptionIcon,
  gpg: encryptionIcon,
  kryptor: encryptionIcon,
  cryfs: encryptionIcon,
  securedelete: encryptionIcon,
  restic: encryptionIcon,
  borgbackup: encryptionIcon,
  rsyncbackup: encryptionIcon,
  timeshift: encryptionIcon,
  clonezilla: encryptionIcon,
  ageencryption: encryptionIcon,
  sops: encryptionIcon,
  vaultsecrets: encryptionIcon,
  openssl: encryptionIcon,
  certbot: encryptionIcon,
  monerowallet: encryptionIcon,
  electrumwallet: encryptionIcon,

  // Passwords / auth
  bitwarden: authIcon,
  keepassxc: authIcon,
  yubikey: authIcon,
  passwordstore: authIcon,
  passkeys: authIcon,
  duosecurity: authIcon,
  totpauth: authIcon,

  // Forensics / pentest / monitoring
  wireshark: pentestIcon,
  nmap: pentestIcon,
  metasploit: pentestIcon,
  burpsuite: pentestIcon,
  johntheripper: pentestIcon,
  hashcat: pentestIcon,
  tailsos: pentestIcon,
  whonix: pentestIcon,
  kicksecure: pentestIcon,
  usbguard: pentestIcon,
  clamav: pentestIcon,
  fail2ban: pentestIcon,
  ufwfirewall: pentestIcon,
  opensnitch: pentestIcon,
  rkhunter: pentestIcon,
  lynis: pentestIcon,
  aide: pentestIcon,
  suricata: pentestIcon,
  snort: pentestIcon,
  crowdsec: pentestIcon,
  auditd: pentestIcon,
  wazuh: pentestIcon,
  openvas: pentestIcon,
  nikto: pentestIcon,
  sqlmap: pentestIcon,
  aircrackng: pentestIcon,
  hydra: pentestIcon,
  maltego: pentestIcon,
  ghidra: pentestIcon,
  radare2: pentestIcon,
  binwalk: pentestIcon,
  volatility: pentestIcon,
  autopsy: pentestIcon,
  photorec: pentestIcon,
  macchanger: pentestIcon,
  nessus: pentestIcon,
  chkrootkit: pentestIcon,
  tripwire: pentestIcon,
  fwknop: pentestIcon,
  sslscan: pentestIcon,
  yara: pentestIcon,
  cuckoosandbox: pentestIcon,
  remnux: pentestIcon,

  // ---------- Communication ----------
  discord: brand(siDiscord),
  slack: chatIcon,
  msteams: chatIcon,
  signal: chatIcon,
  telegram: chatIcon,
  whatsapp: chatIcon,
  matrixelement: chatIcon,
  irc: chatIcon,
  session: chatIcon,
  briar: chatIcon,
  viber: chatIcon,
  wechat: chatIcon,
  line: chatIcon,
  messenger: chatIcon,
  googlechat: chatIcon,
  rocketchat: chatIcon,
  wireapp: chatIcon,
  threema: chatIcon,
  jami: chatIcon,
  zulip: chatIcon,
  zoom: videoCallIcon,
  googlemeet: videoCallIcon,
  mumble: videoCallIcon,
  teamspeak: videoCallIcon,
  skype: videoCallIcon,
  thunderbird: emailIcon,
  protonmail: emailIcon,
  outlookweb: emailIcon,
};

export function getItemIcon(id: string): IconDef {
  return itemIcons[id] ?? fallbackIcon;
}

export const distroIcons: Record<string, IconDef> = {
  bazzite: photo(bazziteLogo, "Bazzite", "contain"),
  nobara: photo(nobaraLogo, "Nobara", "contain"),
  cachyos: photo(cachyosLogo, "CachyOS", "contain"),
  popos: photo(poposLogo, "Pop!_OS", "contain"),
  mint: photo(mintLogo, "Linux Mint", "contain"),
  fedora: photo(fedoraLogo, "Fedora", "contain"),
  debian: photo(debianLogo, "Debian", "contain"),
  arch: photo(archLogo, "Arch Linux", "contain"),
  qubes: photo(qubesLogo, "Qubes OS", "contain"),
  mxlinux: photo(mxlinuxLogo, "MX Linux", "contain"),
};
