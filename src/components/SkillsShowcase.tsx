import { Badge } from "./ui/badge";

export default function SkillsShowcase() {
  return (
    <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
      <img
        src="/images/robot.png"
        alt="Robot"
        className="rounded-2xl w-full h-auto"
      />
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["Robotics", "AI", "Rust", "Python", "CAD", "Electrical"].map((t) => (
          <Badge key={t} className="justify-center rounded-xl">
            {t}
          </Badge>
        ))}
      </div>
    </div>
  );
}
