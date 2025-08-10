// src/components/SkillsShowcase.tsx
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = ["/images/robot.png", "/images/robot1.png", "/images/robot2.png", "/images/robot3.png"];

export default function SkillsShowcase() {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const timerRef = useRef<number | null>(null);

  // auto-rotate every 3s (pause on hover)
  useEffect(() => {
    if (SLIDES.length <= 1 || hover) return;
    timerRef.current = window.setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      3000
    );
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [hover]);

  return (
    <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-900/40 ring-1 ring-inset ring-white/5 p-4">
      {/* Image frame (same shape/feel as before) */}
      <div
        className="relative overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="aspect-video w-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={SLIDES[index]}
              src={SLIDES[index]}
              alt={`Robot ${index + 1}`}
              className="h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* tiny pager dots in bottom-right (clickable) */}
        {SLIDES.length > 1 && (
          <div className="absolute bottom-3 right-4 flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === index ? "bg-white/80" : "bg-white/35 hover:bg-white/55"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* same pill row under the image */}
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {["Robotics", "AI", "Rust", "Python", "CAD", "Electrical"].map((s) => (
          <div
            key={s}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-800/70 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-300 ring-1 ring-inset ring-white/5"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
