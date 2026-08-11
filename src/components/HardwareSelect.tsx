import { motion } from "framer-motion";
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
    <>
      <div className="control-group">
        <span className="control-group-label">GPU</span>
        <nav className="tabs hardware-tabs">
          {gpuOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onGpuChange(gpuVendor === opt.id ? null : opt.id)}
              className={`tab${gpuVendor === opt.id ? " active" : ""}`}
              title={opt.description}
            >
              {gpuVendor === opt.id && (
                <motion.span
                  layoutId="tab-active-pill-gpu"
                  className="tab-active-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 34 }}
                />
              )}
              <span className="tab-content">{opt.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="control-group">
        <span className="control-group-label">Device</span>
        <nav className="tabs hardware-tabs">
          {formFactorOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onFormFactorChange(formFactor === opt.id ? null : opt.id)}
              className={`tab${formFactor === opt.id ? " active" : ""}`}
              title={opt.description}
            >
              {formFactor === opt.id && (
                <motion.span
                  layoutId="tab-active-pill-device"
                  className="tab-active-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 34 }}
                />
              )}
              <span className="tab-content">{opt.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
