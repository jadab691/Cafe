import { useState } from "react";
import { Link } from "react-router-dom";
import FoodCard from "../../components/FoodCard";

const categories = [
  "All",
  "Burgers",
  "Pizza",
  "Pasta",
  "Chicken",
  "Drinks",
];

// Start of the food item mapping

const foods = [
  {
    id: 1,
    name: "Classic Beef Burger",
    category: "Burgers",
    description: "Juicy beef, fresh lettuce, cheese and special sauce.",
    ingredients: [
      "Beef patty",
      "Fresh lettuce",
      "Cheese",
      "Tomato",
      "Special sauce",
    ],
    preparationTime: "15–20 min",
    serving: "1 person",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    popular: true,
  },
  {
    id: 2,
    name: "Margherita Pizza",
    category: "Pizza",
    description: "Fresh mozzarella, tomato sauce and aromatic basil.",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Mozzarella cheese",
      "Fresh basil",
      "Olive oil",
    ],
    preparationTime: "20–25 min",
    serving: "1–2 persons",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80",
    popular: true,
  },
  {
    id: 3,
    name: "Creamy Alfredo Pasta",
    category: "Pasta",
    description: "Creamy white sauce pasta with herbs and parmesan.",
    ingredients: [
      "Pasta",
      "Creamy white sauce",
      "Parmesan cheese",
      "Garlic",
      "Italian herbs",
    ],
    preparationTime: "15–20 min",
    serving: "1 person",
    price: 320,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80",
    popular: false,
  },
  {
    id: 4,
    name: "Crispy Fried Chicken",
    category: "Chicken",
    description: "Golden, crispy chicken with our signature seasoning.",
    ingredients: [
      "Chicken",
      "Crispy coating",
      "Flour",
      "Signature seasoning",
      "Cooking spices",
    ],
    preparationTime: "20–25 min",
    serving: "1 person",
    price: 260,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80",
    popular: true,
  },
  {
    id: 5,
    name: "Double Cheese Burger",
    category: "Burgers",
    description: "Double cheese, grilled beef and a soft toasted bun.",
    ingredients: [
      "Double beef patties",
      "Cheddar cheese",
      "Toasted burger bun",
      "Fresh lettuce",
      "Special sauce",
    ],
    preparationTime: "15–20 min",
    serving: "1 person",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=700&q=80",
    popular: false,
  },
  {
    id: 6,
    name: "Fresh Lemon Drink",
    category: "Drinks",
    description: "A refreshing chilled lemon drink for any time.",
    ingredients: [
      "Fresh lemon",
      "Water",
      "Sugar",
      "Ice",
    ],
    preparationTime: "5 min",
    serving: "1 glass",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80",
    popular: false,
  },
];

// End of the food items

function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFoods =
    activeCategory === "All"
      ? foods
      : foods.filter((food) => food.category === activeCategory);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffdf8] text-gray-900">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#fffaf3] via-[#fffdf8] to-[#fff3e8]">
        {/* Soft Cafe Background Decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 -top-20 -z-10 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-100px] top-10 -z-10 h-[420px] w-[420px] rounded-full bg-amber-100/60 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-160px] left-[35%] -z-10 h-[380px] w-[380px] rounded-full bg-rose-100/50 blur-3xl"
        />

        {/* Subtle Food Decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[3%] top-[12%] -z-10 select-none text-6xl opacity-[0.09] sm:text-7xl"
        >
          🍕
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[10%] left-[42%] -z-10 select-none text-5xl opacity-[0.08] sm:text-6xl"
        >
          ☕
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[3%] top-[15%] -z-10 select-none text-6xl opacity-[0.08] sm:text-7xl"
        >
          🥑
        </div>

        {/* Existing Hero Content */}
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              <span>✦</span>
              Freshly prepared, just for you
            </span>

            <h1 className="mt-6 max-w-xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Good food.
              <br />
              Good <span className="text-orange-500">mood.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
              Discover delicious meals made with fresh ingredients.
              Order your favorites and enjoy great food without leaving
              your home.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/menu"
                className="rounded-full bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Explore Menu →
              </Link>

              <a
                href="#popular"
                className="rounded-full border border-gray-200 bg-white px-7 py-3.5 font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
              >
                Popular Foods
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
              <span>✓ Fresh ingredients</span>
              <span>✓ Made to order</span>
              <span>✓ Cash on Delivery</span>
            </div>
          </div>

          {/* Existing Hero Image */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-orange-200/60 blur-2xl" />
            <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-yellow-200/60 blur-2xl" />

            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85"
              alt="Freshly prepared gourmet burger"
              className="relative h-[320px] w-full rounded-[2rem] object-cover shadow-2xl sm:h-[420px]"
            />

            <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-lg sm:right-6 sm:top-6">
              Classic Beef Burger
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-orange-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-start gap-4 rounded-2xl p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-2xl">
              🍳
            </div>
            <div>
              <h3 className="font-bold">Freshly Prepared</h3>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Every meal is prepared fresh when you order.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-2xl">
              🛵
            </div>
            <div>
              <h3 className="font-bold">Convenient Delivery</h3>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Choose home delivery or pick up your order yourself.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-2xl">
              💵
            </div>
            <div>
              <h3 className="font-bold">Easy Payment</h3>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Pay conveniently with Cash on Delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section
        id="popular"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Our Menu
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Explore our delicious food
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-gray-500">
              Find something tasty for every craving, freshly prepared
              and ready to enjoy.
            </p>
          </div>

          <Link
            to="/menu"
            className="font-bold text-orange-500 transition hover:text-orange-600"
          >
            View Full Menu →
          </Link>
        </div>

        {/* Reusable Food Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>

        {/* Full Menu Button */}
        <div className="mt-10 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center rounded-full border border-orange-500 px-7 py-3.5 font-bold text-orange-600 transition hover:bg-orange-500 hover:text-white"
          >
            Explore the Full Menu →
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;