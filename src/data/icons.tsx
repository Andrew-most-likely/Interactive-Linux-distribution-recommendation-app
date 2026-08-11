import type { LucideIcon } from "lucide-react";
import {
  siCounterstrike,
  siValorant,
  siLeagueoflegends,
  siFortnite,
  siBlender,
  siDocker,
  siJetbrains,
  siObsstudio,
  siNodedotjs,
  siTorbrowser,
  siFlatpak,
  siWireguard,
  siNeovim,
  siGit,
  siPython,
  siKubernetes,
  siVirtualbox,
  siLibreoffice,
  siNotion,
  siFigma,
  siFirefoxbrowser,
  siNextcloud,
  siPlex,
  siNginx,
  siProtonvpn,
  siMullvad,
  siBitwarden,
  siKeepassxc,
  siWireshark,
  siTailscale,
  siGnuprivacyguard,
  siDiscord,
  siSignal,
  siTelegram,
  siWhatsapp,
  siElement,
  siThunderbird,
  siProtonmail,
  siMumble,
  siTeamspeak,
  siWire,
  siRocketdotchat,
  siGooglemeet,
  siGooglechat,
  siMessenger,
  siZoom,
  siSession,
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
  Compass,
  KeyRound,
  Crosshair,
  MessageCircle,
  Package,
} from "lucide-react";

import bg3Cover from "../assets/games/bg3.jpg";
import eldenringCover from "../assets/games/eldenring.jpg";
import apexCover from "../assets/games/apex.jpg";
import cyberpunkCover from "../assets/games/cyberpunk.jpg";
import stardewCover from "../assets/games/stardew.jpg";
import minecraftLogo from "../assets/games/minecraft-logo.svg";
import gtavCover from "../assets/games/gtav.jpg";
import rdr2Cover from "../assets/games/rdr2.jpg";
import skyrimCover from "../assets/games/skyrim.jpg";
import terrariaCover from "../assets/games/terraria.jpg";
import hollowknightCover from "../assets/games/hollowknight.jpg";
import civ6Cover from "../assets/games/civ6.jpg";
import rocketleagueCover from "../assets/games/rocketleague.jpg";
import hadesCover from "../assets/games/hades.jpg";
import forzahorizon5Cover from "../assets/games/forzahorizon5.jpg";

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
import zorinosLogo from "../assets/distros/zorinos.svg";
import manjaroLogo from "../assets/distros/manjaro.png";
import endeavourosLogo from "../assets/distros/endeavouros.svg";
import garudaLogo from "../assets/distros/garuda.png";
import pikaosLogo from "../assets/distros/pikaos.svg";
import silverblueLogo from "../assets/distros/silverblue.png";
import tailsLogo from "../assets/distros/tails.svg";
import antixLogo from "../assets/distros/antix.png";
import ubuntuLogo from "../assets/distros/ubuntu.png";
import opensuseLogo from "../assets/distros/opensuse.svg";
import nixosLogo from "../assets/distros/nixos.png";
import voidlinuxLogo from "../assets/distros/voidlinux.svg";
import gentooLogo from "../assets/distros/gentoo.png";
import kaliLogo from "../assets/distros/kali.png";
import parrotLogo from "../assets/distros/parrot.svg";
import slackwareLogo from "../assets/distros/slackware.png";
import solusLogo from "../assets/distros/solus.png";
import elementaryLogo from "../assets/distros/elementary.png";
import deepinLogo from "../assets/distros/deepin.png";
import rockylinuxLogo from "../assets/distros/rockylinux.svg";
import kdeneonLogo from "../assets/distros/kdeneon.svg";

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
  // which disappears against this app's dark surfaces, lighten those so
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

// Generic catch-all so a missing/typo'd id renders something instead of
// crashing, see getItemIcon().
const fallbackIcon = lucide(Package, "#8b95a3");

