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

function brand(icon: { path: string; hex: string; title: string }): IconDef {
  return { kind: "brand", path: icon.path, color: `#${icon.hex}`, title: icon.title };
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
  homeserver: lucide(Server, "#5b7052"),
  discord: brand(siDiscord),
  blender: brand(siBlender),
  browser: lucide(Globe, "#4a90d9"),

  // Security
  sandboxing: lucide(ShieldCheck, "#5b7052"),
  vpn: lucide(Network, "#3874d8"),
  minimalattack: lucide(Terminal, "#2b2b28"),
  fde: lucide(Lock, "#6b6b64"),
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
