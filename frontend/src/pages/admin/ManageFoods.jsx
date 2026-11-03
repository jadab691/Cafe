
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const API_URL = "http://localhost:3000/api/foods";

const categories = [
    "Burger",
    "Pizza",
    "Rice",
    "Pasta",
    "Drinks",
    "Desserts",
    "Chicken",
    "Snacks",
    "Seafood",
];

const emptyForm = {
    name: "",
    category: "",
    price: "",
    rating: "",
    reviews: "",
    time: "",
    description: "",
    image: "",
    ingredients: "",
};

const inputStyle =
    "w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-yellow-500";

export default function ManageFoods() {
    const [foods, setFoods] = useState([]);
    const [form, setForm] = useState(emptyForm);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");

    // Fetch foods from MongoDB
    const fetchFoods = async () => {
        try {
            setError("");

            const response = await fetch(API_URL);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to load foods");
            }

            setFoods(data.foods || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Add or update food
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (saving) return;

        const foodData = {
            name: form.name.trim(),
            category: form.category,
            price: Number(form.price),
            rating: Number(form.rating || 0),
            reviews: Number(form.reviews || 0),
            time: form.time.trim(),
            description: form.description.trim(),
            image: form.image.trim(),
            ingredients: form.ingredients
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
        };

        try {
            setSaving(true);

            const response = await fetch(
                editingId ? `${API_URL}/${editingId}` : API_URL,
                {
                    method: editingId ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(foodData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            if (editingId) {
                setFoods((prev) =>
                    prev.map((food) =>
                        food._id === editingId ? data.food : food
                    )
                );
                alert("Food updated successfully!");
            } else {
                setFoods((prev) => [data.food, ...prev]);
                alert("Food added successfully!");
            }

            resetForm();
        } catch (error) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    // Fill form for editing
    const editFood = (food) => {
        setEditingId(food._id);

        setForm({
            name: food.name || "",
            category: food.category || "",
            price: String(food.price ?? ""),
            rating: String(food.rating ?? 0),
            reviews: String(food.reviews ?? 0),
            time: food.time || "",
            description: food.description || "",
            image: food.image || "",
            ingredients: (food.ingredients || []).join(", "),
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Reset form
    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    // Delete food
    const deleteFood = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this food?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete food");
            }

            setFoods((prev) =>
                prev.filter((food) => food._id !== id)
            );

            if (editingId === id) {
                resetForm();
            }

            alert("Food deleted successfully!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-green-100 flex">

            {/* Sidebar */}
            <aside className="w-56 shrink-0 bg-yellow-100 border-r p-5">
                <h1 className="text-2xl font-bold mb-10">Cafe.</h1>

                <nav className="space-y-2">
                    {[
                        { name: "Dashboard", path: "/admin/dashboard" },
                        { name: "Manage Foods", path: "/admin/manage-foods" },
                        { name: "Orders", path: "/admin/orders" },
                        { name: "Customers", path: "/admin/customers" },
                        { name: "Delivery", path: "/admin/delivery" },
                    ].map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg text-sm ${isActive
                                    ? "bg-black text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 p-5 md:p-8">

                <h1 className="text-3xl font-bold text-yellow-700 mb-2">
                    Manage Foods
                </h1>

                <p className="text-gray-600 mb-8">
                    Add, update and manage restaurant foods.
                </p>

                {/* Food Form */}
                <div className="bg-white p-6 rounded-lg mb-8">

                    <h2 className="text-xl font-semibold mb-5">
                        {editingId ? "Update Food" : "Add New Food"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <input
                                name="name"
                                placeholder="Food Name"
                                value={form.name}
                                onChange={handleChange}
                                className={inputStyle}
                                required
                            />

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className={inputStyle}
                                required
                            >
                                <option value="">Select Category</option>

                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                name="price"
                                placeholder="Price (৳)"
                                value={form.price}
                                onChange={handleChange}
                                className={inputStyle}
                                min="1"
                                required
                            />

                            <input
                                type="number"
                                name="rating"
                                placeholder="Rating (e.g. 4.8)"
                                value={form.rating}
                                onChange={handleChange}
                                className={inputStyle}
                                min="0"
                                max="5"
                                step="0.1"
                            />

                            <input
                                type="number"
                                name="reviews"
                                placeholder="Number of Reviews"
                                value={form.reviews}
                                onChange={handleChange}
                                className={inputStyle}
                                min="0"
                            />

                            <input
                                name="time"
                                placeholder="Preparation Time (e.g. 15 min)"
                                value={form.time}
                                onChange={handleChange}
                                className={inputStyle}
                                required
                            />

                            <input
                                name="image"
                                type="url"
                                placeholder="Food Image URL"
                                value={form.image}
                                onChange={handleChange}
                                className={`${inputStyle} md:col-span-2`}
                                required
                            />

                        </div>

                        <textarea
                            name="description"
                            placeholder="Food Description"
                            value={form.description}
                            onChange={handleChange}
                            className={inputStyle}
                            rows="3"
                            required
                        />

                        <textarea
                            name="ingredients"
                            placeholder="Ingredients (separate with commas)"
                            value={form.ingredients}
                            onChange={handleChange}
                            className={inputStyle}
                            rows="2"
                        />

                        {/* Image Preview */}
                        {form.image && (
                            <div>
                                <p className="text-sm text-gray-500 mb-2">
                                    Image Preview
                                </p>
                                <img
                                    src={form.image}
                                    alt="Food preview"
                                    className="w-32 h-24 object-cover rounded-lg"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-white px-6 py-3 rounded-lg"
                            >
                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Food"
                                        : "Add Food"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                    </form>
                </div>

                {/* Food List */}
                <div className="bg-white p-6 rounded-lg">

                    <h2 className="text-xl font-semibold mb-5">
                        Food List ({foods.length})
                    </h2>

                    {loading ? (
                        <p className="text-gray-500">Loading foods...</p>
                    ) : error ? (
                        <div className="text-red-500">
                            <p>{error}</p>
                            <button
                                onClick={fetchFoods}
                                className="underline mt-2"
                            >
                                Try again
                            </button>
                        </div>
                    ) : foods.length === 0 ? (
                        <p className="text-gray-500">
                            No foods added yet.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">

                                <thead className="text-gray-500 border-b">
                                    <tr>
                                        <th className="py-3 pr-4">Food</th>
                                        <th className="pr-4">Category</th>
                                        <th className="pr-4">Price</th>
                                        <th className="pr-4">Rating</th>
                                        <th className="pr-4">Time</th>
                                        <th className="pr-4">Ingredients</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {foods.map((food) => (
                                        <tr
                                            key={food._id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="py-4 pr-4">
                                                <div className="flex items-center gap-3 min-w-40">
                                                    <img
                                                        src={food.image}
                                                        alt={food.name}
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = "none";
                                                        }}
                                                    />
                                                    <span className="font-medium">
                                                        {food.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="pr-4">
                                                {food.category}
                                            </td>

                                            <td className="pr-4">
                                                ৳{food.price}
                                            </td>

                                            <td className="pr-4">
                                                ⭐ {food.rating ?? 0}
                                                <span className="text-gray-400">
                                                    {" "}({food.reviews ?? 0})
                                                </span>
                                            </td>

                                            <td className="pr-4">
                                                {food.time}
                                            </td>

                                            <td className="pr-4 min-w-40">
                                                {(food.ingredients || []).join(", ") || "-"}
                                            </td>

                                            <td>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => editFood(food)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => deleteFood(food._id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}

                </div>

            </main>
        </div>
    );
}
