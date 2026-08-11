import { gpuOptions, formFactorOptions, type GpuVendor, type FormFactor } from "../data/hardware";

interface HardwareSelectProps {
  gpuVendor: GpuVendor | null;
  onGpuChange: (value: GpuVendor | null) => void;
  formFactor: FormFactor | null;
  onFormFactorChange: (value: FormFactor | null) => void;
}

export function HardwareSelect({
  gpuVendor,
  onGpuChange,
  formFactor,
  onFormFactorChange,
}: HardwareSelectProps) {
  return (
    <div className="hardware-select">
      <div className="hardware-row">
        <p className="column-label">Your GPU (optional, changes results a lot)</p>
        <div className="hardware-options">
          {gpuOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`hardware-chip${gpuVendor === opt.id ? " active" : ""}`}
              onClick={() => onGpuChange(gpuVendor === opt.id ? null : opt.id)}
              title={opt.description}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="hardware-row">
        <p className="column-label">Device (optional)</p>
        <div className="hardware-options">
          {formFactorOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`hardware-chip${formFactor === opt.id ? " active" : ""}`}
              onClick={() => onFormFactorChange(formFactor === opt.id ? null : opt.id)}
              title={opt.description}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
