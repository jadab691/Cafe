
const categories = [
  { name: "All", icon: "✦" },
  { name: "Coffee", icon: "☕" },
  { name: "Burgers", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
  { name: "Pasta", icon: "🍝" },
  { name: "Snacks", icon: "🍟" },
  { name: "Desserts", icon: "🍰" },
];

export default function CategoryFilter({
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="mb-10 flex gap-3 overflow-x-auto pb-3">
      {categories.map((category) => (
        <button
          key={category.name}
          type="button"
          onClick={() => setActiveCategory(category.name)}
          className={`shrink-0 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
            activeCategory === category.name
              ? "border-orange-500 bg-orange-500 text-white shadow-md"
              : "border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-600"
          }`}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}
