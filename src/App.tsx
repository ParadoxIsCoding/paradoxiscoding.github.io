// src/App.tsx
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  Sparkles,
} from "lucide-react";

import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import SkillsShowcase from "./components/SkillsShowcase";
import DiscordPresence from "./components/DiscordPresence";

/* ------------------------------ Typewriter ------------------------------ */
function Typewriter({
  phrases,
  speed = 55,
  deleteSpeed = 35,
  pause = 1200,
}: {
  phrases: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const current = phrases[i % phrases.length];

  useEffect(() => {
    let t: number;
    if (!deleting && text.length < current.length) {
      t = window.setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === current.length) {
      t = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      t = window.setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setI((p) => p + 1);
    }
    return () => clearTimeout(t);
  }, [text, deleting, current, speed, deleteSpeed, pause]);

  return (
    <span className="text-indigo-300">
      {text}
      <span className="ml-0.5 inline-block w-[1ch] animate-pulse">|</span>
    </span>
  );
}

/* ---------------------------- Particles Canvas (Stars) ------------------- */
function ParticlesBG({ count = 70 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const particles = useRef<
    { x: number; y: number; vx: number; vy: number; r: number; a: number }[]
  >([]);

  const resize = () => {
    const c = ref.current;
    if (!c) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    c.width = Math.floor(window.innerWidth * dpr);
    c.height = Math.floor(window.innerHeight * dpr);
    c.style.width = "100%";
    c.style.height = "100%";
    const ctx = c.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  };

  useEffect(() => {
    resize();
    particles.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.5 + 0.1,
    }));

    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;
        if (p.y < -10) p.y = window.innerHeight + 10;
        if (p.y > window.innerHeight + 10) p.y = -10;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 opacity-40"
      aria-hidden="true"
    />
  );
}

/* --------------------------------- Motion -------------------------------- */
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="relative py-20 md:py-28 scroll-mt-24">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <motion.h2
          variants={item}
          className="text-3xl md:text-4xl font-bold tracking-tight text-white"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p variants={item} className="mt-2 text-zinc-400 max-w-2xl">
            {subtitle}
          </motion.p>
        )}
        <motion.div variants={item} className="mt-8">
          {children}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
    {children}
  </span>
);

export default function App() {
  const nav = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // phrases for the hero’s animated subtitle
  const phrases = useMemo(
    () => ["Mechatronics Engineer", "Robotics Champion"],
    []
  );

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-zinc-200 antialiased">
      {/* Background accents + stars */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(120,119,198,0.15),rgba(0,0,0,0))]" />
        <div
          className="absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      <ParticlesBG count={100} />

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="group inline-flex items-center gap-2"
          >
            <img
              src="/images/logo.jpg"
              alt="Taha Salman logo"
              className="h-8 w-8 rounded-xl ring-1 ring-white/10 object-cover transform transition-transform duration-200 group-hover:scale-110"
            />
            <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition">
              Taha Salman
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="px-3 py-2 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact">
              <Button size="sm" className="rounded-xl">
                Contact <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative z-10 pt-20 md:pt-28 pb-14">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Pill>
              <Sparkles className="mr-1 h-4 w-4" /> Hello World!
            </Pill>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight text-white">
              Taha Salman
            </h1>

            {/* Animated subtitle */}
            <p className="mt-4 text-lg text-zinc-400 max-w-2xl">
              Year 12 Student at Sunshine Coast Grammar School and aspiring{" "}
              <Typewriter phrases={phrases} />
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button onClick={() => scrollTo("projects")} className="rounded-xl">
                See Projects <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <a href="#" aria-label="Resume placeholder">
                <Button variant="secondary" className="rounded-xl">
                  <FileText className="mr-2 h-4 w-4" /> Download CV
                </Button>
              </a>
            </div>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
                href="https://github.com/ParadoxIsCoding"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
                href="https://www.linkedin.com/in/tahas1/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
                href="mailto:Tahasalman.9t@gmail.com"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
              <DiscordPresence />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500/40 via-fuchsia-500/30 to-cyan-500/30 blur-2xl rounded-3xl opacity-40" />
            <SkillsShowcase />
          </motion.div>
        </div>
      </section>

      {/* About */}
      <Section
        id="about"
        title="About"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">FTC APOC Championship 2025</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              1<sup>st</sup> in the Asia Pacific Open Championships with my Team 20489
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">FTC Nationalls Champion 2024</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              2<sup>nd</sup> in the Australian National Championships with my Team 24089
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">-</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              -
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Projects */}
      <Section
        id="projects"
        title="Projects"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Robotics – FTC */}
          <Card className="group rounded-2xl overflow-hidden">
            <div className="relative">
              <img
                src="/images/apoc_hang.jpeg"
                alt="APOC Hang - FTC Robotics"
                className="aspect-video w-full object-cover group-hover:scale-[1.01] transition-transform"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
            <CardHeader>
              <CardTitle className="text-white">APOC 2025</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              Apart of Team 24089 Iron Lions in the First Tech Challenge™
              <div className="mt-3">
                <a
                  href="https://youtu.be/eLr15aCYTW8?si=Dqk81KM3Jg_pb6ee"
                  className="inline-flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Nationals image */}
          <Card className="group rounded-2xl overflow-hidden">
            <div className="relative">
              <img
                src="/images/nationals.png"
                alt="FTC Nationals"
                className="aspect-video w-full object-cover group-hover:scale-[1.01] transition-transform"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
            <CardHeader>
              <CardTitle className="text-white">Nationals 2024</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              Apart of Team 24089 Iron Lions in the First Tech Challenge™
              <div className="mt-3">
                <a
                  href="https://youtu.be/x4z5jL-8w8A?si=uBjjYfZjW1G_maHx"
                  className="inline-flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200"
                >
                  View <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

    {/* Experience */}
    <Section
      id="experience"
      title="Experience"
    >
      <div className="space-y-4">
        {/* Row 1 */}
        <div className="flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6 ring-1 ring-inset ring-white/5 backdrop-blur transition-colors hover:bg-zinc-900/60">
          <div>
            <div className="text-white font-medium">Robotics Team Lead</div>
            <div className="mt-1 text-sm text-zinc-500">
              2023–2025+ • Team 24089 Iron Lions
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6 ring-1 ring-inset ring-white/5 backdrop-blur transition-colors hover:bg-zinc-900/60">
          <div>
            <div className="text-white font-medium">Robotics Captin</div>
            <div className="mt-1 text-sm text-zinc-500">Sunshine Coast Grammar School</div>
          </div>
        </div>
      </div>
    </Section>



      {/* Contact */}
      <Section id="contact" title="Contact" subtitle="Get in touch with me directly.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white">Say hello</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <input
                  className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Your name"
                />
                <input
                  className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Email"
                />
                <textarea
                  rows={5}
                  className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Message"
                />
                <Button className="rounded-xl w-full">Send</Button>
              </form>
              <p className="mt-4 text-xs text-zinc-500">
                This form is a placeholder. Hook it to your provider (Formspree, Resend, etc.).
              </p>
            </CardContent>
          </Card>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="text-zinc-400">Prefer email? Reach me at:</p>
            <a href="mailto:Tahasalman.9t@gmail.com" className="mt-2 inline-flex items-center gap-2 text-white">
              <Mail className="h-4 w-4" /> Tahasalman.9t@gmail.com
            </a>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://github.com/ParadoxIsCoding"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/tahas1/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <DiscordPresence />
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Taha Salman. All rights reserved.</p>
          <div className="text-xs text-zinc-500">Built with React + Tailwind + Framer Motion.</div>
        </div>
      </footer>
    </div>
  );
}
