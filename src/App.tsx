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

import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import SkillsShowcase from "./components/SkillsShowcase";

// Custom Discord icon (SVG)
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M20.317 4.369a19.91 19.91 0 0 0-4.885-1.515.074.074 0 0 0-.078.037c-.21.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.164-.4-.41-.874-.622-1.249a.077.077 0 0 0-.078-.037c-1.4.27-3.06.74-4.886 1.515a.07.07 0 0 0-.032.027C2.21 9.052 1.23 13.58 1.5 18.061a.08.08 0 0 0 .031.057 19.96 19.96 0 0 0 5.993 3.028.078.078 0 0 0 .084-.027c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.104 13.14 13.14 0 0 1-1.872-.892.077.077 0 0 1-.008-.127c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.372.292a.077.077 0 0 1-.006.127 12.18 12.18 0 0 1-1.873.891.076.076 0 0 0-.04.105c.36.698.772 1.362 1.225 1.993a.077.077 0 0 0 .084.028 19.94 19.94 0 0 0 6.002-3.028.077.077 0 0 0 .03-.056c.5-8.173-1.287-12.665-5.384-13.665a.06.06 0 0 0-.032-.004zM8.02 15.51c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.094 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.958 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.094 2.157 2.419 0 1.334-.947 2.419-2.157 2.419z" />
  </svg>
);

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

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-zinc-200 antialiased">
      {/* Background accents */}
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
            <p className="mt-4 text-lg text-zinc-400 max-w-xl">
              Year 12 Student at Sunshine Coast Grammar School and aspiring Mechatronics Engineer
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
              <a
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
                href="https://discord.com/users/733568404081999932"
                target="_blank"
                rel="noreferrer"
              >
                <DiscordIcon className="h-4 w-4" /> Discord
              </a>
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
        subtitle="Sharing my love for Robotics and Coffee"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                APOC Championship 2025
              </CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              1<sup>st</sup> in the Asia Pacific Open Championships with my Team 20489
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">Robotics champion</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              Add a couple of sentences here that illustrate this point with a
              result, metric, or short story.
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">UQ Mechatronics hopeful</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              Add a couple of sentences here that illustrate this point with a
              result, metric, or short story.
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Projects */}
      <Section
        id="projects"
        title="Projects"
        subtitle="Showcase a few highlights. Replace the placeholders with real links and screenshots."
      >
        <div className="grid md:grid-cols-2 gap-6">
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
              <CardTitle className="text-white">Robotics – FTC</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              Apart of Team 24089 Iron Lions in the First Tech Challenge™
              <div className="mt-3">
                <a
                  href="https://github.com/IronLionsFTC/"
                  className="inline-flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View repo <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="group rounded-2xl overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-zinc-800/60 group-hover:scale-[1.01] transition-transform" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
            <CardHeader>
              <CardTitle className="text-white">Project Title</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              Short project description here.
              <div className="mt-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200"
                >
                  View repo <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="group rounded-2xl overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-zinc-800/60 group-hover:scale-[1.01] transition-transform" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
            <CardHeader>
              <CardTitle className="text-white">Project Title</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              Short project description here.
              <div className="mt-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200"
                >
                  View repo <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="group rounded-2xl overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-zinc-800/60 group-hover:scale-[1.01] transition-transform" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
            <CardHeader>
              <CardTitle className="text-white">Project Title</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              Short project description here.
              <div className="mt-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200"
                >
                  View repo <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>
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
            <a
              href="mailto:Tahasalman.9t@gmail.com"
              className="mt-2 inline-flex items-center gap-2 text-white"
            >
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
              <a
                href="https://discord.com/users/733568404081999932"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white"
              >
                <DiscordIcon className="h-4 w-4" /> Discord
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Taha Salman. All rights reserved.
          </p>
          <div className="text-xs text-zinc-500">
            Built with React + Tailwind + Framer Motion.
          </div>
        </div>
      </footer>
    </div>
  );
}
