import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { formatPts, goals, cards, totalPointsValue, formatAUD } from "@/lib/wallet-data";
import { Sparkles, TrendingUp, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/goals")({
  head: () => ({ meta: [{ title: "Goals — Halo Wallet" }, { name: "description", content: "Set a goal and let Halo allocate your points spend automatically." }] }),
  component: GoalsPage,
});

function progressFor(pointsNeeded: number, currency: string) {
  const map: Record<string, number> = {
    "Qantas Points": cards.find((c) => c.id === "qff")!.points,
    "Velocity Points": cards.find((c) => c.id === "visa-sig")!.points,
    "Flybuys Points": cards.find((c) => c.id === "flybuys")!.points,
    "Any Points": cards.reduce((s, c) => s + c.points, 0),
  };
  const have = map[currency] ?? 0;
  return Math.min(100, Math.round((have / pointsNeeded) * 100));
}

function GoalsPage() {
  return (
    <AppShell>
      <header className="mb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Goals</p>
        <h1 className="font-display text-3xl">What are you <span className="gradient-text">working toward?</span></h1>
      </header>

      <section className="glass mb-6 rounded-3xl p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--violet)]" />
          <p className="text-[10px] uppercase tracking-widest text-[var(--violet)]">Halo coach</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed">
          Based on your goals, you're best off <b>routing groceries to Flybuys</b> and <b>dining + travel to Velocity Visa</b>.
          Doing this for 6 weeks unlocks <b>Tokyo Business</b> by mid-July.
        </p>
        <div className="mt-3 flex gap-2 text-xs">
          <button className="rounded-full bg-gradient-to-br from-[var(--coral)] to-[var(--violet)] px-3 py-1.5 font-medium text-white">Apply plan</button>
          <button className="rounded-full border border-white/60 bg-white/40 px-3 py-1.5 font-medium">Why this?</button>
        </div>
      </section>

      <h2 className="mb-3 font-display text-xl">Active goals</h2>
      <div className="space-y-3">
        {goals.map((g) => {
          const pct = progressFor(g.pointsNeeded, g.pointsCurrency);
          return (
            <div key={g.id} className="glass rounded-3xl p-4">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--peach)]/60 to-[var(--violet)]/40 text-2xl">
                  {g.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{g.title}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{g.target}</p>
                </div>
                <p className="font-display text-base">{pct}%</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/50">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--coral)] to-[var(--violet)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Needs {formatPts(g.pointsNeeded)} {g.pointsCurrency}</span>
                <span className="flex items-center gap-1 text-[var(--violet)]"><TrendingUp className="h-3 w-3" /> on track</span>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mt-8 mb-3 font-display text-xl">Suggested plays</h2>
      <div className="space-y-2">
        {[
          { title: "Cash out 50,000 Flybuys", body: `Convert to ${formatAUD(250)} in your Halo wallet.`, cta: "Cash out" },
          { title: "Pay your Spotify with points", body: "16,990 Velocity pts covers a year.", cta: "Set up" },
          { title: "Bid for an Amex upgrade", body: "Use 80,000 MR for SYD→SIN flat bed.", cta: "Bid" },
        ].map((s) => (
          <div key={s.title} className="glass flex items-start gap-3 rounded-2xl p-4">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{s.title}</p>
              <p className="text-[11px] text-muted-foreground">{s.body}</p>
            </div>
            <button className="rounded-full bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background">
              {s.cta}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-[10px] text-muted-foreground">
        Combined wallet value · {formatAUD(totalPointsValue + 2384.5)}
      </p>
    </AppShell>
  );
}
