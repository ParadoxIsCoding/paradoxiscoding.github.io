import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200",
        className
      )}
      {...props}
    />
  );
}
