import { motion, useReducedMotion } from "framer-motion";

import archLogo from "../assets/distros/arch.png";
import debianLogo from "../assets/distros/debian.png";
import fedoraLogo from "../assets/distros/fedora.svg";
import mintLogo from "../assets/distros/mint.svg";
import ubuntuLogo from "../assets/distros/ubuntu.png";
import bazziteLogo from "../assets/distros/bazzite.svg";
import qubesLogo from "../assets/distros/qubes.png";
import poposLogo from "../assets/distros/popos.svg";
import cachyosLogo from "../assets/distros/cachyos.svg";
import garudaLogo from "../assets/distros/garuda.png";
import manjaroLogo from "../assets/distros/manjaro.png";
import tailsLogo from "../assets/distros/tails.svg";
import gentooLogo from "../assets/distros/gentoo.png";
import kaliLogo from "../assets/distros/kali.png";
import voidlinuxLogo from "../assets/distros/voidlinux.svg";
import mxlinuxLogo from "../assets/distros/mxlinux.svg";
import zorinosLogo from "../assets/distros/zorinos.svg";
import opensuseLogo from "../assets/distros/opensuse.svg";
import nixosLogo from "../assets/distros/nixos.png";
import silverblueLogo from "../assets/distros/silverblue.png";

interface LogoShapeConfig {
  src: string;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  yRange: number;
  rotateRange: number;
}

// Fixed, hand-placed rather than randomized so the layout is stable across
// re-renders and reloads: real distro logos, desaturated and near-invisible,
// drifting slowly as ambient texture rather than content to read.
const SHAPES: LogoShapeConfig[] = [
  { src: archLogo, size: 52, top: "6%", left: "10%", duration: 24, delay: 0, yRange: 18, rotateRange: 6 },
  { src: debianLogo, size: 40, top: "18%", left: "82%", duration: 20, delay: 3, yRange: 22, rotateRange: -5 },
  { src: fedoraLogo, size: 60, top: "46%", left: "5%", duration: 27, delay: 1, yRange: 16, rotateRange: 4 },
  { src: mintLogo, size: 44, top: "70%", left: "90%", duration: 21, delay: 5, yRange: 20, rotateRange: -6 },
  { src: ubuntuLogo, size: 48, top: "84%", left: "16%", duration: 25, delay: 2, yRange: 18, rotateRange: 5 },
  { src: bazziteLogo, size: 36, top: "10%", left: "58%", duration: 19, delay: 4, yRange: 24, rotateRange: -4 },
  { src: qubesLogo, size: 50, top: "60%", left: "40%", duration: 26, delay: 6, yRange: 16, rotateRange: 6 },
  { src: poposLogo, size: 38, top: "33%", left: "72%", duration: 18, delay: 1.5, yRange: 22, rotateRange: -5 },
  { src: cachyosLogo, size: 56, top: "78%", left: "58%", duration: 23, delay: 7, yRange: 18, rotateRange: 4 },
  { src: garudaLogo, size: 42, top: "16%", left: "30%", duration: 22, delay: 2.5, yRange: 20, rotateRange: -6 },
  { src: manjaroLogo, size: 46, top: "50%", left: "88%", duration: 20, delay: 5.5, yRange: 20, rotateRange: 5 },
  { src: tailsLogo, size: 40, top: "90%", left: "45%", duration: 24, delay: 3.5, yRange: 18, rotateRange: -4 },
  { src: gentooLogo, size: 44, top: "5%", left: "40%", duration: 21, delay: 0.5, yRange: 22, rotateRange: 6 },
  { src: kaliLogo, size: 38, top: "38%", left: "94%", duration: 19, delay: 6.5, yRange: 24, rotateRange: -5 },
  { src: voidlinuxLogo, size: 34, top: "64%", left: "20%", duration: 17, delay: 4.5, yRange: 20, rotateRange: 5 },
  { src: mxlinuxLogo, size: 48, top: "26%", left: "18%", duration: 25, delay: 1, yRange: 16, rotateRange: -4 },
  { src: zorinosLogo, size: 36, top: "94%", left: "70%", duration: 18, delay: 7.5, yRange: 22, rotateRange: 6 },
  { src: opensuseLogo, size: 46, top: "55%", left: "65%", duration: 23, delay: 2, yRange: 18, rotateRange: -6 },
  { src: nixosLogo, size: 52, top: "12%", left: "94%", duration: 26, delay: 4, yRange: 16, rotateRange: 4 },
  { src: silverblueLogo, size: 40, top: "72%", left: "4%", duration: 20, delay: 6, yRange: 20, rotateRange: -5 },
];

export function FloatingShapes() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="floating-shapes" aria-hidden="true">
      {SHAPES.map((s, i) => (
        <motion.img
          key={i}
          src={s.src}
          className="floating-shape"
          style={{ width: s.size, height: s.size, top: s.top, left: s.left }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -s.yRange, s.yRange * 0.5, 0],
                  rotate: [0, s.rotateRange, -s.rotateRange * 0.6, 0],
                }
          }
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
