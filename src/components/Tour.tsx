import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface TourStep {
  selector: string;
  title: string;
  body: string;
}

const STEPS: TourStep[] = [
  {
    selector: '[data-tour="masthead"]',
    title: "Welcome to ARL",
    body: "Drag in the games, tools, and preferences you actually use, and we'll recommend the Linux distros that actually fit, updated live as you go.",
  },
  {
    selector: '[data-tour="controls"]',
    title: "Hardware and categories",
    body: "Set your GPU and device type so driver quirks factor into the match, then use these tabs to switch between categories like Games, Work, and Security.",
  },
  {
    selector: '[data-tour="available"]',
    title: "Available",
    body: "Everything in the current category you haven't picked yet. Tap a card, or drag it, to add it to your setup.",
  },
  {
    selector: '[data-tour="setup"]',
    title: "Your setup",
    body: "Everything you've picked so far. Reorder with the arrows or remove anything you change your mind about.",
  },
  {
    selector: '[data-tour="results"]',
    title: "Live match",
    body: "Distro rankings update instantly as your setup changes, ranked by how well each one actually fits what you picked.",
  },
];

const STORAGE_KEY = "arl-tour-seen";
const SPOTLIGHT_PAD = 8;

export function Tour() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const measure = useCallback(() => {
    const el = document.querySelector(STEPS[step].selector);
    setRect(el ? el.getBoundingClientRect() : null);
  }, [step]);

  // First-ever visit: start automatically. Anything already stored means
  // they've seen it (or dismissed it) before, so stay out of the way.
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setActive(true);
  }, []);

  // The masthead help button restarts it on demand, a plain DOM event
  // rather than prop-drilling a setter down from App just for this.
  useEffect(() => {
    const start = () => {
      setStep(0);
      setActive(true);
    };
    window.addEventListener("arl:start-tour", start);
    return () => window.removeEventListener("arl:start-tour", start);
  }, []);

  useEffect(() => {
    if (!active) return;
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [active, measure]);

  function end() {
    localStorage.setItem(STORAGE_KEY, "1");
    setActive(false);
  }

  function next() {
    if (step >= STEPS.length - 1) {
      end();
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  if (!active || !rect) return null;

  const spotlightRect = {
    top: rect.top - SPOTLIGHT_PAD,
    left: rect.left - SPOTLIGHT_PAD,
    width: rect.width + SPOTLIGHT_PAD * 2,
    height: rect.height + SPOTLIGHT_PAD * 2,
  };

  // Prefer placing the dialog below the highlighted section; flip above it
  // once there's not enough room under it near the bottom of the screen.
  const dialogHeight = 200;
  const placeBelow = spotlightRect.top + spotlightRect.height + dialogHeight < window.innerHeight;
  const dialogTop = placeBelow
    ? spotlightRect.top + spotlightRect.height + 16
    : Math.max(16, spotlightRect.top - dialogHeight - 16);
  const dialogLeft = Math.min(
    Math.max(16, spotlightRect.left),
    window.innerWidth - 340 - 16,
  );

  const current = STEPS[step];

  return (
    <>
      <div className="tour-blocker" onClick={end} />
      <motion.div
        className="tour-spotlight"
        animate={{
          top: spotlightRect.top,
          left: spotlightRect.left,
          width: spotlightRect.width,
          height: spotlightRect.height,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="tour-dialog"
          style={{ top: dialogTop, left: dialogLeft }}
          initial={{ opacity: 0, y: placeBelow ? -8 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <button type="button" className="tour-close" aria-label="Close tour" onClick={end}>
            <X size={14} strokeWidth={2.5} />
          </button>
          <p className="tour-step-count">
            {step + 1} / {STEPS.length}
          </p>
          <h3 className="tour-title">{current.title}</h3>
          <p className="tour-body">{current.body}</p>
          <div className="tour-controls">
            <button type="button" className="tour-skip" onClick={end}>
              Skip
            </button>
            <div className="tour-nav">
              {step > 0 && (
                <button type="button" className="tour-nav-btn" onClick={back} aria-label="Previous step">
                  <ArrowLeft size={14} strokeWidth={2.5} />
                </button>
              )}
              <button type="button" className="tour-nav-btn tour-nav-btn-primary" onClick={next}>
                {step === STEPS.length - 1 ? "Done" : "Next"}
                {step < STEPS.length - 1 && <ArrowRight size={14} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
