import { gpuOptions, type GpuVendor } from "../data/hardware";

interface HardwareSelectProps {
  value: GpuVendor | null;
  onChange: (value: GpuVendor | null) => void;
}

export function HardwareSelect({ value, onChange }: HardwareSelectProps) {
  return (
    <div className="hardware-select">
      <p className="column-label">Your GPU (optional, changes results a lot)</p>
      <div className="hardware-options">
        {gpuOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`hardware-chip${value === opt.id ? " active" : ""}`}
            onClick={() => onChange(value === opt.id ? null : opt.id)}
            title={opt.description}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
