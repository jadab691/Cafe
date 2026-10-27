
import { Plus, Leaf } from "lucide-react";

export default function FoodCard({ food, onAddToCart, onViewDetails }) {
  return (
    <article
      id={`food-${food.id}`}
      className="flex items-center justify-between gap-4 border-b border-gray-200 py-6 sm:gap-6"
    >
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onViewDetails(food)}
          className="text-left text-lg font-bold text-gray-800 transition hover:text-orange-600 sm:text-2xl"
        >
          {food.name}
        </button>

        <p className="mt-2 text-lg text-gray-800 sm:text-xl">
          Tk {food.price}
        </p>

        <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
          {food.description}
        </p>

        {food.category === "Snacks" && (
          <div
            title="Snack item"
            className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50"
          >
            <Leaf size={21} className="text-emerald-700" />
          </div>
        )}

        {food.badge && (
          <span className="mt-3 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
            {food.badge}
          </span>
        )}
      </div>

      <div className="relative h-28 w-28 shrink-0 sm:h-36 sm:w-36">
        <button
          type="button"
          onClick={() => onViewDetails(food)}
          className="h-full w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
          aria-label={`View ${food.name} details`}
        >
          <img
            src={food.image}
            alt={food.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </button>

        <button
          type="button"
          onClick={() => onAddToCart(food)}
          aria-label={`Add ${food.name} to cart`}
          className="absolute -bottom-1 -right-1 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-md transition hover:scale-105 hover:bg-orange-500 hover:text-white"
        >
          <Plus size={27} strokeWidth={1.7} />
        </button>
      </div>
    </article>
  );
}
