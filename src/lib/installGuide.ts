import type { Item } from "../data/items";
import type { PackageManager } from "../data/distros";

export interface ResolvedInstall {
  command?: string;
  note?: string;
}

function nativeInstallCommand(pm: PackageManager, pkg: string): string | undefined {
  switch (pm) {
    case "apt":
      return `sudo apt install ${pkg}`;
    case "dnf":
      return `sudo dnf install ${pkg}`;
    case "pacman":
      return `sudo pacman -S ${pkg}`;
    default:
      // Package names for zypper/xbps/emerge/eopkg/nix/rpm-ostree/manual
      // aren't authored per-item (naming conventions diverge too much to
      // guess reliably) — Flatpak is the honest fallback for those below.
      return undefined;
  }
}

function flatpakInstallCommand(appId: string): string {
  return `flatpak install flathub ${appId}`;
}

function steamInstallCommand(pm: PackageManager): ResolvedInstall {
  switch (pm) {
    case "apt":
      return { command: "sudo apt install steam", note: "Needs the multiverse/non-free repo enabled on most distros" };
    case "dnf":
      return { command: "sudo dnf install steam", note: "Needs RPM Fusion (nonfree) enabled first" };
    case "pacman":
      return { command: "sudo pacman -S steam", note: "Needs the multilib repo enabled in /etc/pacman.conf" };
    case "rpm-ostree":
      return { command: flatpakInstallCommand("com.valvesoftware.Steam"), note: "Often preinstalled on gaming-focused images like Bazzite" };
    default:
      return { command: flatpakInstallCommand("com.valvesoftware.Steam") };
  }
}

function resolveGameInstall(item: Item, pm: PackageManager): ResolvedInstall {
  const steam = steamInstallCommand(pm);
  switch (item.linuxSupport) {
    case "native":
      return { command: steam.command, note: "Ships an official native Linux build — installs and runs directly via Steam" };
    case "proton-verified":
      return { command: steam.command, note: "No native build; enable Steam Play/Proton in Settings → Compatibility. Steam Deck Verified, runs smoothly" };
    case "proton-playable":
      return { command: steam.command, note: "No native build; enable Steam Play/Proton in Settings → Compatibility. Playable, but more sensitive to driver/kernel freshness" };
    case "wine-workaround":
      return { note: "Not distributed via Steam or Proton — install through Lutris or a manual Wine prefix instead" };
    case "anticheat-blocked":
      return { note: "Blocked by kernel-level anti-cheat on Linux — there's no working install path on any distro" };
    default:
      return steam;
  }
}

// Resolves an item's real install guidance for one distro's package
// manager: a copyable native package command where the package name is
// verified, a Flatpak command as the universal fallback, or an honest note
// when neither applies (vendor-only .deb/.rpm, web-only, no Linux client).
export function resolveInstall(item: Item, packageManager: PackageManager): ResolvedInstall {
  if (item.custom) {
    return { note: "Unverified — typed in manually, no verified Linux support or install path" };
  }

  if (item.category === "games") return resolveGameInstall(item, packageManager);

  const install = item.install;
  if (!install) return {};

  const nativePkg = install.packages?.[packageManager];
  if (nativePkg) {
    return { command: nativeInstallCommand(packageManager, nativePkg), note: install.note };
  }
  if (install.flatpak) {
    return { command: flatpakInstallCommand(install.flatpak), note: install.note };
  }
  return { note: install.note ?? "No verified install path — check your distro's package manager or the vendor's website" };
}
