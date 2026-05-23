import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PayCard } from "@/components/PayCard";
import { ArrowUpRight, Bell, ChevronRight, Plus, QrCode, Send, Sparkles, Coins } from "lucide-react";
import { cards, formatAUD, formatPts, recentTransactions, totalPointsValue } from "@/lib/wallet-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Halo Wallet — Pay & Rewards" },
      { name: "description", content: "Your portable wallet. Pay electronically and unlock the value hidden in your rewards points." },
    ],
  }),
  component: WalletPage,
});

function WalletPage() {
  const cashBalance = 2384.5;

  return (
    <AppShell>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Good evening</p>
          <h1 className="font-display text-3xl">Hi, Sienna</h1>
        </div>
        <button className="glass grid h-11 w-11 place-items-center rounded-2xl">
          <Bell className="h-5 w-5" />
        </button>
      </header>

      {/* Hero balance */}
      <section
        className="pay-card mb-5 rounded-3xl p-6"
        style={{ background: "var(--gradient-card-hero)" }}
      >
        <div className="relative z-10">
          <p className="text-[11px] uppercase tracking-[0.25em] opacity-80">Total Wallet Value</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-4xl">{formatAUD(cashBalance + totalPointsValue)}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white/15 px-3 py-2 backdrop-blur">
              <p className="text-[10px] uppercase tracking-widest opacity-75">Cash</p>
              <p className="font-display text-lg">{formatAUD(cashBalance)}</p>
            </div>
            <div className="rounded-2xl bg-white/15 px-3 py-2 backdrop-blur">
              <p className="text-[10px] uppercase tracking-widest opacity-75">Points · est.</p>
              <p className="font-display text-lg">{formatAUD(totalPointsValue)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mb-6 grid grid-cols-4 gap-2">
        {[
          { icon: QrCode, label: "Pay" },
          { icon: Send, label: "Send" },
          { icon: Plus, label: "Top up" },
          { icon: Coins, label: "Cash out" },
        ].map(({ icon: Icon, label }) => (
          <button key={label} className="glass flex flex-col items-center gap-1.5 rounded-2xl py-3">
            <Icon className="h-5 w-5 text-[var(--violet)]" />
            <span className="text-[11px] font-medium">{label}</span>
          </button>
        ))}
      </section>

      {/* Smart suggestion */}
      <Link
        to="/goals"
        className="mb-6 block overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-[var(--mint)]/60 to-[var(--gold)]/50 p-5 backdrop-blur"
      >
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/70">
            <Sparkles className="h-5 w-5 text-[var(--plum)]" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-[var(--plum)]/80">Halo suggestion</p>
            <p className="mt-0.5 text-sm font-semibold text-[var(--plum)]">
              You're <b>34,210 pts</b> from Tokyo Business.
            </p>
            <p className="mt-1 text-xs text-[var(--plum)]/80">
              Route Amex spend through Velocity for the next 6 weeks to land it.
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-[var(--plum)]/70" />
        </div>
      </Link>

      {/* Cards carousel */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl">Your cards</h2>
          <Link to="/cards" className="flex items-center gap-1 text-xs text-muted-foreground">
            All cards <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cards.map((c) => (
            <div key={c.id} className="w-[78%] shrink-0 snap-start">
              <PayCard card={c} compact />
            </div>
          ))}
        </div>
      </section>

      {/* Activity */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl">Activity</h2>
          <span className="text-xs text-muted-foreground">This week</span>
        </div>
        <div className="glass divide-y divide-white/40 rounded-3xl">
          {recentTransactions.map((t) => (
            <div key={t.id} className="flex items-center gap-3 px-4 py-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[var(--peach)]/70 to-[var(--violet)]/40 font-display text-sm">
                {t.merchant[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{t.merchant}</p>
                <p className="truncate text-[11px] text-muted-foreground">{t.card} · {t.when}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">−{formatAUD(t.amount)}</p>
                <p className="text-[11px] text-[var(--violet)]">+{formatPts(t.earned)} pts</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
