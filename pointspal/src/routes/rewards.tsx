import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { cards, formatAUD, formatPts, totalPointsValue } from "@/lib/wallet-data";
import { ArrowRight, Coins, Repeat } from "lucide-react";

export const Route = createFileRoute("/rewards")({
  head: () => ({ meta: [{ title: "Rewards — Halo Wallet" }, { name: "description", content: "Consolidated view of every points balance, ready to spend or convert." }] }),
  component: RewardsPage,
});

function RewardsPage() {
  return (
    <AppShell>
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Rewards hub</p>
        <h1 className="font-display text-3xl">Every point. <span className="gradient-text">In one place.</span></h1>
      </header>

      <section className="glass mb-6 rounded-3xl p-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Combined value</p>
        <p className="font-display text-3xl">{formatAUD(totalPointsValue)}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Across {cards.length} programs · {formatPts(cards.reduce((s, c) => s + c.points, 0))} points
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="rounded-2xl bg-gradient-to-br from-[var(--coral)] to-[var(--violet)] py-3 text-sm font-semibold text-white shadow-lg">
            Pay with points
          </button>
          <button className="rounded-2xl border border-white/60 bg-white/50 py-3 text-sm font-semibold backdrop-blur">
            Cash out
          </button>
        </div>
      </section>

      <h2 className="mb-3 font-display text-xl">Balances</h2>
      <div className="space-y-3">
        {cards.map((c) => (
          <div key={c.id} className="glass flex items-center gap-4 rounded-3xl p-4">
            <div
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white"
              style={{ background: c.gradient }}
            >
              <Coins className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{c.pointsLabel}</p>
              <p className="text-[11px] text-muted-foreground">{c.issuer}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-lg">{formatPts(c.points)}</p>
              <p className="text-[11px] text-muted-foreground">{formatAUD(c.points * c.pointValue)}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-8 mb-3 font-display text-xl">Smart transfers</h2>
      <div className="space-y-2">
        {[
          { from: "Amex MR", to: "Velocity Points", rate: "1 : 1", boost: "+15% bonus today" },
          { from: "Flybuys", to: "Velocity Points", rate: "2000 : 870", boost: "Best for travel" },
          { from: "Velocity", to: "Singapore KrisFlyer", rate: "1.35 : 1", boost: "Open jaw to EU" },
        ].map((t) => (
          <button key={t.from} className="glass flex w-full items-center gap-3 rounded-2xl p-4 text-left">
            <div className="flex-1">
              <p className="text-sm font-semibold">{t.from} <ArrowRight className="mx-1 inline h-3.5 w-3.5" /> {t.to}</p>
              <p className="text-[11px] text-muted-foreground">{t.rate} · {t.boost}</p>
            </div>
            <Repeat className="h-4 w-4 text-[var(--violet)]" />
          </button>
        ))}
      </div>
    </AppShell>
  );
}
