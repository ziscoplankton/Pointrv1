import { Link, useLocation } from "@tanstack/react-router";
import { Wallet, CreditCard, Sparkles, Store, Target } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Wallet", icon: Wallet },
  { to: "/cards", label: "Cards", icon: CreditCard },
  { to: "/rewards", label: "Rewards", icon: Sparkles },
  { to: "/store", label: "Store", icon: Store },
  { to: "/goals", label: "Goals", icon: Target },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="relative mx-auto min-h-screen max-w-md pb-32">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-float absolute -top-20 -left-16 h-72 w-72 rounded-full bg-[oklch(0.85_0.18_30)] opacity-40 blur-3xl" />
        <div className="animate-float absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[oklch(0.72_0.20_310)] opacity-35 blur-3xl [animation-delay:-2s]" />
        <div className="animate-float absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[oklch(0.86_0.14_200)] opacity-35 blur-3xl [animation-delay:-4s]" />
      </div>

      <main className="px-5 pt-8">{children}</main>

      <nav className="fixed bottom-4 left-1/2 z-40 w-[min(92vw,28rem)] -translate-x-1/2">
        <div className="glass flex items-center justify-between rounded-3xl px-2 py-2">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-2 py-2 text-[10px] font-medium transition-all ${
                  active
                    ? "bg-gradient-to-br from-[var(--coral)] to-[var(--violet)] text-white shadow-lg"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
