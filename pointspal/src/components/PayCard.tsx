import type { PaymentCard } from "@/lib/wallet-data";
import { formatPts } from "@/lib/wallet-data";

const logos: Record<PaymentCard["type"], string> = {
  amex: "AMEX",
  visa: "VISA",
  fly: "QFF",
  flybuys: "flybuys",
};

export function PayCard({ card, compact = false }: { card: PaymentCard; compact?: boolean }) {
  return (
    <div
      className="pay-card rounded-3xl p-5"
      style={{ background: card.gradient, height: compact ? 170 : 210 }}
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] opacity-70">{card.issuer}</p>
            <p className="font-display text-xl leading-tight">{card.name}</p>
          </div>
          <span className="font-display text-sm tracking-[0.2em] opacity-90">{logos[card.type]}</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-70">{card.pointsLabel}</p>
            <p className="font-display text-2xl">{formatPts(card.points)}</p>
          </div>
          <p className="font-mono text-sm opacity-80">•••• {card.last4}</p>
        </div>
      </div>
    </div>
  );
}
