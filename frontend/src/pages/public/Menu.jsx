import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Star,
  Clock,
} from "lucide-react";

const CART_KEY = "cafe-cart";

const foods = [
  {
    id: "1",
    name: "Signature Beef Burger",
    category: "Burgers",
    price: 450,
    rating: 4.9,
    reviews: 128,
    time: "15-20 min",
    badge: "Bestseller",
    description:
      "A premium grilled beef patty layered with cheddar cheese, fresh lettuce, caramelized onions and our signature house sauce.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900",
    ingredients: [
      "Premium beef patty",
      "Cheddar cheese",
      "Fresh lettuce",
      "Caramelized onions",
      "Signature burger sauce",
      "Brioche bun",
    ],
  },
  {
    id: "2",
    name: "Truffle Mushroom Pizza",
    category: "Pizza",
    price: 680,
    rating: 4.8,
    reviews: 96,
    time: "20-25 min",
    badge: "Chef's Choice",
    description:
      "Hand-stretched pizza topped with roasted mushrooms, mozzarella, aromatic herbs and a rich truffle-inspired sauce.",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=900",
    ingredients: [
      "Hand-stretched pizza dough",
      "Mozzarella cheese",
      "Roasted mushrooms",
      "Herbs",
      "Creamy truffle-style sauce",
    ],
  },
  {
    id: "3",
    name: "Caramel Iced Latte",
    category: "Coffee",
    price: 260,
    rating: 4.9,
    reviews: 154,
    time: "5-10 min",
    badge: "Popular",
    description:
      "Double espresso blended with chilled milk, smooth caramel and ice for a refreshing cafe favorite.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900",
    ingredients: [
      "Double espresso",
      "Fresh milk",
      "Caramel syrup",
      "Ice",
    ],
  },
  {
    id: "4",
    name: "Chocolate Fudge Cake",
    category: "Desserts",
    price: 290,
    rating: 4.8,
    reviews: 82,
    time: "5 min",
    badge: "Sweet Pick",
    description:
      "Rich chocolate sponge with silky chocolate ganache and a soft, fudgy center.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900",
    ingredients: [
      "Chocolate sponge",
      "Chocolate ganache",
      "Cocoa",
      "Cream",
    ],
  },
  {
    id: "5",
    name: "Creamy Alfredo Pasta",
    category: "Pasta",
    price: 520,
    rating: 4.7,
    reviews: 73,
    time: "15-20 min",
    badge: "Chef's Choice",
    description:
      "Tender pasta tossed in a creamy Alfredo sauce with parmesan, garlic and freshly cracked black pepper.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900",
    ingredients: [
      "Pasta",
      "Creamy Alfredo sauce",
      "Parmesan",
      "Garlic",
      "Black pepper",
    ],
  },
  {
    id: "6",
    name: "Crispy Golden Fries",
    category: "Snacks",
    price: 180,
    rating: 4.6,
    reviews: 65,
    time: "8-10 min",
    description:
      "Golden, crispy potato fries seasoned with our special spice blend and served hot.",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900",
    ingredients: [
      "Potatoes",
      "Sea salt",
      "House seasoning",
    ],
  },
  {
    id: "7",
    name: "Classic Cappuccino",
    category: "Coffee",
    price: 220,
    rating: 4.8,
    reviews: 91,
    time: "5-8 min",
    description:
      "Rich espresso topped with steamed milk and a velvety layer of milk foam.",
    image:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?w=900",
    ingredients: [
      "Espresso",
      "Steamed milk",
      "Milk foam",
    ],
  },
  {
    id: "8",
    name: "Classic Margherita",
    category: "Pizza",
    price: 490,
    rating: 4.7,
    reviews: 58,
    time: "18-22 min",
    description:
      "A classic pizza with tomato sauce, melted mozzarella, fresh basil and a crisp golden crust.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Mozzarella",
      "Fresh basil",
    ],
  },
  {
    id: "9",
    name: "Red Velvet Cake",
    category: "Desserts",
    price: 320,
    rating: 4.8,
    reviews: 47,
    time: "5 min",
    description:
      "Soft red velvet sponge layered with smooth cream cheese frosting.",
    image:
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=900",
    ingredients: [
      "Red velvet sponge",
      "Cream cheese frosting",
      "Vanilla",
    ],
  },
];

