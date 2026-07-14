import "./index.css";

const MAX_HISTORY_ENTRIES = 50;

const icon = (name: "github" | "linkedin" | "mail") => {
  const paths = {
    github:
      '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.5 6.8 7A4.8 4.8 0 0 0 8 18v4"/><path d="M8 19c-3 .9-3-1.5-4-2"/>',
    linkedin:
      '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  };

  return `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
};

const linksMarkup = (withTopMargin = false) => `
  <div class="grid grid-cols-[80px_24px_1fr] gap-x-2 gap-y-2.5 font-mono text-[#a6adc8] max-w-md${withTopMargin ? " mt-1" : ""}">
    <span class="text-[#a6e3a1]">github</span>
    <span class="flex items-center justify-start text-[#89b4fa]">${icon("github")}</span>
    <a href="https://github.com/ParadoxIsCoding" target="_blank" rel="noreferrer" class="text-[#89b4fa] hover:text-[#b4befe] hover:underline transition-colors break-all">github.com/ParadoxIsCoding</a>
    <span class="text-[#a6e3a1]">linkedin</span>
    <span class="flex items-center justify-start text-[#89b4fa]">${icon("linkedin")}</span>
    <a href="https://www.linkedin.com/in/tahas1/" target="_blank" rel="noreferrer" class="text-[#89b4fa] hover:text-[#b4befe] hover:underline transition-colors break-all">linkedin.com/in/tahas1</a>
    <span class="text-[#a6e3a1]">email</span>
    <span class="flex items-center justify-start text-[#89b4fa]">${icon("mail")}</span>
    <a href="mailto:tahasalman.9t@gmail.com" class="text-[#89b4fa] hover:text-[#b4befe] hover:underline transition-colors break-all">tahasalman.9t@gmail.com</a>
  </div>`;

const outputMarkup = (command: string, initial = false): string | null => {
  switch (command.trim().toLowerCase()) {
    case "whoami":
      return '<div class="flex flex-col"><span class="text-[#d8b4fe] text-xl font-bold tracking-wide">Taha Salman</span><span class="text-[#9399b2] italic mt-0.5">Professional Coffee Consumer</span></div>';
    case "links":
      return linksMarkup(initial);
    case "projects":
      return '<div class="text-[#a6adc8] space-y-1"><div>- <span class="text-[#f9e2af] font-semibold">FTC Robotics</span>: 1st place in FTC APOC Championship 2025 &amp; 2024 Nationals Champion.</div><div>- <span class="text-[#f9e2af] font-semibold">paradoxiscoding.github.io</span>: This beautiful interactive portfolio site.</div></div>';
    case "help":
      return '<div class="text-[#a6adc8]">Available commands: <span class="text-[#f9e2af]">whoami</span>, <span class="text-[#f9e2af]">links</span>, <span class="text-[#f9e2af]">projects</span>, <span class="text-[#f9e2af]">coffee</span>, <span class="text-[#f9e2af]">clear</span>, <span class="text-[#f9e2af]">help</span></div>';
    case "coffee":
      return `<div class="text-[#a6adc8] space-y-2"><pre class="text-[#f9e2af] text-xs leading-none">   (  )   (  )
    )  (   )  (
   (____) (____)
   |    | |    |___
   |____| |____|   |
   (====) (====)---'</pre><div>A fresh cup of coffee has been brewed for you! ☕</div></div>`;
    case "":
      return null;
    default:
      return "not-found";
  }
};

document.querySelector<HTMLDivElement>("#root")!.innerHTML = `
  <main id="terminal-app" class="min-h-dvh w-full flex items-center justify-center bg-[#08080a] text-[#cdd6f4] p-6 sm:p-12 selection:bg-[#313244] selection:text-[#cdd6f4] relative overflow-hidden font-mono cursor-text">
    <div class="w-full max-w-3xl flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-14 relative z-10 py-10">
      <div class="avatar-enter avatar-shell relative group shrink-0">
        <div class="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-[#2d3139] shadow-2xl bg-[#111115]">
          <img src="/images/avatar.webp" alt="Taha Salman Avatar" width="400" height="400" fetchpriority="high" decoding="async" class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" />
        </div>
      </div>
      <section class="flex-1 w-full flex flex-col justify-start text-[14px] sm:text-[15px] leading-relaxed" aria-label="Interactive terminal">
        <div id="history" class="max-h-[380px] overflow-y-auto space-y-5 pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent" aria-live="polite"></div>
        <div class="flex items-center gap-2 pt-4 border-t border-[#1e2030]/40 mt-4">
          <span class="text-[#89b4fa] shrink-0">taha@paradox:~$</span>
          <input id="terminal-input" type="text" class="terminal-input" aria-label="Terminal input" autocomplete="off" autocapitalize="off" spellcheck="false" />
          <div class="flex items-center flex-1 break-all" aria-hidden="true"><span id="typed-value" class="text-[#e5c07b] whitespace-pre-wrap"></span><span class="inline-block w-[9px] h-[16px] bg-[#a6adc8] animate-blink align-middle ml-1 shrink-0"></span></div>
        </div>
        <span class="text-[11px] text-[#585b70] mt-3 block select-none">[Hint: Click anywhere and type. Try: <span class="underline">help</span>, <span class="underline">coffee</span>, or <span class="underline">projects</span>]</span>
      </section>
    </div>
  </main>`;

const app = document.querySelector<HTMLElement>("#terminal-app")!;
const history = document.querySelector<HTMLDivElement>("#history")!;
const input = document.querySelector<HTMLInputElement>("#terminal-input")!;
const typedValue = document.querySelector<HTMLSpanElement>("#typed-value")!;

const appendEntry = (command: string, initial = false, delay = 0) => {
  const entry = document.createElement("div");
  entry.className = "terminal-line space-y-1.5";
  entry.style.animationDelay = `${delay}ms`;

  const prompt = document.createElement("div");
  prompt.className = "flex items-center gap-2";
  prompt.innerHTML = '<span class="text-[#89b4fa]">taha@paradox:~$</span>';
  const commandText = document.createElement("span");
  commandText.className = "text-[#e5c07b]";
  commandText.textContent = command;
  prompt.append(commandText);
  entry.append(prompt);

  const output = outputMarkup(command, initial);
  if (output) {
    const outputElement = document.createElement("div");
    if (output === "not-found") {
      outputElement.className = "text-[#f38ba8]";
      outputElement.append("sh: command not found: ", command, ". Type ");
      const help = document.createElement("button");
      help.type = "button";
      help.className = "underline font-semibold text-[#f9e2af] cursor-pointer";
      help.textContent = "help";
      help.addEventListener("click", (event) => {
        event.stopPropagation();
        input.value = "help";
        typedValue.textContent = "help";
        input.focus();
      });
      outputElement.append(help, " for a list of commands.");
    } else {
      outputElement.innerHTML = output;
    }
    entry.append(outputElement);
  }

  history.append(entry);
  while (history.childElementCount > MAX_HISTORY_ENTRIES) history.firstElementChild?.remove();
};

appendEntry("whoami", true, 100);
appendEntry("links", true, 280);

input.addEventListener("input", () => {
  typedValue.textContent = input.value;
});

input.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const command = input.value;
  if (command.trim().toLowerCase() === "clear") {
    history.replaceChildren();
  } else {
    appendEntry(command);
    history.scrollTo({ top: history.scrollHeight, behavior: "smooth" });
  }
  input.value = "";
  typedValue.textContent = "";
});

app.addEventListener("click", () => input.focus());
if (matchMedia("(hover: hover) and (pointer: fine)").matches) input.focus();
