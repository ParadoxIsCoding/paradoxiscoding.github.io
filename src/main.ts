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

type Photo = { src: string; caption: string; diagram?: boolean };

const commandLink = (command: string, label = command) =>
  `<button type="button" data-command="${command}" class="text-[#f9e2af] font-semibold underline decoration-dotted underline-offset-4 hover:text-[#fab387] cursor-pointer">${label}</button>`;

const gallery = (photos: Photo[]) => `
  <div class="flex flex-wrap gap-2 pt-1">${photos
    .map(
      ({ src, caption, diagram }) =>
        `<button type="button" data-photo="/images/projects/${src}.webp" data-caption="${caption}" aria-label="View photo: ${caption}" class="block overflow-hidden rounded-md border border-[#2d3139] hover:border-[#89b4fa] transition-colors cursor-zoom-in"><img src="/images/projects/${src}-thumb.webp" alt="${caption}" loading="lazy" decoding="async" class="w-28 h-20 ${diagram ? "object-contain bg-white p-1" : "object-cover"}" /></button>`,
    )
    .join("")}</div>`;

const bullets = (items: string[]) =>
  `<ul class="space-y-0.5">${items.map((item) => `<li>- ${item}</li>`).join("")}</ul>`;

const projectsMarkup = `
  <div class="text-[#a6adc8] space-y-1.5">
    <div>- ${commandLink("ftc", "Iron Lions #24089")}: Team Lead. FTC Robotics. APOC champions, now headed to Worlds.</div>
    <div>- ${commandLink("timekeeper", "TimeKeeper")}: ESP32-S3 desk clock that shows how much of the day has gone.</div>
    <div>- ${commandLink("engg1100", "ENGG1100")}: Flood-resistant evacuation centre that floats and holds its position.</div>
    <div>- <span class="text-[#f9e2af] font-semibold">paradoxiscoding.github.io</span>: This beautiful interactive portfolio site.</div>
    <div class="text-[#585b70] text-xs pt-1">Click a project or type its command for details.</div>
  </div>`;

const season = (name: string, result: string, photos: Photo[]) => `
  <div class="space-y-1">
    <div><span class="text-[#cba6f7]">${name}</span> <span class="text-[#585b70]">-&gt;</span> <span class="text-[#a6e3a1]">${result}</span></div>
    ${gallery(photos)}
  </div>`;

const ftcMarkup = `
  <div class="text-[#a6adc8] space-y-3">
    <div><span class="text-[#f9e2af] font-semibold">Iron Lions #24089</span>: <span class="text-[#89b4fa]">Team Lead</span>, <span class="italic">FIRST</span> Tech Challenge</div>
    ${season("Into The Deep: Nationals 2024", "2nd place in Australia", [
      { src: "itd-nationals-2024", caption: "Into The Deep robot, Nationals 2024" },
    ])}
    ${season("Into The Deep: APOC 2025", "1st place, Asia Pacific Open Championship", [
      { src: "itd-apoc-team", caption: "Winning alliance at APOC 2025" },
      { src: "itd-apoc-robot", caption: "Into The Deep robot at APOC 2025" },
      { src: "itd-apoc-field", caption: "Into The Deep robot on the field" },
    ])}
    ${season("DECODE: Regionals 2025", "1st place", [
      { src: "decode-cad", caption: "DECODE robot CAD render" },
    ])}
    ${season("DECODE: Nationals 2025", "Qualified for the FIRST World Championship in Houston, Texas", [
      { src: "decode-worlds", caption: "Franklin Division, FIRST Championship, Houston" },
    ])}
  </div>`;

const timekeeperMarkup = `
  <div class="text-[#a6adc8] space-y-2">
    <div><span class="text-[#f9e2af] font-semibold">TimeKeeper</span>: an ESP32-S3 desk clock with a 128x64 OLED that shows what percentage of the day is done.</div>
    <pre class="text-[#89dceb] text-xs leading-snug border border-[#2d3139] rounded-md px-3 py-2 w-fit bg-[#0d0d11]">WED 12 AUG             WiFi
       DAY COMPLETE
          42.123%
 ██████████░░░░░░░░░░░░
        10:06:34 AM</pre>
    ${bullets([
      "Syncs time over Wi-Fi and shows the day's progress to three decimal places, with a progress bar",
      "Tap the accelerometer to switch between the clock, an exam countdown and local weather (Open-Meteo)",
      "Exam countdown moves to the next exam automatically and shows seconds in the final 24 hours",
      "Overnight the display dims and turns off, then wakes on any nearby vibration",
      "Keeps time when Wi-Fi drops, reconnects on its own and shows status instead of failing silently",
    ])}
    <div class="text-[#585b70] text-xs">ESP32-S3 · SH1106 OLED (SPI) · MMA8452Q (I²C) · C++ / PlatformIO · native unit tests</div>
  </div>`;

