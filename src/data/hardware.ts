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
