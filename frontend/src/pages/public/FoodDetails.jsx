import { Link, useLocation, useParams } from "react-router-dom";

export default function FoodDetails() {
  const { id } = useParams();
  const { state } = useLocation();

  const food = state?.food;

  if (!food || String(food.id) !== id) {
    return (
      <main className="min-h-[60vh] bg-[#fffdf8] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Food details not found
          </h1>

          <p className="mt-3 text-gray-500">
            Please select a food item from our menu.
          </p>

          <Link
            to="/#popular"
            className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
          >
            Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffdf8] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/#popular"
          className="mb-8 inline-block font-semibold text-orange-600 hover:text-orange-700"
        >
          ← Back to Menu
        </Link>

        <div className="grid items-start gap-8 rounded-3xl border border-orange-100 bg-white p-5 shadow-lg sm:p-8 md:grid-cols-2">
          <div>
            <img
              src={food.image}
              alt={food.name}
              className="h-72 w-full rounded-2xl object-cover sm:h-96"
            />
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                {food.category}
              </span>

              {food.popular && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Popular
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {food.name}
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              {food.description}
            </p>

            <p className="mt-5 text-3xl font-extrabold text-orange-600">
              ৳{food.price}
            </p>

            {food.ingredients?.length > 0 && (
              <div className="mt-6 rounded-xl bg-orange-50 p-4">
                <h2 className="font-bold text-gray-900">
                  Ingredients
                </h2>

                <ul className="mt-2 list-inside list-disc space-y-1 text-gray-600">
                  {food.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-4">
              {food.preparationTime && (
                <div className="rounded-xl border border-gray-100 p-4">
                  <p className="text-sm text-gray-500">
                    Preparation Time
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {food.preparationTime}
                  </p>
                </div>
              )}

              {food.serving && (
                <div className="rounded-xl border border-gray-100 p-4">
                  <p className="text-sm text-gray-500">
                    Serving Size
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {food.serving}
                  </p>
                </div>
              )}
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Select this item from the menu to return to the food list.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}