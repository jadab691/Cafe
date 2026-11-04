import React from "react";

export const demoFoods = [
  {
    id: 1,
    name: "Classic Beef Burger",
    category: "Burgers",
    description: "Juicy beef, fresh lettuce, cheddar cheese and house sauce.",
    price: 280,
    originalPrice: 320,
    prepTime: "12–15 mins",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&q=85",
    available: true,
    badge: "BEST SELLER",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    category: "Pizza",
    description: "Fresh mozzarella, tomato sauce and fragrant basil.",
    price: 450,
    originalPrice: 0,
    prepTime: "18–22 mins",
    image: "https://images.unsplash.com/photo-1576458088443-04a19bb13da6?w=700&q=85",
    available: true,
    badge: "WOODFIRED",
  },
  {
    id: 3,
    name: "Crispy Fried Chicken",
    category: "Chicken",
    description: "Three pieces of golden crispy chicken with a special dip.",
    price: 260,
    originalPrice: 0,
    prepTime: "15–18 mins",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=700&q=85",
    available: false,
    badge: "",
  },
  {
    id: 4,
    name: "Fresh Lemon Drink",
    category: "Drinks",
    description: "Chilled lemon drink with fresh mint leaves.",
    price: 100,
    originalPrice: 120,
    prepTime: "5 mins",
    image: "https://images.unsplash.com/photo-1513558161293-c72b2a8b2f3c?w=700&q=85",
    available: true,
    badge: "",
  },
];

export const demoOrders = [
  {
    id: "CF-2091",
    customer: "Tanvir Ahmed",
    phone: "01819-234567",
    address: "Block C, Road 4, House 12, Gulshan-1",
    amount: 830,
    payment: "COD",
    status: "Pending",
    time: "3 mins ago",
    items: [
      { name: "Classic Beef Burger", qty: 2, price: 560 },
      { name: "Fresh Lemon Drink", qty: 1, price: 100 },
    ],
    prepTime: 25,
  },
  {
    id: "CF-2089",
    customer: "Nusrat Jahan",
    phone: "01822-998877",
    address: "Banani Road 11",
    amount: 680,
    payment: "COD",
    status: "Cooking",
    time: "8 mins ago",
    items: [{ name: "Margherita Pizza", qty: 1, price: 450 }],
    prepTime: 20,
  },
  {
    id: "CF-2085",
    customer: "Sadia Rahman",
    phone: "01711-223344",
    address: "Dhanmondi, Dhaka",
    amount: 730,
    payment: "COD",
    status: "Ready",
    time: "14 mins ago",
    items: [{ name: "Classic Beef Burger", qty: 1, price: 280 }],
    prepTime: 15,
  },
  {
    id: "CF-2081",
    customer: "Rafi Hasan",
    phone: "01911-223344",
    address: "Uttara, Dhaka",
    amount: 520,
    payment: "Online",
    status: "On Delivery",
    time: "22 mins ago",
    items: [{ name: "Crispy Fried Chicken", qty: 2, price: 520 }],
    prepTime: 20,
    rider: "Rahim Khan",
  },
];

export function SectionTitle({ eyebrow, title, description, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-wider text-orange-700">{eyebrow}</p>}
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({ title, children, className = "", action }) {
  return (
    <section className={`rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="font-bold text-slate-900">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({ label, value, note, icon = "▣", tone = "orange" }) {
  const tones = {
    orange: "bg-orange-100 text-orange-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-emerald-100 text-emerald-700",
    purple: "bg-violet-100 text-violet-700",
  };
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${tones[tone] || tones.orange}`}>{icon}</span>
        <span className="text-xs font-semibold text-slate-400">CAFE PORTAL</span>
      </div>
      <p className="mt-3 text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="text-sm font-medium text-slate-700">{label}</p>
      {note && <p className="mt-1 text-xs text-slate-500">{note}</p>}
    </div>
  );
}

export function StatusPill({ status }) {
  const styles = {
    Pending: "bg-orange-100 text-orange-800",
    Cooking: "bg-amber-100 text-amber-800",
    Ready: "bg-emerald-100 text-emerald-800",
    "On Delivery": "bg-blue-100 text-blue-800",
    Delivered: "bg-slate-100 text-slate-700",
    "Claim Open": "bg-orange-100 text-orange-800",
    Active: "bg-emerald-100 text-emerald-800",
    Idle: "bg-slate-100 text-slate-600",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${styles[status] || "bg-slate-100 text-slate-700"}`}>{status}</span>;
}

export function PrimaryButton({ children, ...props }) {
  return (
    <button {...props} className={`inline-flex items-center justify-center gap-2 rounded-full bg-orange-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-800 disabled:cursor-not-allowed disabled:opacity-50 ${props.className || ""}`}>
      {children}
    </button>
  );
}

export function SearchBox({ value, onChange, placeholder = "Search..." }) {
  return (
    <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-sm">
      <span className="text-lg text-slate-400">⌕</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
    </label>
  );
}
