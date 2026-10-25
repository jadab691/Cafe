import { Link } from "react-router-dom";

function FoodCard({ food }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Food Image */}
      <div className="relative overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {food.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">
            Popular
          </span>
        )}
      </div>

      {/* Food Details */}
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
          {food.category}
        </p>

        <h3 className="mt-2 text-lg font-bold text-gray-900">
          {food.name}
        </h3>

        <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
          {food.description}
        </p>

        {/* Additional Food Information */}
        <div className="mt-4 space-y-3 rounded-xl bg-orange-50/70 p-3">
          {food.ingredients && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-700">
                Ingredients
              </p>

              <p className="mt-1 text-sm leading-5 text-gray-600">
                {food.ingredients.join(", ")}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {food.preparationTime && (
              <div>
                <p className="text-xs font-bold text-gray-700">
                  Preparation
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {food.preparationTime}
                </p>
              </div>
            )}

            {food.serving && (
              <div>
                <p className="text-xs font-bold text-gray-700">
                  Serving Size
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {food.serving}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Price and Button */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-xl font-extrabold text-gray-900">
            ৳{food.price}
          </span>

          <Link
            to={`/food/${food.id}`}
            state={{ food }}
            className="rounded-full bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;