const engg1100Markup = `
  <div class="text-[#a6adc8] space-y-2">
    <div><span class="text-[#f9e2af] font-semibold">Station-Keeping Flood Resistant Evacuation Centre</span>: ENGG1100, UQ (Team Lavender, 2026)</div>
    <div>A proof-of-concept evacuation centre for flood-prone areas like the Philippines. It floats as the water rises, stays over its site in wind and shifting loads, and settles back as the water goes down.</div>
    ${bullets([
      "Wide XPS foam raft with a plywood deck and a 3D-printed PLA shell for a low centre of gravity",
      "Four 12 V N20 gearmotor winches form a spread mooring that tensions or slackens as the water changes",
      "ESP32-S3 runs a phone web app over its own Wi-Fi, drives L9110S H-bridges and reads tilt from an IMU",
      "Stops all motors if the connection drops. Parts came to about $124 against a $170 budget",
      "My part: designed the entire house and did all of the wiring and electronics",
    ])}
    ${gallery([
      { src: "engg1100-house", caption: "The prototype on the UQ Innovate flood test rig" },
      { src: "engg1100-render", caption: "CAD render of the evacuation centre" },
      { src: "engg1100-circuit", caption: "Power and control block diagram", diagram: true },
      { src: "engg1100-flowchart", caption: "ESP32-S3 control program flowchart", diagram: true },
    ])}
  </div>`;

const outputMarkup = (command: string, initial = false): string | null => {
  switch (command.trim().toLowerCase()) {
    case "whoami":
      return '<div class="flex flex-col"><span class="text-[#d8b4fe] text-xl font-bold tracking-wide">Taha Salman</span><span class="text-[#9399b2] italic mt-0.5">Professional Coffee Consumer</span></div>';
    case "links":
      return linksMarkup(initial);
    case "projects":
      return projectsMarkup;
    case "ftc":
      return ftcMarkup;
    case "timekeeper":
      return timekeeperMarkup;
    case "engg1100":
      return engg1100Markup;
    case "help":
      return '<div class="text-[#a6adc8]">Available commands: <span class="text-[#f9e2af]">whoami</span>, <span class="text-[#f9e2af]">links</span>, <span class="text-[#f9e2af]">projects</span>, <span class="text-[#f9e2af]">ftc</span>, <span class="text-[#f9e2af]">timekeeper</span>, <span class="text-[#f9e2af]">engg1100</span>, <span class="text-[#f9e2af]">coffee</span>, <span class="text-[#f9e2af]">clear</span>, <span class="text-[#f9e2af]">help</span></div>';
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
        <span class="text-[11px] text-[#585b70] mt-3 block select-none">[Hint: Click anywhere and type. Try: <span class="underline">help</span>, <span class="underline">projects</span>, or <span class="underline">ftc</span>]</span>
      </section>
    </div>
  </main>
  <dialog id="lightbox" class="lightbox m-auto bg-transparent p-0 max-w-[92vw] max-h-[92dvh] outline-none">
    <figure class="flex flex-col items-center gap-3">
      <img id="lightbox-image" alt="" class="max-w-[92vw] max-h-[82dvh] object-contain rounded-lg border border-[#2d3139]" />
      <figcaption id="lightbox-caption" class="font-mono text-sm text-[#a6adc8] text-center"></figcaption>
    </figure>
  </dialog>`;

const app = document.querySelector<HTMLElement>("#terminal-app")!;
const history = document.querySelector<HTMLDivElement>("#history")!;
const input = document.querySelector<HTMLInputElement>("#terminal-input")!;
const typedValue = document.querySelector<HTMLSpanElement>("#typed-value")!;
const lightbox = document.querySelector<HTMLDialogElement>("#lightbox")!;
const lightboxImage = document.querySelector<HTMLImageElement>("#lightbox-image")!;
const lightboxCaption = document.querySelector<HTMLElement>("#lightbox-caption")!;

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

const runCommand = (command: string) => {
  if (command.trim().toLowerCase() === "clear") {
    history.replaceChildren();
    return;
  }
  appendEntry(command);
  const entry = history.lastElementChild as HTMLElement;
  const top = history.scrollTop + entry.getBoundingClientRect().top - history.getBoundingClientRect().top;
  history.scrollTo({ top, behavior: "smooth" });
};

input.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  runCommand(input.value);
  input.value = "";
  typedValue.textContent = "";
});

history.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const commandButton = target.closest<HTMLElement>("[data-command]");
  if (commandButton) {
    runCommand(commandButton.dataset.command!);
    return;
  }
  const photo = target.closest<HTMLElement>("[data-photo]");
  if (photo) {
    event.stopPropagation();
    lightboxImage.src = photo.dataset.photo!;
    lightboxImage.alt = photo.dataset.caption!;
    lightboxCaption.textContent = photo.dataset.caption!;
    lightbox.showModal();
  }
});

lightbox.addEventListener("click", () => lightbox.close());
const hasFinePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
lightbox.addEventListener("close", () => {
  if (hasFinePointer) input.focus();
});

app.addEventListener("click", () => input.focus());
if (hasFinePointer) input.focus();
