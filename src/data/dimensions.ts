export type DimensionId =
  | "driverFreshness"
  | "stability"
  | "gamingPerf"
  | "isolation"
  | "easeOfUse";

export interface Dimension {
  id: DimensionId;
  label: string;
  // Shown under a distro's score when this dimension is a meaningful weak
  // point for something the person dragged in. {item} and {distro} are
  // replaced at render time.
  lowText: string;
}

export const dimensions: Dimension[] = [
  {
    id: "driverFreshness",
    label: "Driver freshness",
    lowText:
      "{distro} ships older drivers, so {item} may not perform at its best.",
  },
  {
    id: "stability",
    label: "Long-term stability",
    lowText:
      "{distro} isn't tuned for long-running, always-on use, so {item} may need extra babysitting.",
  },
  {
    id: "gamingPerf",
    label: "Gaming performance",
    lowText:
      "{distro} isn't optimized for gaming workloads, so {item} may run below its potential.",
  },
  {
    id: "isolation",
    label: "Sandboxing / isolation",
    lowText:
      "{distro} doesn't emphasize sandboxing by default, so {item} works against the distro's defaults rather than with them.",
  },
  {
    id: "easeOfUse",
    label: "Ease of use",
    lowText:
      "{distro} expects more manual setup, so {item} may take extra configuration to get working smoothly.",
  },
];

export type DimensionScores = Partial<Record<DimensionId, number>>;
