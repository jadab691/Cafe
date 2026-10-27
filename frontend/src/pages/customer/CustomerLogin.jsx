
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/customers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Login failed"
        );
      }

      localStorage.setItem("customerToken", data.token);
      localStorage.setItem(
        "customer",
        JSON.stringify(data.customer)
      );

      navigate("/");
    } catch (err) {
      setError(
        err.message || "Could not connect to the server"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#fffaf3] px-4 py-12 sm:px-8 sm:py-16 lg:py-20">

      {/* Back to Home */}
      <Link
        to="/"
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-md transition hover:border-orange-500 hover:bg-orange-500 hover:text-white sm:left-6 sm:top-6"
      >
        <span aria-hidden="true">←</span>
        Back to Home
      </Link>

      {/* Soft decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-rose-100/70 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 pt-8 lg:grid-cols-2 lg:gap-20 lg:pt-0">

        {/* Left: Food Editorial Section */}
        <section className="relative mx-auto w-full max-w-lg">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            FRESHLY PREPARED, ALWAYS
          </div>

          <h1 className="text-5xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-6xl">
            Good food.
            <br />
            Good <span className="text-orange-500">mood.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-slate-600 sm:text-lg">
            Your favorite flavors, freshly prepared.
            Discover something delicious and make every meal special.
          </p>

          {/* Decorative food illustration */}
          <div className="relative mt-10 flex min-h-[250px] items-center justify-center overflow-hidden rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-100 via-[#fff0d8] to-rose-100 shadow-sm sm:min-h-[290px]">

            <div
              aria-hidden="true"
              className="absolute h-52 w-52 rounded-full border border-white/80 bg-white/40 shadow-inner sm:h-64 sm:w-64"
            />

            <div
              aria-hidden="true"
              className="absolute h-40 w-40 rounded-full border-[10px] border-white/80 bg-[#fffaf3] shadow-xl sm:h-48 sm:w-48"
            />

            <div className="relative z-10 -rotate-6 text-8xl drop-shadow-md transition duration-500 hover:rotate-0 sm:text-9xl">
              🍔
            </div>

            <div className="absolute right-[12%] top-[15%] rotate-12 rounded-2xl border border-white/80 bg-white/90 p-3 text-3xl shadow-lg sm:text-4xl">
              🍟
            </div>

            <div className="absolute bottom-[13%] left-[12%] -rotate-12 rounded-2xl border border-white/80 bg-white/90 p-3 text-3xl shadow-lg sm:text-4xl">
              🍕
            </div>

            <div className="absolute right-[12%] top-[67%] rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-lg sm:text-sm">
              Made with love ♥
            </div>

            <div className="absolute left-5 top-5 text-xs font-bold tracking-[0.2em] text-orange-800/60">
              CAFE • EST. WITH LOVE
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-600">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-orange-100">
              ✓ Fresh ingredients
            </span>

            <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-orange-100">
              ✓ Made to order
            </span>
          </div>
        </section>

        {/* Right: Login Card */}
        <section className="mx-auto w-full max-w-md">

          <div className="rounded-3xl border border-orange-100/80 bg-white p-6 shadow-[0_24px_80px_-24px_rgba(124,45,18,0.20)] sm:p-9">

            <div className="mb-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-2xl text-white shadow-lg shadow-orange-200">
                🍽
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome Back!
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your next delicious meal is just a login away.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 bg-[#fffdf9] px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-200 bg-[#fffdf9] px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  required
                />
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-orange-600 transition hover:text-orange-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Logging in..."
                  : "Login to Your Account →"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-100" />

              <span className="text-xs font-medium text-slate-400">
                GOOD FOOD AWAITS
              </span>

              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <p className="text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/customer/signup"
                className="font-bold text-orange-600 hover:text-orange-700 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            Made for food lovers, by Cafe.
          </p>
        </section>
      </div>
    </main>
  );
}
