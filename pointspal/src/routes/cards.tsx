import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PayCard } from "@/components/PayCard";
import { cards, formatAUD, formatPts } from "@/lib/wallet-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/cards")({
  head: () => ({ meta: [{ title: "Cards — Halo Wallet" }, { name: "description", content: "All your payment and loyalty cards in one place." }] }),
  component: CardsPage,
});

function CardsPage() {
  return (
    <AppShell>
      <header className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Wallet</p>
          <h1 className="font-display text-3xl">Cards & loyalty</h1>
        </div>
        <button className="glass flex items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium">
          <Plus className="h-4 w-4" /> Add
        </button>
      </header>

      <div className="space-y-8">
        {cards.map((c) => (
          <div key={c.id} className="space-y-3">
            <PayCard card={c} />
            <div className="glass grid grid-cols-3 divide-x divide-white/40 rounded-2xl p-3 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Points</p>
                <p className="font-display text-base">{formatPts(c.points)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Est. value</p>
                <p className="font-display text-base">{formatAUD(c.points * c.pointValue)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Per pt</p>
                <p className="font-display text-base">{(c.pointValue * 100).toFixed(2)}¢</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
