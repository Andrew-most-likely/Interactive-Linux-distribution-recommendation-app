import { motion } from "framer-motion";

interface ShapeConfig {
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  xRange: number;
  yRange: number;
}

// Fixed, hand-placed rather than randomized so the layout is stable across
// re-renders and reloads — gentle ambient motion, not distracting content.
const SHAPES: ShapeConfig[] = [
  { size: 60, top: "8%", left: "12%", duration: 22, delay: 0, xRange: 30, yRange: 20 },
  { size: 34, top: "20%", left: "78%", duration: 18, delay: 2, xRange: 24, yRange: 30 },
  { size: 90, top: "55%", left: "6%", duration: 28, delay: 1, xRange: 20, yRange: 26 },
  { size: 46, top: "70%", left: "88%", duration: 20, delay: 4, xRange: 26, yRange: 18 },
  { size: 26, top: "35%", left: "45%", duration: 16, delay: 3, xRange: 18, yRange: 24 },
  { size: 70, top: "85%", left: "30%", duration: 25, delay: 5, xRange: 22, yRange: 20 },
  { size: 40, top: "4%", left: "55%", duration: 19, delay: 1.5, xRange: 20, yRange: 28 },
  { size: 55, top: "45%", left: "94%", duration: 24, delay: 6, xRange: 18, yRange: 22 },
  { size: 30, top: "62%", left: "65%", duration: 17, delay: 2.5, xRange: 26, yRange: 20 },
  { size: 80, top: "15%", left: "35%", duration: 30, delay: 0.5, xRange: 16, yRange: 18 },
  { size: 22, top: "92%", left: "50%", duration: 15, delay: 3.5, xRange: 22, yRange: 26 },
  { size: 50, top: "28%", left: "20%", duration: 21, delay: 4.5, xRange: 24, yRange: 20 },
];

export function FloatingShapes() {
  return (
    <div className="floating-shapes" aria-hidden="true">
      {SHAPES.map((s, i) => (
        <motion.div
          key={i}
          className="floating-shape"
          style={{ width: s.size, height: s.size, top: s.top, left: s.left }}
          animate={{
            x: [0, s.xRange, -s.xRange * 0.6, 0],
            y: [0, -s.yRange, s.yRange * 0.5, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
