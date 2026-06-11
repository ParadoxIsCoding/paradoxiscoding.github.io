import { useState, useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Stagger animation variants for initial loading
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut" as const,
      },
    },
  };

  // Pre-populate history on load to match the initial screenshot layout
  useEffect(() => {
    setHistory([
      {
        command: "whoami",
        output: (
          <div className="flex flex-col">
            <span className="text-[#d8b4fe] text-xl font-bold tracking-wide">Taha Salman</span>
            <span className="text-[#9399b2] italic mt-0.5">Professional Coffee Consumer</span>
          </div>
        ),
      },
      {
        command: "links",
        output: (
          <div className="grid grid-cols-[80px_24px_1fr] gap-x-2 gap-y-2.5 font-mono text-[#a6adc8] max-w-md mt-1">
            <span className="text-[#a6e3a1]">github</span>
            <span className="flex items-center justify-start text-[#89b4fa]">
              <Github className="w-4.5 h-4.5" />
            </span>
            <a
              href="https://github.com/ParadoxIsCoding"
              target="_blank"
              rel="noreferrer"
              className="text-[#89b4fa] hover:text-[#b4befe] hover:underline transition-colors break-all"
            >
              github.com/ParadoxIsCoding
            </a>

            <span className="text-[#a6e3a1]">linkedin</span>
            <span className="flex items-center justify-start text-[#89b4fa]">
              <Linkedin className="w-4.5 h-4.5" />
            </span>
            <a
              href="https://www.linkedin.com/in/tahas1/"
              target="_blank"
              rel="noreferrer"
              className="text-[#89b4fa] hover:text-[#b4befe] hover:underline transition-colors break-all"
            >
              linkedin.com/in/tahas1
            </a>

            <span className="text-[#a6e3a1]">email</span>
            <span className="flex items-center justify-start text-[#89b4fa]">
              <Mail className="w-4.5 h-4.5" />
            </span>
            <a
              href="mailto:tahasalman.9t@gmail.com"
              className="text-[#89b4fa] hover:text-[#b4befe] hover:underline transition-colors break-all"
            >
              tahasalman.9t@gmail.com
            </a>
          </div>
        ),
      },
    ]);

    // Focus terminal input on load
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom of terminal when history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const getCommandOutput = (cmd: string): React.ReactNode => {
    const cleanCmd = cmd.trim().toLowerCase();

    switch (cleanCmd) {
      case "whoami":
        return (
          <div className="flex flex-col">
            <span className="text-[#d8b4fe] text-xl font-bold tracking-wide">Taha Salman</span>
            <span className="text-[#9399b2] italic mt-0.5">Professional Coffee Consumer</span>
          </div>
        );
      case "links":
        return (
          <div className="grid grid-cols-[80px_24px_1fr] gap-x-2 gap-y-2.5 font-mono text-[#a6adc8] max-w-md">
            <span className="text-[#a6e3a1]">github</span>
            <span className="flex items-center justify-start text-[#89b4fa]">
              <Github className="w-4.5 h-4.5" />
            </span>
            <a
              href="https://github.com/ParadoxIsCoding"
              target="_blank"
              rel="noreferrer"
              className="text-[#89b4fa] hover:text-[#b4befe] hover:underline transition-colors break-all"
            >
              github.com/ParadoxIsCoding
            </a>

            <span className="text-[#a6e3a1]">linkedin</span>
            <span className="flex items-center justify-start text-[#89b4fa]">
              <Linkedin className="w-4.5 h-4.5" />
            </span>
            <a
              href="https://www.linkedin.com/in/tahas1/"
              target="_blank"
              rel="noreferrer"
              className="text-[#89b4fa] hover:text-[#b4befe] hover:underline transition-colors break-all"
            >
              linkedin.com/in/tahas1
            </a>

            <span className="text-[#a6e3a1]">email</span>
            <span className="flex items-center justify-start text-[#89b4fa]">
              <Mail className="w-4.5 h-4.5" />
            </span>
            <a
              href="mailto:tahasalman.9t@gmail.com"
              className="text-[#89b4fa] hover:text-[#b4befe] hover:underline transition-colors break-all"
            >
              tahasalman.9t@gmail.com
            </a>
          </div>
        );
      case "projects":
        return (
          <div className="text-[#a6adc8] space-y-1">
            <div>
              - <span className="text-[#f9e2af] font-semibold">FTC Robotics</span>: 1st place in FTC APOC Championship 2025 & 2024 Nationals Champion.
            </div>
            <div>
              - <span className="text-[#f9e2af] font-semibold">paradoxiscoding.github.io</span>: This beautiful interactive portfolio site.
            </div>
          </div>
        );
      case "help":
        return (
          <div className="text-[#a6adc8]">
            Available commands: <span className="text-[#f9e2af]">whoami</span>,{" "}
            <span className="text-[#f9e2af]">links</span>,{" "}
            <span className="text-[#f9e2af]">projects</span>,{" "}
            <span className="text-[#f9e2af]">coffee</span>,{" "}
            <span className="text-[#f9e2af]">clear</span>,{" "}
            <span className="text-[#f9e2af]">help</span>
          </div>
        );
      case "coffee":
        return (
          <div className="text-[#a6adc8] space-y-2">
            <pre className="text-[#f9e2af] text-xs leading-none">
{`   (  )   (  )
    )  (   )  (
   (____) (____)
   |    | |    |___
   |____| |____|   |
   (====) (====)---'`}
            </pre>
            <div>A fresh cup of coffee has been brewed for you! ☕</div>
          </div>
        );
      case "clear":
        return "clear";
      case "":
        return null;
      default:
        return (
          <div className="text-[#f38ba8]">
            sh: command not found: {cmd}. Type <span className="underline font-semibold text-[#f9e2af] cursor-pointer" onClick={() => setInputValue("help")}>help</span> for a list of commands.
          </div>
        );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const output = getCommandOutput(inputValue);
      if (output === "clear") {
        setHistory([]);
      } else {
        setHistory((prev) => [...prev, { command: inputValue, output }]);
      }
      setInputValue("");
    }
  };

  return (
    <div
      onClick={focusInput}
      className="min-h-screen w-full flex items-center justify-center bg-[#08080a] text-[#cdd6f4] p-6 sm:p-12 selection:bg-[#313244] selection:text-[#cdd6f4] relative overflow-hidden font-mono cursor-text"
    >
      {/* Background soft ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-purple-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Main card container */}
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-14 relative z-10 py-10">
        
        {/* Left Side: Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative group shrink-0"
        >
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-[#2d3139] shadow-2xl bg-[#111115]">
            <img
              src="/images/avatar.jpg"
              alt="Taha Salman Avatar"
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Right Side: Interactive Terminal Content */}
        <div className="flex-1 w-full flex flex-col justify-start text-[14px] sm:text-[15px] leading-relaxed">
          
          {/* Scrollable Command History Panel */}
          <div
            ref={scrollContainerRef}
            className="max-h-[380px] overflow-y-auto space-y-5 pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {history.map((entry, index) => (
                <motion.div key={index} variants={lineVariants} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#89b4fa]">taha@paradox:~$</span>
                    <span className="text-[#e5c07b]">{entry.command}</span>
                  </div>
                  {entry.output && (
                    <div className="pl-0">
                      {entry.output}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            
            {/* Element to scroll to */}
            <div ref={bottomRef} />
          </div>

          {/* Active typing prompt line */}
          <div className="flex items-center gap-2 pt-4 border-t border-[#1e2030]/40 mt-4">
            <span className="text-[#89b4fa] shrink-0">taha@paradox:~$</span>
            
            {/* Hidden Input field for capturing key events */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute opacity-0 w-0 h-0 pointer-events-none"
              aria-label="Terminal input"
              autoFocus
            />

            {/* Display typing value with flashing cursor block */}
            <div className="flex items-center flex-1 break-all">
              <span className="text-[#e5c07b] whitespace-pre-wrap">{inputValue}</span>
              <span className="inline-block w-[9px] h-[16px] bg-[#a6adc8] animate-blink align-middle ml-1 shrink-0" />
            </div>
          </div>

          {/* Muted Tip Hint */}
          <span className="text-[11px] text-[#585b70] mt-3 block select-none">
            [Hint: Click anywhere and type. Try: <span className="underline">help</span>, <span className="underline">coffee</span>, or <span className="underline">projects</span>]
          </span>

        </div>
      </div>
    </div>
  );
}
