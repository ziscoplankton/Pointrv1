import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { formatAUD, formatPts, storeItems } from "@/lib/wallet-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/store")({
  head: () => ({ meta: [{ title: "Points Store — Halo Wallet" }, { name: "description", content: "Spend rewards points directly on curated products and experiences." }] }),
  component: StorePage,
});

const tags = ["For you", "Audio", "Home", "Beauty", "Wine", "Luxury"];

function StorePage() {
  return (
    <AppShell>
      <header className="mb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Points store</p>
        <h1 className="font-display text-3xl">Spend points, <span className="gradient-text">not paychecks.</span></h1>
      </header>

      <div className="glass mb-4 flex items-center gap-2 rounded-2xl px-4 py-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input placeholder="Search Sonos, Aesop, Penfolds…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </div>

      <div className="-mx-5 mb-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tags.map((t, i) => (
          <button key={t} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium ${i === 0 ? "bg-gradient-to-br from-[var(--coral)] to-[var(--violet)] text-white" : "glass"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {storeItems.map((item) => (
          <article key={item.id} className="glass flex flex-col overflow-hidden rounded-3xl">
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-[var(--peach)]/50 to-[var(--violet)]/30 text-5xl">
              {item.image}
            </div>
            <div className="space-y-1 p-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.brand}</p>
              <p className="line-clamp-1 text-sm font-semibold">{item.name}</p>
              <div className="pt-1">
                <p className="font-display text-base">{formatPts(item.pointsPrice)} <span className="text-[10px] text-muted-foreground">pts</span></p>
                <p className="text-[11px] text-muted-foreground">or {formatAUD(item.cashPrice)} · or split</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
