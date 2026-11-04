import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { demoFoods, SearchBox, SectionTitle, PrimaryButton } from "./AdminUI";

export default function ManageFoods() {
  const [foods, setFoods] = useState(demoFoods);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", "Burgers", "Pizza", "Chicken", "Drinks"];
  const filtered = useMemo(() => foods.filter((food) =>
    (category === "All" || food.category === category) &&
    `${food.name} ${food.category}`.toLowerCase().includes(search.toLowerCase())
  ), [foods, category, search]);

  const toggleAvailability = (id) => setFoods((old) => old.map((f) => f.id === id ? { ...f, available: !f.available } : f));
  const removeFood = (id) => {
    if (window.confirm("Remove this food item from the demo list?")) setFoods((old) => old.filter((f) => f.id !== id));
  };

  return (
    <AdminLayout>
      <SectionTitle eyebrow="Menu operations" title="Manage Foods" description="Update food availability, pricing and customer menu details." action={<Link to="/admin/add-food"><PrimaryButton>＋ Add Food</PrimaryButton></Link>} />

      <div className="mb-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-white p-3 text-center shadow-sm"><p className="text-xl font-extrabold">{foods.length}</p><p className="text-xs text-slate-500">Total Dishes</p></div>
        <div className="rounded-xl bg-white p-3 text-center shadow-sm"><p className="text-xl font-extrabold text-emerald-700">{foods.filter(f => f.available).length}</p><p className="text-xs text-slate-500">Live Active</p></div>
        <div className="rounded-xl bg-white p-3 text-center shadow-sm"><p className="text-xl font-extrabold text-red-600">{foods.filter(f => !f.available).length}</p><p className="text-xs text-slate-500">Sold Out</p></div>
      </div>

      <div className="mb-4"><SearchBox value={search} onChange={setSearch} placeholder="Search burger, pasta, drinks..." /></div>
      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-4 py-2 text-xs font-bold ${category === c ? "bg-orange-800 text-white" : "bg-white text-slate-600"}`}>{c} {c === "All" ? `(${foods.length})` : `(${foods.filter(f => f.category === c).length})`}</button>)}
      </div>

      <div className="space-y-4">
        {filtered.map((food) => (
          <article key={food.id} className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <img src={food.image} alt={food.name} className="h-40 w-full rounded-xl object-cover sm:h-28 sm:w-32" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div><div className="mb-1 flex flex-wrap items-center gap-2">{food.badge && <span className="rounded bg-orange-800 px-2 py-1 text-[10px] font-bold text-white">{food.badge}</span>}<span className="text-xs text-slate-400">{food.category}</span></div><h2 className="font-extrabold">{food.name}</h2><p className="mt-1 line-clamp-2 text-sm text-slate-500">{food.description}</p></div>
                  <div className="flex gap-2"><Link to={`/admin/add-food?id=${food.id}`} title="Edit food" className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-orange-800">✎</Link><button onClick={() => removeFood(food.id)} title="Delete food" className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600">♜</button></div>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-extrabold text-orange-800">Tk {food.price} <span className="ml-2 text-xs font-normal text-slate-400">{food.prepTime}</span></p>
                  <div className="flex items-center gap-3"><span className={`rounded-full px-3 py-1 text-xs font-bold ${food.available ? "bg-orange-100 text-orange-800" : "bg-slate-100 text-slate-500"}`}>{food.available ? "In Stock" : "Sold Out"}</span><button onClick={() => toggleAvailability(food.id)} aria-label={`Toggle ${food.name} availability`} className={`relative h-6 w-11 rounded-full transition ${food.available ? "bg-orange-600" : "bg-slate-300"}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${food.available ? "left-[22px]" : "left-0.5"}`} /></button></div>
                </div>
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <div className="rounded-xl bg-white p-8 text-center text-slate-500">No food items found.</div>}
      </div>
    </AdminLayout>
  );
}