const categories = [
  "All",
  "Coffee",
  "Burgers",
  "Pizza",
  "Pasta",
  "Snacks",
  "Desserts",
];

function readCart() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function hasCustomerSession() {
  if (!localStorage.getItem("customerToken")) return false;

  try {
    const customer = JSON.parse(
      localStorage.getItem("customer") || "null"
    );
    return Boolean(customer?.name);
  } catch {
    return false;
  }
}

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

export default function Menu() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(readCart);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("success");
  const isLoggedIn = hasCustomerSession();

  // Keep cart information saved in localStorage.
  useEffect(() => {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  const filteredFoods = useMemo(() => {
    let result = foods.filter((food) => {
      const matchesCategory =
        category === "All" || food.category === category;

      const query = search.trim().toLowerCase();

      const matchesSearch =
        food.name.toLowerCase().includes(query) ||
        food.category.toLowerCase().includes(query) ||
        food.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    } else if (sortBy === "price-high") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    } else if (sortBy === "rating") {
      result = [...result].sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;
  }, [search, category, sortBy]);

  function addToCart(food, amount = 1) {
    if (!hasCustomerSession()) {
      setNoticeType("error");
      setNotice("Please log in to add items to your cart.");

      window.setTimeout(() => {
        setNotice("");
      }, 4000);
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => String(item.id) === String(food.id)
      );

      let updatedItems;

      if (existingItem) {
        updatedItems = currentItems.map((item) =>
          String(item.id) === String(food.id)
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 1) + amount,
              }
            : item
        );
      } else {
        updatedItems = [
          ...currentItems,
          {
            id: food.id,
            name: food.name,
            category: food.category,
            price: food.price,
            image: food.image,
            quantity: amount,
          },
        ];
      }

      // Save immediately so the Cart page can read it.
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });

    setNoticeType("success");
    setNotice(`${food.name} added to cart`);

    window.setTimeout(() => {
      setNotice("");
    }, 2200);
  }

  function openDetails(food) {
    setSelectedFood(food);
    setQuantity(1);
  }

  function closeDetails() {
    setSelectedFood(null);
    setQuantity(1);
  }

  function addSelectedFood() {
    if (!selectedFood) return;

    addToCart(selectedFood, quantity);
    closeDetails();
  }

  return (
    <main className="min-h-screen bg-white pb-24 text-slate-900">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        {/* Page heading */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {category === "All" ? "All Food" : category}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Fresh favorites, made for you.
            </p>
          </div>

          <span className="shrink-0 text-sm text-slate-500">
            {filteredFoods.length}{" "}
            {filteredFoods.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Search */}
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-orange-500">
          <Search size={20} className="text-slate-400" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search food or category..."
            className="w-full bg-transparent text-sm outline-none"
            aria-label="Search food"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === item
                  ? "bg-orange-500 text-white"
                  : "bg-orange-50 text-slate-700 hover:bg-orange-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Sorting */}
        <div className="mb-4 flex justify-end">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500"
            aria-label="Sort food"
          >
            <option value="default">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Food list */}
        <section>
          {filteredFoods.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 px-5 py-14 text-center">
              <h2 className="text-xl font-bold">
                No food found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try another search or category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSortBy("default");
                }}
                className="mt-5 rounded-full bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
              >
                Show All Food
              </button>
            </div>
          ) : (
            filteredFoods.map((food) => (
              <article
                key={food.id}
                className="flex min-h-52 items-center justify-between gap-5 border-b border-slate-200 py-7"
              >
                {/* Food details */}
                <button
                  type="button"
                  onClick={() => openDetails(food)}
                  className="min-w-0 flex-1 text-left"
                  aria-label={`View details for ${food.name}`}
                >
                  <h2 className="text-xl font-bold leading-snug text-slate-800 transition hover:text-orange-600 sm:text-2xl">
                    {food.name}
                  </h2>

                  <p className="mt-2 text-lg text-slate-800">
                    Tk {food.price}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                    {food.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    {food.rating && (
                      <span className="flex items-center gap-1">
                        <Star
                          size={15}
                          className="fill-amber-400 text-amber-400"
                        />
                        {food.rating} ({food.reviews})
                      </span>
                    )}

                    {food.time && (
                      <span className="flex items-center gap-1">
                        <Clock size={15} />
                        {food.time}
                      </span>
                    )}
                  </div>

                  {food.badge && (
                    <span className="mt-3 inline-block rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-600">
                      {food.badge}
                    </span>
                  )}
                </button>

                {/* Food image and add button */}
                <div className="relative w-28 shrink-0 self-center sm:w-36">
                  <button
                    type="button"
                    onClick={() => openDetails(food)}
                    className="block w-full overflow-hidden rounded-2xl"
                    aria-label={`View ${food.name}`}
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      loading="lazy"
                      className="h-28 w-full object-cover transition duration-300 hover:scale-105 sm:h-36"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => addToCart(food)}
                    aria-label={`Add ${food.name} to cart`}
                    title="Add to cart"
                    className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg transition hover:bg-orange-500 hover:text-white"
                  >
                    <Plus size={25} strokeWidth={1.8} />
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>

      {/* Toast notification */}
      {notice && (
        <div
          role={noticeType === "error" ? "alert" : "status"}
          className={`fixed left-1/2 top-20 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-xl ${
            noticeType === "error" ? "bg-rose-700" : "bg-slate-900"
          }`}
        >
          <span>{noticeType === "success" && "✓"} {notice}</span>
          {noticeType === "error" && (
            <Link
              to="/customer/login"
              className="font-bold underline underline-offset-2"
            >
              Log in
            </Link>
          )}
        </div>
      )}

      {/* Floating cart button */}
      {isLoggedIn && (
        <button
          type="button"
          onClick={() => navigate("/cart")}
          aria-label={`Open shopping cart. ${cartCount} items`}
          title="Open Cart"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl transition hover:scale-105 hover:bg-orange-600"
        >
          <ShoppingCart size={24} />

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-slate-900 px-1 text-xs font-bold text-white">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>
      )}

      {/* Food details modal */}
      {selectedFood && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onClick={closeDetails}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedFood.name}
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeDetails}
              aria-label="Close details"
              className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-slate-800 shadow hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <p className="text-sm font-semibold text-orange-600">
                {selectedFood.category}
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {selectedFood.name}
              </h2>

              <p className="mt-2 text-xl font-bold text-orange-600">
                {formatPrice(selectedFood.price)}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {selectedFood.description}
              </p>

              {selectedFood.ingredients?.length > 0 && (
                <div className="mt-5">
                  <h3 className="font-semibold text-slate-900">
                    Ingredients
                  </h3>

                  <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {selectedFood.ingredients.map((ingredient) => (
                      <li
                        key={ingredient}
                        className="text-sm text-slate-600"
                      >
                        <span className="mr-2 text-orange-500">
                          •
                        </span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center rounded-full border border-slate-200">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    aria-label="Decrease quantity"
                    className="p-3 hover:text-orange-600"
                  >
                    <Minus size={17} />
                  </button>

                  <span className="min-w-8 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) => value + 1)
                    }
                    aria-label="Increase quantity"
                    className="p-3 hover:text-orange-600"
                  >
                    <Plus size={17} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={addSelectedFood}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  <ShoppingCart size={19} />
                  Add · {formatPrice(selectedFood.price * quantity)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}