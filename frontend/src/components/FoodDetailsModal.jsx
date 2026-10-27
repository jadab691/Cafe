
import {
  X,
  Star,
  Clock,
  Check,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";

export default function FoodDetailsModal({
  food,
  quantity,
  setQuantity,
  onClose,
  onAddToCart,
}) {
  if (!food) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${food.name} details`}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2.5 shadow"
        >
          <X size={21} />
        </button>

        <div className="grid md:grid-cols-2">
          <img
            src={food.image}
            alt={food.name}
            className="h-64 w-full object-cover md:h-full md:min-h-[500px]"
          />

          <div className="p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
              {food.category}
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
              {food.name}
            </h2>

            <div className="mt-4 flex items-center gap-2 text-amber-600">
              <Star size={16} fill="currentColor" />
              <span className="font-semibold">{food.rating}</span>
              <span className="text-sm text-gray-400">
                ({food.reviews} reviews)
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              {food.description}
            </p>

            <p className="mt-5 flex items-center gap-2 text-sm text-gray-500">
              <Clock size={17} className="text-orange-500" />
              Preparation: {food.time}
            </p>

            <h3 className="mt-7 font-bold text-gray-900">
              Ingredients
            </h3>

            <ul className="mt-3 space-y-2">
              {food.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <Check size={16} className="text-orange-500" />
                  {ingredient}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center justify-between gap-3 border-t pt-5">
              <div>
                <p className="text-sm text-gray-500">
                  Total price
                </p>
                <p className="mt-1 text-3xl font-extrabold text-orange-500">
                  ৳{food.price * quantity}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border p-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="rounded-lg p-2 hover:bg-orange-50 disabled:opacity-30"
                >
                  <Minus size={17} />
                </button>

                <span className="min-w-5 text-center font-bold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(20, q + 1))
                  }
                  disabled={quantity >= 20}
                  aria-label="Increase quantity"
                  className="rounded-lg p-2 hover:bg-orange-50 disabled:opacity-30"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onAddToCart(food, quantity)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600"
            >
              <ShoppingCart size={19} />
              Add {quantity} to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