export const itemIcons: Record<string, IconDef> = {
  // Games: real cover art or a real brand logo for every title except
  // World of Warcraft, which has neither available under a reusable license.
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
  gtav: photo(gtavCover, "Grand Theft Auto V"),
  rdr2: photo(rdr2Cover, "Red Dead Redemption 2"),
  skyrim: photo(skyrimCover, "Skyrim"),
  terraria: photo(terrariaCover, "Terraria"),
  wow: lucide(Compass, "#8a6fae"),
  hollowknight: photo(hollowknightCover, "Hollow Knight"),
  civ6: photo(civ6Cover, "Sid Meier's Civilization VI"),
  rocketleague: photo(rocketleagueCover, "Rocket League"),
  hades: photo(hadesCover, "Hades"),
  forzahorizon5: photo(forzahorizon5Cover, "Forza Horizon 5"),

  // Work
  vscode: lucide(Code2, "#007acc"), // VS Code isn't in simple-icons; this is their brand blue
  homeserver: lucide(Server, "#b89b6a"),
  blender: brand(siBlender),
  browser: lucide(Globe, "#4a90d9"),
  docker: brand(siDocker),
  jetbrains: brand(siJetbrains),
  obs: brand(siObsstudio),
  nodejs: brand(siNodedotjs),
  neovim: brand(siNeovim),
  git: brand(siGit),
  python: brand(siPython),
  kubernetes: brand(siKubernetes),
  virtualbox: brand(siVirtualbox),
  libreoffice: brand(siLibreoffice),
  notion: brand(siNotion),
  figma: brand(siFigma),
  firefox: brand(siFirefoxbrowser),
  nextcloud: brand(siNextcloud),
  plex: brand(siPlex),
  nginx: brand(siNginx),

  // Security
  sandboxing: lucide(ShieldCheck, "#7c93a8"),
  vpn: lucide(Network, "#5c9fe0"),
  minimalattack: lucide(Terminal, "#d8d3c2"),
  fde: lucide(Lock, "#a39c86"),
  torbrowser: brand(siTorbrowser),
  flatpak: brand(siFlatpak),
  wireguard: brand(siWireguard),
  airgapped: lucide(WifiOff, "#8b95a3"),
  protonvpn: brand(siProtonvpn),
  mullvad: brand(siMullvad),
  veracrypt: lucide(Lock, "#a39c86"), // no simple-icons brand mark
  bitwarden: brand(siBitwarden),
  keepassxc: brand(siKeepassxc),
  yubikey: lucide(KeyRound, "#d8c9a3"), // no simple-icons brand mark
  wireshark: brand(siWireshark),
  nmap: lucide(Crosshair, "#8b95a3"), // no simple-icons brand mark
  tailscale: brand(siTailscale),
  gpg: brand(siGnuprivacyguard),
  luks: lucide(Lock, "#a39c86"),
  apparmor: lucide(ShieldCheck, "#7c93a8"), // no simple-icons brand mark

  // Communication
  discord: brand(siDiscord),
  slack: lucide(MessageCircle, "#c17c56"), // no simple-icons brand mark (Slackware ≠ Slack)
  msteams: lucide(MessageCircle, "#c17c56"),
  zoom: brand(siZoom),
  googlemeet: brand(siGooglemeet),
  signal: brand(siSignal),
  telegram: brand(siTelegram),
  whatsapp: brand(siWhatsapp),
  matrixelement: brand(siElement),
  thunderbird: brand(siThunderbird),
  protonmail: brand(siProtonmail),
  mumble: brand(siMumble),
  teamspeak: brand(siTeamspeak),
  skype: lucide(MessageCircle, "#4a90d9"), // no simple-icons brand mark
  irc: lucide(Terminal, "#d8d3c2"),
  wireapp: brand(siWire),
  session: brand(siSession),
  rocketchat: brand(siRocketdotchat),
  googlechat: brand(siGooglechat),
  messenger: brand(siMessenger),
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
  zorinos: photo(zorinosLogo, "Zorin OS", "contain"),
  manjaro: photo(manjaroLogo, "Manjaro", "contain"),
  endeavouros: photo(endeavourosLogo, "EndeavourOS", "contain"),
  garuda: photo(garudaLogo, "Garuda Linux", "contain"),
  pikaos: photo(pikaosLogo, "PikaOS", "contain"),
  silverblue: photo(silverblueLogo, "Fedora Silverblue", "contain"),
  tails: photo(tailsLogo, "Tails", "contain"),
  antix: photo(antixLogo, "antiX", "contain"),
  ubuntu: photo(ubuntuLogo, "Ubuntu", "contain"),
  opensuse: photo(opensuseLogo, "openSUSE Tumbleweed", "contain"),
  nixos: photo(nixosLogo, "NixOS", "contain"),
  voidlinux: photo(voidlinuxLogo, "Void Linux", "contain"),
  gentoo: photo(gentooLogo, "Gentoo", "contain"),
  kali: photo(kaliLogo, "Kali Linux", "contain"),
  parrot: photo(parrotLogo, "Parrot OS", "contain"),
  slackware: photo(slackwareLogo, "Slackware", "contain"),
  solus: photo(solusLogo, "Solus", "contain"),
  elementary: photo(elementaryLogo, "elementary OS", "contain"),
  deepin: photo(deepinLogo, "Deepin", "contain"),
  rockylinux: photo(rockylinuxLogo, "Rocky Linux", "contain"),
  kdeneon: photo(kdeneonLogo, "KDE Neon", "contain"),
};
