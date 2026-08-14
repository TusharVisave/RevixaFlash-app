import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="glow-grid min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-5 py-4">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">REVIXA</span>
          <span className="ml-auto hidden text-xs text-muted-foreground sm:block">
            Turn your notes into knowledge you can test.
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-5 py-8 sm:py-12">{children}</main>
      <footer className="mx-auto max-w-3xl px-5 pb-10 text-xs text-muted-foreground">
        Portfolio demo — study kits are generated from sample data.
      </footer>
    </div>
  );
}
