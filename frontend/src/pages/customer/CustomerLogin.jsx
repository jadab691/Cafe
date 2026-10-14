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
        throw new Error("Login failed");
      }

      localStorage.setItem("customerToken", data.token);
      localStorage.setItem("customer", JSON.stringify(data.customer));

      navigate("/");
    } catch (err) {
      setError(err.message || "Could not connect to the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow-lg">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">
        Welcome Back!
      </h1>

      <p className="mb-6 text-gray-500">
        Login to order your favorite food.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border p-3"
          required
        />

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-orange-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-orange-500 p-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/customer/signup"
          className="font-semibold text-orange-500"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
