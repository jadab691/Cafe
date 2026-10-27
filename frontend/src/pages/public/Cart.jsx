import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

const CART_KEY = "cafe-cart";

function getSavedCart() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function formatPrice(price) {
  return `৳${Number(price || 0).toLocaleString("en-BD")}`;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState(getSavedCart);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  useEffect(() => {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  function updateQuantity(id, change) {
    setCartItems((items) => {
      const updated = items
        .map((item) => {
          if (String(item.id) !== String(id)) {
            return item;
          }

          return {
            ...item,
            quantity: Math.max(
              0,
              Number(item.quantity || 1) + change
            ),
          };
        })
        .filter((item) => Number(item.quantity) > 0);

      localStorage.setItem(
        CART_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });
  }

  function removeItem(id) {
    setCartItems((items) => {
      const updated = items.filter(
        (item) => String(item.id) !== String(id)
      );

      localStorage.setItem(
        CART_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });
  }

  function clearCart() {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
    setCartItems([]);
  }

  function handleCustomerChange(event) {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handlePlaceOrder(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    // Demo order confirmation (no backend connected).
    const generatedOrderNumber =
      `CAFE-${Date.now().toString().slice(-6)}`;

    setOrderNumber(generatedOrderNumber);

    clearCart();

    setCheckoutOpen(false);
    setOrderPlaced(true);
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 font-semibold uppercase tracking-widest text-orange-600">
            Your Order
          </p>

          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-stone-500">
            Review your delicious selections before checkout.
          </p>
        </div>

        {/* Order confirmation */}
        {orderPlaced && (
          <section className="mb-8 rounded-2xl border border-green-200 bg-white p-8 text-center shadow-sm">
            <CheckCircle
              size={58}
              className="mx-auto text-green-500"
            />

            <h2 className="mt-4 text-2xl font-bold">
              Order Placed Successfully!
            </h2>

            <p className="mt-3 text-stone-600">
              Thank you, {customer.name}. Your demo order confirmation
              has been generated.
            </p>

            <p className="mt-3 font-semibold text-orange-600">
              Order ID: {orderNumber}
            </p>

            <p className="mt-2 text-sm text-stone-500">
              Payment method: {customer.payment}
            </p>

            <Link
              to="/menu"
              onClick={() => setOrderPlaced(false)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Continue Shopping
            </Link>
          </section>
        )}

        {/* Cart content */}
        {!orderPlaced && (
          <>
            {cartItems.length === 0 ? (
              <section className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
                <ShoppingCart
                  size={55}
                  className="mx-auto text-orange-500"
                />

                <h2 className="mt-4 text-2xl font-bold">
                  Your cart is empty
                </h2>

                <p className="mt-2 text-stone-500">
                  Add your favorite food from our menu.
                </p>

                <Link
                  to="/menu"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  <ArrowLeft size={18} />
                  Explore Menu
                </Link>
              </section>
            ) : (
              <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">

                {/* Food items */}
                <section className="space-y-4">
                  {cartItems.map((item) => (
                    <article
                      key={item.id}
                      className="flex flex-col gap-4 rounded-2xl border border-stone-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name || "Cafe food"}
                        className="h-32 w-full rounded-xl object-cover sm:w-36"
                      />

                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg font-bold sm:text-xl">
                          {item.name}
                        </h2>

                        <p className="mt-2 font-semibold text-orange-600">
                          {formatPrice(item.price)}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <div className="flex items-center rounded-full border border-stone-200">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, -1)
                              }
                              aria-label={`Decrease ${item.name} quantity`}
                              className="rounded-l-full p-2.5 transition hover:bg-orange-50 hover:text-orange-600"
                            >
                              <Minus size={17} />
                            </button>

                            <span className="min-w-9 text-center font-medium">
                              {item.quantity || 1}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, 1)
                              }
                              aria-label={`Increase ${item.name} quantity`}
                              className="rounded-r-full p-2.5 transition hover:bg-orange-50 hover:text-orange-600"
                            >
                              <Plus size={17} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-sm font-medium text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <p className="font-bold sm:text-right">
                        {formatPrice(
                          Number(item.price || 0) *
                            Number(item.quantity || 1)
                        )}
                      </p>
                    </article>
                  ))}

                  <div className="flex flex-wrap justify-between gap-4 pt-2">
                    <Link
                      to="/menu"
                      className="inline-flex items-center gap-2 font-semibold text-orange-600 hover:text-orange-700"
                    >
                      <ArrowLeft size={18} />
                      Continue Shopping
                    </Link>

                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-sm font-medium text-red-500 hover:text-red-700"
                    >
                      Clear Cart
                    </button>
                  </div>
                </section>

                {/* Order summary */}
                <aside className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm lg:sticky lg:top-6">
                  <h2 className="text-xl font-bold">
                    Order Summary
                  </h2>

                  <div className="mt-6 flex justify-between text-stone-600">
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>

                  <div className="mt-4 flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 text-xl font-bold">
                    <span>Total</span>

                    <span className="text-orange-600">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-stone-500">
                    Delivery charges, if applicable, are not included.
                  </p>

                  {/* Checkout button is enabled */}
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(true)}
                    className="mt-6 w-full rounded-full bg-orange-500 px-5 py-3.5 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
                  >
                    Proceed to Checkout
                  </button>
                </aside>
              </div>
            )}
          </>
        )}
      </div>

      {/* Checkout form modal */}
      {checkoutOpen && !orderPlaced && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onClick={() => setCheckoutOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-heading"
            className="relative my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              aria-label="Close checkout"
              className="absolute right-4 top-4 rounded-full p-2 text-stone-500 hover:bg-stone-100"
            >
              <X size={21} />
            </button>

            <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
              Almost There
            </p>

            <h2
              id="checkout-heading"
              className="mt-2 text-2xl font-bold"
            >
              Checkout Details
            </h2>

            <p className="mt-2 text-sm text-stone-500">
              Enter your delivery information.
            </p>

            <form
              onSubmit={handlePlaceOrder}
              className="mt-6 space-y-5"
            >
              <div>
                <label
                  htmlFor="customer-name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full Name
                </label>

                <input
                  id="customer-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  placeholder="Enter your full name"
                  required
                  maxLength={100}
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="customer-phone"
                  className="mb-2 block text-sm font-semibold"
                >
                  Phone Number
                </label>

                <input
                  id="customer-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={customer.phone}
                  onChange={handleCustomerChange}
                  placeholder="Enter your phone number"
                  required
                  maxLength={20}
                  pattern="[0-9+\-() ]{7,20}"
                  title="Enter a valid phone number"
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="customer-address"
                  className="mb-2 block text-sm font-semibold"
                >
                  Delivery Address
                </label>

                <textarea
                  id="customer-address"
                  name="address"
                  autoComplete="street-address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                  placeholder="House, road, area and city"
                  required
                  maxLength={500}
                  rows={3}
                  className="w-full resize-y rounded-xl border border-stone-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="customer-payment"
                  className="mb-2 block text-sm font-semibold"
                >
                  Payment Method
                </label>

                <select
                  id="customer-payment"
                  name="payment"
                  value={customer.payment}
                  onChange={handleCustomerChange}
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-orange-500"
                >
                  <option value="Cash on Delivery">
                    Cash on Delivery
                  </option>
                </select>
              </div>

              <div className="rounded-xl bg-orange-50 p-4">
                <div className="flex justify-between gap-4 text-sm text-stone-600">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="mt-2 flex justify-between gap-4 font-bold">
                  <span>Order Total</span>
                  <span className="text-orange-600">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-orange-500 px-5 py-3.5 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
              >
                Place Order · {formatPrice(totalPrice)}
              </button>

              <p className="text-center text-xs leading-5 text-stone-500">
                Demo checkout only. This does not send an actual order
                to the cafe.
              </p>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}