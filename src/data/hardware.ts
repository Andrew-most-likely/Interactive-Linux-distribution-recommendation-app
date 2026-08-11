import type { Item } from "./items";

export type GpuVendor = "nvidia" | "amd" | "intel";

export interface GpuOption {
  id: GpuVendor;
  label: string;
  description: string;
  driverFreshness: number; // how much this vendor's stack cares about kernel/driver freshness, 0-10
}

// NVIDIA's proprietary driver genuinely needs a current kernel to work well
// (and can outright fail to boot to a desktop on very new cards with an old
// kernel). AMD and Intel ship in-kernel open-source drivers that are far
// less picky about how current the distro is.
export const gpuOptions: GpuOption[] = [
  {
    id: "nvidia",
    label: "NVIDIA",
    description: "Proprietary driver, genuinely wants a current kernel",
    driverFreshness: 9,
  },
  {
    id: "amd",
    label: "AMD",
    description: "Open-source driver, in-kernel, works almost anywhere",
    driverFreshness: 3,
  },
  {
    id: "intel",
    label: "Intel",
    description: "Open-source driver, newest Arc GPUs want a fresher kernel",
    driverFreshness: 4,
  },
];

export function gpuHardwareItem(vendor: GpuVendor): Item {
  const option = gpuOptions.find((o) => o.id === vendor)!;
  return {
    id: `hw-${vendor}`,
    label: `${option.label} GPU`,
    category: "games", // unused for hardware picks; scoring only reads requirements
    requirements: { driverFreshness: option.driverFreshness },
  };
}

export type FormFactor = "desktop" | "laptop" | "handheld";

export interface FormFactorOption {
  id: FormFactor;
  label: string;
  description: string;
  requirements: Item["requirements"];
}

// Desktop is the baseline every distro is designed for by default, so it
// doesn't push the score in any direction. Laptops specifically need
// current kernel support for hybrid graphics, Wi-Fi/Bluetooth, and
// suspend/resume to just work. Handhelds (Steam Deck-likes) need a distro
// that's genuinely tuned for controller-first, no-keyboard operation, not
// just one that happens to run games well.
export const formFactorOptions: FormFactorOption[] = [
  {
    id: "desktop",
    label: "Desktop",
    description: "The default case every distro targets, no extra weighting",
    requirements: {},
  },
  {
    id: "laptop",
    label: "Laptop",
    description: "Needs current kernel support for hybrid graphics, Wi-Fi/Bluetooth, and suspend/resume",
    requirements: { driverFreshness: 4, easeOfUse: 4 },
  },
  {
    id: "handheld",
    label: "Handheld",
    description: "Needs a distro genuinely tuned for controller-first, no-keyboard operation (Bazzite-style), not just one that runs games well",
    requirements: { gamingPerf: 5, easeOfUse: 5 },
  },
];

export function formFactorHardwareItem(formFactor: FormFactor): Item | null {
  const option = formFactorOptions.find((o) => o.id === formFactor)!;
  if (Object.keys(option.requirements).length === 0) return null;
  return {
    id: `hw-${formFactor}`,
    label: option.label,
    category: "games",
    requirements: option.requirements,
  };
}
