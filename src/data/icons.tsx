import type { LucideIcon } from "lucide-react";
import {
  siCounterstrike,
  siValorant,
  siDiscord,
  siBlender,
  siArchlinux,
  siDebian,
  siFedora,
  siLinuxmint,
  siPopos,
  siQubesos,
  siCachyos,
  siNobaralinux,
  siMxlinux,
  siLinux,
} from "simple-icons";
import { Blocks, Code2, Dices, Server, Globe, ShieldCheck, Terminal, Lock, Network } from "lucide-react";

export type IconDef =
  | { kind: "brand"; path: string; color: string; title: string }
  | { kind: "lucide"; Component: LucideIcon; color: string };

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
  const isNearBlack = relativeLuminance(icon.hex) < 40;
  const color = isNearBlack ? "#e8e4d6" : `#${icon.hex}`;
  return { kind: "brand", path: icon.path, color, title: icon.title };
}

function lucide(Component: LucideIcon, color: string): IconDef {
  return { kind: "lucide", Component, color };
}

export const itemIcons: Record<string, IconDef> = {
  // Games. CS2 and Valorant have real logos; Minecraft and Baldur's Gate 3
  // don't ship in simple-icons (trademark restrictions), so they get an
  // evocative generic icon instead of a fake logo.
  cs2: brand(siCounterstrike),
  valorant: brand(siValorant),
  bg3: lucide(Dices, "#c0392b"),
  minecraft: lucide(Blocks, "#5b8731"),

  // Work
  vscode: lucide(Code2, "#007acc"), // VS Code isn't in simple-icons either; this is their brand blue
  homeserver: lucide(Server, "#b89b6a"),
  discord: brand(siDiscord),
  blender: brand(siBlender),
  browser: lucide(Globe, "#4a90d9"),

  // Security
  sandboxing: lucide(ShieldCheck, "#7c93a8"),
  vpn: lucide(Network, "#5c9fe0"),
  minimalattack: lucide(Terminal, "#d8d3c2"),
  fde: lucide(Lock, "#a39c86"),
};

export const distroIcons: Record<string, IconDef> = {
  // no dedicated logo upstream, tinted Tux stands in
  bazzite: { kind: "brand", path: siLinux.path, color: "#7c4dff", title: "Bazzite" },
  nobara: brand(siNobaralinux),
  cachyos: brand(siCachyos),
  popos: brand(siPopos),
  mint: brand(siLinuxmint),
  fedora: brand(siFedora),
  debian: brand(siDebian),
  arch: brand(siArchlinux),
  qubes: brand(siQubesos),
  mxlinux: brand(siMxlinux),
};
