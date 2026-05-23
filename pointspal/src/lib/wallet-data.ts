export type PaymentCard = {
  id: string;
  name: string;
  issuer: string;
  last4: string;
  type: "visa" | "amex" | "flybuys" | "fly";
  balance?: number;
  points: number;
  pointsLabel: string;
  pointValue: number; // dollar value per point
  gradient: string;
};

export const cards: PaymentCard[] = [
  {
    id: "amex-plat",
    name: "Amex Platinum",
    issuer: "American Express",
    last4: "1004",
    type: "amex",
    points: 184230,
    pointsLabel: "Membership Rewards",
    pointValue: 0.0075,
    gradient: "var(--gradient-card-amex)",
  },
  {
    id: "visa-sig",
    name: "Velocity Signature",
    issuer: "Visa",
    last4: "4429",
    type: "visa",
    points: 62100,
    pointsLabel: "Velocity Points",
    pointValue: 0.0085,
    gradient: "var(--gradient-card-visa)",
  },
  {
    id: "qff",
    name: "Qantas Frequent Flyer",
    issuer: "Qantas",
    last4: "8821",
    type: "fly",
    points: 248900,
    pointsLabel: "Qantas Points",
    pointValue: 0.014,
    gradient: "var(--gradient-card-fly)",
  },
  {
    id: "flybuys",
    name: "Flybuys",
    issuer: "Coles Group",
    last4: "5530",
    type: "flybuys",
    points: 31200,
    pointsLabel: "Flybuys Points",
    pointValue: 0.005,
    gradient: "var(--gradient-card-flybuys)",
  },
];

export const totalPointsValue = cards.reduce(
  (sum, c) => sum + c.points * c.pointValue,
  0,
);

export const recentTransactions = [
  { id: "1", merchant: "Mecca Cosmetica", category: "Beauty", amount: 184.5, card: "Amex Platinum", earned: 369, when: "Today" },
  { id: "2", merchant: "Qantas QF11 SYD→LAX", category: "Travel", amount: 1842.0, card: "Qantas FF", earned: 5480, when: "Yesterday" },
  { id: "3", merchant: "Coles Bondi Junction", category: "Groceries", amount: 92.34, card: "Flybuys", earned: 92, when: "Yesterday" },
  { id: "4", merchant: "Three Blue Ducks", category: "Dining", amount: 124.0, card: "Velocity Visa", earned: 248, when: "2d ago" },
  { id: "5", merchant: "Spotify", category: "Subscriptions", amount: 16.99, card: "Amex Platinum", earned: 17, when: "3d ago" },
];

export type Goal = {
  id: string;
  title: string;
  target: string;
  pointsNeeded: number;
  pointsCurrency: string;
  category: "travel" | "lifestyle" | "cashout" | "everyday";
  emoji: string;
};

export const goals: Goal[] = [
  { id: "tokyo", title: "Business Class to Tokyo", target: "1 return seat, Qantas QF25", pointsNeeded: 318000, pointsCurrency: "Qantas Points", category: "travel", emoji: "✈️" },
  { id: "weekend", title: "Weekend in Hobart", target: "2 nights + flights", pointsNeeded: 62000, pointsCurrency: "Velocity Points", category: "travel", emoji: "🏔️" },
  { id: "groceries", title: "$500 grocery offset", target: "Coles vouchers", pointsNeeded: 100000, pointsCurrency: "Flybuys Points", category: "everyday", emoji: "🛒" },
  { id: "cash", title: "Cash out to wallet", target: "Direct to bank", pointsNeeded: 50000, pointsCurrency: "Any Points", category: "cashout", emoji: "💸" },
];

export type StoreItem = {
  id: string;
  name: string;
  brand: string;
  pointsPrice: number;
  cashPrice: number;
  image: string; // emoji as image
  tag: string;
};

export const storeItems: StoreItem[] = [
  { id: "s1", name: "Sonos Era 100", brand: "Sonos", pointsPrice: 38000, cashPrice: 399, image: "🔊", tag: "Audio" },
  { id: "s2", name: "Le Creuset 24cm", brand: "Le Creuset", pointsPrice: 52000, cashPrice: 549, image: "🍲", tag: "Home" },
  { id: "s3", name: "Aesop Hand Set", brand: "Aesop", pointsPrice: 9800, cashPrice: 105, image: "🧴", tag: "Beauty" },
  { id: "s4", name: "Bose QC Ultra", brand: "Bose", pointsPrice: 64000, cashPrice: 649, image: "🎧", tag: "Audio" },
  { id: "s5", name: "Penfolds Bin 389", brand: "Penfolds", pointsPrice: 12000, cashPrice: 130, image: "🍷", tag: "Wine" },
  { id: "s6", name: "Tiffany T1 Ring", brand: "Tiffany & Co.", pointsPrice: 280000, cashPrice: 2950, image: "💍", tag: "Luxury" },
];

export const formatPts = (n: number) => n.toLocaleString("en-AU");
export const formatAUD = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: n < 10 ? 2 : 0 });
