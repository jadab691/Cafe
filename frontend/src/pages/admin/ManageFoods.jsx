import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { PrimaryButton, SearchBox, SectionTitle } from "../../components/admin/AdminControls";
import { deleteFood, getFoods, updateFood } from "../../services/foods";

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyFood, setBusyFood] = useState("");

  const loadFoods = useCallback(async () => {
    try {
      const items = await getFoods();
      setFoods(items.map((food) => ({ ...food, id: food._id })));
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    getFoods()
      .then((items) => {
        if (active) {
          setFoods(items.map((food) => ({ ...food, id: food._id })));
          setError("");
        }
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const retryLoading = () => {
    setLoading(true);
    setError("");
    loadFoods();
  };

  const categories = useMemo(
    () => ["All", ...new Set(foods.map((food) => food.category).filter(Boolean))],
    [foods],
  );
  const filtered = useMemo(
    () =>
      foods.filter(
        (food) =>
          (category === "All" || food.category === category) &&
          `${food.name} ${food.category}`.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [foods, category, search],
  );

  const toggleAvailability = async (food) => {
    setBusyFood(food.id);
    setError("");
    try {
      const updatedFood = await updateFood(food.id, { available: food.available === false });
      setFoods((current) =>
        current.map((item) =>
          item.id === food.id
            ? { ...updatedFood, id: updatedFood._id }
            : item,
        ),
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyFood("");
    }
  };

  const removeFood = async (food) => {
    if (!window.confirm(`Remove "${food.name}" from the menu?`)) return;

    setBusyFood(food.id);
    setError("");
    try {
      await deleteFood(food.id);
      setFoods((current) => current.filter((item) => item.id !== food.id));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyFood("");
    }
  };

  const availableCount = foods.filter((food) => food.available !== false).length;

  return (
    <AdminLayout>
      <SectionTitle
        eyebrow="Menu operations"
        title="Manage Foods"
        description="Manage the dishes available in the customer menu."
        action={
          <Link to="/admin/add-food">
            <PrimaryButton>＋ Add Food</PrimaryButton>
          </Link>
        }
      />

      <dl className="mb-6 grid grid-cols-3 gap-3 border-y border-orange-100 py-5">
        <div className="border-l-2 border-orange-200 pl-3 sm:pl-4">
          <dt className="text-xs text-slate-500">Total Dishes</dt>
          <dd className="text-xl font-extrabold">{foods.length}</dd>
        </div>
        <div className="border-l-2 border-orange-200 pl-3 sm:pl-4">
          <dt className="text-xs text-slate-500">Available</dt>
          <dd className="text-xl font-extrabold text-emerald-700">{availableCount}</dd>
        </div>
        <div className="border-l-2 border-orange-200 pl-3 sm:pl-4">
          <dt className="text-xs text-slate-500">Sold Out</dt>
          <dd className="text-xl font-extrabold text-red-600">{foods.length - availableCount}</dd>
        </div>
      </dl>

      {error && (
        <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <span>{error}</span>
          <button type="button" onClick={retryLoading} className="font-bold underline">
            Try again
          </button>
        </div>
      )}

      <div className="mb-4">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search burger, pasta, drinks..."
        />
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-xs font-bold ${
              category === item ? "bg-orange-500 text-white" : "bg-white text-slate-600"
            }`}
          >
            {item}
            {item === "All"
              ? ` (${foods.length})`
              : ` (${foods.filter((food) => food.category === item).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <p role="status" className="border-y border-orange-100 py-10 text-center text-slate-500">
          Loading menu items...
        </p>
      ) : filtered.length === 0 ? (
        <div className="border-y border-orange-100 py-10 text-center">
          <p className="text-slate-500">
            {foods.length ? "No food items match your search." : "No food items yet."}
          </p>
          {!foods.length && (
            <Link to="/admin/add-food" className="mt-3 inline-block text-sm font-bold text-orange-600">
              Add your first food item →
            </Link>
          )}
        </div>
      ) : (
        <div>
          {filtered.map((food) => (
            <article key={food.id} className="border-b border-orange-100 py-5 first:border-t">
              <div className="flex flex-col gap-3 sm:flex-row">
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-40 w-full rounded-2xl object-cover sm:h-28 sm:w-32"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        {food.badge && (
                          <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-bold text-orange-600">
                            {food.badge}
                          </span>
                        )}
                        <span className="text-xs text-slate-400">{food.category}</span>
                      </div>
                      <h2 className="font-extrabold">{food.name}</h2>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        {food.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/add-food?id=${food.id}`}
                        title={`Edit ${food.name}`}
                        aria-label={`Edit ${food.name}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-orange-700"
                      >
                        ✎
                      </Link>
                      <button
                        type="button"
                        disabled={busyFood === food.id}
                        onClick={() => removeFood(food)}
                        title={`Delete ${food.name}`}
                        aria-label={`Delete ${food.name}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        ♜
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="font-extrabold text-orange-700">
                      ৳{Number(food.price).toLocaleString("en-BD")}
                      {food.time && (
                        <span className="ml-2 text-xs font-normal text-slate-400">
                          {food.time}
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          food.available === false
                            ? "bg-slate-100 text-slate-500"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {food.available === false ? "Sold Out" : "In Stock"}
                      </span>
                      <button
                        type="button"
                        disabled={busyFood === food.id}
                        onClick={() => toggleAvailability(food)}
                        aria-label={`Toggle ${food.name} availability`}
                        aria-pressed={food.available !== false}
                        className={`relative h-6 w-11 rounded-full transition disabled:opacity-50 ${
                          food.available === false ? "bg-slate-300" : "bg-orange-500"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                            food.available === false ? "left-0.5" : "left-[22px]"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
