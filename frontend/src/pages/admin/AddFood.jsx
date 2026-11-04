import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { demoFoods, Panel, SectionTitle, PrimaryButton } from "./AdminUI";

const emptyFood = {
  name: "Smoky BBQ Bacon Smash",
  category: "Burgers",
  description: "Signature handcrafted gourmet brioche with smoky BBQ sauce.",
  price: "320",
  originalPrice: "350",
  prepTime: "15–20 mins",
  image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=900&q=85",
  available: true,
  badge: "CHEF'S PICK",
};

export default function AddFood() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = new URLSearchParams(location.search).get("id");
  const existing = demoFoods.find((f) => String(f.id) === id);
  const [food, setFood] = useState(existing ? { ...existing, price: String(existing.price), originalPrice: String(existing.originalPrice || "") } : emptyFood);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (existing) setFood({ ...existing, price: String(existing.price), originalPrice: String(existing.originalPrice || "") });
  }, [id]);

  const update = (key, value) => { setFood((old) => ({ ...old, [key]: value })); setSaved(false); };
  const discount = Number(food.originalPrice) > Number(food.price)
    ? Math.round((1 - Number(food.price) / Number(food.originalPrice)) * 100)
    : 0;

  const submit = (e) => {
    e.preventDefault();
    setSaved(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AdminLayout>
      <SectionTitle eyebrow="Menu operations" title={id ? "Edit Food" : "Add New Food"} description="Create a menu item and preview how customers will see it." action={<Link to="/admin/manage-foods" className="text-sm font-bold text-orange-800">← Back to Menu</Link>} />
      {saved && <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">Demo saved successfully. Connect the form to your backend API to store it permanently.</div>}

      <form onSubmit={submit} className="space-y-5">
        <Panel title="Food Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Food Name *
              <input required value={food.name} onChange={(e) => update("name", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f1f3ff] px-4 py-3 font-normal outline-none focus:border-orange-500" />
            </label>
            <label className="text-sm font-semibold text-slate-700">Category *
              <select value={food.category} onChange={(e) => update("category", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f1f3ff] px-4 py-3 font-normal"><option>Burgers</option><option>Pizza</option><option>Chicken</option><option>Pasta</option><option>Drinks</option><option>Desserts</option></select>
            </label>
            <label className="text-sm font-semibold text-slate-700">Badge
              <input value={food.badge} onChange={(e) => update("badge", e.target.value)} placeholder="e.g. BEST SELLER" className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f1f3ff] px-4 py-3 font-normal" />
            </label>
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Description
              <textarea rows="3" value={food.description} onChange={(e) => update("description", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f1f3ff] px-4 py-3 font-normal" />
            </label>
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Food Image URL
              <input value={food.image} onChange={(e) => update("image", e.target.value)} placeholder="Paste an image URL" className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f1f3ff] px-4 py-3 font-normal" />
            </label>
          </div>
        </Panel>

        <Panel title="Live Customer Card Preview">
          <div className="rounded-2xl border border-orange-100 bg-orange-50/40 p-4">
            <div className="mb-3 flex justify-between text-xs font-extrabold uppercase text-orange-800"><span>● Customer menu preview</span><span>Live preview</span></div>
            <div className="flex flex-col gap-4 sm:flex-row">
              {food.image ? <img src={food.image} alt="Food preview" onError={(e) => { e.currentTarget.style.display = "none"; }} className="h-36 w-full rounded-xl object-cover sm:w-36" /> : <div className="flex h-36 w-full items-center justify-center rounded-xl bg-slate-200 text-slate-500 sm:w-36">Food Photo</div>}
              <div className="flex-1">
                {food.badge && <span className="inline-block rounded-full bg-orange-700 px-3 py-1 text-[10px] font-bold text-white">{food.badge}</span>}
                <h3 className="mt-2 text-xl font-extrabold">{food.name || "Your food name"}</h3>
                <p className="mt-1 text-sm text-slate-500">{food.description || "Your food description will appear here."}</p>
                <p className="mt-3 text-lg font-extrabold text-orange-800">Tk {food.price || "0"} {Number(food.originalPrice) > Number(food.price) && <del className="ml-2 text-sm font-normal text-slate-400">Tk {food.originalPrice}</del>}</p>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Pricing & Kitchen Operations">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">Selling Price (Tk) *
              <input required type="number" min="1" value={food.price} onChange={(e) => update("price", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f1f3ff] px-4 py-3" />
            </label>
            <label className="text-sm font-medium">Original Price (Tk)
              <input type="number" min="0" value={food.originalPrice} onChange={(e) => update("originalPrice", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f1f3ff] px-4 py-3" />
            </label>
          </div>
          <p className="mt-3 text-sm text-orange-700">{discount ? `Customer discount: ${discount}% off` : "No discount applied."}</p>
          <label className="mt-5 block text-sm font-medium">Preparation Time
            <select value={food.prepTime} onChange={(e) => update("prepTime", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f1f3ff] px-4 py-3 sm:max-w-sm"><option>10–15 mins</option><option>15–20 mins</option><option>20–25 mins</option><option>25–30 mins</option></select>
          </label>
        </Panel>

        <Panel title="Store Visibility & Badges">
          <div className="flex items-center justify-between gap-4"><div><p className="font-semibold">Live In Stock</p><p className="text-xs text-slate-500">Customers can order this dish immediately.</p></div><input type="checkbox" checked={food.available} onChange={(e) => update("available", e.target.checked)} className="h-5 w-5 accent-orange-700" /></div>
        </Panel>
        <div className="flex flex-wrap justify-end gap-3"><Link to="/admin/manage-foods" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600">Cancel</Link><PrimaryButton type="submit">{id ? "Save Changes" : "＋ Add Food"}</PrimaryButton></div>
      </form>
    </AdminLayout>
  );
}
