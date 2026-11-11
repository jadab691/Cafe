import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { PrimaryButton, SectionTitle } from "../../components/admin/AdminControls";
import { createFood, getFood, updateFood } from "../../services/foods";

const emptyFood = {
  name: "",
  category: "",
  price: "",
  time: "",
  description: "",
  image: "",
  badge: "",
};

const categories = ["Burgers", "Pizza", "Pasta", "Chicken", "Drinks", "Desserts"];

const inputClassName =
  "mt-2 w-full rounded-xl border border-orange-100 bg-white px-4 py-3 font-normal outline-none transition focus:border-orange-500";

function FoodForm({ id }) {
  const navigate = useNavigate();
  const [food, setFood] = useState(emptyFood);
  const [loadedId, setLoadedId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const loading = Boolean(id && loadedId !== id);

  useEffect(() => {
    if (!id) return;

    let active = true;

    getFood(id)
      .then((item) => {
        if (active) {
          setError("");
          setFood({
            name: item.name || "",
            category: item.category || "",
            price: String(item.price ?? ""),
            time: item.time || "",
            description: item.description || "",
            image: item.image || "",
            badge: item.badge || "",
          });
        }
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoadedId(id);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const update = (key, value) => {
    setFood((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    const foodData = {
      name: food.name.trim(),
      category: food.category.trim(),
      price: Number(food.price),
      time: food.time.trim(),
      description: food.description.trim(),
      image: food.image.trim(),
      badge: food.badge.trim(),
    };

    try {
      if (id) {
        await updateFood(id, foodData);
      } else {
        await createFood(foodData);
      }
      navigate("/admin/manage-foods");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <SectionTitle
        eyebrow="Menu operations"
        title={id ? "Edit Food" : "Add New Food"}
        description="Add the details customers will see in the menu."
        action={
          <Link to="/admin/manage-foods" className="text-sm font-bold text-orange-700">
            ← Back to Menu
          </Link>
        }
      />

      {error && !loading && (
        <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p role="status" className="py-8 text-center text-slate-500">Loading food details...</p>
      ) : (
        <form onSubmit={submit} className="max-w-3xl space-y-6">
          <section aria-labelledby="food-information-heading" className="border-t border-orange-100 pt-5">
            <h2 id="food-information-heading" className="mb-4 text-lg font-bold text-slate-900">
              Food Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                Food Name *
                <input
                  required
                  maxLength={100}
                  value={food.name}
                  onChange={(event) => update("name", event.target.value)}
                  className={inputClassName}
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Category *
                <select
                  required
                  value={food.category}
                  onChange={(event) => update("category", event.target.value)}
                  className={inputClassName}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {food.category && !categories.includes(food.category) && (
                    <option value={food.category}>{food.category}</option>
                  )}
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Price (Tk) *
                <input
                  required
                  type="number"
                  min="1"
                  step="0.01"
                  value={food.price}
                  onChange={(event) => update("price", event.target.value)}
                  className={inputClassName}
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Preparation Time *
                <input
                  required
                  maxLength={40}
                  value={food.time}
                  onChange={(event) => update("time", event.target.value)}
                  placeholder="e.g. 15–20 min"
                  className={inputClassName}
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Menu Badge
                <input
                  maxLength={40}
                  value={food.badge}
                  onChange={(event) => update("badge", event.target.value)}
                  placeholder="Optional, e.g. BEST SELLER"
                  className={inputClassName}
                />
              </label>
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                Description *
                <textarea
                  required
                  maxLength={1000}
                  rows="4"
                  value={food.description}
                  onChange={(event) => update("description", event.target.value)}
                  className={inputClassName}
                />
              </label>
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                Image URL *
                <input
                  required
                  type="url"
                  value={food.image}
                  onChange={(event) => update("image", event.target.value)}
                  placeholder="https://example.com/food.jpg"
                  className={inputClassName}
                />
              </label>
            </div>
          </section>

          <div className="flex flex-wrap justify-end gap-3 border-t border-orange-100 pt-5">
            <Link
              to="/admin/manage-foods"
              className="rounded-full border border-orange-100 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-orange-50"
            >
              Cancel
            </Link>
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Saving..." : id ? "Save Changes" : "＋ Add Food"}
            </PrimaryButton>
          </div>
        </form>
      )}
    </AdminLayout>
  );
}

export default function AddFood() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  return <FoodForm key={id || "new"} id={id} />;
}
